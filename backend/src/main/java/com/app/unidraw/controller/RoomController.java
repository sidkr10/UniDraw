package com.app.unidraw.controller;

import com.app.unidraw.dto.*;
import com.app.unidraw.enums.State;
import com.app.unidraw.models.Element;
import com.app.unidraw.repository.ElementsRepository;
import com.app.unidraw.services.ElementsService;
import com.app.unidraw.services.RoomService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.*;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
@Slf4j
public class RoomController {

    private RoomService roomService;
    public RoomController(RoomService roomService){
        this.roomService = roomService;
    }

    @SubscribeMapping("/createRoom")
    public CreateRoomResponse createRoom(@Header("user")String username, StompHeaderAccessor headerAccessor){
        CreateRoomResponse createRoomResponse = roomService.createRoom(username, headerAccessor.getSessionId());
        return createRoomResponse;
    }

    @SubscribeMapping("/joinRoom/{roomId}")
    public JoinRoomResponse joinRoom(@DestinationVariable Long roomId, StompHeaderAccessor headerAccessor){
        String username = headerAccessor.getFirstNativeHeader("user");
        log.info(username + " is joining room " + roomId);
        JoinRoomResponse joinRoomResponse = roomService.joinRoom(roomId, username, headerAccessor.getSessionId());
        return joinRoomResponse;
    }

}
