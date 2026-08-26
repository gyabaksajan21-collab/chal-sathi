// ==========================================
// CHAL SATHI - SIGN UP JAVASCRIPT
// ==========================================


// ==========================================
// PASSWORD SHOW / HIDE
// ==========================================

const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("toggle-password");
const eyeIcon = document.getElementById("eye-icon");

togglePassword.addEventListener("click", function () {

    if (passwordInput.type === "password") {

        passwordInput.type = "text";

        eyeIcon.classList.remove("fa-eye");
        eyeIcon.classList.add("fa-eye-slash");

    } else {

        passwordInput.type = "password";

        eyeIcon.classList.remove("fa-eye-slash");
        eyeIcon.classList.add("fa-eye");

    }

});


// ==========================================
// CONFIRM PASSWORD SHOW / HIDE
// ==========================================

const confirmPasswordInput =
    document.getElementById("confirm-password");

const toggleConfirmPassword =
    document.getElementById("toggle-confirm-password");

const confirmEyeIcon =
    document.getElementById("confirm-eye-icon");


toggleConfirmPassword.addEventListener("click", function () {

    if (confirmPasswordInput.type === "password") {

        confirmPasswordInput.type = "text";

        confirmEyeIcon.classList.remove("fa-eye");
        confirmEyeIcon.classList.add("fa-eye-slash");

    } else {

        confirmPasswordInput.type = "password";

        confirmEyeIcon.classList.remove("fa-eye-slash");
        confirmEyeIcon.classList.add("fa-eye");

    }

});


// ==========================================
// SIGN UP FORM
// ==========================================

const signupForm =
    document.getElementById("signup-form");

const errorMsg =
    document.getElementById("error-msg");


signupForm.addEventListener("submit", function (event) {

    // Prevent page refresh
    event.preventDefault();


    // Get values
    const fullname =
        document.getElementById("fullname").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const password =
        document.getElementById("password").value;

    const confirmPassword =
        document.getElementById("confirm-password").value;


    // Clear previous error
    errorMsg.textContent = "";
    errorMsg.hidden = true;


    // ==========================================
    // FULL NAME VALIDATION
    // ==========================================

    if (fullname === "") {

        errorMsg.textContent =
            "Please enter your full name.";

        errorMsg.hidden = false;

        return;
    }


    // ==========================================
    // EMAIL VALIDATION
    // ==========================================

    if (email === "") {

        errorMsg.textContent =
            "Please enter your email.";

        errorMsg.hidden = false;

        return;
    }


    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (!emailPattern.test(email)) {

        errorMsg.textContent =
            "Please enter a valid email address.";

        errorMsg.hidden = false;

        return;
    }


    // ==========================================
    // PASSWORD VALIDATION
    // ==========================================

    if (password === "") {

        errorMsg.textContent =
            "Please enter a password.";

        errorMsg.hidden = false;

        return;
    }


    if (password.length < 6) {

        errorMsg.textContent =
            "Password must be at least 6 characters.";

        errorMsg.hidden = false;

        return;
    }


    // ==========================================
    // CONFIRM PASSWORD
    // ==========================================

    if (confirmPassword === "") {

        errorMsg.textContent =
            "Please confirm your password.";

        errorMsg.hidden = false;

        return;
    }


    if (password !== confirmPassword) {

        errorMsg.textContent =
            "Passwords do not match.";

        errorMsg.hidden = false;

        return;
    }


    // ==========================================
    // SUCCESS
    // ==========================================

    alert("Account created successfully!");

    window.location.href = "home.html";

});