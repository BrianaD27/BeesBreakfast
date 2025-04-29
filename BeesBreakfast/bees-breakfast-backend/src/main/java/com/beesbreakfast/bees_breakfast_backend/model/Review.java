// === MODEL ===
package com.beesbreakfast.bees_breakfast_backend.model;

import jakarta.persistence.*;
import java.time.LocalTime;

@Entity
@Table(name = "Review")
public class Review {

    @Id
    @Column(name = "review_id", length = 6)
    private String reviewId;

    @Column(name = "user_id", length = 6, nullable = false)
    private String userId;

    @Column(name = "review_name", length = 50, nullable = false)
    private String reviewName;

    @Column(nullable = true)
    private Integer stars;

    @Column(length = 255)
    private String description;

    @Column(nullable = false)
    private LocalTime time;

    @Column(name = "image_url", length = 255)
    private String imageUrl;

    // Getters and Setters
    public String getReviewId() {
        return reviewId;
    }

    public void setReviewId(String reviewId) {
        this.reviewId = reviewId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getReviewName() {
        return reviewName;
    }

    public void setReviewName(String reviewName) {
        this.reviewName = reviewName;
    }

    public Integer getStars() {
        return stars;
    }

    public void setStars(Integer stars) {
        this.stars = stars;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalTime getTime() {
        return time;
    }

    public void setTime(LocalTime time) {
        this.time = time;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}
