package com.app.unidraw.repository;

import com.app.unidraw.models.Element;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Repository
public class ElementsRepository {
    private final Map<String,Element> elements = new ConcurrentHashMap<>();

    public void addElement(Element element){
        if(elements.containsKey(element.getId()))
            elements.replace(element.getId(), element);
        elements.put(element.getId(),element);
    }

    public List<Element> getElements(){
        List<Element> elementList = new ArrayList<>();
        elements.forEach((s, element) -> elementList.add(element));
        return elementList;
    }
}
