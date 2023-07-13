package com.example.smoothie.api.smoothie.model;

import jakarta.validation.constraints.NotBlank;

import java.util.Map;

public record OrderRequestBody(
        @NotBlank String name,
        @NotBlank String street,
        @NotBlank String city,
        @NotBlank String zip,
        Map<Long, Integer> items) {
}
