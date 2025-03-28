function submitReservation() {
    const reservation = {
        reservationId: document.getElementById("reservationId").value,
        userId: document.getElementById("userId").value,
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

