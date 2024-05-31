const fashionItems = [
    {
        category: "Mens clothes",
        items: [
            { name: "Emerald Suit", price: 799, currency: "€", type: "Suit", featured: true, image: "/prod-img/emeraldsuit.jpg" },
            { name: "Navy Suit", price: 799, currency: "€", type: "Suit", featured: true, image: "/prod-img/navysuit.jpg" },
            { name: "Maroon Suit", price: 799, currency: "€", type: "Suit", featured: false, image: "/prod-img/maroonsuit.jpg" },
            { name: "Premium shirt white", price: 150, currency: "€", type: "Shirt", featured: false, image: "/prod-img/whiteshirt.jpg" },
            { name: "Premium shirt black", price: 150, currency: "€", type: "Shirt", featured: false, image: "/prod-img/blackshirt.jpg" },
            { name: "Premium shirt gray", price: 150, currency: "€", type: "Shirt", featured: false, image: "/prod-img/grayshirt.jpg" }
        ]
    },
    {
        category: "Womens clothes",
        items: [
            { name: "Black dress", price: 499, currency: "€", type: "Dress", featured: true, image: "/prod-img/blackdress.jpg" },
            { name: "White dress", price: 499, currency: "€", type: "Dress", featured: false, image: "/prod-img/whitedress.jpg" },
            { name: "Red dress", price: 499, currency: "€", type: "Dress", featured: false, image: "/prod-img/reddress.jpg" },
            { name: "Flower heels", price: 799, currency: "€", type: "Shoes", featured: true, image: "/prod-img/flowerheels.jpg" },
            { name: "Black heels", price: 799, currency: "€", type: "Shoes", featured: false, image: "/prod-img/blackheels.jpg" }
        ]
    }
];

document.addEventListener('DOMContentLoaded', function() {
    const productList = document.getElementById('product-list');
    const cartContainer = document.getElementById('cart-container');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalPrice = document.getElementById('cart-total-price');
    const cartIcon = document.getElementById('cart-icon');

    // Spara i LocalStorage
    function saveCartToLocalStorage(cartItems) {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }

    // Ladda från LocalStorage
    function loadCartFromLocalStorage() {
        const cart = localStorage.getItem('cart');
        return cart ? JSON.parse(cart) : [];
    }

    // Uppdatera Cart
    function updateCartDisplay(cartItems) {
        cartItemsContainer.innerHTML = '';
        let total = 0;

        cartItems.forEach(item => {
            const cartItemHTML = `
                <div class="cart-item">
                    <p class='cartbold'>${item.name}</p>
                    <span>${item.price}</span>
                    <button class="remove-from-cart">Remove</button>
                </div>
            `;
            cartItemsContainer.innerHTML += cartItemHTML;
            total += parseFloat(item.price.replace('€', ''));
        });

        cartTotalPrice.innerText = `€${total.toFixed(2)}`;

        // Ta-bort knappar
        cartItemsContainer.querySelectorAll('.remove-from-cart').forEach(button => {
            button.addEventListener('click', removeFromCart);
        });
    }

    // Add to cart funktion
    function addToCart(e) {
        const productElement = e.target.closest('.product');
        const productName = productElement.querySelector('p').innerText;
        const productPrice = productElement.querySelector('span').innerText;
        let cartItems = loadCartFromLocalStorage();

        cartItems.push({ name: productName, price: productPrice });
        saveCartToLocalStorage(cartItems);

        updateCartDisplay(cartItems);
    }

    // Ta bort från cart
    function removeFromCart(e) {
        const cartItem = e.target.closest('.cart-item');
        const productName = cartItem.querySelector('p').innerText;
        let cartItems = loadCartFromLocalStorage();

        cartItems = cartItems.filter(item => item.name !== productName);
        saveCartToLocalStorage(cartItems);

        updateCartDisplay(cartItems);
    }

    // Skapa produkter
    function createProductHTML(product) {
        return `
            <div class="product">
                <div class="productimgcontainer"><img src="${product.image}" alt="${product.name}"></div>
                <p>${product.name}</p>
                <span>${product.currency}${product.price}</span>
                <div class="carticon">🛒</div>
            </div>
        `;
    }

    // Display produkter
    function displayProducts(filter) {
        productList.innerHTML = '';
        fashionItems.forEach(category => {
            category.items.filter(item => item.type === filter).forEach(product => {
                const productHTML = createProductHTML(product);
                productList.innerHTML += productHTML;
            });
        });

        // Lägg till i cart
        productList.querySelectorAll('.carticon').forEach(cartIcon => {
            cartIcon.addEventListener('click', addToCart);
        });
    }

    // Ladda cart när sidan laddas
    const cartItems = loadCartFromLocalStorage();
    updateCartDisplay(cartItems);

    // Produktkategori-knappar
    document.getElementById('dresses').addEventListener('click', () => displayProducts('Dress'));
    document.getElementById('shoes').addEventListener('click', () => displayProducts('Shoes'));
    document.getElementById('suits').addEventListener('click', () => displayProducts('Suit'));
    document.getElementById('shirts').addEventListener('click', () => displayProducts('Shirt'));

    // Event listener knapp
    cartIcon.addEventListener('click', (e) => {
        e.preventDefault(); 
        cartContainer.classList.toggle('hidden');
    });
});
