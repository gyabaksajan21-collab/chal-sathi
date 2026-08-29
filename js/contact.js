// Chal Sathi - Contact Page Behaviour

const contactForm = document.getElementById("contact-form");

const nameInput = document.getElementById("c-name");
const emailInput = document.getElementById("c-email");
const messageInput = document.getElementById("c-message");

contactForm.addEventListener("submit", (event) => {

    event.preventDefault(); // no page reload

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    // catch the case where everything's empty first
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

    // make sure the email actually looks like an email
    if (!isValidEmail(email)) {

        alert("Please enter a valid email address.");
        emailInput.focus();
        return;
    }

    // don't accept super short/low-effort messages
    if (message.length < 10) {

        alert("Please enter a message with at least 10 characters.");
        messageInput.focus();
        return;
    }

    // all good - let them know it went through
    alert(
        `Thank you, ${name}!\n\n` +
        `Your message has been sent successfully.\n\n` +
        `We will contact you at:\n${email}`
    );

    contactForm.reset();

});

// simple email format check
function isValidEmail(email) {

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailPattern.test(email);

}

// clear any error styling as soon as the user starts fixing the field
nameInput.addEventListener("input", () => {
    nameInput.style.borderColor = "";
});

emailInput.addEventListener("input", () => {
    emailInput.style.borderColor = "";
});

messageInput.addEventListener("input", () => {
    messageInput.style.borderColor = "";
});

console.log("Chal Sathi Contact page loaded.");