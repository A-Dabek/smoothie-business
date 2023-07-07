package com.example.smoothie.smoothie;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@SpringBootTest
class SmoothieServiceTest {

    @Autowired
    private SmoothieService smoothieService;

    @MockBean
    private SmoothieRepository smoothieRepository;

    @BeforeEach
    void setUp() {
        List<Smoothie> entities = List.of(
                new Smoothie(1L, "Banana", "Banana smoothie", new Nutritions(1, 2, 3)),
                new Smoothie(2L, "Apple", "Apple smoothie", new Nutritions(4, 5, 6))
        );
        when(smoothieRepository.findAll()).thenReturn(entities);
    }

    @Test
    void findAll() {
        List<Smoothie> smoothies = smoothieService.findAll();
        assertEquals(2, smoothies.size());
    }
}