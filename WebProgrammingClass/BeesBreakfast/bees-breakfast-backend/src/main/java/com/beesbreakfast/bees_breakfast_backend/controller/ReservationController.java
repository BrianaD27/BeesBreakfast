package com.beesbreakfast.bees_breakfast_backend.controller;

import com.beesbreakfast.bees_breakfast_backend.model.Reservation;
import com.beesbreakfast.bees_breakfast_backend.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping("/reservations")
@CrossOrigin("*") //Allow frontend to connect
public class ReservationController {

    @Autowired
    private ReservationRepository reservationRepository;

    // Get all reservations
    @GetMapping
    public List<Reservation> getAllReservations() {
        return reservationRepository.findAll();
    }

    // Creates new Reservation
    @PostMapping
    public String createReservation(@RequestBody Reservation reservation) {
        reservationRepository.save(reservation);
        return "Reservation is Complete";
    }
    
}
