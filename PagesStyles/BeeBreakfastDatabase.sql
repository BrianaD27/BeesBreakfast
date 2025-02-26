-- Drop database if it exists (useful for resetting)
DROP DATABASE IF EXISTS test_db;

-- Create a new database
CREATE DATABASE test_db;
USE test_db;

-- Create 'users' table with hashed password storage
CREATE TABLE users (
    user_id VARCHAR(6) PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password CHAR(60) NOT NULL,  -- Secure hashed password storage
    profile_pic_url VARCHAR(255),
    points INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create 'membership' table with an ENUM for membership type
CREATE TABLE membership (
    account_id VARCHAR(6) PRIMARY KEY,
    user_id VARCHAR(6) NOT NULL,
    membership_type ENUM('standard', 'regular', 'deluxe') NOT NULL DEFAULT 'standard',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Create 'dish' table with improved data types
CREATE TABLE dish (
    dish_id VARCHAR(6) PRIMARY KEY,
    dish_name VARCHAR(100) NOT NULL,  
    ingredients VARCHAR(255) NOT NULL,  
    description VARCHAR(500) NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    price DECIMAL(5,2) NOT NULL CHECK (price >= 0),
    calories INT NOT NULL CHECK (calories >= 0),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create 'select_order' table with quantity tracking
CREATE TABLE select_order (
    user_id VARCHAR(6) NOT NULL,
    dish_id VARCHAR(6) NOT NULL,
    quantity INT NOT NULL CHECK (quantity > 0) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, dish_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (dish_id) REFERENCES dish(dish_id) ON DELETE CASCADE
);

-- Create 'review' table
CREATE TABLE review (
    review_id VARCHAR(6) PRIMARY KEY,
    user_id VARCHAR(6) NOT NULL,
    review_name VARCHAR(100),  
    stars INT CHECK (stars BETWEEN 1 AND 5),  
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Create 'post' table to connect reviews to users
CREATE TABLE post (
    user_id VARCHAR(6) NOT NULL,
    review_id VARCHAR(6) NOT NULL,
    PRIMARY KEY (user_id, review_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (review_id) REFERENCES review(review_id) ON DELETE CASCADE
);

-- Create 'reservation' table
CREATE TABLE reservation (
    reservation_id VARCHAR(6) PRIMARY KEY,
    user_id VARCHAR(6) NOT NULL,
    attendees INT CHECK (attendees > 0),
    email VARCHAR(255),
    phone_number VARCHAR(15),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Insert mock data into 'users' table
INSERT INTO users (user_id, first_name, last_name, email, password, profile_pic_url, points) VALUES
('P00001', 'Briana', 'Davis', 'briana@example.com', '$2y$10$abcdef...', 'image.jpg', 80),
('P00002', 'Charles', 'Foote', 'charles@example.com', '$2y$10$abcdef...', 'image.jpg', 40),
('P00003', 'Wesley', 'Foote', 'wesley@example.com', '$2y$10$abcdef...', 'image.jpg', 100),
('P00004', 'Mariatu', 'Saidykhan', 'mariatu@example.com', '$2y$10$abcdef...', 'image.jpg', 100),
('P00005', 'Mark', 'Perry', 'mark@example.com', '$2y$10$abcdef...', 'image.jpg', 100);

-- Insert data into 'membership' table
INSERT INTO membership (account_id, user_id, membership_type) VALUES
('A00001', 'P00001', 'regular'),
('A00002', 'P00002', 'deluxe'),
('A00003', 'P00003', 'standard'),
('A00004', 'P00004', 'regular'),
('A00005', 'P00005', 'standard');

-- Insert data into 'reservation' table
INSERT INTO reservation (reservation_id, user_id, attendees, email, phone_number) VALUES
('S00001', 'P00001', 5, 'briana@example.com', '123-456-7980'),
('S00002', 'P00002', 7, 'charles@example.com', '098-765-4321'),
('S00003', 'P00003', 12, 'wesley@example.com', '109-283-4756'),
('S00004', 'P00004', 3, 'mariatu@example.com', '456-123-7890'),
('S00005', 'P00005', 1, 'mark@example.com', '367-127-2043');

-- Five Queries:
-- 1. Get all users who are 'deluxe' members
SELECT u.first_name, u.last_name, m.membership_type 
FROM users u 
JOIN membership m ON u.user_id = m.user_id 
WHERE m.membership_type = 'deluxe';

-- 2. Get the total number of reservations per user
SELECT user_id, COUNT(*) AS total_reservations 
FROM reservation 
GROUP BY user_id 
ORDER BY total_reservations DESC;

-- 3. Retrieve all reservations where the number of attendees is greater than 5
SELECT r.reservation_id, u.first_name, u.last_name, r.attendees
FROM reservation r
JOIN users u ON r.user_id = u.user_id
WHERE r.attendees > 5;

-- 4. Retrieve the total number of users for each membership type
SELECT m.membership_type, COUNT(*) AS total_users
FROM membership m
GROUP BY m.membership_type;

-- 5. Find users who have made reservations but are not deluxe members
SELECT u.user_id, u.first_name, u.last_name
FROM users u
JOIN reservation r ON u.user_id = r.user_id
LEFT JOIN membership m ON u.user_id = m.user_id
WHERE m.membership_type != 'deluxe';
