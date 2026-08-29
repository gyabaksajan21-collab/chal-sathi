// Chal Sathi - About Page Behaviour

// "Our Journey" button - scrolls down to the pillars instead of jumping via #
const journeyButton = document.querySelector(".btn-journey");
const pillarCards = document.querySelectorAll(".pillar-card");

if (journeyButton) {
    journeyButton.addEventListener("click", (event) => {
        event.preventDefault(); // stop the # from jumping to top

        if (pillarCards.length > 0) {
            pillarCards[0].scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
        }
    });
}

// Little lift effect on hover for the pillar cards
pillarCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
        card.style.transform = "translateY(-5px)";
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = "";
    });
});

// Fade/slide the pillar cards in as they scroll into view
if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("pillar-visible");
                    observer.unobserve(entry.target); // only need to do this once per card
                }
            });
        },
        { threshold: 0.2 }
    );

    pillarCards.forEach((card) => {
        card.classList.add("pillar-hidden");
        observer.observe(card);
    });
}

console.log("Chal Sathi About page loaded.");