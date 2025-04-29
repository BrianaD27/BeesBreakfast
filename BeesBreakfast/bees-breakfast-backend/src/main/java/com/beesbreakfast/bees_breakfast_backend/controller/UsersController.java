package com.beesbreakfast.bees_breakfast_backend.controller;

import com.beesbreakfast.bees_breakfast_backend.model.Users;
import com.beesbreakfast.bees_breakfast_backend.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

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

    // User signup with auto-incremented ID format
    @PostMapping
    public Users addUsers(@RequestBody Users users) {
        String lastId = usersRepository.findLatestUserId();

        int nextIdNum = 1;
        if (lastId != null && lastId.length() > 1) {
            String numPart = lastId.substring(1); // Remove the "U"
            nextIdNum = Integer.parseInt(numPart) + 1;
        }

        String newUserId = String.format("U%05d", nextIdNum);
        users.setUserId(newUserId);

        return usersRepository.save(users);
    }

    // Basic login check (no encryption)
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody Users loginData) {
        Users existingUser = usersRepository.findByUserEmail(loginData.getUserEmail());

        if (existingUser == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found.");
        }

        if (loginData.getUserPassword().equals(existingUser.getUserPassword())) {
            return ResponseEntity.ok(existingUser);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid password.");
        }
    }
}

