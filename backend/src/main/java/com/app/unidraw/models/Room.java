package com.app.unidraw.models;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class Room extends BaseModel {
    private User host;
    private List<User> participants;
    private List<Element> elements;
}
