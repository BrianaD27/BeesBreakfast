package com.beesbreakfast.bees_breakfast_backend.repository;

// Import Dish Model 
import com.beesbreakfast.bees_breakfast_backend.model.Reservation;
// Import JPA Tools
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;



@Repository
public interface ReservationRepository extends JpaRepository<Reservation, String> {

    
}



