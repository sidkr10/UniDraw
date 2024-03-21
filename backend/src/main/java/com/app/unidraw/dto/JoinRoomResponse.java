package com.app.unidraw.dto;

import com.app.unidraw.enums.State;
import com.app.unidraw.models.Element;
import com.app.unidraw.models.User;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class JoinRoomResponse {
    private User joinee;
    private List<Element> elements;
}
