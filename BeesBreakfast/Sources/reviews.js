// === reviews.js ===

async function uploadImageAndGetUrl(file) {
    const formData = new FormData();
    formData.append("file", file);
  
    const response = await fetch("http://localhost:8080/upload", {
      method: "POST",
      body: formData,
    });
  
    return await response.text(); // The image URL returned from the backend
  }
  
  async function submitReview() {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!user) {
      alert("Please log in before submitting a review.");
      return;
    }
    const userId = user.userId;

    const file = document.getElementById("upload-file").files[0];
    const imageUrl = file ? await uploadImageAndGetUrl(file) : "";
  
    const name = document.getElementById("review-name").value;
    const stars = parseInt(document.getElementById("review-stars").value);
    const comment = document.getElementById("review-comment").value;
  
    const review = {
      userId: userId, // Temporary static user ID
      reviewName: name,
      stars: stars,
      description: comment,
      imageUrl: imageUrl
    };
  
    fetch("http://localhost:8080/review", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(review),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Review submitted:", data);
        loadReviews();
      })
      .catch((err) => {
        console.error("Error submitting review:", err);
      });
  }
  
  function loadReviews() {
    fetch("http://localhost:8080/review")
      .then((res) => res.json())
      .then((reviews) => {
        const container = document.getElementById("review-container");
        container.innerHTML = "";
  
        reviews.forEach((review) => {
          const card = document.createElement("div");
          card.className = "review-card mb-3";
  
          card.innerHTML = `
            <img src="${review.imageUrl}" alt="User Image" class="review-image mb-2" />
            <h5>${review.reviewName}</h5>
            <p>⭐ ${review.stars} / 5</p>
            <p>${review.description}</p>
            <hr/>
          `;
  
          container.appendChild(card);
        });
      })
      .catch((err) => console.error("Error loading reviews:", err));
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    loadReviews();
  
    const submitBtn = document.getElementById("submit-review-btn");
    if (submitBtn) {
      submitBtn.addEventListener("click", submitReview);
    }
  
    const fileInput = document.getElementById("upload-file");
    if (fileInput) {
      fileInput.addEventListener("change", function (event) {
        const file = event.target.files[0];
        if (!file) return;
  
        const reader = new FileReader();
        reader.onload = function (e) {
          document.getElementById("pfp").src = e.target.result;
        };
        reader.readAsDataURL(file);
      });
    }
  });