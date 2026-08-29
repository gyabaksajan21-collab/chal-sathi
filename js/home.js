// Chal Sathi - Home page behaviour

// scroll smoothly to features section instead of jumping
const exploreButton = document.querySelector(".btn-explore");

if (exploreButton) {

    exploreButton.addEventListener("click", (event) => {

        event.preventDefault();

        const featuresSection = document.querySelector(".features");

        if (featuresSection) {

            featuresSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    });

}

// highlight the selected feature card, unhighlight the rest
const featureCards = document.querySelectorAll(".feature-card");

featureCards.forEach((card) => {

    card.addEventListener("click", () => {

        featureCards.forEach((item) => {
            item.classList.remove("active");
        });

        card.classList.add("active");

    });

});

// let keyboard users "click" cards with Enter/Space too
featureCards.forEach((card) => {

    card.setAttribute("tabindex", "0");

    card.addEventListener("keydown", (event) => {

        if (event.key === "Enter" || event.key === " ") {

            event.preventDefault();
            card.click();

        }

    });

});

// trigger the hero's entrance animation via CSS class
const heroContent = document.querySelector(".hero__content");

if (heroContent) {

    heroContent.classList.add("hero-loaded");

}

// close the mobile menu after tapping a nav link, if one's open
const navLinks = document.querySelectorAll("nav a");

navLinks.forEach((link) => {

    link.addEventListener("click", () => {

        const mobileMenu = document.querySelector(".mobile-menu");

        if (mobileMenu) {
            mobileMenu.classList.remove("open");
        }

    });

});

document.addEventListener("DOMContentLoaded", () => {

    console.log("Chal Sathi Home page loaded successfully.");

});