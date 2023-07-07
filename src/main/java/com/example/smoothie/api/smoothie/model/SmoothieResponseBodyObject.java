package com.example.smoothie.api.smoothie.model;

public record SmoothieResponseBodyObject(
        Long id,
        String name,
        String description,
        Integer protein,
        Integer fat,
        Integer carbs) {
}
