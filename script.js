/* ==========================================
   MADHAVI'S PICKLE POT
   Shopping + Cart + WhatsApp
========================================== */


/* WhatsApp number */

const WHATSAPP_NUMBER = "919949577511";


/* Temporary products
   We'll replace these with the real products later.
*/

const products = [

    {
        id: 1,
        name: "Mango Pickle",
        category: "mango",
        emoji: "🥭",
        imageClass: "mango",
        rating: "4.8",
        reviews: "128",
        description: "Traditional spicy mango pickle with authentic homemade flavour.",
        sizes: [
            { size: "250gms", price: 120, oldPrice: 140 },
            { size: "500gms", price: 220, oldPrice: 250 },
            { size: "1kg", price: 400, oldPrice: 450 }
        ],
        offer: "Best Seller"
    },

    {
        id: 2,
        name: "Gongura Pickle",
        category: "gongura",
        emoji: "🌿",
        imageClass: "gongura",
        rating: "4.9",
        reviews: "96",
        description: "Tangy and spicy gongura pickle made in traditional style.",
        sizes: [
            { size: "250gms", price: 130, oldPrice: 150 },
            { size: "500gms", price: 240, oldPrice: 280 },
            { size: "1kg", price: 450, oldPrice: 520 }
        ],
        offer: "Popular"
    },

    {
        id: 3,
        name: "Lemon Pickle",
        category: "lemon",
        emoji: "🍋",
        imageClass: "lemon",
        rating: "4.7",
        reviews: "74",
        description: "Classic tangy lemon pickle with aromatic traditional spices.",
        sizes: [
            { size: "250gms", price: 110, oldPrice: 130 },
            { size: "500gms", price: 200, oldPrice: 230 },
            { size: "1kg", price: 380, oldPrice: 430 }
        ],
        offer: "Fresh"
    },

    {
        id: 4,
        name: "Tomato Pickle",
        category: "tomato",
        emoji: "🍅",
        imageClass: "tomato",
        rating: "4.8",
        reviews: "61",
        description: "Rich homemade tomato pickle with a delicious spicy kick.",
        sizes: [
            { size: "250gms", price: 110, oldPrice: 130 },
            { size: "500gms", price: 200, oldPrice: 230 },
            { size: "1kg", price: 380, oldPrice: 430 }
        ],
        offer: "Homemade"
    },

    {
        id: 5,
        name: "Garlic Pickle",
        category: "special",
        emoji: "🧄",
        imageClass: "garlic",
        rating: "4.9",
        reviews: "48",
        description: "Bold garlic flavour combined with traditional pickle spices.",
        sizes: [
            { size: "250gms", price: 140, oldPrice: 160 },
            { size: "500gms", price: 260, oldPrice: 300 },
            { size: "1kg", price: 490, oldPrice: 550 }
        ],
        offer: "Special"
    },

    {
        id: 6,
        name: "Mixed Pickle",
        category: "special",
        emoji: "🌶️",
        imageClass: "mixed",
        rating: "4.8",
        reviews: "83",
        description: "A delicious blend of traditional pickle flavours in one jar.",
        sizes: [
            { size: "250gms", price: 130, oldPrice: 150 },
            { size: "500gms", price: 240, oldPrice: 280 },
            { size: "1kg", price: 450, oldPrice: 510 }
        ],
        offer: "Customer Favourite"
    }

];


/* Cart */

let cart = [];


/* Current filter */

let currentCategory = "all";


/* DOM */

const productsGrid =
    document.getElementById("productsGrid");

const searchInput =
    document.getElementById("searchInput");

const productCount =
    document.getElementById("productCount");

const noResults =
    document.getElementById("noResults");

const cartPanel =
    document.getElementById("cartPanel");

const cartOverlay =
    document.getElementById("cartOverlay");

const cartItems =
    document.getElementById("cartItems");

const emptyCart =
    document.getElementById("emptyCart");

const cartBottom =
    document.getElementById("cartBottom");

const cartCount =
    document.getElementById("cartCount");

const cartTotal =
    document.getElementById("cartTotal");

const toast =
    document.getElementById("toast");


/* ==========================================
   DISPLAY PRODUCTS
========================================== */

function renderProducts(list = products) {

    productsGrid.innerHTML = "";

    if (list.length === 0) {

        noResults.classList.remove("hidden");

        productCount.textContent = "0 products";

        return;
    }

    noResults.classList.add("hidden");

    productCount.textContent =
        `${list.length} product${list.length === 1 ? "" : "s"}`;


    list.forEach(product => {

        const defaultSize = product.sizes[1];

        const card = document.createElement("article");

        card.className = "product-card";

        card.innerHTML = `

            <div class="product-image ${product.imageClass}">

                <span class="offer-badge">
                    ${product.offer}
                </span>

                <span class="product-emoji">
                    ${product.emoji}
                </span>

            </div>


            <div class="product-info">

                <div class="rating">
                    ★★★★★
                    <span>
                        ${product.rating} (${product.reviews})
                    </span>
                </div>

                <h3>
                    ${product.name}
                </h3>

                <p class="product-description">
                    ${product.description}
                </p>


                <div class="price-row">

                    <strong
                        class="price"
                        id="price-${product.id}"
                    >
                        ₹${defaultSize.price}
                    </strong>

                    <span
                        class="old-price"
                        id="old-price-${product.id}"
                    >
                        ₹${defaultSize.oldPrice}
                    </span>

                    <span class="save">
                        SAVE
                    </span>

                </div>


                <label class="size-label">
                    Choose quantity
                </label>


                <select
                    class="size-select"
                    id="size-${product.id}"
                    onchange="updateProductPrice(${product.id})"
                >

                    ${product.sizes.map((item, index) => `
                        <option
                            value="${item.size}"
                            ${index === 1 ? "selected" : ""}
                        >
                            ${item.size}
                        </option>
                    `).join("")}

                </select>


                <div class="product-actions">

                    <button
                        class="add-cart"
                        onclick="addToCart(${product.id})"
                    >
                        🛒 Add to Cart
                    </button>

                    <button
                        class="buy-now"
                        onclick="buyNow(${product.id})"
                    >
                        Buy Now
                    </button>

                </div>

            </div>

        `;

        productsGrid.appendChild(card);

    });

}


/* ==========================================
   UPDATE PRICE
========================================== */

function updateProductPrice(productId) {

    const product =
        products.find(item => item.id === productId);

    const select =
        document.getElementById(`size-${productId}`);

    const selectedSize =
        product.sizes.find(
            item => item.size === select.value
        );

    document.getElementById(
        `price-${productId}`
    ).textContent =
        `₹${selectedSize.price}`;

    document.getElementById(
        `old-price-${productId}`
    ).textContent =
        `₹${selectedSize.oldPrice}`;
}


/* ==========================================
   SEARCH
========================================== */

function searchProducts() {

    const query =
        searchInput.value
            .trim()
            .toLowerCase();

    filterProducts(query);
}


searchInput.addEventListener(
    "input",
    searchProducts
);


function filterProducts(search = "") {

    const filtered =
        products.filter(product => {

            const matchesCategory =
                currentCategory === "all" ||
                product.category === currentCategory;

            const matchesSearch =
                product.name
                    .toLowerCase()
                    .includes(search);

            return matchesCategory &&
                   matchesSearch;

        });

    renderProducts(filtered);
}


/* ==========================================
   CATEGORIES
========================================== */

document
    .querySelectorAll(".category")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                document
                    .querySelectorAll(".category")
                    .forEach(btn =>
                        btn.classList.remove("active")
                    );

                button.classList.add("active");

                currentCategory =
                    button.dataset.category;

                filterProducts(
                    searchInput.value
                        .trim()
                        .toLowerCase()
                );

            }
        );

    });


/* ==========================================
   ADD TO CART
========================================== */

function addToCart(productId) {

    const product =
        products.find(item => item.id === productId);

    const select =
        document.getElementById(`size-${productId}`);

    const selectedSize =
        product.sizes.find(
            item => item.size === select.value
        );


    const existing =
        cart.find(
            item =>
                item.id === productId &&
                item.size === selectedSize.size
        );


    if (existing) {

        existing.quantity++;

    } else {

        cart.push({

            id: productId,

            name: product.name,

            emoji: product.emoji,

            imageClass: product.imageClass,

            size: selectedSize.size,

            price: selectedSize.price,

            quantity: 1

        });

    }


    updateCart();

    showToast(
        `${product.name} added to cart ❤️`
    );

}


/* ==========================================
   BUY NOW
========================================== */

function buyNow(productId) {

    addToCart(productId);

    openCart();

}


/* ==========================================
   UPDATE CART
========================================== */

function updateCart() {

    const totalItems =
        cart.reduce(
            (total, item) =>
                total + item.quantity,
            0
        );

    cartCount.textContent =
        totalItems;


    if (cart.length === 0) {

        cartItems.innerHTML = "";

        emptyCart.classList.remove("hidden");

        cartBottom.classList.add("hidden");

        return;
    }


    emptyCart.classList.add("hidden");

    cartBottom.classList.remove("hidden");


    cartItems.innerHTML =
        cart.map((item, index) => `

            <div class="cart-item">

                <div
                    class="cart-item-image ${item.imageClass}"
                >
                    ${item.emoji}
                </div>


                <div>

                    <div class="cart-item-name">
                        ${item.name}
                    </div>

                    <div class="cart-item-size">
                        ${item.size}
                    </div>

                    <div class="cart-item-price">
                        ₹${item.price * item.quantity}
                    </div>


                    <div class="cart-quantity">

                        <button
                            onclick="changeQuantity(${index}, -1)"
                        >
                            −
                        </button>

                        <span>
                            ${item.quantity}
                        </span>

                        <button
                            onclick="changeQuantity(${index}, 1)"
                        >
                            +
                        </button>

                    </div>


                    <button
                        class="remove-item"
                        onclick="removeFromCart(${index})"
                    >
                        Remove
                    </button>

                </div>

            </div>

        `).join("");


    const total =
        cart.reduce(
            (sum, item) =>
                sum + item.price * item.quantity,
            0
        );


    cartTotal.textContent =
        `₹${total}`;
}


/* ==========================================
   CHANGE QUANTITY
========================================== */

function changeQuantity(index, amount) {

    cart[index].quantity += amount;

    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);

    }

    updateCart();

}


/* ==========================================
   REMOVE
========================================== */

function removeFromCart(index) {

    cart.splice(index, 1);

    updateCart();

}


/* ==========================================
   OPEN CART
========================================== */

function openCart() {

    cartPanel.classList.add("open");

    cartOverlay.classList.add("open");

    document.body.style.overflow =
        "hidden";

}


/* ==========================================
   CLOSE CART
========================================== */

function closeCart(event) {

    if (
        event &&
        event.target !== cartOverlay
    ) {
        return;
    }

    cartPanel.classList.remove("open");

    cartOverlay.classList.remove("open");

    document.body.style.overflow = "";
}


/* ==========================================
   WHATSAPP CHECKOUT
========================================== */

function checkoutWhatsApp() {

    if (cart.length === 0) {

        showToast(
            "Your cart is empty"
        );

        return;
    }


    let message =
        "Hello Madhavi's Pickle Pot,%0A%0A";

    message +=
        "I would like to order:%0A%0A";


    cart.forEach((item, index) => {

        message +=
            `${index + 1}. ${item.name} - ${item.size} × ${item.quantity} = ₹${item.price * item.quantity}%0A`;

    });


    const total =
        cart.reduce(
            (sum, item) =>
                sum + item.price * item.quantity,
            0
        );


    message +=
        `%0ATotal: ₹${total}`;

    message +=
        "%0A%0APlease confirm my order.%0A%0AThank you.";


    const url =
        `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;


    window.open(
        url,
        "_blank"
    );

}


/* ==========================================
   CLEAR SEARCH
========================================== */

function clearSearch() {

    searchInput.value = "";

    currentCategory = "all";


    document
        .querySelectorAll(".category")
        .forEach(button =>
            button.classList.remove("active")
        );


    document
        .querySelector(
            '.category[data-category="all"]'
        )
        .classList.add("active");


    renderProducts();

}


/* ==========================================
   TOAST
========================================== */

let toastTimer;

function showToast(message) {

    toast.textContent = message;

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer =
        setTimeout(
            () => {
                toast.classList.remove("show");
            },
            2500
        );

}


/* ==========================================
   YEAR
========================================== */

document.getElementById("year").textContent =
    new Date().getFullYear();


/* ==========================================
   INITIAL LOAD
========================================== */

renderProducts();

updateCart();
