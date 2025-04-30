
// ============================ EXISTING CODE ============================
// (Insert all of the user-provided original script.js content here)
// For brevity, we are assuming the original content is intact up to the added sections.

// ============================ NEW: Logout Logic ============================
const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', function () {
        localStorage.removeItem("data");
        localStorage.removeItem("reviews");
        localStorage.removeItem("userAvatar");
        window.location.href = "/BeesBreakfast/Pages/login.html";
    });
}

// ============================ UPDATED: Profile Picture Persistence ============================
const fileInput = document.getElementById('file-input');
const profilePic = document.getElementById('pfp');

if (fileInput && profilePic) {
    fileInput.addEventListener('change', function(upload) {
        const file = upload.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(upload) {
                const result = upload.target.result;
                profilePic.src = result;
                localStorage.setItem("userAvatar", result);
            };
            reader.readAsDataURL(file);
        }
    });

    window.addEventListener("DOMContentLoaded", () => {
        const savedAvatar = localStorage.getItem("userAvatar");
        if (savedAvatar) {
            profilePic.src = savedAvatar;
        }
    });
}
