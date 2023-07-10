package com.example.smoothie.api.smoothie;

import com.example.smoothie.api.smoothie.model.SmoothieDetailsUpdateRequestBody;
import com.example.smoothie.api.smoothie.model.SmoothieResponseBodyObject;
import com.example.smoothie.smoothie.SmoothieService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/smoothies")
public class SmoothieController {
    private final SmoothieService smoothieService;

    private final SmoothieMapper smoothieMapper = SmoothieMapper.INSTANCE;

    public SmoothieController(SmoothieService smoothieService) {
        this.smoothieService = smoothieService;
    }

    @GetMapping()
    public List<SmoothieResponseBodyObject> getAllSmoothies() {
        var smoothies = this.smoothieService.findAll();
        return this.smoothieMapper.toSmoothieResponseBodyObject(smoothies);
    }

    @PutMapping("/{smoothieId}/details")
    public void updateSmoothie(@PathVariable Long smoothieId, @Valid @RequestBody SmoothieDetailsUpdateRequestBody smoothieDetailsUpdateRequestBody) {
        var smoothieDetails = this.smoothieMapper.toSmoothieDetails(smoothieDetailsUpdateRequestBody);
        this.smoothieService.updateSmoothie(smoothieId, smoothieDetails);
    }
}
