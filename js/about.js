// ---------------------------------------------------
// Chal Sathi - About Page Behaviour
// ---------------------------------------------------


// ===================================================
// 1. OUR JOURNEY BUTTON
// ===================================================

const journeyButton = document.querySelector(".btn-journey");


// Find the pillar cards
const pillarCards = document.querySelectorAll(".pillar-card");


if (journeyButton) {

    journeyButton.addEventListener("click", (event) => {

        // Prevent "#" from jumping to the top
        event.preventDefault();

        // Scroll to the first pillar section
        if (pillarCards.length > 0) {

            pillarCards[0].scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

        }

    });

}


// ===================================================
// 2. PILLAR CARD HOVER EFFECT
// ===================================================

pillarCards.forEach((card) => {

    card.addEventListener("mouseenter", () => {

        card.style.transform = "translateY(-5px)";

    });


    card.addEventListener("mouseleave", () => {

        card.style.transform = "";

    });

});


// ===================================================
// 3. REVEAL PILLAR CARDS WHEN SCROLLING
// ===================================================

if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("pillar-visible");

                    // Stop observing once visible
                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.2
        }
    );


    pillarCards.forEach((card) => {

        card.classList.add("pillar-hidden");

        observer.observe(card);

    });

}


// ===================================================
// 4. CONSOLE MESSAGE
// ===================================================

console.log("Chal Sathi About page loaded.");