// Chal Sathi - Login page behaviour

const form = document.getElementById("login-form");
const emailInput = document.getElementById("email");
const passInput = document.getElementById("password");
const toggleBtn = document.getElementById("toggle-password");
const eyeIcon = document.getElementById("eye-icon");
const errorMsg = document.getElementById("error-msg");

// toggle password visibility on eye icon click
toggleBtn.addEventListener("click", () => {

    const isPassword = passInput.type === "password";

    passInput.type = isPassword ? "text" : "password";

    // swap the Font Awesome icon to match
    eyeIcon.classList.toggle("fa-eye-slash", !isPassword);
    eyeIcon.classList.toggle("fa-eye", isPassword);

    toggleBtn.setAttribute(
        "aria-label",
        isPassword ? "Hide password" : "Show password"
    );
});

// form validation on submit
form.addEventListener("submit", (event) => {

    event.preventDefault(); // no page reload

    const email = emailInput.value.trim();
    const password = passInput.value;

    // catch the case where both fields are empty first
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

    // make sure the email actually looks like an email
    if (!isValidEmail(email)) {
        showError("Please enter a valid email address.");
        emailInput.focus();
        return;
    }

    // basic minimum length check
    if (password.length < 6) {
        showError("Password must be at least 6 characters.");
        passInput.focus();
        return;
    }

    // everything checks out
    hideError();

    alert(
        `Welcome back!\n\nEmail: ${email}\n\nDemo login successful.`
    );

    // redirect after login if needed:
    // window.location.href = "home.html";
});

// simple email format check
function isValidEmail(email) {

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailPattern.test(email);
}

function showError(message) {

    errorMsg.textContent = message;
    errorMsg.hidden = false;
}

function hideError() {

    errorMsg.textContent = "";
    errorMsg.hidden = true;
}

// clear any error as soon as the user starts typing again
emailInput.addEventListener("input", () => {
    hideError();
});

passInput.addEventListener("input", () => {
    hideError();
});