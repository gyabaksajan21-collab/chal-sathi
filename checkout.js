// ---------------------------------------------------
// Chal Sathi - Checkout page behaviour
// ---------------------------------------------------

const DELIVERY_FEE = 10;


// ===================================================
// GET ELEMENTS
// ===================================================

const checkoutForm =
    document.getElementById("checkout-form");

const fullNameInput =
    document.getElementById("full-name");

const phoneInput =
    document.getElementById("phone");

const addressInput =
    document.getElementById("address");

const deliveryTimeInput =
    document.getElementById("delivery-time");

const orderPopup =
    document.getElementById("order-popup");

const popupOk =
    document.getElementById("popup-ok");


// ===================================================
// ORDER SUMMARY ELEMENTS
// ===================================================

const summaryList =
    document.getElementById("summary-list");

const summarySubtotal =
    document.getElementById("sum-subtotal");

const summaryDelivery =
    document.getElementById("sum-delivery");

const summaryTotal =
    document.getElementById("sum-total");


// ===================================================
// GET CART FROM LOCAL STORAGE
// ===================================================

let cart =
    JSON.parse(localStorage.getItem("cart")) || [];


// ===================================================
// 1. DISPLAY ORDER ITEMS
// ===================================================

function displayOrderSummary() {

    if (!summaryList) return;


    // Clear old items
    summaryList.innerHTML = "";


    // -----------------------------------------------
    // EMPTY CART
    // -----------------------------------------------

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


    // -----------------------------------------------
    // DISPLAY CART ITEMS
    // -----------------------------------------------

    cart.forEach((item) => {

        const itemTotal =
            Number(item.price) *
            Number(item.quantity);


        const summaryItem =
            document.createElement("div");

        summaryItem.className =
            "summary-item";


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


    // Update amount
    updateTotals();
}


// ===================================================
// 2. CALCULATE TOTALS
// ===================================================

function updateTotals() {

    let subtotal = 0;


    // Calculate subtotal
    cart.forEach((item) => {

        subtotal +=
            Number(item.price) *
            Number(item.quantity);

    });


    // Delivery fee only when cart has items
    const deliveryFee =
        cart.length > 0
            ? DELIVERY_FEE
            : 0;


    // Discount
    const discount = 0;


    // Final total
    const total =
        subtotal +
        deliveryFee -
        discount;


    // -----------------------------------------------
    // UPDATE HTML
    // -----------------------------------------------

    if (summarySubtotal) {

        summarySubtotal.textContent =
            `Rs. ${formatPrice(subtotal)}`;

    }


    if (summaryDelivery) {

        summaryDelivery.textContent =
            `Rs. ${formatPrice(deliveryFee)}`;

    }


    if (summaryTotal) {

        summaryTotal.textContent =
            `Rs. ${formatPrice(total)}`;

    }
}


// ===================================================
// 3. FORMAT PRICE
// ===================================================

function formatPrice(price) {

    return Number(price).toFixed(2);

}


// ===================================================
// 4. PLACE ORDER
// ===================================================

if (checkoutForm) {

    checkoutForm.addEventListener(
        "submit",
        function (event) {

            // Stop page refresh
            event.preventDefault();


            // ---------------------------------------
            // CHECK CART
            // ---------------------------------------

            if (cart.length === 0) {

                alert(
                    "Your cart is empty. Please add items before placing an order."
                );

                return;
            }


            // ---------------------------------------
            // GET FORM VALUES
            // ---------------------------------------

            const fullName =
                fullNameInput.value.trim();

            const phone =
                phoneInput.value.trim();

            const address =
                addressInput.value.trim();

            const deliveryTime =
                deliveryTimeInput.value;


            // ---------------------------------------
            // VALIDATE NAME
            // ---------------------------------------

            if (fullName === "") {

                alert(
                    "Please enter your full name."
                );

                fullNameInput.focus();

                return;
            }


            // ---------------------------------------
            // VALIDATE PHONE
            // ---------------------------------------

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


            // ---------------------------------------
            // VALIDATE ADDRESS
            // ---------------------------------------

            if (address === "") {

                alert(
                    "Please enter your delivery address."
                );

                addressInput.focus();

                return;
            }


            // ---------------------------------------
            // PAYMENT METHOD
            // ---------------------------------------

            const selectedPayment =
                document.querySelector(
                    'input[name="payment"]:checked'
                );


            if (!selectedPayment) {

                alert(
                    "Please select a payment method."
                );

                return;
            }


            // ---------------------------------------
            // CALCULATE FINAL TOTAL
            // ---------------------------------------

            let subtotal = 0;


            cart.forEach((item) => {

                subtotal +=
                    Number(item.price) *
                    Number(item.quantity);

            });


            const deliveryFee =
                DELIVERY_FEE;

            const discount = 0;

            const total =
                subtotal +
                deliveryFee -
                discount;


            // ---------------------------------------
            // ORDER INFORMATION
            // ---------------------------------------

            const order = {

                customer: {
                    name: fullName,
                    phone: phone,
                    address: address
                },

                deliveryTime:
                    deliveryTime,

                payment:
                    selectedPayment.value,

                items:
                    cart,

                subtotal:
                    subtotal,

                deliveryFee:
                    deliveryFee,

                discount:
                    discount,

                total:
                    total,

                orderDate:
                    new Date().toISOString()
            };


            // Show in console for testing
            console.log(
                "Chal Sathi Order:",
                order
            );


            // ---------------------------------------
            // SHOW SUCCESS POPUP
            // ---------------------------------------

            if (orderPopup) {

                orderPopup.classList.add("show");

            }

        }
    );
}


// ===================================================
// 5. CLOSE POPUP
// ===================================================

if (popupOk) {

    popupOk.addEventListener(
        "click",
        function () {

            // Close popup
            if (orderPopup) {

                orderPopup.classList.remove("show");

            }


            // ---------------------------------------
            // CLEAR CART AFTER ORDER
            // ---------------------------------------

            localStorage.removeItem("cart");

            cart = [];


            // Reset form
            if (checkoutForm) {

                checkoutForm.reset();

            }


            // Reset summary
            displayOrderSummary();

        }
    );

}


// ===================================================
// 6. CLOSE POPUP BY CLICKING OUTSIDE
// ===================================================

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


// ===================================================
// 7. INITIAL LOAD
// ===================================================

displayOrderSummary();