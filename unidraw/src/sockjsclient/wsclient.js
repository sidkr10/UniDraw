import { over } from 'stompjs';
import SockJS from 'sockjs-client';
import { store } from '../store/store';
import { setElements } from '../store/slices/whiteboardslice';

const endpointUrl = 'http://192.168.1.17:8080/ws'

let stompClient = null;

export const connectToWebSocket = (setConnected) => {
  const sock = new SockJS(endpointUrl);
  
  stompClient = over(sock);

  // Heartbeat configuration: send heartbeat every 10 seconds, receive heartbeat every 10 seconds
  stompClient.heartbeat.outgoing = 10000; // 10 seconds
  stompClient.heartbeat.incoming = 10000; // 10 seconds

  // Enable auto-reconnect
  stompClient.reconnect_delay = 5000; // 5 seconds
  stompClient.max_reconnect_delay = 30000; // 30 seconds
  stompClient.connect({}, onConnected, onError);
  sock.onclose = (event) => {
        if (event.code === 1000) {
            console.log('WebSocket connection closed gracefully');
        } else {
            onsole.log('WebSocket connection closed unexpectedly. Reconnecting...');
        // Reconnect after a short delay
            setTimeout(() => {
                // Reinitialize the WebSocket connection
                socket = new SockJS('hhttp://192.168.1.17:8080/ws');
            }, 3000); // Wait for 3 seconds before attempting to reconnect
        };
    }

}

const onConnected = () => {
    console.log('Connected..');
    stompClient.debug = null;
    stompClient.subscribe('/room/public', (res)=>{
        const elements = JSON.parse(res.body);
        store.dispatch(setElements(elements));
    });
}

const onError = (error) => {
    console.log(error);
}

export const emitElementUpdate = (elements)=>{
    stompClient.send('/room/public',{},JSON.stringify(elements));
}