// Chal Sathi — shared JS: mobile hamburger nav

const hamburgerBtn = document.getElementById("hamburgerBtn");
const siteNav = document.getElementById("siteNav");

if (hamburgerBtn && siteNav) {

    hamburgerBtn.addEventListener("click", function () {

        siteNav.classList.toggle("mobile-open");

        // swap the bars icon for an X when the menu's open
        const icon = hamburgerBtn.querySelector("i");

        if (siteNav.classList.contains("mobile-open")) {
            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");
        } else {
            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");
        }

    });

}