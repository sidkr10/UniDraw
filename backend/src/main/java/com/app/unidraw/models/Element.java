package com.app.unidraw.models;

import com.app.unidraw.enums.Type;
import com.fasterxml.jackson.databind.JsonNode;
import lombok.*;

import java.util.Objects;

@Data
public class Element implements Comparable{
    private String id;
    private JsonNode roughElement;
    private Type type;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Element element = (Element) o;
        return Objects.equals(id, element.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public int compareTo(Object o) {
        Element other = (Element)o;
        return this.id.compareTo(other.getId());
    }
}
