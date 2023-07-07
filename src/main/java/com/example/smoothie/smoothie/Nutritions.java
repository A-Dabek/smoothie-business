package com.example.smoothie.smoothie;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.Setter;

@Embeddable
@Getter
@Setter
public class Nutritions {

    @Column(nullable = false)

    private Integer protein = 0;

    @Column(nullable = false)
    private Integer fat = 0;

    @Column(nullable = false)
    private Integer carbs = 0;
}
