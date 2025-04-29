package com.beesbreakfast.bees_breakfast_backend.model;

import jakarta.persistence.*;

import java.math.BigDecimal; //Better than double to avoid rounding issues


/* How to create a Model Package in Java Spring Boot Based off of mySQL
 * Use Case: To connect to the mySQL database and manipulate the data
 *  Step 1. Define the Package
 *  Step 2. Import required Tools
 *  Step 3. Tell Spring Boot that the Primary Keys are names of 
 *          Database Tables
 *  Step 4. Create the Primary Keys
 *  Step 5. Add Getters and Setters to allow you to access and 
 *          change the data within the table
 * 
 */

@Entity //Tells Spring Boot this is a Database Table
@Table(name = "Dish") //Maps this class 
public class Dish {
    
    @Id
    @Column(name = "dish_id", length = 6)
    private String dishId;

    // Nullable = required
    @Column(name = "dish_name", nullable=false, length = 50) 
    private String dishName;

    // name is not needed because its the same name used
    @Column(nullable=false, length = 256 )
    private String ingredients;

    @Column(nullable=false, length = 255)
    private String description;


    @Column(nullable=false, precision=6, scale=2)
    private BigDecimal price;
    
    @Column
    private int calories;

    @Column(nullable=false, length=255)
    private String imageUrl;

    // Getters and Setters
    // DishId
    public String getDishId() {
        return dishId;
    }

    public void setDishId(String dishId) {
        this.dishId = dishId;
    }

    // DishName
    public String getDishName() {
        return dishName;
    }

    public void setDishName(String dishName) {
        this.dishName = dishName;
    }

    // Ingredients
    public String getIngredients() {
        return ingredients;
    }

    public void setIngredients(String ingredients) {
        this.ingredients = ingredients;
    }

    // Description
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    
    // Price
    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    // Calories
    public int getCalories() {
        return calories;
    }

    public void setCalories(int calories) {
        this.calories = calories;
    }

    // ImageUrl
    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }


}
