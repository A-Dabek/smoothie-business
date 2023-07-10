package com.example.smoothie.api.smoothie;

import com.example.smoothie.api.smoothie.model.SmoothieDetailsUpdateRequestBody;
import com.example.smoothie.smoothie.Nutritions;
import com.example.smoothie.smoothie.Smoothie;
import com.example.smoothie.smoothie.SmoothieService;
import com.google.gson.Gson;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.hamcrest.Matchers.hasSize;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(SmoothieController.class)
class SmoothieControllerTest {

    private final Gson gson = new Gson();
    @Autowired
    private MockMvc mockMvc;
    @MockBean
    private SmoothieService smoothieService;

    @BeforeEach
    void setUp() {
        when(smoothieService.findAll()).thenReturn(List.of(
                new Smoothie(1L, "Smoothie 1", "Smoothie 1 description", new Nutritions(1, 1, 1)),
                new Smoothie(2L, "Smoothie 2", "Smoothie 2 description", new Nutritions(2, 2, 2))
        ));
        doNothing().when(smoothieService).updateSmoothie(anyLong(), any());
    }

    @Test
    void getAllSmoothies() throws Exception {
        mockMvc.perform(get("/smoothies"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].name").value("Smoothie 1"))
                .andExpect(jsonPath("$[1].name").value("Smoothie 2"));
    }

    @Test
    void updateSmoothie() throws Exception {
        var validMinimumRequestBody = new SmoothieDetailsUpdateRequestBody(
                "name",
                "",
                0,
                2,
                3
        );
        var validRequestBody = new SmoothieDetailsUpdateRequestBody(
                "name",
                "description",
                1,
                2,
                3
        );
        var noNameRequestBody = new SmoothieDetailsUpdateRequestBody(
                "",
                "description",
                1,
                2,
                3
        );
        var nullDescriptionRequestBody = new SmoothieDetailsUpdateRequestBody(
                "name",
                null,
                1,
                2,
                3
        );
        var missingNutritionRequestBody = new SmoothieDetailsUpdateRequestBody(
                "name",
                "description",
                1,
                null,
                3
        );
        var negativeNutritionRequestBody = new SmoothieDetailsUpdateRequestBody(
                "name",
                "description",
                1,
                2,
                -3
        );


        mockMvc.perform(
                put("/smoothies/1/details")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(gson.toJson(validMinimumRequestBody))
        ).andExpect(status().isOk());

        mockMvc.perform(
                put("/smoothies/1/details")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(gson.toJson(validRequestBody))
        ).andExpect(status().isOk());

        mockMvc.perform(
                put("/smoothies/1/details")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(gson.toJson(noNameRequestBody))
        ).andExpect(status().isBadRequest());

        mockMvc.perform(
                put("/smoothies/1/details")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(gson.toJson(nullDescriptionRequestBody))
        ).andExpect(status().isBadRequest());

        mockMvc.perform(
                put("/smoothies/1/details")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(gson.toJson(missingNutritionRequestBody))
        ).andExpect(status().isBadRequest());

        mockMvc.perform(
                put("/smoothies/1/details")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(gson.toJson(negativeNutritionRequestBody))
        ).andExpect(status().isBadRequest());
    }
}