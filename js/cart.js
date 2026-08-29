// Chal Sathi - Cart page behaviour

const cartContainer = document.querySelector(".cart-container");
const summarySubtotal = document.querySelector(".summary-row:nth-child(1) span:last-child");
const summaryTotal = document.querySelector(".summary-row--total span:last-child");

const DELIVERY_FEE = 10;

// grab cart from storage (or start empty if nothing saved yet)
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// renders all cart items + empty state, then refreshes the summary
function displayCart() {
    const cartItemsContainer = document.querySelector(".cart-items");
    if (!cartItemsContainer) return;

    cartItemsContainer.innerHTML = "";

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <h3>Your cart is empty</h3>
                <p>Add some delicious food from the menu.</p>

                <a href="menu.html">
                    Browse Menu
                </a>
            </div>
        `;

        updateSummary();
        return;
    }

    cart.forEach((item, index) => {
        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";

        cartItem.innerHTML = `
            <div class="cart-item__image">
                <img
                    src="${getImage(item.name)}"
                    alt="${item.name}"
                >
            </div>

            <div class="cart-item__info">
                <h3>${item.name}</h3>
                <p>${getDescription(item.name)}</p>
                <strong>Rs. ${formatPrice(item.price)}</strong>
            </div>

            <div class="cart-item__quantity">

                <button
                    type="button"
                    class="quantity-minus"
                    data-index="${index}"
                >
                    −
                </button>

                <span>${item.quantity}</span>

                <button
                    type="button"
                    class="quantity-plus"
                    data-index="${index}"
                >
                    +
                </button>

            </div>
        `;

        cartItemsContainer.appendChild(cartItem);
    });

    addQuantityEvents();
    updateSummary();
}

// wires up the +/- buttons after each render (since they get recreated every time)
function addQuantityEvents() {

    const minusButtons = document.querySelectorAll(".quantity-minus");
    const plusButtons = document.querySelectorAll(".quantity-plus");

    minusButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const index = Number(button.dataset.index);

            if (cart[index].quantity > 1) {
                cart[index].quantity--;
            } else {
                // hit zero, so just remove it from the cart
                cart.splice(index, 1);
            }

            saveCart();
            displayCart();
        });
    });

    plusButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const index = Number(button.dataset.index);
            cart[index].quantity++;

            saveCart();
            displayCart();
        });
    });
}

// recalculates subtotal, delivery fee and total, then updates the DOM
function updateSummary() {

    let subtotal = 0;

    cart.forEach((item) => {
        subtotal += Number(item.price) * Number(item.quantity);
    });

    // no delivery fee if the cart's empty
    const deliveryFee = cart.length > 0 ? DELIVERY_FEE : 0;

    const total = subtotal + deliveryFee;

    if (summarySubtotal) {
        summarySubtotal.textContent = `Rs. ${formatPrice(subtotal)}`;
    }

    const deliveryElement = document.querySelector(
        ".summary-row:nth-child(2) span:last-child"
    );

    if (deliveryElement) {
        deliveryElement.textContent = `Rs. ${formatPrice(deliveryFee)}`;
    }

    if (summaryTotal) {
        summaryTotal.textContent = `Rs. ${formatPrice(total)}`;
    }
}

// persist cart to localStorage
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// always show 2 decimal places
function formatPrice(price) {
    return Number(price).toFixed(2);
}

// image lookup by item name, falls back to a default if missing
function getImage(name) {

    const images = {
        "Thakali Thali Set": "../img/Thakali Thali Set.jpg",
        "C-Momo": "../img/C-momo.jpg",
        "Chicken Thukpa": "../img/Chicken Thukpa.jpg",
        "Buff Choila": "../img/Buff-Choila.jpg",
        "Non-Veg Ramen": "../img/Non-Veg Ramen.jpg",
        "Mango Juice": "../img/Mango Juice.jpg"
    };

    return images[name] || "img/default.jpg";
}

// short description lookup by item name
function getDescription(name) {

    const descriptions = {
        "Thakali Thali Set": "Traditional Nepali platter",
        "C-Momo": "Spicy and tangy chicken dumplings",
        "Chicken Thukpa": "Warm Himalayan noodle soup",
        "Buff Choila": "Smoked buffalo meat with authentic spices",
        "Non-Veg Ramen": "Hand-pulled noodles in rich broth",
        "Mango Juice": "Fresh and refreshing mango juice"
    };

    return descriptions[name] || "";
}

// render on page load
displayCart();