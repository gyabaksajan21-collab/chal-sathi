// ---------------------------------------------------
// Chal Sathi - Home page behaviour
// ---------------------------------------------------


// ===================================================
// 1. EXPLORE BUTTON
// ===================================================

const exploreButton = document.querySelector(".btn-explore");

if (exploreButton) {

    exploreButton.addEventListener("click", (event) => {

        event.preventDefault();

        // Find the feature section
        const featuresSection = document.querySelector(".features");

        if (featuresSection) {

            featuresSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    });

}


// ===================================================
// 2. FEATURE CARD INTERACTION
// ===================================================

const featureCards = document.querySelectorAll(".feature-card");

featureCards.forEach((card) => {

    card.addEventListener("click", () => {

        // Remove active state from all cards
        featureCards.forEach((item) => {
            item.classList.remove("active");
        });

        // Add active state to selected card
        card.classList.add("active");

    });

});


// ===================================================
// 3. FEATURE CARD KEYBOARD ACCESSIBILITY
// ===================================================

featureCards.forEach((card) => {

    // Make cards keyboard accessible
    card.setAttribute("tabindex", "0");

    card.addEventListener("keydown", (event) => {

        if (event.key === "Enter" || event.key === " ") {

            event.preventDefault();

            card.click();

        }

    });

});


// ===================================================
// 4. HERO ANIMATION
// ===================================================

const heroContent = document.querySelector(".hero__content");

if (heroContent) {

    heroContent.classList.add("hero-loaded");

}


// ===================================================
// 5. OPTIONAL NAVIGATION
// ===================================================

// If your page has navigation links, this allows
// normal navigation without interfering with them.

const navLinks = document.querySelectorAll("nav a");

navLinks.forEach((link) => {

    link.addEventListener("click", () => {

        // Close mobile menu if one exists
        const mobileMenu = document.querySelector(".mobile-menu");

        if (mobileMenu) {
            mobileMenu.classList.remove("open");
        }

    });

});


// ===================================================
// 6. PAGE LOADED
// ===================================================

document.addEventListener("DOMContentLoaded", () => {

    console.log("Chal Sathi Home page loaded successfully.");

});