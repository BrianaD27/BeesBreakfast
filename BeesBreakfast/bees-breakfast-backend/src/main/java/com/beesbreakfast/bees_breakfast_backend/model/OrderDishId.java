package com.beesbreakfast.bees_breakfast_backend.model;

import java.io.Serializable;
import java.util.Objects;

/**
 * Composite key for OrderDish (userId + orderId)
 */
public class OrderDishId implements Serializable {

    private String userId;
    private String orderId;

    public OrderDishId() {
    }

    public OrderDishId(String userId, String orderId) {
        this.userId = userId;
        this.orderId = orderId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof OrderDishId)) {
            return false;
        }
        OrderDishId that = (OrderDishId) o;
        return Objects.equals(userId, that.userId) && Objects.equals(orderId, that.orderId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId, orderId);
    }
}
