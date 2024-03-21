package com.app.unidraw.dto;

import com.app.unidraw.enums.State;
import com.app.unidraw.models.Element;
import com.app.unidraw.models.User;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UpdateElementMessage {
    private User sender;
    private Element element;
}
