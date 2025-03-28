package com.beesbreakfast.bees_breakfast_backend.repository;

// Import Dish Model 
import com.beesbreakfast.bees_breakfast_backend.model.Users;
// Import JPA Tools
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface UsersRepository extends JpaRepository<Users, String> {


} 
