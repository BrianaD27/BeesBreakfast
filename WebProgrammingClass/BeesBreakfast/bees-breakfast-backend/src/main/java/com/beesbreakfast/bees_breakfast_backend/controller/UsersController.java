package com.beesbreakfast.bees_breakfast_backend.controller;


import com.beesbreakfast.bees_breakfast_backend.model.Users;
import com.beesbreakfast.bees_breakfast_backend.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@CrossOrigin("*")
public class UsersController {

    @Autowired
    private UsersRepository usersRepository;

    @GetMapping
    public List<Users> getAllUsers() {
        return usersRepository.findAll();
    }

    @PostMapping 
    public Users addUsers(@RequestBody Users users) {
        return usersRepository.save(users);
    }
    
}