// Chal Sathi - Menu page behaviour

const categoryButtons = document.querySelectorAll(".cat-btn");
const menuItems = document.querySelectorAll(".menu-item");
const emptyState = document.getElementById("empty-state");

const sectionTitle = document.getElementById("section-title");
const sectionSubtitle = document.getElementById("section-subtitle");

// nepali is the default category shown on load
let currentCategory = "nepali";

// shows/hides menu items based on the current category
function filterMenu() {

    let visibleItems = 0;

    menuItems.forEach((item) => {

        const itemCategory = item.dataset.category.toLowerCase();

        const matchesCategory = itemCategory === currentCategory;

        if (matchesCategory) {

            item.style.display = "";
            visibleItems++;

        } else {

            item.style.display = "none";
        }
    });

    // show a message if the category has nothing in it
    if (visibleItems === 0) {

        emptyState.hidden = false;

    } else {

        emptyState.hidden = true;
    }
}

// switch category on button click
categoryButtons.forEach((button) => {

    button.addEventListener("click", () => {

        categoryButtons.forEach((btn) => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        currentCategory = button.dataset.category.toLowerCase();

        filterMenu();
    });
});

// add-to-cart buttons on each menu item
const addCartButtons = document.querySelectorAll(".btn-add-cart");

addCartButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const menuItem = button.closest(".menu-item");

        const name = menuItem.dataset.name;
        const price = parseFloat(button.dataset.price);

        const cartItem = {
            name: name,
            price: price,
            quantity: 1
        };

        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        const existingItem = cart.find(item => item.name === name);

        if (existingItem) {

            existingItem.quantity++;

        } else {

            cart.push(cartItem);
        }

        localStorage.setItem(
            "cart",
            JSON.stringify(cart)
        );

        // quick visual confirmation on the button
        const originalText = button.textContent;

        button.textContent = "Added ✓";
        button.classList.add("added");

        setTimeout(() => {

            button.textContent = originalText;
            button.classList.remove("added");

        }, 1200);
    });
});

// show the default category on page load
filterMenu();