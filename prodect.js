

//product data array
const products = [
    {
        id: 1,
        title: 'EMBOSSED PATCHES JACKET',
        price: '$129.00',
        description: 'Jacket made of cotton cut on the bias. Lapel collar and long sleeves with buttoned cuffs. Contrasting textured patch appliqué at front. Patch pockets with flaps at hip. Front button closure.',
        mainImage: 'source/Men/EMBOSSED PATCHES JACKET/00881310250-a1.jpg',
        thumbnails: [
            'source/Men/EMBOSSED PATCHES JACKET/00881310250-a2.jpg',
            'source/Men/EMBOSSED PATCHES JACKET/00881310250-a3.jpg',
            'source/Men/EMBOSSED PATCHES JACKET/00881310250-a4.jpg',
            'source/Men/EMBOSSED PATCHES JACKET/00881310250-e2.jpg'
        ]
    },
    {
        id: 2,
        title: 'LIGHTWEIGHT BOMBER JACKET',
        price: '$79.90',
        description: 'Lightweight jacket made of technical fabric. Rib elastic collar and long sleeves. Welt pockets at hip. Interior pocket. Rib trim. Front zip closure.',
        mainImage: 'source/Men/LIGHTWEIGHT BOMBER JACKET/00881310250-e1.jpg',
        thumbnails: [
            'source/Men/LIGHTWEIGHT BOMBER JACKET/04302400800-a1.jpg',
            'source/Men/LIGHTWEIGHT BOMBER JACKET/04302400800-e1.jpg',
            'source/Men/LIGHTWEIGHT BOMBER JACKET/04302400800-e2.jpg',
            'source/Men/LIGHTWEIGHT BOMBER JACKET/04302400800-e3.jpg'
            
        ]
    },
    {
        id: 3,
        title: 'COMBINATION RIB KNIT DRESS',
        price: '$58.90',
        description: 'Tailored V-neck dress with long sleeves. Contrasting ribbed details.',
        mainImage: 'source/Women/COMBINATION RIB KNIT DRESS/02488106684-e1.webp',
        thumbnails: [
            'source/Women/COMBINATION RIB KNIT DRESS/02488106684-e2.webp',
            'source/Women/COMBINATION RIB KNIT DRESS/02488106684-e3.webp',
            'source/Women/COMBINATION RIB KNIT DRESS/02488106684-e1.webp',
            'source/Women/COMBINATION RIB KNIT DRESS/02488106684-015-a3.webp'
            
        ]
    }
];

// Function to load product data based on product ID
function loadProduct(productId) {
    const product = products.find(p => p.id === productId);

    if (product) {
        document.getElementById('main-img').src = product.mainImage;
        document.getElementById('product-title').textContent = product.title;
        document.getElementById('product-price').textContent = product.price;
        document.getElementById('product-description').textContent = product.description;

        // Load thumbnails
        document.getElementById('small-img-1').src = product.thumbnails[0];
        document.getElementById('small-img-2').src = product.thumbnails[1];
        document.getElementById('small-img-3').src = product.thumbnails[2];
        document.getElementById('small-img-4').src = product.thumbnails[3];

        // Thumbnail click functionality
        let smallImgs = document.getElementsByClassName('small-img');
        for (let i = 0; i < smallImgs.length; i++) {
            smallImgs[i].onmouseover = function () {
                document.getElementById('main-img').src = this.src;
            };
        }

        const productImg = document.getElementById('main-img');
        const fullscreen = document.getElementById('fullscreen');
        const fullscreenImg = document.getElementById('fullscreen-img');
        const fixedHeader = document.getElementById('fixed-header');

        // Click to open fullscreen
        productImg.onclick = function () {
            fullscreen.style.display = 'flex';
            fullscreenImg.src = productImg.src; // Use the same source for the full-screen image
            fixedHeader.style.display = 'none';
        }

        // Close fullscreen on click
        fullscreenImg.onclick = function () {
            closeFullscreen();
        }

        // Close button functionality
        function closeFullscreen() {
            fullscreen.style.display = 'none';
            fixedHeader.style.display = 'block';
        }
    }
}

// Get the product ID from the URL (e.g., ?id=1)
const urlParams = new URLSearchParams(window.location.search);
const productId = parseInt(urlParams.get('id'));
loadProduct(productId);

// Function to add the product to the cart
function addToCart() {
    const size = document.getElementById('size-options').value;
    if (size === '') {
        return;
    }

    const product = {
        id: products[productId - 1].id,
        title: products[productId - 1].title,
        price: products[productId - 1].price,
        description: products[productId - 1].description,
        image: products[productId - 1].mainImage,
        size: size,
        quantity: 1
    };

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));

}

// Add event listener to the ADD button
document.querySelector('.btn1').addEventListener('click', addToCart);










// Load cart items
function loadCartItems() {
    const cartContainer = document.getElementById("cart-items-container");
    const template = document.getElementById("cart-item-template");

    products.forEach(product => {
        const item = template.cloneNode(true);
        item.style.display = "flex";
        item.querySelector(".product-image").src = product.mainImage;
        item.querySelector(".product-name").textContent = product.title;
        item.querySelector(".product-size").textContent = `Size: ${product.size}`;
        item.querySelector(".price-value").textContent = product.price.toFixed(2);
        item.querySelector(".quantity").value = product.quantity;
        item.querySelector(".total-value").textContent = (product.price * product.quantity).toFixed(2);

        // Add event listeners for quantity adjustment
        item.querySelector(".decrease-quantity").addEventListener("click", () => adjustQuantity(item, product, -1));
        item.querySelector(".increase-quantity").addEventListener("click", () => adjustQuantity(item, product, 1));

        cartContainer.appendChild(item);
    });
}

// Adjust quantity and update total
function adjustQuantity(item, product, change) {
    product.quantity += change;
    if (product.quantity < 1) product.quantity = 1;

    item.querySelector(".quantity").value = product.quantity;
    item.querySelector(".total-value").textContent = (product.price * product.quantity).toFixed(2);
}

// Initialize cart items on page load
window.onload = loadCartItems;
