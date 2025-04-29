document.getElementById('button').addEventListener('click', async (e) => {
    e.preventDefault();

    const userData = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        username: document.getElementById('username').value,
        userEmail: document.getElementById('email').value,
        userPassword: document.getElementById('password').value,
        profilePicUrl: "BeesBreakfast/Assets/blankPfp.jpeg"

    };

    try {
        const response = await fetch("http://localhost:8080/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(userData)
        });

        if (response.ok) {
            alert("Sign-Up Successful!");
            window.location.href = "/BeesBreakfast/Pages/index.html";
        } else {
            alert("Sign-Up Failed. Try Again.");
        }
    } catch (err) {
        console.error("Error:", err);
        alert("Something Went Wrong")
    }
});