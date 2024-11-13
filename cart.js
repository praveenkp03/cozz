// Sample data array for products (you can replace this with your actual product data)
const products = [
    {
        id: 1,
        name: "LIGHTWEIGHT BOMBER JACKET",
        price: 200,
        imageSrc: "source/Men/LIGHTWEIGHT BOMBER JACKET/00881310250-e1.jpg"
    },
    {
        id: 2,
        name: "Product Name 2",
        price: 150,
        imageSrc: "2.jpg"
    },
    // Add more products as needed
];

// Array to hold cart items
let cartItems = [];

// Function to add item to the cart
function addToCart(productId) {
    // Find product by ID
    const product = products.find(p => p.id === productId);
    
    if (product) {
        // Check if item already in cart
        const existingItem = cartItems.find(item => item.id === productId);
        
        if (existingItem) {
            // Increase quantity if item exists
            existingItem.quantity += 1;
            existingItem.totalPrice = existingItem.price * existingItem.quantity;
        } else {
            // Add new item to cart
            cartItems.push({
                ...product,
                quantity: 1,
                totalPrice: product.price
            });
        }
    }
    
    // Update cart display
    populateCart(cartItems);
}

// Function to update cart template with items
function populateCart(items) {
    const cartList = document.querySelector(".list-cart");
    cartList.innerHTML = ""; // Clear existing items

    items.forEach((item, index) => {
        // Clone item template
        const itemTemplate = document.querySelector(".item").cloneNode(true);
        
        // Update item details
        itemTemplate.querySelector("#item-num").textContent = index + 1;
        itemTemplate.querySelector("#image1").src = item.imageSrc;
        itemTemplate.querySelector("#name").textContent = item.name;
        itemTemplate.querySelector("#price").textContent = `$${item.price}`;
        itemTemplate.querySelector("#quantity").textContent = item.quantity;
        itemTemplate.querySelector("#total-price").textContent = `$${item.totalPrice}`;

        // Add event listeners for quantity adjustment
        itemTemplate.querySelector(".minus").onclick = () => updateQuantity(item.id, -1);
        itemTemplate.querySelector(".plus").onclick = () => updateQuantity(item.id, 1);

        // Append updated item to cart list
        cartList.appendChild(itemTemplate);
    });
}

// Function to update item quantity in cart
function updateQuantity(productId, amount) {
    const item = cartItems.find(i => i.id === productId);
    
    if (item) {
        item.quantity += amount;
        if (item.quantity <= 0) {
            // Remove item if quantity goes to 0
            cartItems = cartItems.filter(i => i.id !== productId);
        } else {
            item.totalPrice = item.price * item.quantity;
        }
        populateCart(cartItems); // Re-render cart
    }
}

// Example function call to add items
document.querySelector("#add-to-cart-btn-1").onclick = () => addToCart(1); // Button for first product
document.querySelector("#add-to-cart-btn-2").onclick = () => addToCart(2); // Button for second product

// Initialize cart
populateCart(cartItems);
