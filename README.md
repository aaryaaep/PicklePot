# Madhavi's Pickle Pot

A static product catalog, shopping cart and WhatsApp ordering site for **Madhavi's Pickle Pot**, built with plain HTML, CSS and JavaScript — no frameworks, no backend, no build step.

Live site: https://aaryaaep.github.io/PicklePot/

## How it works

- `index.html` — page structure and content
- `style.css` — all styling, using the brand's colour palette (dark brown, brown, orange, golden, cream)
- `script.js` — product data, search, category filtering, cart logic and the WhatsApp checkout message
- `404.html` — friendly not-found page
- `assets/logo.png` — brand logo, used as the site logo, hero image, favicon and social preview image

There's no payment gateway. When a customer checks out, the site opens WhatsApp with a pre-filled message listing their order, and they confirm it directly with you.

## Testing locally

Because the site uses only relative file paths, you can open `index.html` directly in a browser, or serve the folder with any static server, for example:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000/`.

## Deploying to GitHub Pages

This repository is already set up as a GitHub Pages **project site** (`aaryaaep/PicklePot` → `https://aaryaaep.github.io/PicklePot/`). To deploy:

1. Commit and push your changes to the branch GitHub Pages is configured to build from (usually `main`).
2. In the repository's **Settings → Pages**, confirm the source branch/folder is set correctly.
3. Wait a minute or two for GitHub to rebuild the site, then refresh the live URL.

No build tools are involved — whatever is in the repository is exactly what gets served.

## Where to change things

### Products, descriptions, ratings

Open `script.js` and edit the `PRODUCTS` array near the top of the file. Each product looks like this:

```js
{
  id: 1,
  name: "Mango Pickle",
  category: "mango",       // one of: mango, gongura, lemon, tomato, special
  icon: "🥭",               // placeholder visual shown on the product card
  description: "...",
  rating: 4.8,
  reviews: 128,
  sizes: [
    { name: "250gms", price: 120, oldPrice: 140 },
    { name: "500gms", price: 220, oldPrice: 250 },
    { name: "1kg",    price: 400, oldPrice: 450 }
  ]
}
```

To add a new product, copy an existing object, give it a unique `id`, and fill in its details. To remove a product, delete its object from the array. The grid, search and category filters all read from this one array automatically.

**A note on current prices:** the prices in this file are placeholders so the cart and checkout have something realistic to work with. Replace them with your actual prices before taking real orders.

### Prices and "old price" / savings badges

Each size has a `price` (what the customer pays) and an optional `oldPrice`. If `oldPrice` is set and higher than `price`, the card automatically shows a strikethrough old price, a "Save ₹X" line, and an "X% OFF" badge. Leave `oldPrice` off (or equal to `price`) if a size isn't discounted.

### WhatsApp number

Near the top of `script.js`:

```js
const WHATSAPP_NUMBER = "919949577511";
```

This is used for both the checkout message and the "Chat on WhatsApp" contact button in `index.html`. If the number ever changes, update it in both places:

- `script.js` → `WHATSAPP_NUMBER`
- `index.html` → the two `https://wa.me/919949577511...` links (contact section and footer)

### Product images

Right now, each product shows a large emoji-style icon (the `icon` field) as a placeholder, since no real product photography was available yet. To switch to real photos:

1. Add your images to `assets/products/` (for example `assets/products/mango.jpg`).
2. In `script.js`, add an `image: "assets/products/mango.jpg"` field to the relevant product object.
3. In the `renderProductCard` function, replace the `<span class="product-icon">` line with an `<img>` tag pointing at `product.image`, falling back to the icon if no image is set.

### Logo

The logo is used throughout the site from a single file: `assets/logo.png`. Replace that file (keeping the same name and path) to update the logo everywhere — header, hero, about section, footer, favicon and social preview.

## Canonical IDs and classes

To keep the HTML, CSS and JavaScript in sync, the site sticks to one set of element IDs (`productsGrid`, `searchInput`, `cartCount`, `cartOverlay`, `cartPanel`, `cartItems`, `cartTotal`, `checkoutButton`, etc.) and one set of CSS class names (`products-grid`, `product-card`, `cart-panel`, `category`, and so on). If you extend the site, reuse these names rather than introducing near-duplicates — that mismatch was the cause of the bugs this rebuild fixed.
