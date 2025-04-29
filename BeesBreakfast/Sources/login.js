document.getElementById('button').addEventListener('click', async (e) => {
    e.preventDefault();
  
    const userEmail = document.getElementById('loginEmail').value;
    const userPassword = document.getElementById('loginPassword').value;
  
    try {
      const res = await fetch("http://localhost:8080/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ userEmail, userPassword })
      });
  
      const data = await res.json();
      if (res.ok) {
        // Puts user id in local storage
        localStorage.setItem("loggedInUser", JSON.stringify(data));

        alert("Welcome back, " + data.firstName + "!");
        window.location.href = "/BeesBreakfast/Pages/index.html"; // or user dashboard
      } else {
        alert("Login failed: " + data);
      }
    } catch (err) {
      console.error(err);
      alert("Login error occurred.");
    }
  });
  