import { Client } from '@stomp/stompjs'
import { store } from '../store/store';
import { setElements, setSessionState, updateElements } from '../store/slices/whiteboardslice';
import roomactions from '../store/actions/RoomActinos';

const endpointUrl = 'ws://192.168.1.17:8080/ws'
let roomId = null;
let user = null;
let session_Id = null;

const client = new Client({
    brokerURL: endpointUrl,
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
    // debug: (frame) => console.log(frame)
});


export const connectToWebSocket = (roomaction, username, roomid) => {
    roomId = roomid;
    user = username;
    client.activate();
    const headers = {user : username};
    client.onConnect = (frame)=>{
        console.log('Socket Connection Established');
        store.dispatch(setSessionState(true));
        switch(roomaction){
            case roomactions.CREATEROOM :
                client.subscribe('/app/createRoom',onCreateCallBack, headers)
                break;
            case roomactions.JOINROOM :
                client.subscribe("/app/joinRoom/"+roomid, onJoinCallBack, headers);
                break;
        }   
    }

    const onCreateCallBack = (frame) => {
        const response = JSON.parse(frame.body);
        roomId = response.roomId;
        client.subscribe("/app/joinRoom/"+roomId, onJoinCallBack, headers);
    }

    const onJoinCallBack = (frame)=> {
        const joinRepsonse = JSON.parse(frame.body);
        session_Id = joinRepsonse.joinee.sessionId;
        client.subscribe('/topic/sendMessage/'+roomId,(frame)=>{
            const pubMessage = JSON.parse(frame.body);
            if(pubMessage.sender.sessionId !== session_Id){
                store.dispatch(updateElements(pubMessage.element))
            }
        },headers);
    }

    client.onUnhandledMessage = (message) => {
        alert('Something went wrong Please reconnect to the session.');
        store.dispatch(setSessionState(false));
        console.log(message);
    }

    client.onUnhandledFrame = (exc)=> {
        alert('Something went wrong Please reconnect to the session.');
        store.dispatch(setSessionState(false));
        console.log(message);
    }

    client.onDisconnect = (frame) => {
        store.dispatch(setSessionState(false));
        console.log('Client Disconnected..');
    }

    client.onWebSocketClose = () => {
        store.dispatch(setSessionState(false));
        console.log('Web Sockect Disconnected..');
    }
    
    client.onWebSocketError = (error) => {
        store.dispatch(setSessionState(false));
        console.error(error);
    }
}

export const disconnectWebSocket = () => {
    client.deactivate();
}

export const emitElementUpdate = (element)=>{
    client.publish({
        destination: '/app/sendMessage/'+roomId,
        body: JSON.stringify({sender: 
            {
                username: user,
                sessionId: session_Id
            } ,
            element : element}),
        });
}
