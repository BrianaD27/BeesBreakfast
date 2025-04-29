package com.beesbreakfast.bees_breakfast_backend.controller;

import com.beesbreakfast.bees_breakfast_backend.model.OrderDish;
import com.beesbreakfast.bees_breakfast_backend.repository.OrderDishRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller to handle OrderDish API endpoints
 */
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/orders")
public class OrderDishController {

    @Autowired
    private OrderDishRepository repository;

    // GET all orders
    @GetMapping
    public List<OrderDish> getAllOrders() {
        return repository.findAll();
    }

    // POST a new order
    @PostMapping
    public OrderDish createOrder(@RequestBody OrderDish orderDish) {
        String latestKey = repository.findLatestOrderKey(); // e.g., "K00045"
        String newKey = generateNextOrderKey(latestKey);    // → "K00046"
        orderDish.setOrderKey(newKey);

        return repository.save(orderDish);
    }

    private String generateNextOrderKey(String latestKey) {
        if (latestKey == null || latestKey.length() < 6) {
            return "K00001";
        }
    
        String numberPart = latestKey.substring(1); // remove 'K'
        int nextNumber = Integer.parseInt(numberPart) + 1;
        return String.format("K%05d", nextNumber);  // pads with zeros
    }
}
