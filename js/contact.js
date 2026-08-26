// ---------------------------------------------------
// Chal Sathi - Contact Page Behaviour
// ---------------------------------------------------

// Get form elements
const contactForm = document.getElementById("contact-form");

const nameInput = document.getElementById("c-name");
const emailInput = document.getElementById("c-email");
const messageInput = document.getElementById("c-message");


// ===================================================
// 1. FORM SUBMISSION
// ===================================================

contactForm.addEventListener("submit", (event) => {

    // Prevent page reload
    event.preventDefault();

    // Get values
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();


    // ===================================================
    // 2. CHECK EMPTY FIELDS
    // ===================================================

    if (name === "" && email === "" && message === "") {

        alert("Please fill in all fields.");

        nameInput.focus();

        return;
    }


    if (name === "") {

        alert("Please enter your name.");

        nameInput.focus();

        return;
    }


    if (email === "") {

        alert("Please enter your email.");

        emailInput.focus();

        return;
    }


    if (message === "") {

        alert("Please enter your message.");

        messageInput.focus();

        return;
    }


    // ===================================================
    // 3. CHECK EMAIL FORMAT
    // ===================================================

    if (!isValidEmail(email)) {

        alert("Please enter a valid email address.");

        emailInput.focus();

        return;
    }


    // ===================================================
    // 4. CHECK MESSAGE LENGTH
    // ===================================================

    if (message.length < 10) {

        alert("Please enter a message with at least 10 characters.");

        messageInput.focus();

        return;
    }


    // ===================================================
    // 5. SUCCESS
    // ===================================================

    alert(
        `Thank you, ${name}!\n\n` +
        `Your message has been sent successfully.\n\n` +
        `We will contact you at:\n${email}`
    );


    // ===================================================
    // 6. CLEAR FORM
    // ===================================================

    contactForm.reset();

});


// ===================================================
// 7. EMAIL VALIDATION
// ===================================================

function isValidEmail(email) {

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailPattern.test(email);

}


// ===================================================
// 8. REMOVE ERROR / VALIDATION FEEDBACK
//    WHEN USER STARTS TYPING
// ===================================================

nameInput.addEventListener("input", () => {

    nameInput.style.borderColor = "";

});


emailInput.addEventListener("input", () => {

    emailInput.style.borderColor = "";

});


messageInput.addEventListener("input", () => {

    messageInput.style.borderColor = "";

});


// ===================================================
// 9. CONSOLE MESSAGE
// ===================================================

console.log("Chal Sathi Contact page loaded.");