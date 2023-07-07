package com.example.smoothie.smoothie;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SmoothieService {
    private final SmoothieRepository smoothieRepository;

    public SmoothieService(SmoothieRepository smoothieRepository) {
        this.smoothieRepository = smoothieRepository;
    }

    public List<Smoothie> findAll() {
        return smoothieRepository.findAll();
    }

    public void updateSmoothie(Long smoothieId, SmoothieDetails smoothieDetails) {
        Smoothie smoothie = smoothieRepository.findById(smoothieId).orElseThrow(EntityNotFoundException::new);
        var nutritions = new Nutritions(smoothieDetails.protein(), smoothieDetails.fat(), smoothieDetails.carbs());
        smoothie.setName(smoothieDetails.name());
        smoothie.setDescription(smoothieDetails.description());
        smoothie.setNutritions(nutritions);
        smoothieRepository.save(smoothie);
    }

}
