package com.example.smoothie.smoothie;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
class SmoothieServiceTest {

    static List<Smoothie> entities = List.of(
            new Smoothie(1L, "Banana", "Banana smoothie", new Nutritions(1, 2, 3)),
            new Smoothie(2L, "Apple", "Apple smoothie", new Nutritions(4, 5, 6))
    );
    @Autowired
    private SmoothieService smoothieService;
    @Autowired
    private SmoothieRepository smoothieRepository;

    @BeforeEach
    void setUp() {
        smoothieRepository.saveAll(entities);
    }

    @Test
    void findAll() {
        List<Smoothie> smoothies = smoothieService.findAll();
        assertEquals(entities.size(), smoothies.size());
    }

    @Test
    void updateSmoothie() {
        var smoothies = smoothieService.findAll();
        var updatedSmoothie = smoothies.get(0);
        assertEquals(entities.get(0).getName(), updatedSmoothie.getName());

        SmoothieDetails smoothieDetails = new SmoothieDetails("Strawberry", "Strawberry smoothie", 10, 20, 30);
        smoothieService.updateSmoothie(1L, smoothieDetails);

        smoothies = smoothieService.findAll();
        updatedSmoothie = smoothies.get(0);
        assertEquals("Strawberry", updatedSmoothie.getName());
    }
}