// ---------------------------------------------------
// Chal Sathi - Login page behaviour
// ---------------------------------------------------

// Get form elements
const form = document.getElementById("login-form");
const emailInput = document.getElementById("email");
const passInput = document.getElementById("password");
const toggleBtn = document.getElementById("toggle-password");
const eyeIcon = document.getElementById("eye-icon");
const errorMsg = document.getElementById("error-msg");


// ===================================================
// 1. SHOW / HIDE PASSWORD
// ===================================================

toggleBtn.addEventListener("click", () => {

    // Check whether password is currently hidden
    const isPassword = passInput.type === "password";

    // Change input type
    passInput.type = isPassword ? "text" : "password";

    // Change Font Awesome icon
    eyeIcon.classList.toggle("fa-eye-slash", !isPassword);
    eyeIcon.classList.toggle("fa-eye", isPassword);

    // Change accessibility label
    toggleBtn.setAttribute(
        "aria-label",
        isPassword ? "Hide password" : "Show password"
    );
});


// ===================================================
// 2. FORM VALIDATION
// ===================================================

form.addEventListener("submit", (event) => {

    // Prevent page reload
    event.preventDefault();

    const email = emailInput.value.trim();
    const password = passInput.value;


    // -----------------------------------------------
    // Check empty fields
    // -----------------------------------------------

    if (email === "" && password === "") {
        showError("Please enter your email and password.");
        emailInput.focus();
        return;
    }

    if (email === "") {
        showError("Please enter your email.");
        emailInput.focus();
        return;
    }

    if (password === "") {
        showError("Please enter your password.");
        passInput.focus();
        return;
    }


    // -----------------------------------------------
    // Check email format
    // -----------------------------------------------

    if (!isValidEmail(email)) {
        showError("Please enter a valid email address.");
        emailInput.focus();
        return;
    }


    // -----------------------------------------------
    // Check password length
    // -----------------------------------------------

    if (password.length < 6) {
        showError("Password must be at least 6 characters.");
        passInput.focus();
        return;
    }


    // -----------------------------------------------
    // Everything is valid
    // -----------------------------------------------

    hideError();

    alert(
        `Welcome back!\n\nEmail: ${email}\n\nDemo login successful.`
    );

    // If you want to redirect after login:
    // window.location.href = "home.html";
});


// ===================================================
// 3. EMAIL VALIDATION
// ===================================================

function isValidEmail(email) {

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailPattern.test(email);
}


// ===================================================
// 4. SHOW ERROR
// ===================================================

function showError(message) {

    errorMsg.textContent = message;
    errorMsg.hidden = false;
}


// ===================================================
// 5. HIDE ERROR
// ===================================================

function hideError() {

    errorMsg.textContent = "";
    errorMsg.hidden = true;
}


// ===================================================
// 6. REMOVE ERROR WHEN USER STARTS TYPING
// ===================================================

emailInput.addEventListener("input", () => {
    hideError();
});

passInput.addEventListener("input", () => {
    hideError();
});