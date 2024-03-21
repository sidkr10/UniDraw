package com.app.unidraw.services;

import com.app.unidraw.repository.ElementsRepository;
import org.springframework.stereotype.Service;

@Service
public class ElementsService {
    private ElementsRepository elementsRepository;

    public ElementsService(ElementsRepository elementsRepository){
        this.elementsRepository = elementsRepository;
    }

}
