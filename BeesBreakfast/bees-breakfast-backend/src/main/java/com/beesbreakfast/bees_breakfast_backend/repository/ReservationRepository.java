package com.beesbreakfast.bees_breakfast_backend.repository;

// Import Dish Model 
import com.beesbreakfast.bees_breakfast_backend.model.Reservation;

import java.time.LocalDate;
import java.util.List;

// Import JPA Tools
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;




@Repository
public interface ReservationRepository extends JpaRepository<Reservation, String> {
    List<Reservation> findAllByDate(LocalDate date);
    
}



