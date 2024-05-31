document.addEventListener('DOMContentLoaded', function() {
    const cartItemsContainer = document.querySelector('.prod-container');
    const totalContainer = document.querySelector('.total');
    const cartItems = loadCartFromLocalStorage();

    let total = 0;
    cartItemsContainer.innerHTML = ''; // Rensa innehåll

    cartItems.forEach(item => {
        const itemHTML = `
        <hr>
        <div class="prod-summed">
        <div class="details">
            <p class="name">${item.name}</p>
            <p class="size">Size: M</p>
        </div>
        <p class="price">${item.price}</p>
    </div>
    
        `;
        cartItemsContainer.innerHTML += itemHTML;
        total += parseFloat(item.price.replace('€', ''));
    });

    totalContainer.innerText = `Total: €${total.toFixed(2)}`;

    // Ladda från Localstorage 
    function loadCartFromLocalStorage() {
        const cart = localStorage.getItem('cart');
        return cart ? JSON.parse(cart) : [];
    }
});
