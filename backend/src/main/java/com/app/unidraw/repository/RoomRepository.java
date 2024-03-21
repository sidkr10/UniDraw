package com.app.unidraw.repository;

import com.app.unidraw.models.Room;
import com.app.unidraw.models.User;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@Repository
public class RoomRepository {
    private static Map<Long, Room> rooms;
    private static Long counter;

    public RoomRepository(){
        rooms = new HashMap<>();
        this.counter = 1l;
    }

    public Long addRoom(User host){
        Room room = Room.builder().host(host).build();
        room.setId(counter++);
        room.setParticipants(new ArrayList<>());
        rooms.put(room.getId(),room);
        return room.getId();
    }

    public Room getRoom(Long room_id){
        return rooms.get(room_id);
    }
}

