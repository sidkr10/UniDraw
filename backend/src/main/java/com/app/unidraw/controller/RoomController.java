package com.app.unidraw.controller;

import com.fasterxml.jackson.databind.JsonNode;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class RoomController {

    Logger logger = LoggerFactory.getLogger(RoomController.class);
    @MessageMapping("/broadCastElements")
    @SendTo("/room/public")
    public JsonNode broadCastElements(@Payload JsonNode elements){
        logger.info(elements.toPrettyString());
        return elements;
    }
}
