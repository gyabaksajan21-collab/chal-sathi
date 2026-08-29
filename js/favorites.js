// Chal Sathi - Favorites Page Behaviour

const favoriteCards = document.querySelectorAll(".favorite-card");

// heart icon click = remove that item from favorites
document.querySelectorAll(".favorite-card__heart").forEach((heartButton) => {

    heartButton.addEventListener("click", () => {

        const card = heartButton.closest(".favorite-card");

        if (!card) return;

        const nameElement = card.querySelector("h3");

        if (!nameElement) return;

        const itemName = nameElement.textContent.trim();

        removeFromFavorites(itemName);

        // quick fade-out before removing the card
        card.style.opacity = "0";
        card.style.transform = "scale(0.95)";

        setTimeout(() => {

            card.remove();
            checkEmptyFavorites();

        }, 200);

    });

});

// "order again" - pulls the item's info off the card and adds it to cart
document.querySelectorAll(".btn-order-again").forEach((button) => {

    button.addEventListener("click", () => {

        const card = button.closest(".favorite-card");

        if (!card) return;

        const nameElement = card.querySelector("h3");
        const priceElement = card.querySelector(".favorite-card__price");
        const imageElement = card.querySelector("img");

        if (!nameElement || !priceElement) return;

        const name = nameElement.textContent.trim();

        // strip "Rs." and commas to get a plain number
        const price = parseFloat(
            priceElement.textContent
                .replace("Rs.", "")
                .replace(",", "")
                .trim()
        );

        const image = imageElement
            ? imageElement.getAttribute("src")
            : "";

        addToCart({
            name: name,
            price: price,
            image: image,
            quantity: 1
        });

        // brief visual confirmation on the button itself
        const originalText = button.textContent;

        button.textContent = "Added to Cart ✓";
        button.style.background = "#2f9e44";

        setTimeout(() => {

            button.textContent = originalText;
            button.style.background = "";

        }, 1500);

    });

});

// adds a product to cart, bumping quantity if it's already there
function addToCart(product) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingItem = cart.find(
        item => item.name === product.name
    );

    if (existingItem) {

        existingItem.quantity += 1;

    } else {

        cart.push(product);

    }

    localStorage.setItem("cart", JSON.stringify(cart));

    console.log("Added to cart:", product.name);

}

// pulls an item out of the saved favorites list
function removeFromFavorites(itemName) {

    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    favorites = favorites.filter(
        item => {

            // handles both object entries and plain string entries
            if (typeof item === "object") {
                return item.name !== itemName;
            }

            return item !== itemName;
        }
    );

    localStorage.setItem(
        "favorites",
        JSON.stringify(favorites)
    );

}

// "notify me" for event cards - just a demo, no real backend yet
document.querySelectorAll(".btn-notify").forEach((button) => {

    button.addEventListener("click", () => {

        const card = button.closest(".favorite-card");

        if (!card) return;

        const eventName =
            card.querySelector("h3")?.textContent.trim()
            || "this event";

        button.textContent = "Notification Set ✓";

        button.style.background = "var(--red)";
        button.style.color = "#fff";

        // don't let them spam the button
        button.disabled = true;

        alert(
            `You will be notified about "${eventName}".`
        );

    });

});

// shows a placeholder message once all favorite cards are gone
function checkEmptyFavorites() {

    const remainingCards = document.querySelectorAll(".favorite-card");
    const grid = document.querySelector(".favorites-grid");

    if (!grid) return;

    const oldMessage = document.querySelector(".empty-favorites");

    if (remainingCards.length === 0) {

        // don't add the message twice
        if (oldMessage) return;

        const message = document.createElement("div");

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

// just logs what's saved for now - useful if favorites end up rendered dynamically later
function loadFavorites() {

    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    console.log("Saved favorites:", favorites);

}

loadFavorites();

console.log("Chal Sathi Favorites page loaded.");