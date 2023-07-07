package com.example.smoothie.smoothie;

import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SmoothieService {
    private final SmoothieRepository smoothieRepository;

    public SmoothieService(SmoothieRepository smoothieRepository) {
        this.smoothieRepository = smoothieRepository;
    }

    public List<Smoothie> findAll() {
        return smoothieRepository.findAll(Pageable.ofSize(1)).stream().toList();
    }
}
