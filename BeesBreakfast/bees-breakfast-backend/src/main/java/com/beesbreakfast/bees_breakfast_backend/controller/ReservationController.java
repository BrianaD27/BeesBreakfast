package com.beesbreakfast.bees_breakfast_backend.controller;

import java.time.LocalDate;

import com.beesbreakfast.bees_breakfast_backend.model.Reservation;
import com.beesbreakfast.bees_breakfast_backend.repository.ReservationRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalTime;
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
        // Sets User ID to always be U00001 for now
        reservation.setUserId("U00001");

        // Gets all reservation IDs 
        List<Reservation> all = reservationRepository.findAll();

        String nextId = "R00001";

        if(!all.isEmpty()) {
            // sort through the list to find the latest reservation ID
            all.sort((a,b) -> b.getReservationId().compareTo(a.getReservationId()));

            // sets latest reservationID
            String lastId = all.get(0).getReservationId();

            // counter
            int nextNum = Integer.parseInt(lastId.substring(1)) + 1;

            // Formats new Reservation ID
            nextId = String.format("R%05d", nextNum);
        }

        reservation.setReservationId(nextId);

        reservationRepository.save(reservation);
        return "Reservation is Complete";
    }

    // Gets all the booked times 
    @GetMapping("/booked-times")
    public List<LocalTime> getBookedTimes(@RequestParam("date") String date) {
        LocalDate localDate = LocalDate.parse(date);
        return reservationRepository.findAllByDate(localDate)
                                    .stream()
                                    .map(Reservation::getTime)
                                    .toList();
    }
    
}
