import { Client } from '@stomp/stompjs'
import { store } from '../store/store';
import { setElements, setSessionState, updateElements } from '../store/slices/whiteboardslice';
import roomactions from '../store/actions/RoomActinos';

const endpointUrl = 'ws://localhost:8080/ws'
let roomId = localStorage.getItem("roomId");
let username = localStorage.getItem("user");
let session_Id = localStorage.getItem("sessionId");

const client = new Client({
    brokerURL: endpointUrl,
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
    // debug: (frame) => console.log(frame)
});


export const connectToWebSocket = (roomaction) => {
    client.activate();
    client.onConnect = (frame)=>{
        username = localStorage.getItem("user");
        const headers = {user : username};
        console.log('Socket Connection Established');
        store.dispatch(setSessionState(true));
        switch(roomaction){
            case roomactions.CREATEROOM :
                client.subscribe('/app/createRoom',onCreateCallBack, headers)
                break;
            case roomactions.JOINROOM :
                roomId = localStorage.getItem("roomId");
                client.subscribe("/app/joinRoom/"+roomId, onJoinCallBack, headers);
                break;
        }   
    }

    const onCreateCallBack = (frame) => {
        const response = JSON.parse(frame.body);
        localStorage.setItem("roomId", response.roomId);
        roomId = response.roomId;
        client.subscribe("/app/joinRoom/"+roomId, onJoinCallBack, headers);
    }

    const onJoinCallBack = (frame)=> {
        const joinRepsonse = JSON.parse(frame.body);
        localStorage.setItem("sessionId", joinRepsonse.joinee.sessionId);
        session_Id = joinRepsonse.joinee.sessionId;
        const elements = joinRepsonse.elements;
        store.dispatch(setElements(elements));
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
                username: username,
                sessionId: session_Id,
            } ,
            roomId: roomId,
            element : element}),
        });
}
    