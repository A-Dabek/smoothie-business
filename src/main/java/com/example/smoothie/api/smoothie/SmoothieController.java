package com.example.smoothie.api.smoothie;

import com.example.smoothie.api.smoothie.model.SmoothieResponseBodyObject;
import com.example.smoothie.smoothie.SmoothieService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/smoothies")
public class SmoothieController {
    private final SmoothieService smoothieService;

    private final SmoothieMapper smoothieMapper = SmoothieMapper.INSTANCE;

    public SmoothieController(SmoothieService smoothieService) {
        this.smoothieService = smoothieService;
    }

    @GetMapping("/")
    public List<SmoothieResponseBodyObject> getAllSmoothies() {
        var smoothies = this.smoothieService.findAll();
        return this.smoothieMapper.toSmoothieResponseBodyObject(smoothies);
    }
}
