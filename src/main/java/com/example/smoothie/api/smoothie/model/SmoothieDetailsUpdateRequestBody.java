package com.example.smoothie.api.smoothie.model;

public record SmoothieDetailsUpdateRequestBody(String name, String description, int protein, int fat, int carbs) {
}
