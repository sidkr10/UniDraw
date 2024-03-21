package com.app.unidraw.listeners;

import jakarta.websocket.Session;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionSubscribeEvent;

@Component
@Slf4j
@RequiredArgsConstructor
public class RoomListener {
    private final SimpMessagingTemplate simpMessagingTemplate;

    @EventListener
    public void handleOnRoomSubscribe(SessionSubscribeEvent sessionSubscribeEvent){
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(sessionSubscribeEvent.getMessage());
        String username = (String) headerAccessor.getFirstNativeHeader("user");
        String destination = headerAccessor.getDestination();
        log.info(username + " subscribed to " +destination);
        if(!destination.isBlank() && destination.startsWith("/app/joinRoom/")){
            String roomId = destination.substring(destination.lastIndexOf('/'));
            simpMessagingTemplate.convertAndSend("/topic"+roomId,username);
        }
    }
}
