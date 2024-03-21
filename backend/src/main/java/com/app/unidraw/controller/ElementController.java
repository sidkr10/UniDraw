package com.app.unidraw.controller;

import com.app.unidraw.dto.UpdateElementMessage;
import com.app.unidraw.repository.ElementsRepository;
import org.springframework.stereotype.Controller;

@Controller
public class ElementController {

    private ElementsRepository elementsRepository;

    public ElementController(ElementsRepository elementsRepository){
        this.elementsRepository = elementsRepository;
    }

    public UpdateElementMessage broadcastElement(UpdateElementMessage updateElementMessage){
        return updateElementMessage;
    }
}
