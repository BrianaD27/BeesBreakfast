package com.beesbreakfast.bees_breakfast_backend.model;
import jakarta.persistence.*;

@Entity
@Table(name = "Users")
public class Users {

    @Id
    @Column(name = "user_id", length = 6) 
    private String userId;

    @Column(name = "first_name", nullable=false, length = 50)
    private String firstName;

    @Column(name = "last_name", nullable=false, length=50)
    private String lastName;

    @Column(name = "user_email", nullable=false, length=100)
    private String userEmail;

    @Column(name = "user_password", nullable=false, length=255)
    private String userPassword;

    @Column(name = "profile_pic_url", nullable=true, length=200)
    private String profilePicUrl;

    @Column
    private int points = 0;

    // Getters and Setters
    // UserId
    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }
    
    // firstName
    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    // lastName
    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    // userEmail
    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    // userPassword
    public String getUserPassword() {
        return userPassword;
    }

    public void setUserPassword(String userPassword) {
        this.userPassword = userPassword;
    }

    // ProfilePicUrl
    public String getProfilePicUrl () {
        return profilePicUrl;
    }

    public void setProfilePicUrl(String profilePicUrl) {
        this.profilePicUrl = profilePicUrl;
    }

    // points
    public int getPoints(){
        return points;
    }

    public void setPoints(int points) {
        this.points = points;
    }
}
