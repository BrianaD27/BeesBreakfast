package com.beesbreakfast.bees_breakfast_backend.repository;

import com.beesbreakfast.bees_breakfast_backend.model.OrderDish;
import com.beesbreakfast.bees_breakfast_backend.model.OrderDishId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

/**
 * Repository interface for OrderDish entity
 */
@Repository
public interface OrderDishRepository extends JpaRepository<OrderDish, OrderDishId> {
    // You can add custom query methods here if needed later

    @Query(value = "SELECT order_key FROM Order_Dish ORDER BY order_key DESC LIMIT 1", nativeQuery = true)
    String findLatestOrderKey();
}
