// Chal Sathi - Checkout page behaviour

const DELIVERY_FEE = 10;

// form elements
const checkoutForm = document.getElementById("checkout-form");
const fullNameInput = document.getElementById("full-name");
const phoneInput = document.getElementById("phone");
const addressInput = document.getElementById("address");
const deliveryTimeInput = document.getElementById("delivery-time");
const orderPopup = document.getElementById("order-popup");
const popupOk = document.getElementById("popup-ok");

// order summary elements
const summaryList = document.getElementById("summary-list");
const summarySubtotal = document.getElementById("sum-subtotal");
const summaryDelivery = document.getElementById("sum-delivery");
const summaryTotal = document.getElementById("sum-total");

// grab cart from storage (or start empty if nothing saved yet)
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// renders the order summary list + empty state, then totals
function displayOrderSummary() {

    if (!summaryList) return;

    summaryList.innerHTML = "";

    // nothing in the cart - show empty state and bail
    if (cart.length === 0) {

        summaryList.innerHTML = `
            <div class="checkout-empty">
                <h3>Your cart is empty</h3>

                <p>
                    Please add some food from the menu.
                </p>

                <a href="menu.html">
                    Browse Menu
                </a>
            </div>
        `;

        updateTotals();
        return;
    }

    // otherwise render each item in the cart
    cart.forEach((item) => {

        const itemTotal = Number(item.price) * Number(item.quantity);

        const summaryItem = document.createElement("div");

        summaryItem.className = "summary-item";

        summaryItem.innerHTML = `
            <div class="summary-item__info">

                <h4>${item.name}</h4>

                <p>
                    Rs. ${formatPrice(item.price)}
                    × ${item.quantity}
                </p>

            </div>

            <strong>
                Rs. ${formatPrice(itemTotal)}
            </strong>
        `;

        summaryList.appendChild(summaryItem);

    });

    updateTotals();
}

// works out subtotal, delivery fee, discount and total, then updates the DOM
function updateTotals() {

    let subtotal = 0;

    cart.forEach((item) => {
        subtotal += Number(item.price) * Number(item.quantity);
    });

    // no delivery fee if cart's empty
    const deliveryFee = cart.length > 0 ? DELIVERY_FEE : 0;

    // placeholder for now, not wired up to anything yet
    const discount = 0;

    const total = subtotal + deliveryFee - discount;

    if (summarySubtotal) {
        summarySubtotal.textContent = `Rs. ${formatPrice(subtotal)}`;
    }

    if (summaryDelivery) {
        summaryDelivery.textContent = `Rs. ${formatPrice(deliveryFee)}`;
    }

    if (summaryTotal) {
        summaryTotal.textContent = `Rs. ${formatPrice(total)}`;
    }
}

// always show 2 decimal places
function formatPrice(price) {
    return Number(price).toFixed(2);
}

// handle order submission
if (checkoutForm) {

    checkoutForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault(); // no page reload

            // can't order with an empty cart
            if (cart.length === 0) {

                alert(
                    "Your cart is empty. Please add items before placing an order."
                );

                return;
            }

            const fullName = fullNameInput.value.trim();
            const phone = phoneInput.value.trim();
            const address = addressInput.value.trim();
            const deliveryTime = deliveryTimeInput.value;

            // name is required
            if (fullName === "") {

                alert(
                    "Please enter your full name."
                );

                fullNameInput.focus();
                return;
            }

            // phone is required and needs to be 10 digits
            if (phone === "") {

                alert(
                    "Please enter your phone number."
                );

                phoneInput.focus();
                return;
            }

            if (!/^[0-9]{10}$/.test(phone)) {

                alert(
                    "Please enter a valid 10-digit phone number."
                );

                phoneInput.focus();
                return;
            }

            // address is required
            if (address === "") {

                alert(
                    "Please enter your delivery address."
                );

                addressInput.focus();
                return;
            }

            // make sure a payment method is picked
            const selectedPayment = document.querySelector(
                'input[name="payment"]:checked'
            );

            if (!selectedPayment) {

                alert(
                    "Please select a payment method."
                );

                return;
            }

            // recalculate totals at submit time (source of truth for the order)
            let subtotal = 0;

            cart.forEach((item) => {
                subtotal += Number(item.price) * Number(item.quantity);
            });

            const deliveryFee = DELIVERY_FEE;
            const discount = 0;
            const total = subtotal + deliveryFee - discount;

            // build the order object
            const order = {

                customer: {
                    name: fullName,
                    phone: phone,
                    address: address
                },

                deliveryTime: deliveryTime,
                payment: selectedPayment.value,
                items: cart,
                subtotal: subtotal,
                deliveryFee: deliveryFee,
                discount: discount,
                total: total,
                orderDate: new Date().toISOString()
            };

            // just logging for now - no backend yet
            console.log(
                "Chal Sathi Order:",
                order
            );

            // show the "order placed" popup
            if (orderPopup) {
                orderPopup.classList.add("show");
            }

        }
    );
}

// close popup + reset everything once the user confirms
if (popupOk) {

    popupOk.addEventListener(
        "click",
        function () {

            if (orderPopup) {
                orderPopup.classList.remove("show");
            }

            // clear cart now that the order's placed
            localStorage.removeItem("cart");
            cart = [];

            if (checkoutForm) {
                checkoutForm.reset();
            }

            displayOrderSummary();
        }
    );

}

// let clicking outside the popup close it too
if (orderPopup) {

    orderPopup.addEventListener(
        "click",
        function (event) {

            if (event.target === orderPopup) {
                orderPopup.classList.remove("show");
            }

        }
    );

}

// render summary on page load
displayOrderSummary();