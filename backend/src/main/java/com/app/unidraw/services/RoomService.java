package com.app.unidraw.services;

import com.app.unidraw.dto.CreateRoomResponse;
import com.app.unidraw.dto.JoinRoomResponse;
import com.app.unidraw.models.Element;
import com.app.unidraw.models.Room;
import com.app.unidraw.models.User;
import com.app.unidraw.repository.RoomRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoomService {

    private RoomRepository roomRepository;
    private ElementsService elementsService;

    public RoomService(RoomRepository roomRepository, ElementsService elementsService){
        this.roomRepository = roomRepository;
        this.elementsService = elementsService;
    }

    public CreateRoomResponse createRoom(String username, String sessionId){
        User host = new User();
        host.setUsername(username);
        host.setSessionId(sessionId);
        Long roomId = roomRepository.addRoom(host);
        CreateRoomResponse createRoomResponse = new CreateRoomResponse();
        createRoomResponse.setRoomId(roomId);
        return createRoomResponse;
    }

    public JoinRoomResponse joinRoom(Long roomid, String username, String sessionId){
        User joinee = new User(username,sessionId);
        Room room = roomRepository.getRoom(roomid);
        List<User> participants = room.getParticipants();
        participants.add(joinee);
        room.setParticipants(participants);
        List<Element> roomSetElements = elementsService.getRoomDrawnElements(roomid);
        JoinRoomResponse joinRoomResponse = JoinRoomResponse.builder()
                .joinee(joinee)
                .elements(roomSetElements)
                .build();
        return joinRoomResponse;
    }
}
