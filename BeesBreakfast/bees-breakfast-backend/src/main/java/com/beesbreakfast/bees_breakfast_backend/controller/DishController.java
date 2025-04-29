package com.beesbreakfast.bees_breakfast_backend.controller;


import com.beesbreakfast.bees_breakfast_backend.model.Dish;
import com.beesbreakfast.bees_breakfast_backend.repository.DishRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/dish")
@CrossOrigin("*")
public class DishController {

    @Autowired
    private DishRepository dishRepository;

    @GetMapping
    public List<Dish> getAllDishes() {
        return dishRepository.findAll();
    }

    @PostMapping 
    public Dish addDish(@RequestBody Dish dish) {
        return dishRepository.save(dish);
    }
    
}
