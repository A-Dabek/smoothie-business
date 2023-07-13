package com.example.smoothie.api.smoothie;

import com.example.smoothie.api.smoothie.model.OrderRequestBody;
import com.example.smoothie.api.smoothie.model.SmoothieDetailsUpdateRequestBody;
import com.example.smoothie.api.smoothie.model.SmoothieResponseBodyObject;
import com.example.smoothie.order.Order;
import com.example.smoothie.order.OrderService;
import com.example.smoothie.smoothie.SmoothieService;
import com.google.gson.Gson;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/smoothies")
@AllArgsConstructor
public class SmoothieController {
    private final SmoothieService smoothieService;
    private final OrderService orderService;

    private final SmoothieMapper smoothieMapper = SmoothieMapper.INSTANCE;


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

    @PostMapping("/orders")
    public void createOrder(@Valid @RequestBody OrderRequestBody orderRequestBody) {
        // TODO create a custom mapper for this
        var stringifiedContent = new Gson().toJson(orderRequestBody.items());
        var order = new Order(
                null,
                orderRequestBody.name(),
                "%s %s %s".formatted(orderRequestBody.street(), orderRequestBody.city(), orderRequestBody.zip()),
                stringifiedContent
        );
        this.orderService.save(order);
    }
}
