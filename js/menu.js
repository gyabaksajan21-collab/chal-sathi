// ---------------------------------------------------
// Chal Sathi - Menu page behaviour
// ---------------------------------------------------

// Get elements
const categoryButtons = document.querySelectorAll(".cat-btn");
const menuItems = document.querySelectorAll(".menu-item");
const emptyState = document.getElementById("empty-state");

const sectionTitle = document.getElementById("section-title");
const sectionSubtitle = document.getElementById("section-subtitle");


// ---------------------------------------------------
// Current selected category
// ---------------------------------------------------

let currentCategory = "nepali";


// ---------------------------------------------------
// FILTER MENU
// ---------------------------------------------------

function filterMenu() {

    let visibleItems = 0;

    menuItems.forEach((item) => {

        const itemCategory =
            item.dataset.category.toLowerCase();

        // Check category
        const matchesCategory =
            itemCategory === currentCategory;

        // Show item if category matches
        if (matchesCategory) {

            item.style.display = "";

            visibleItems++;

        } else {

            item.style.display = "none";
        }
    });


    // ---------------------------------------------------
    // EMPTY STATE
    // ---------------------------------------------------

    if (visibleItems === 0) {

        emptyState.hidden = false;

    } else {

        emptyState.hidden = true;
    }
}


// ---------------------------------------------------
// CATEGORY BUTTONS
// ---------------------------------------------------

categoryButtons.forEach((button) => {

    button.addEventListener("click", () => {

        // Remove active class from all buttons
        categoryButtons.forEach((btn) => {
            btn.classList.remove("active");
        });

        // Add active class to clicked button
        button.classList.add("active");

        // Get selected category
        currentCategory =
            button.dataset.category.toLowerCase();

        // Filter menu
        filterMenu();
    });
});


// ---------------------------------------------------
// ADD TO CART
// ---------------------------------------------------

const addCartButtons =
    document.querySelectorAll(".btn-add-cart");

addCartButtons.forEach((button) => {

    button.addEventListener("click", () => {

        // Find the menu item containing the button
        const menuItem =
            button.closest(".menu-item");

        // Get item information
        const name =
            menuItem.dataset.name;

        const price =
            parseFloat(button.dataset.price);

        // Create cart item
        const cartItem = {
            name: name,
            price: price,
            quantity: 1
        };

        // Get existing cart
        let cart =
            JSON.parse(localStorage.getItem("cart")) || [];

        // Check whether item already exists
        const existingItem =
            cart.find(item => item.name === name);

        if (existingItem) {

            // Increase quantity
            existingItem.quantity++;

        } else {

            // Add new item
            cart.push(cartItem);
        }

        // Save cart
        localStorage.setItem(
            "cart",
            JSON.stringify(cart)
        );

        // Change button temporarily
        const originalText =
            button.textContent;

        button.textContent = "Added ✓";

        button.classList.add("added");

        setTimeout(() => {

            button.textContent = originalText;

            button.classList.remove("added");

        }, 1200);
    });
});


// ---------------------------------------------------
// INITIAL MENU LOAD
// ---------------------------------------------------

filterMenu();