// === REPOSITORY ===
package com.beesbreakfast.bees_breakfast_backend.repository;

import com.beesbreakfast.bees_breakfast_backend.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ReviewRepository extends JpaRepository<Review, String> {

    @Query(value = "SELECT review_id FROM Review ORDER BY review_id DESC LIMIT 1", nativeQuery = true)
    String findTopByOrderByReviewIdDesc();

}
