package com.app.unidraw.repository;

import com.app.unidraw.models.Element;
import org.springframework.stereotype.Repository;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Repository
public class ElementsRepository {
    private final Map<Long,List<Element>> elements = new ConcurrentHashMap<>();

    public void addElement(Long roomId, Element element){
        element.setRoom_id(roomId);
        if(!elements.containsKey(roomId)){
            List<Element> newElements = new ArrayList<>();
            newElements.add(element);
            elements.put(roomId, newElements);
        }
        else
            elements.get(roomId).add(element);
    }

    public List<Element> getElements(Long roomId){
        List<Element> elementList = elements.get(roomId);
        return elementList;
    }
}
