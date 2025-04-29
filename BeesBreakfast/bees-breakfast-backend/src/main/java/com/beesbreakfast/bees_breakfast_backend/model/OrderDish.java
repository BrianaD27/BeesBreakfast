package com.beesbreakfast.bees_breakfast_backend.model;

import jakarta.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalTime;

/**
 * OrderDish Model - Represents the Order_Dish table
 */
@Entity
@Table(name = "Order_Dish")
public class OrderDish implements Serializable {

    @Id
    @Column(name = "order_key", length = 6)
    private String orderKey;

    @Column(name = "user_id", length = 6, nullable = false)
    private String userId;

    @Column(name = "order_id", length = 6, nullable = false)
    private String orderId;

    @Column(name = "dish_name", length = 50)
    private String dishName;

    @Column
    private LocalDate date;

    @Column
    private LocalTime time;

    @Column
    private Integer amount;

    // Getters and Setters

    public String getOrderKey() {
        return orderKey;
    }

    public void setOrderKey(String orderKey) {
        this.orderKey = orderKey;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getOrderId() {
        return orderId;
    }

    public void setOrderId(String orderId) {
        this.orderId = orderId;
    }

    public String getDishName() {
        return dishName;
    }

    public void setDishName(String dishName) {
        this.dishName = dishName;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public LocalTime getTime() {
        return time;
    }

    public void setTime(LocalTime time) {
        this.time = time;
    }

    public Integer getAmount() {
        return amount;
    }

    public void setAmount(Integer amount) {
        this.amount = amount;
    }
}
