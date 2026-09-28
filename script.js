/* =========================================================
   Madhavi's Pickle Pot — script.js
   Single source of truth for product data, rendering, search,
   category filtering, cart state and WhatsApp checkout.
   ========================================================= */

(function () {
  "use strict";

  /* ---------------------------------------------------------
     1. PRODUCT DATA
     Edit this array to change products, descriptions, ratings
     or prices. See README.md for details.
  --------------------------------------------------------- */
  const PRODUCTS = [
    {
      id: 1,
      name: "Mango Pickle",
      category: "mango",
      icon: "\uD83E\uDD6D",
      description: "Raw mangoes hand-cut and slow-cooked in a spiced sesame oil masala, tangy and full of homemade flavour.",
      rating: 4.8,
      reviews: 128,
      sizes: [
        { name: "250gms", price: 120, oldPrice: 140 },
        { name: "500gms", price: 220, oldPrice: 250 },
        { name: "1kg", price: 400, oldPrice: 450 }
      ]
    },
    {
      id: 2,
      name: "Gongura Pickle",
      category: "gongura",
      icon: "\uD83C\uDF3F",
      description: "Sun-ripened gongura leaves simmered with garlic and red chillies for a tart, earthy Andhra classic.",
      rating: 4.7,
      reviews: 96,
      sizes: [
        { name: "250gms", price: 130, oldPrice: 150 },
        { name: "500gms", price: 240, oldPrice: 270 },
        { name: "1kg", price: 450, oldPrice: 500 }
      ]
    },
    {
      id: 3,
      name: "Lemon Pickle",
      category: "lemon",
      icon: "\uD83C\uDF4B",
      description: "Juicy lemons pickled with mustard and fenugreek, balancing sharp citrus with warm homely spice.",
      rating: 4.6,
      reviews: 84,
      sizes: [
        { name: "250gms", price: 110, oldPrice: 130 },
        { name: "500gms", price: 200, oldPrice: 230 },
        { name: "1kg", price: 380, oldPrice: 420 }
      ]
    },
    {
      id: 4,
      name: "Tomato Pickle",
      category: "tomato",
      icon: "\uD83C\uDF45",
      description: "Ripe tomatoes cooked down with jaggery and chilli for a sweet-tangy pickle that pairs with everything.",
      rating: 4.5,
      reviews: 70,
      sizes: [
        { name: "250gms", price: 110, oldPrice: 130 },
        { name: "500gms", price: 200, oldPrice: 230 },
        { name: "1kg", price: 380, oldPrice: 420 }
      ]
    },
    {
      id: 5,
      name: "Garlic Pickle",
      category: "special",
      icon: "\uD83E\uDDC4",
      description: "Whole garlic cloves slow-roasted in a fiery red chilli masala, bold and deeply aromatic.",
      rating: 4.9,
      reviews: 142,
      sizes: [
        { name: "250gms", price: 140, oldPrice: 160 },
        { name: "500gms", price: 260, oldPrice: 290 },
        { name: "1kg", price: 490, oldPrice: 540 }
      ]
    },
    {
      id: 6,
      name: "Mixed Pickle",
      category: "special",
      icon: "\uD83E\uDD57",
      description: "A spiced medley of seasonal vegetables pickled together for a little bit of everything in every jar.",
      rating: 4.7,
      reviews: 110,
      sizes: [
        { name: "250gms", price: 130, oldPrice: 150 },
        { name: "500gms", price: 240, oldPrice: 270 },
        { name: "1kg", price: 450, oldPrice: 500 }
      ]
    }
  ];

  const WHATSAPP_NUMBER = "919949577511";
  const BUSINESS_NAME = "Madhavi's Pickle Pot";

  /* ---------------------------------------------------------
     2. STATE
  --------------------------------------------------------- */
  const state = {
    searchTerm: "",
    activeCategory: "all",
    selectedSize: {},   // productId -> size index currently selected on its card
    cart: []            // { productId, sizeIndex, quantity }
  };

  PRODUCTS.forEach(function (p) { state.selectedSize[p.id] = 0; });

  /* ---------------------------------------------------------
     3. DOM REFERENCES
  --------------------------------------------------------- */
  const el = {
    searchInput: document.getElementById("searchInput"),
    searchButton: document.getElementById("searchButton"),
    productCount: document.getElementById("productCount"),
    productsGrid: document.getElementById("productsGrid"),
    noResults: document.getElementById("noResults"),
    clearSearchButton: document.getElementById("clearSearchButton"),
    categoryButtons: document.querySelectorAll(".category"),

    cartButton: document.getElementById("cartButton"),
    cartCount: document.getElementById("cartCount"),
    cartOverlay: document.getElementById("cartOverlay"),
    cartPanel: document.getElementById("cartPanel"),
    closeCart: document.getElementById("closeCart"),
    cartItems: document.getElementById("cartItems"),
    emptyCart: document.getElementById("emptyCart"),
    continueShopping: document.getElementById("continueShopping"),
    cartBottom: document.getElementById("cartBottom"),
    cartTotal: document.getElementById("cartTotal"),
    checkoutButton: document.getElementById("checkoutButton"),

    toast: document.getElementById("toast"),
    year: document.getElementById("year")
  };

  /* ---------------------------------------------------------
     4. HELPERS
  --------------------------------------------------------- */
  function formatRupees(amount) {
    return "\u20B9" + Math.round(amount).toLocaleString("en-IN");
  }

  function findProduct(id) {
    return PRODUCTS.find(function (p) { return p.id === id; });
  }

  function starString(rating) {
    var full = Math.round(rating);
    return "\u2605".repeat(full) + "\u2606".repeat(5 - full);
  }

  let toastTimer = null;
  function showToast(message) {
    el.toast.textContent = message;
    el.toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      el.toast.classList.remove("show");
    }, 2200);
  }

  /* ---------------------------------------------------------
     5. PRODUCT RENDERING
  --------------------------------------------------------- */
  function matchesSearch(product, term) {
    if (!term) return true;
    var haystack = (product.name + " " + product.description + " " + product.category).toLowerCase();
    return haystack.indexOf(term) !== -1;
  }

  function getFilteredProducts() {
    var term = state.searchTerm.trim().toLowerCase();
    return PRODUCTS.filter(function (product) {
      var categoryMatch = state.activeCategory === "all" || product.category === state.activeCategory;
      return categoryMatch && matchesSearch(product, term);
    });
  }

  function renderProductCard(product) {
    var sizeIndex = state.selectedSize[product.id] || 0;
    var size = product.sizes[sizeIndex];
    var savings = size.oldPrice ? size.oldPrice - size.price : 0;
    var discountPct = size.oldPrice ? Math.round((savings / size.oldPrice) * 100) : 0;

    var sizeButtons = product.sizes.map(function (s, i) {
      return '<button type="button" class="size-option' + (i === sizeIndex ? " active" : "") +
        '" data-id="' + product.id + '" data-size-index="' + i + '">' + s.name + "</button>";
    }).join("");

    var card = document.createElement("article");
    card.className = "product-card";
    card.dataset.id = product.id;

    card.innerHTML =
      '<div class="product-image">' +
        (discountPct > 0 ? '<span class="offer-badge">' + discountPct + '% OFF</span>' : "") +
        '<span class="product-icon" aria-hidden="true">' + product.icon + '</span>' +
      '</div>' +
      '<div class="product-info">' +
        '<h3 class="product-name">' + product.name + '</h3>' +
        '<p class="product-description">' + product.description + '</p>' +
        '<div class="product-rating">' +
          '<span class="stars" aria-hidden="true">' + starString(product.rating) + '</span>' +
          '<span class="rating-value">' + product.rating.toFixed(1) + '</span>' +
          '<span class="review-count">(' + product.reviews + ' reviews)</span>' +
        '</div>' +
        '<div class="size-selector" role="group" aria-label="Choose a size">' + sizeButtons + '</div>' +
        '<div class="price-row">' +
          '<span class="price">' + formatRupees(size.price) + '</span>' +
          (size.oldPrice ? '<span class="old-price">' + formatRupees(size.oldPrice) + '</span>' : "") +
          (savings > 0 ? '<span class="savings">Save ' + formatRupees(savings) + '</span>' : "") +
        '</div>' +
      '</div>' +
      '<div class="product-actions">' +
        '<button type="button" class="add-cart" data-id="' + product.id + '">Add to Cart</button>' +
        '<button type="button" class="buy-now" data-id="' + product.id + '">Buy Now</button>' +
      '</div>';

    return card;
  }

  function renderProducts() {
    var list = getFilteredProducts();

    el.productsGrid.innerHTML = "";
    list.forEach(function (product) {
      el.productsGrid.appendChild(renderProductCard(product));
    });

    el.productCount.textContent = list.length + (list.length === 1 ? " product" : " products");

    var showEmpty = list.length === 0;
    el.noResults.hidden = !showEmpty;
    el.productsGrid.hidden = showEmpty;
  }

  function filterProducts() {
    renderProducts();
  }

  /* ---------------------------------------------------------
     6. SIZE SELECTION (on product cards)
  --------------------------------------------------------- */
  function handleSizeSelect(id, sizeIndex) {
    state.selectedSize[id] = sizeIndex;
    renderProducts();
  }

  /* ---------------------------------------------------------
     7. CART
  --------------------------------------------------------- */
  function findCartLine(productId, sizeIndex) {
    return state.cart.find(function (line) {
      return line.productId === productId && line.sizeIndex === sizeIndex;
    });
  }

  function addToCart(productId, sizeIndex, quantity) {
    quantity = quantity || 1;
    var existing = findCartLine(productId, sizeIndex);
    if (existing) {
      existing.quantity += quantity;
    } else {
      state.cart.push({ productId: productId, sizeIndex: sizeIndex, quantity: quantity });
    }
    updateCart();

    var product = findProduct(productId);
    showToast(product.name + " added to cart");
  }

  function changeQuantity(productId, sizeIndex, delta) {
    var line = findCartLine(productId, sizeIndex);
    if (!line) return;
    line.quantity += delta;
    if (line.quantity <= 0) {
      removeFromCart(productId, sizeIndex);
      return;
    }
    updateCart();
  }

  function removeFromCart(productId, sizeIndex) {
    state.cart = state.cart.filter(function (line) {
      return !(line.productId === productId && line.sizeIndex === sizeIndex);
    });
    updateCart();
  }

  function cartTotalCount() {
    return state.cart.reduce(function (sum, line) { return sum + line.quantity; }, 0);
  }

  function cartTotalPrice() {
    return state.cart.reduce(function (sum, line) {
      var product = findProduct(line.productId);
      var size = product.sizes[line.sizeIndex];
      return sum + size.price * line.quantity;
    }, 0);
  }

  function renderCartLine(line) {
    var product = findProduct(line.productId);
    var size = product.sizes[line.sizeIndex];
    var lineTotal = size.price * line.quantity;

    var row = document.createElement("div");
    row.className = "cart-item";
    row.innerHTML =
      '<span class="cart-item-icon" aria-hidden="true">' + product.icon + '</span>' +
      '<div class="cart-item-details">' +
        '<span class="cart-item-name">' + product.name + '</span>' +
        '<span class="cart-item-size">' + size.name + '</span>' +
        '<div class="cart-item-qty">' +
          '<button type="button" class="qty-decrease" data-id="' + line.productId + '" data-size-index="' + line.sizeIndex + '" aria-label="Decrease quantity">&minus;</button>' +
          '<span class="qty-value">' + line.quantity + '</span>' +
          '<button type="button" class="qty-increase" data-id="' + line.productId + '" data-size-index="' + line.sizeIndex + '" aria-label="Increase quantity">+</button>' +
        '</div>' +
      '</div>' +
      '<div class="cart-item-end">' +
        '<span class="cart-item-price">' + formatRupees(lineTotal) + '</span>' +
        '<button type="button" class="cart-item-remove" data-id="' + line.productId + '" data-size-index="' + line.sizeIndex + '" aria-label="Remove ' + product.name + '">Remove</button>' +
      '</div>';
    return row;
  }

  function updateCart() {
    var count = cartTotalCount();
    el.cartCount.textContent = count;
    el.cartButton.setAttribute("aria-label", "Open cart, " + count + " item" + (count === 1 ? "" : "s"));

    el.cartItems.innerHTML = "";
    state.cart.forEach(function (line) {
      el.cartItems.appendChild(renderCartLine(line));
    });

    var isEmpty = state.cart.length === 0;
    el.emptyCart.hidden = !isEmpty;
    el.cartItems.hidden = isEmpty;
    el.cartBottom.hidden = isEmpty;

    el.cartTotal.textContent = formatRupees(cartTotalPrice());
  }

  /* ---------------------------------------------------------
     8. CART DRAWER OPEN / CLOSE
  --------------------------------------------------------- */
  function openCart() {
    el.cartOverlay.classList.add("open");
    el.cartPanel.classList.add("open");
    el.cartPanel.setAttribute("aria-hidden", "false");
    document.body.classList.add("cart-open");
  }

  function closeCartPanel() {
    el.cartOverlay.classList.remove("open");
    el.cartPanel.classList.remove("open");
    el.cartPanel.setAttribute("aria-hidden", "true");
    document.body.classList.remove("cart-open");
  }

  /* ---------------------------------------------------------
     9. WHATSAPP CHECKOUT
  --------------------------------------------------------- */
  function buildWhatsAppMessage() {
    var lines = ["Hello " + BUSINESS_NAME + ",", "", "I would like to order:", ""];

    state.cart.forEach(function (line, index) {
      var product = findProduct(line.productId);
      var size = product.sizes[line.sizeIndex];
      var lineTotal = size.price * line.quantity;
      lines.push(
        (index + 1) + ". " + product.name + " - " + size.name + " x " + line.quantity +
        " = " + formatRupees(lineTotal)
      );
    });

    lines.push("");
    lines.push("Total: " + formatRupees(cartTotalPrice()));
    lines.push("");
    lines.push("Please confirm my order.");
    lines.push("");
    lines.push("Thank you.");

    return lines.join("\n");
  }

  function checkoutWhatsApp() {
    if (state.cart.length === 0) return;
    var message = buildWhatsAppMessage();
    var url = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message);
    window.open(url, "_blank", "noopener");
  }

  /* ---------------------------------------------------------
     10. EVENT LISTENERS
  --------------------------------------------------------- */

  // Search
  el.searchInput.addEventListener("input", function (e) {
    state.searchTerm = e.target.value;
    filterProducts();
  });
  el.searchButton.addEventListener("click", function () {
    state.searchTerm = el.searchInput.value;
    filterProducts();
  });
  el.clearSearchButton.addEventListener("click", function () {
    state.searchTerm = "";
    state.activeCategory = "all";
    el.searchInput.value = "";
    el.categoryButtons.forEach(function (btn) {
      btn.classList.toggle("active", btn.dataset.category === "all");
    });
    filterProducts();
  });

  // Category filter
  el.categoryButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      state.activeCategory = btn.dataset.category;
      el.categoryButtons.forEach(function (b) { b.classList.toggle("active", b === btn); });
      filterProducts();
    });
  });

  // Product grid: size select / add to cart / buy now (event delegation)
  el.productsGrid.addEventListener("click", function (e) {
    var sizeBtn = e.target.closest(".size-option");
    if (sizeBtn) {
      handleSizeSelect(Number(sizeBtn.dataset.id), Number(sizeBtn.dataset.sizeIndex));
      return;
    }

    var addBtn = e.target.closest(".add-cart");
    if (addBtn) {
      var id = Number(addBtn.dataset.id);
      addToCart(id, state.selectedSize[id] || 0, 1);
      return;
    }

    var buyBtn = e.target.closest(".buy-now");
    if (buyBtn) {
      var pid = Number(buyBtn.dataset.id);
      addToCart(pid, state.selectedSize[pid] || 0, 1);
      openCart();
      return;
    }
  });

  // Cart items: quantity / remove (event delegation)
  el.cartItems.addEventListener("click", function (e) {
    var dec = e.target.closest(".qty-decrease");
    if (dec) {
      changeQuantity(Number(dec.dataset.id), Number(dec.dataset.sizeIndex), -1);
      return;
    }
    var inc = e.target.closest(".qty-increase");
    if (inc) {
      changeQuantity(Number(inc.dataset.id), Number(inc.dataset.sizeIndex), 1);
      return;
    }
    var rem = e.target.closest(".cart-item-remove");
    if (rem) {
      removeFromCart(Number(rem.dataset.id), Number(rem.dataset.sizeIndex));
      return;
    }
  });

  // Cart open / close
  el.cartButton.addEventListener("click", openCart);
  el.closeCart.addEventListener("click", closeCartPanel);
  el.cartOverlay.addEventListener("click", closeCartPanel);
  el.continueShopping.addEventListener("click", closeCartPanel);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && el.cartPanel.classList.contains("open")) {
      closeCartPanel();
    }
  });

  // Checkout
  el.checkoutButton.addEventListener("click", checkoutWhatsApp);

  /* ---------------------------------------------------------
     11. INIT
  --------------------------------------------------------- */
  el.year.textContent = new Date().getFullYear();
  renderProducts();
  updateCart();

})();
