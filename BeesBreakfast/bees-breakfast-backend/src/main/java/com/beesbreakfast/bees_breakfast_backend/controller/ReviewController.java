// === CONTROLLER ===
package com.beesbreakfast.bees_breakfast_backend.controller;

import com.beesbreakfast.bees_breakfast_backend.model.Review;
import com.beesbreakfast.bees_breakfast_backend.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.time.LocalTime;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/review")
@CrossOrigin("*")
public class ReviewController {

    @Autowired
    private ReviewRepository reviewRepository;

    @GetMapping
    public List<Review> getAllReviews() {
        return reviewRepository.findAll();
    }

    @PostMapping
    public Review addReview(@RequestBody Review review) {
        String latest = reviewRepository.findTopByOrderByReviewIdDesc();
        String nextId = generateNextReviewId(latest);
        review.setReviewId(nextId);

        // Set the current time if not provided
        if (review.getTime() == null) {
            review.setTime(LocalTime.now());
        }

        return reviewRepository.save(review);
    }

    @PostMapping("/upload")
    public String uploadImage(@RequestParam("file") MultipartFile file) throws IOException {
        if (file.isEmpty()) {
            throw new RuntimeException("File is empty.");
        }

        // Create a unique file name
        String fileName = UUID.randomUUID().toString() + "-" + file.getOriginalFilename();

        // Define the upload directory path (relative to project)
        Path uploadPath = Paths.get("src/main/resources/static/uploads");

        // Create the directory if it doesn't exist
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        // Save the uploaded file
        Path filePath = uploadPath.resolve(fileName);
        Files.write(filePath, file.getBytes());

        // Return the accessible URL for frontend
        return "/uploads/" + fileName;
    }

    private String generateNextReviewId(String latest) {
        if (latest == null || latest.length() < 6) return "R00001";
        int num = Integer.parseInt(latest.substring(1)) + 1;
        return String.format("R%05d", num);
    }
}  