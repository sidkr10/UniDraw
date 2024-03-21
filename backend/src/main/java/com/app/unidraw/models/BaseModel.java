package com.app.unidraw.models;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class BaseModel {
    private Long id;

    private LocalDateTime createdOn;
}
