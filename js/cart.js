// ---------------------------------------------------
// Chal Sathi - Cart page behaviour
// ---------------------------------------------------

const cartContainer = document.querySelector(".cart-container");
const summarySubtotal = document.querySelector(".summary-row:nth-child(1) span:last-child");
const summaryTotal = document.querySelector(".summary-row--total span:last-child");

const DELIVERY_FEE = 10;


// ===================================================
// 1. GET CART FROM LOCAL STORAGE
// ===================================================

let cart = JSON.parse(localStorage.getItem("cart")) || [];


// ===================================================
// 2. DISPLAY CART
// ===================================================

function displayCart() {
    // Find the area where cart items are displayed
    const cartItemsContainer =
        document.querySelector(".cart-items");
    if (!cartItemsContainer) return;
    // Clear existing items
    cartItemsContainer.innerHTML = "";
    // Check if cart is empty
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

    // Create each cart item
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


    // Add quantity button events
    addQuantityEvents();

    // Update summary
    updateSummary();
}


// ===================================================
// 3. QUANTITY BUTTONS
// ===================================================

function addQuantityEvents() {

    const minusButtons =
        document.querySelectorAll(".quantity-minus");

    const plusButtons =
        document.querySelectorAll(".quantity-plus");


    // Minus
    minusButtons.forEach((button) => {

        button.addEventListener("click", () => {

            const index =
                Number(button.dataset.index);

            if (cart[index].quantity > 1) {

                cart[index].quantity--;

            } else {

                // Remove item when quantity reaches zero
                cart.splice(index, 1);
            }


            saveCart();

            displayCart();
        });
    });


    // Plus
    plusButtons.forEach((button) => {

        button.addEventListener("click", () => {

            const index =
                Number(button.dataset.index);

            cart[index].quantity++;

            saveCart();

            displayCart();
        });
    });
}


// ===================================================
// 4. UPDATE ORDER SUMMARY
// ===================================================

function updateSummary() {

    let subtotal = 0;


    // Calculate subtotal
    cart.forEach((item) => {

        subtotal +=
            Number(item.price) *
            Number(item.quantity);

    });


    // Delivery fee
    const deliveryFee =
        cart.length > 0 ? DELIVERY_FEE : 0;


    // Total
    const total =
        subtotal + deliveryFee;


    // Update subtotal
    if (summarySubtotal) {

        summarySubtotal.textContent =
            `Rs. ${formatPrice(subtotal)}`;
    }


    // Update delivery fee
    const deliveryElement =
        document.querySelector(
            ".summary-row:nth-child(2) span:last-child"
        );

    if (deliveryElement) {

        deliveryElement.textContent =
            `Rs. ${formatPrice(deliveryFee)}`;
    }


    // Update total
    if (summaryTotal) {

        summaryTotal.textContent =
            `Rs. ${formatPrice(total)}`;
    }
}


// ===================================================
// 5. SAVE CART
// ===================================================

function saveCart() {

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );
}


// ===================================================
// 6. FORMAT PRICE
// ===================================================

function formatPrice(price) {

    return Number(price).toFixed(2);
}


// ===================================================
// 7. GET IMAGE
// ===================================================

function getImage(name) {

    const images = {

        "Thakali Thali Set":
            "../img/Thakali Thali Set.jpg",

        "C-Momo":
            "../img/C-momo.jpg",

        "Chicken Thukpa":
            "../img/Chicken Thukpa.jpg",

        "Buff Choila":
            "../img/Buff-Choila.jpg",

        "Non-Veg Ramen":
            "../img/Non-Veg Ramen.jpg",

        "Mango Juice":
            "../img/Mango Juice.jpg"
    };


    return images[name] || "img/default.jpg";
}


// ===================================================
// 8. GET DESCRIPTION
// ===================================================

function getDescription(name) {

    const descriptions = {

        "Thakali Thali Set":
            "Traditional Nepali platter",

        "C-Momo":
            "Spicy and tangy chicken dumplings",

        "Chicken Thukpa":
            "Warm Himalayan noodle soup",

        "Buff Choila":
            "Smoked buffalo meat with authentic spices",

        "Non-Veg Ramen":
            "Hand-pulled noodles in rich broth",

        "Mango Juice":
            "Fresh and refreshing mango juice"
    };


    return descriptions[name] || "";
}




// ===================================================
// 9. INITIAL LOAD
// ===================================================

displayCart();