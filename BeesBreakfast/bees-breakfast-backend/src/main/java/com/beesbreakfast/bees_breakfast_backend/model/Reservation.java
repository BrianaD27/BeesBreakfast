package com.beesbreakfast.bees_breakfast_backend.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "Reservation")
public class Reservation {
    
    @Id
    @Column(name = "reservation_id", length=6)
    private String reservationId; 

    @Column(name = "user_id", length=6) 
    private String userId;

    @Column(nullable=false)
    private int attendees;

    @Column(nullable=false)
    private LocalTime time;

    @Column(nullable=false)
    private LocalDate date;

    @Column(name = "reservation_email", nullable=false, length=100)
    private String reservationEmail;

    @Column(name = "phone_number", nullable=false, length=15) 
    private String phoneNumber;

    // Getters and Setters 
    // reservationId
    public String getReservationId() {
        return reservationId;
    }
    

    public void setReservationId(String reservationId) {
        this.reservationId = reservationId;
    }

    // userId
    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    // attendees
    public int getAttendees() {
        return attendees;
    }

    public void setAttendees(int attendees) {
        this.attendees = attendees;
    }

    // time
    public LocalTime getTime() {
        return time;
    }

    public void setTime(LocalTime time) {
        this.time = time;
    }

    // data
    public LocalDate getDate() {
        return date;
    }
    
    public void setDate(LocalDate date) {
        this.date = date;
    }

    // reservationEmail
    public String getReservationEmail() {
        return reservationEmail;
    }

    public void setReservationEmail(String reservationEmail) {
        this.reservationEmail = reservationEmail;
    }

    // phoneNumber
    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
}
