// ---------------------------------------------------
// Chal Sathi - Favorites Page Behaviour
// ---------------------------------------------------

// ===================================================
// 1. GET ALL FAVORITE CARDS
// ===================================================

const favoriteCards = document.querySelectorAll(".favorite-card");


// ===================================================
// 2. REMOVE ITEM FROM FAVORITES
// ===================================================

document.querySelectorAll(".favorite-card__heart").forEach((heartButton) => {

    heartButton.addEventListener("click", () => {

        // Find the card containing this heart button
        const card = heartButton.closest(".favorite-card");

        if (!card) return;

        // Get item name
        const nameElement = card.querySelector("h3");

        if (!nameElement) return;

        const itemName = nameElement.textContent.trim();

        // Remove from localStorage favorites
        removeFromFavorites(itemName);

        // Add a small animation
        card.style.opacity = "0";
        card.style.transform = "scale(0.95)";

        setTimeout(() => {

            card.remove();

            checkEmptyFavorites();

        }, 200);

    });

});


// ===================================================
// 3. ORDER AGAIN
// ===================================================

document.querySelectorAll(".btn-order-again").forEach((button) => {

    button.addEventListener("click", () => {

        const card = button.closest(".favorite-card");

        if (!card) return;

        // Get product information
        const nameElement = card.querySelector("h3");
        const priceElement = card.querySelector(".favorite-card__price");
        const imageElement = card.querySelector("img");

        if (!nameElement || !priceElement) return;

        const name = nameElement.textContent.trim();

        // Convert "Rs. 250" into number
        const price = parseFloat(
            priceElement.textContent
                .replace("Rs.", "")
                .replace(",", "")
                .trim()
        );

        const image = imageElement
            ? imageElement.getAttribute("src")
            : "";

        // Add product to cart
        addToCart({
            name: name,
            price: price,
            image: image,
            quantity: 1
        });

        // Change button temporarily
        const originalText = button.textContent;

        button.textContent = "Added to Cart ✓";
        button.style.background = "#2f9e44";

        setTimeout(() => {

            button.textContent = originalText;
            button.style.background = "";

        }, 1500);

    });

});


// ===================================================
// 4. ADD ITEM TO CART
// ===================================================

function addToCart(product) {

    // Get existing cart
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check whether item already exists
    const existingItem = cart.find(
        item => item.name === product.name
    );

    if (existingItem) {

        // Increase quantity
        existingItem.quantity += 1;

    } else {

        // Add new item
        cart.push(product);

    }

    // Save cart
    localStorage.setItem("cart", JSON.stringify(cart));

    console.log("Added to cart:", product.name);

}


// ===================================================
// 5. REMOVE ITEM FROM FAVORITES
// ===================================================

function removeFromFavorites(itemName) {

    let favorites =
        JSON.parse(localStorage.getItem("favorites")) || [];

    // Remove matching item
    favorites = favorites.filter(
        item => {

            // If favorites contains objects
            if (typeof item === "object") {
                return item.name !== itemName;
            }

            // If favorites contains simple strings
            return item !== itemName;
        }
    );

    // Save updated favorites
    localStorage.setItem(
        "favorites",
        JSON.stringify(favorites)
    );

}


// ===================================================
// 6. NOTIFY ME BUTTON
// ===================================================

document.querySelectorAll(".btn-notify").forEach((button) => {

    button.addEventListener("click", () => {

        const card = button.closest(".favorite-card");

        if (!card) return;

        const eventName =
            card.querySelector("h3")?.textContent.trim()
            || "this event";

        // Change button
        button.textContent = "Notification Set ✓";

        button.style.background = "var(--red)";
        button.style.color = "#fff";

        // Prevent clicking multiple times
        button.disabled = true;

        // Demo notification
        alert(
            `You will be notified about "${eventName}".`
        );

    });

});


// ===================================================
// 7. CHECK IF FAVORITES ARE EMPTY
// ===================================================

function checkEmptyFavorites() {

    const remainingCards =
        document.querySelectorAll(".favorite-card");

    const grid =
        document.querySelector(".favorites-grid");

    if (!grid) return;

    // Remove old empty message
    const oldMessage =
        document.querySelector(".empty-favorites");

    if (remainingCards.length === 0) {

        // Don't create duplicate message
        if (oldMessage) return;

        const message =
            document.createElement("div");

        message.className = "empty-favorites";

        message.innerHTML = `
            <h3>No Favorites Yet</h3>
            <p>
                You haven't added any dishes or events
                to your favorites.
            </p>
            <a href="menu.html">
                Browse Menu
            </a>
        `;

        grid.appendChild(message);

    }

}


// ===================================================
// 8. LOAD FAVORITES
// ===================================================

// This function can be used if your favorites
// are stored dynamically in localStorage.

function loadFavorites() {

    const favorites =
        JSON.parse(localStorage.getItem("favorites")) || [];

    console.log("Saved favorites:", favorites);

}


// ===================================================
// 9. START
// ===================================================

loadFavorites();

console.log("Chal Sathi Favorites page loaded.");