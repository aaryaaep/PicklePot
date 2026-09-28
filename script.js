* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

:root {
    --brown: #6f3517;
    --dark-brown: #35180a;
    --orange: #d87920;
    --gold: #f0a928;

    --cream: #fff8e9;
    --cream-dark: #f7ead2;

    --white: #ffffff;

    --text: #302019;
    --muted: #75645a;

    --green: #20a447;

    --border: #eadfce;

    --shadow:
        0 8px 30px rgba(67, 36, 15, 0.08);
}


/* ================= GENERAL ================= */

html {
    scroll-behavior: smooth;
}

body {
    font-family:
        Arial,
        Helvetica,
        sans-serif;

    background: #fffdf9;

    color: var(--text);

    line-height: 1.5;
}

button,
input,
select {
    font: inherit;
}

button {
    cursor: pointer;
}

a {
    color: inherit;
}

.hidden {
    display: none !important;
}


/* ================= HEADER ================= */

.header {
    position: sticky;

    top: 0;

    z-index: 1000;

    background: white;

    box-shadow:
        0 2px 15px rgba(0, 0, 0, 0.06);
}


.top-header {
    width: min(1250px, 94%);

    min-height: 82px;

    margin: auto;

    display: flex;

    align-items: center;

    gap: 28px;
}


/* BRAND */

.brand {
    min-width: 235px;

    display: flex;

    align-items: center;

    gap: 11px;

    text-decoration: none;
}

.brand img {
    width: 55px;
    height: 55px;

    object-fit: cover;

    border-radius: 50%;
}

.brand-text strong {
    display: block;

    color: var(--dark-brown);

    font-family: Georgia, serif;

    font-size: 1.1rem;
}

.brand-text small {
    display: block;

    color: var(--orange);

    font-size: 0.7rem;

    margin-top: 2px;
}


/* SEARCH */

.search-box {
    flex: 1;

    height: 46px;

    display: flex;

    overflow: hidden;

    background: #f7f4ef;

    border: 1px solid #e7dfd3;

    border-radius: 25px;
}

.search-box input {
    width: 100%;

    border: none;

    outline: none;

    background: transparent;

    padding: 0 18px;

    color: var(--text);
}

.search-box button {
    width: 55px;

    border: none;

    background: var(--orange);

    color: white;

    font-size: 1rem;
}


/* CART BUTTON */

.cart-button {
    border: none;

    background: transparent;

    display: flex;

    align-items: center;

    gap: 8px;

    color: var(--dark-brown);

    font-weight: bold;
}

.cart-button b {
    min-width: 22px;
    height: 22px;

    display: grid;

    place-items: center;

    background: var(--orange);

    color: white;

    border-radius: 50%;

    font-size: 0.72rem;
}


/* CATEGORY BAR */

.category-bar {
    display: flex;

    justify-content: center;

    gap: 8px;

    padding: 8px 3%;

    overflow-x: auto;

    scrollbar-width: none;

    border-top: 1px solid #f0ebe3;
}

.category-bar::-webkit-scrollbar {
    display: none;
}

.category {
    border: none;

    background: transparent;

    color: #62554c;

    padding: 8px 16px;

    border-radius: 20px;

    white-space: nowrap;

    font-size: 0.9rem;
}

.category:hover {
    background: var(--cream);

    color: var(--brown);
}

.category.active {
    background: var(--brown);

    color: white;
}


/* ================= HERO ================= */

.hero {
    background:
        radial-gradient(
            circle at 80% 20%,
            rgba(240, 169, 40, 0.3),
            transparent 30%
        ),
        linear-gradient(
            135deg,
            #fff7e4,
            #f9e0ad
        );
}

.hero-content {
    width: min(1250px, 92%);

    min-height: 470px;

    margin: auto;

    display: grid;

    grid-template-columns: 1.2fr 0.8fr;

    align-items: center;

    gap: 50px;
}

.hero-text {
    max-width: 650px;
}

.hero-label {
    display: inline-block;

    color: var(--orange);

    font-weight: bold;

    font-size: 0.85rem;

    margin-bottom: 15px;
}

.hero h1 {
    font-family: Georgia, serif;

    font-size:
        clamp(
            3rem,
            6vw,
            5.2rem
        );

    line-height: 0.98;

    color: var(--dark-brown);

    margin-bottom: 20px;
}

.hero h1 span {
    color: var(--orange);
}

.hero p {
    max-width: 580px;

    color: var(--muted);

    font-size: 1.08rem;

    line-height: 1.7;

    margin-bottom: 28px;
}

.shop-button {
    display: inline-block;

    background: var(--brown);

    color: white;

    padding: 14px 24px;

    border-radius: 9px;

    text-decoration: none;

    font-weight: bold;

    box-shadow:
        0 8px 20px rgba(
            111,
            53,
            23,
            0.2
        );
}

.shop-button:hover {
    background: var(--dark-brown);
}

.hero-logo {
    display: flex;

    justify-content: center;
}

.hero-logo img {
    width: min(330px, 85%);

    border-radius: 50%;

    filter:
        drop-shadow(
            0 25px 25px
            rgba(70, 30, 5, 0.18)
        );
}


/* ================= TRUST ================= */

.trust-strip {
    width: min(1150px, 92%);

    margin: -28px auto 0;

    position: relative;

    z-index: 2;

    background: white;

    border: 1px solid var(--border);

    border-radius: 16px;

    box-shadow: var(--shadow);

    display: grid;

    grid-template-columns:
        repeat(4, 1fr);

    padding: 20px;
}

.trust-item {
    display: grid;

    grid-template-columns:
        40px 1fr;

    column-gap: 10px;

    align-items: center;

    padding: 0 20px;

    border-right:
        1px solid var(--border);
}

.trust-item:last-child {
    border-right: none;
}

.trust-item > span {
    grid-row: span 2;

    font-size: 1.7rem;
}

.trust-item strong {
    font-size: 0.9rem;
}

.trust-item small {
    color: var(--muted);
}


/* ================= PRODUCTS ================= */

.products-section {
    width: min(1250px, 92%);

    margin: auto;

    padding: 90px 0;
}

.section-heading {
    display: flex;

    align-items: end;

    justify-content: space-between;

    margin-bottom: 30px;
}

.section-label {
    color: var(--orange);

    text-transform: uppercase;

    letter-spacing: 1.5px;

    font-size: 0.75rem;

    font-weight: bold;
}

.section-heading h2,
.about-text h2,
.contact-content h2 {
    font-family: Georgia, serif;

    color: var(--dark-brown);

    font-size:
        clamp(
            2rem,
            4vw,
            3rem
        );

    line-height: 1.1;

    margin: 7px 0;
}

.section-heading p {
    color: var(--muted);
}

.product-count {
    color: var(--muted);

    font-size: 0.85rem;
}


/* PRODUCT GRID */

.products-grid {
    display: grid;

    grid-template-columns:
        repeat(4, 1fr);

    gap: 20px;
}


/* PRODUCT CARD */

.product-card {
    background: white;

    border: 1px solid var(--border);

    border-radius: 15px;

    overflow: hidden;

    transition:
        transform 0.25s ease,
        box-shadow 0.25s ease;
}

.product-card:hover {
    transform: translateY(-5px);

    box-shadow: var(--shadow);
}


/* PRODUCT IMAGE */

.product-image {
    height: 225px;

    position: relative;

    display: flex;

    align-items: center;

    justify-content: center;

    overflow: hidden;
}

.product-image.mango {
    background:
        linear-gradient(
            135deg,
            #ffe88a,
            #e9a92e
        );
}

.product-image.gongura {
    background:
        linear-gradient(
            135deg,
            #c9d993,
            #829c47
        );
}

.product-image.lemon {
    background:
        linear-gradient(
            135deg,
            #fff2a1,
            #e6cb36
        );
}

.product-image.tomato {
    background:
        linear-gradient(
            135deg,
            #f29a70,
            #d84a2d
        );
}

.product-image.garlic {
    background:
        linear-gradient(
            135deg,
            #eee4cf,
            #c8b28b
        );
}

.product-image.mixed {
    background:
        linear-gradient(
            135deg,
            #e7b56e,
            #a45b26
        );
}

.product-emoji {
    font-size: 6rem;

    filter:
        drop-shadow(
            0 12px 10px
            rgba(0, 0, 0, 0.13)
        );
}

.offer-badge {
    position: absolute;

    top: 12px;
    left: 12px;

    background: var(--orange);

    color: white;

    padding: 5px 9px;

    border-radius: 5px;

    font-size: 0.7rem;

    font-weight: bold;
}


/* PRODUCT INFORMATION */

.product-info {
    padding: 18px;
}

.rating {
    color: #d78a00;

    font-size: 0.8rem;

    margin-bottom: 7px;
}

.rating span {
    color: #756a61;

    margin-left: 4px;
}

.product-info h3 {
    color: var(--dark-brown);

    font-family: Georgia, serif;

    font-size: 1.25rem;

    margin-bottom: 6px;
}

.product-description {
    color: var(--muted);

    font-size: 0.82rem;

    min-height: 40px;

    line-height: 1.5;

    margin-bottom: 12px;
}


/* PRICE */

.price-row {
    display: flex;

    align-items: center;

    flex-wrap: wrap;

    gap: 8px;

    margin-bottom: 12px;
}

.price {
    color: var(--dark-brown);

    font-size: 1.25rem;

    font-weight: bold;
}

.old-price {
    color: #9a9088;

    text-decoration: line-through;

    font-size: 0.82rem;
}

.save {
    color: var(--green);

    font-size: 0.75rem;

    font-weight: bold;
}


/* SIZE */

.size-label {
    display: block;

    color: var(--muted);

    font-size: 0.75rem;

    margin-bottom: 5px;
}

.size-select {
    width: 100%;

    border: 1px solid var(--border);

    border-radius: 7px;

    padding: 9px;

    background: white;

    color: var(--text);

    outline: none;

    margin-bottom: 10px;
}


/* PRODUCT BUTTONS */

.product-actions {
    display: grid;

    grid-template-columns:
        1fr 1fr;

    gap: 7px;
}

.add-cart,
.buy-now {
    border-radius: 7px;

    padding: 10px;

    font-size: 0.8rem;

    font-weight: bold;
}

.add-cart {
    border: 1px solid var(--brown);

    background: white;

    color: var(--brown);
}

.add-cart:hover {
    background: var(--cream);
}

.buy-now {
    border: none;

    background: var(--brown);

    color: white;
}

.buy-now:hover {
    background: var(--dark-brown);
}


/* NO RESULTS */

.no-results {
    text-align: center;

    padding: 70px 20px;
}

.no-results-icon {
    font-size: 4rem;
}

.no-results h3 {
    margin: 10px;
}

.no-results p {
    color: var(--muted);
}

.no-results button {
    margin-top: 15px;

    border: none;

    background: var(--brown);

    color: white;

    padding: 11px 20px;

    border-radius: 7px;
}


/* ================= ABOUT ================= */

.about-section {
    background: var(--cream);

    padding: 90px 0;
}

.about-content {
    width: min(1050px, 92%);

    margin: auto;

    display: grid;

    grid-template-columns:
        0.8fr 1.2fr;

    align-items: center;

    gap: 70px;
}

.about-image {
    display: flex;

    justify-content: center;
}

.about-image img {
    width: min(300px, 80%);

    border-radius: 50%;
}

.about-text p {
    color: var(--muted);

    line-height: 1.7;

    margin: 14px 0;
}

.about-points {
    margin-top: 25px;

    display: grid;

    gap: 10px;
}

.about-points div {
    font-weight: bold;
}

.about-points span {
    display: inline-grid;

    place-items: center;

    width: 23px;
    height: 23px;

    border-radius: 50%;

    background: #e9f7ed;

    color: var(--green);

    margin-right: 8px;
}


/* ================= CONTACT ================= */

.contact-section {
    background: var(--brown);

    padding: 80px 20px;

    text-align: center;

    color: white;
}

.contact-content {
    max-width: 700px;

    margin: auto;
}

.contact-content .section-label {
    color: #ffd477;
}

.contact-content h2 {
    color: white;
}

.contact-content p {
    color: #f3dfcd;

    line-height: 1.7;

    margin:
        15px 0 25px;
}

.whatsapp-button {
    display: inline-block;

    background: #25d366;

    color: white;

    text-decoration: none;

    padding: 14px 25px;

    border-radius: 30px;

    font-weight: bold;
}

.phone-number {
    margin-top: 15px;

    color: #f3dfcd;

    font-size: 0.9rem;
}


/* ================= FOOTER ================= */

footer {
    background: var(--dark-brown);

    color: white;

    padding:
        35px 0 20px;
}

.footer-content {
    width: min(1150px, 92%);

    margin: auto;

    display: flex;

    justify-content: space-between;

    align-items: center;

    gap: 30px;
}

.footer-brand {
    display: flex;

    align-items: center;

    gap: 12px;
}

.footer-brand img {
    width: 48px;
    height: 48px;

    border-radius: 50%;
}

.footer-brand strong {
    font-family: Georgia, serif;
}

.footer-brand p {
    color: #cbb6a6;

    font-size: 0.78rem;

    margin-top: 3px;
}

.footer-links {
    display: flex;

    gap: 22px;
}

.footer-links a {
    color: #e7d8cb;

    text-decoration: none;

    font-size: 0.85rem;
}

.copyright {
    width: min(1150px, 92%);

    margin: 25px auto 0;

    padding-top: 18px;

    border-top:
        1px solid
        rgba(255,255,255,0.1);

    color: #a99383;

    text-align: center;

    font-size: 0.75rem;
}


/* ================= CART OVERLAY ================= */

.cart-overlay {
    position: fixed;

    inset: 0;

    background:
        rgba(0, 0, 0, 0.4);

    z-index: 1999;

    opacity: 0;

    visibility: hidden;

    transition:
        opacity 0.25s ease;
}

.cart-overlay.open {
    opacity: 1;

    visibility: visible;
}


/* ================= CART PANEL ================= */

.cart-panel {
    position: fixed;

    top: 0;
    right: 0;

    width: min(430px, 92vw);

    height: 100vh;

    background: white;

    z-index: 2000;

    transform:
        translateX(100%);

    transition:
        transform 0.3s ease;

    display: flex;

    flex-direction: column;

    box-shadow:
        -10px 0 40px
        rgba(0,0,0,0.15);
}

.cart-panel.open {
    transform:
        translateX(0);
}

.cart-header {
    padding: 22px;

    border-bottom:
        1px solid var(--border);

    display: flex;

    justify-content: space-between;

    align-items: center;
}

.cart-small-title {
    color: var(--orange);

    text-transform: uppercase;

    letter-spacing: 1px;

    font-size: 0.7rem;

    font-weight: bold;
}

.cart-header h2 {
    color: var(--dark-brown);

    font-family: Georgia, serif;

    margin-top: 3px;
}

.close-cart {
    border: none;

    background: #f5f1eb;

    width: 36px;
    height: 36px;

    border-radius: 50%;

    font-size: 1.4rem;

    color: var(--brown);
}


/* CART ITEMS */

.cart-items {
    flex: 1;

    overflow-y: auto;

    padding: 15px;
}

.cart-item {
    display: grid;

    grid-template-columns:
        60px 1fr;

    gap: 12px;

    padding: 15px 5px;

    border-bottom:
        1px solid var(--border);
}

.cart-item-image {
    width: 60px;
    height: 60px;

    border-radius: 10px;

    display: grid;

    place-items: center;

    font-size: 2rem;
}

.cart-item-name {
    font-weight: bold;

    color: var(--dark-brown);

    font-size: 0.9rem;
}

.cart-item-size {
    color: var(--muted);

    font-size: 0.75rem;

    margin-top: 3px;
}

.cart-item-price {
    color: var(--brown);

    font-weight: bold;

    margin-top: 5px;
}

.cart-quantity {
    display: flex;

    align-items: center;

    gap: 7px;

    margin-top: 8px;
}

.cart-quantity button {
    width: 25px;
    height: 25px;

    border:
        1px solid var(--border);

    background: white;

    border-radius: 5px;
}

.cart-quantity span {
    min-width: 20px;

    text-align: center;

    font-size: 0.8rem;
}

.remove-item {
    border: none;

    background: transparent;

    color: #b34a3c;

    font-size: 0.75rem;

    margin-top: 8px;
}


/* EMPTY CART */

.empty-cart {
    padding: 70px 25px;

    text-align: center;
}

.empty-cart div {
    font-size: 4rem;

    margin-bottom: 10px;
}

.empty-cart h3 {
    color: var(--dark-brown);
}

.empty-cart p {
    color: var(--muted);

    font-size: 0.85rem;

    margin:
        8px 0 20px;
}

.empty-cart button {
    border: none;

    background: var(--brown);

    color: white;

    padding: 11px 18px;

    border-radius: 7px;
}


/* CART BOTTOM */

.cart-bottom {
    padding: 20px;

    border-top:
        1px solid var(--border);

    background: #fffdf9;
}

.cart-total {
    display: flex;

    justify-content: space-between;

    align-items: center;

    margin-bottom: 15px;
}

.cart-total span {
    color: var(--muted);
}

.cart-total strong {
    color: var(--dark-brown);

    font-size: 1.4rem;
}

.checkout-button {
    width: 100%;

    border: none;

    background: var(--green);

    color: white;

    padding: 14px;

    border-radius: 8px;

    font-weight: bold;

    font-size: 0.95rem;
}

.cart-bottom small {
    display: block;

    text-align: center;

    color: var(--muted);

    font-size: 0.7rem;

    margin-top: 9px;
}


/* ================= TOAST ================= */

.toast {
    position: fixed;

    left: 50%;

    bottom: 25px;

    z-index: 3000;

    transform:
        translate(-50%, 100px);

    background: var(--dark-brown);

    color: white;

    padding: 12px 20px;

    border-radius: 30px;

    opacity: 0;

    transition:
        0.3s ease;

    font-size: 0.85rem;

    box-shadow:
        0 8px 25px
        rgba(0,0,0,0.2);
}

.toast.show {
    transform:
        translate(-50%, 0);

    opacity: 1;
}


/* ================= TABLET ================= */

@media (max-width: 1050px) {

    .products-grid {
        grid-template-columns:
            repeat(3, 1fr);
    }

    .trust-strip {
        grid-template-columns:
            repeat(2, 1fr);

        gap: 20px;
    }

    .trust-item {
        border-right: none;

        padding: 5px 15px;
    }
}


/* ================= MOBILE ================= */

@media (max-width: 750px) {

    .top-header {
        min-height: 70px;

        display: grid;

        grid-template-columns:
            1fr auto;

        gap: 10px;

        padding: 10px 0;
    }

    .brand {
        min-width: 0;
    }

    .brand img {
        width: 45px;
        height: 45px;
    }

    .brand-text strong {
        font-size: 0.9rem;
    }

    .brand-text small {
        display: none;
    }

    .cart-label {
        display: none;
    }

    .search-box {
        grid-column: 1 / -1;

        grid-row: 2;
    }

    .category-bar {
        justify-content: flex-start;
    }

    .hero-content {
        grid-template-columns: 1fr;

        text-align: center;

        padding:
            65px 0 70px;

        gap: 30px;
    }

    .hero-text {
        margin: auto;
    }

    .hero h1 {
        font-size: 3.2rem;
    }

    .hero p {
        font-size: 0.95rem;
    }

    .hero-logo img {
        width: 220px;
    }

    .trust-strip {
        grid-template-columns: 1fr;

        margin-top: -20px;

        gap: 15px;
    }

    .trust-item {
        border-bottom:
            1px solid var(--border);

        padding-bottom: 15px;
    }

    .trust-item:last-child {
        border-bottom: none;
    }

    .products-section {
        padding: 65px 0;
    }

    .section-heading {
        align-items: flex-start;

        flex-direction: column;

        gap: 10px;
    }

    .products-grid {
        grid-template-columns:
            repeat(2, 1fr);

        gap: 12px;
    }

    .product-image {
        height: 165px;
    }

    .product-emoji {
        font-size: 4.3rem;
    }

    .product-info {
        padding: 13px;
    }

    .product-info h3 {
        font-size: 1.05rem;
    }

    .product-description {
        font-size: 0.75rem;

        min-height: 45px;
    }

    .price {
        font-size: 1.05rem;
    }

    .old-price,
    .save {
        display: none;
    }

    .product-actions {
        grid-template-columns: 1fr;
    }

    .about-content {
        grid-template-columns: 1fr;

        text-align: center;

        gap: 30px;
    }

    .about-points {
        text-align: left;

        width: fit-content;

        margin:
            25px auto 0;
    }

    .footer-content {
        flex-direction: column;

        text-align: center;
    }

    .footer-links {
        justify-content: center;
    }
}


/* ================= SMALL MOBILE ================= */

@media (max-width: 420px) {

    .products-grid {
        grid-template-columns: 1fr;
    }

    .product-image {
        height: 210px;
    }

    .product-description {
        min-height: auto;
    }
}
