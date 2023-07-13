package com.example.smoothie.order;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    
    public void save(Order order) {
        orderRepository.save(order);
    }
}
