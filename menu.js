// ---------------------------------------------------
// Chal Sathi - Menu page behaviour
// ---------------------------------------------------

// Get elements
const categoryButtons = document.querySelectorAll(".cat-btn");
const menuItems = document.querySelectorAll(".menu-item");
const emptyState = document.getElementById("empty-state");

const sectionTitle = document.getElementById("section-title");
const sectionSubtitle = document.getElementById("section-subtitle");


// Current selected category
let currentCategory = "nepali";

// Current search text
let searchText = "";

// ===================================================
// 3. FILTER MENU
// ===================================================

function filterMenu() {

    let visibleItems = 0;

    menuItems.forEach((item) => {

        const itemCategory =
            item.dataset.category.toLowerCase();

        const itemName =
            item.dataset.name.toLowerCase();

        // Check category
        const matchesCategory =
            itemCategory === currentCategory;

        // Check search
        const matchesSearch =
            itemName.includes(searchText);

        // Show item if both match
        if (matchesCategory && matchesSearch) {

            item.style.display = "";

            visibleItems++;

        } else {

            item.style.display = "none";
        }
    });


    // =================================================
    // 4. EMPTY STATE
    // =================================================

    if (visibleItems === 0) {

        emptyState.hidden = false;

    } else {

        emptyState.hidden = true;
    }
}


// ===================================================
// 5. ADD TO CART
// ===================================================

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


// ===================================================
// 6. INITIAL MENU LOAD
// ===================================================

filterMenu();