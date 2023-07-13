package com.example.smoothie.api.smoothie.model;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record SmoothieDetailsUpdateRequestBody(
        @NotBlank String name,
        @NotNull String description,
        @NotNull @Min(value = 0L) Integer protein,
        @NotNull @Min(value = 0L) Integer fat,
        @NotNull @Min(value = 0L) Integer carbs,
        @NotNull @Min(value = 0L) Integer price) {
}
