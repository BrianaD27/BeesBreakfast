function submitReservation() {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!user) {
      alert("Please log in before submitting a review.");
      return;
    }
    const userId = user.userId;

    const reservation = {
        userId: userId, //add this code later: document.getElementById("userId").value,
        attendees: parseInt(document.getElementById("attendees").value),
        time: document.getElementById("reservationTime").value,
        date: document.getElementById("reservationDate").value,
        reservationEmail: document.getElementById("reservationEmail").value,
        phoneNumber: document.getElementById("phoneNumber").value
    };

    fetch("http://localhost:8080/reservations", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(reservation)
    })
    .then(response => response.text())
    .then(message => {
        alert(message); //Show success message

    })
    .catch(error => {
        alert(error)
        console.log(error);
    });
}

// Disable certain time slots based on bookings
document.getElementById("reservationDate").addEventListener("change", function() {
    const selectedDate = this.value;

    // fetches all the data that has the same date as the selected date
    fetch(`http://localhost:8080/reservations/booked-times?date=${selectedDate}`)
        .then(response => response.json()) // Parses JSON response
        .then(bookedTimes => { // bookedTimes is an array

            const timeSelect = document.getElementById("reservationTime");
            const options = timeSelect.options; // Stores all time options in an array

            // Loops through options array
            for (let i = 0; i < options.length; i++) { 
                const option = options[i]
                
                // Removes (Unavailable) Label if it was already there before
                const originalLabel = option.textContent.replace(" (Unavailable)", "");

                // changes text if the time is found in the database 
                if (bookedTimes.includes(option.value)) {
                    option.disabled = true;
                    option.textContent = originalLabel + " (Unavailable)";
                    option.style.color = "gray";
                } else {
                    option.disabled = false;
                    option.textContent = originalLabel;
                    option.style.color = "black";
                }
            }
        })
        .catch(error => {
            console.error("Failed to fetch booked times: ", error)
        })
})

