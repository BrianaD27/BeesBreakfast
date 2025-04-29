package com.beesbreakfast.bees_breakfast_backend.repository;

// Import Dish Model 
import com.beesbreakfast.bees_breakfast_backend.model.Users;
// Import JPA Tools
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


@Repository
public interface UsersRepository extends JpaRepository<Users, String> {

    Users findByUserEmail(String userEmail);

    @Query(value = "SELECT user_id FROM Users ORDER BY user_id DESC LIMIT 1", nativeQuery = true)
    String findLatestUserId();

} 
