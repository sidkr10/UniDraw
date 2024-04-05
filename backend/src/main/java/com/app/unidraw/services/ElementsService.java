package com.app.unidraw.services;

import com.app.unidraw.models.Element;
import com.app.unidraw.repository.ElementsRepository;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ElementsService {
    private ElementsRepository elementsRepository;

    public ElementsService(ElementsRepository elementsRepository){
        this.elementsRepository = elementsRepository;
    }

    public void saveElement(Long roomId, Element element){
        elementsRepository.addElement(roomId, element);
    }

    public List<Element> getAllRoomElements(Long roomId){
        List<Element> allElements = elementsRepository.getElements(roomId);
        return allElements;
    }

    public List<Element> getRoomDrawnElements(Long roomId){
        List<Element> allElements = elementsRepository.getElements(roomId);
        if(allElements==null || allElements.isEmpty())
            return Arrays.asList();
        Set<Element> roomElementSet = new HashSet<>();
        for(int i=allElements.size()-1; i>=0; i--){
            roomElementSet.add(allElements.get(i));
        }
        return roomElementSet.stream().toList();
    }
}
