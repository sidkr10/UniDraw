package com.app.unidraw.controller;

import com.app.unidraw.dto.UpdateElementMessage;
import com.app.unidraw.repository.ElementsRepository;
import com.app.unidraw.services.ElementsService;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Controller;

@Controller
public class ElementController {

    private ElementsService elementsService;

    public ElementController(ElementsService elementsService){
        this.elementsService = elementsService;
    }

    @MessageMapping("/sendMessage/{roomId}")
    @SendTo("/topic/sendMessage/{roomId}")
    public UpdateElementMessage sendMessage(@DestinationVariable String roomId, @Payload UpdateElementMessage updateElementMessage, StompHeaderAccessor headerAccessor){
        String username = headerAccessor.getFirstNativeHeader("user");
        elementsService.saveElement(updateElementMessage.getRoomId(),updateElementMessage.getElement());
        return updateElementMessage;
    }
}
