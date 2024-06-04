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
//cart//
document.addEventListener('DOMContentLoaded', function() {
  const featuredContainer = document.querySelector('.products');
  const productList = document.getElementById('product-list');
  const cartIcon = document.getElementById('cart-icon');
  const cartContainer = document.getElementById('cart-container');
  const cartItems = document.getElementById('cart-items');
  const cartTotalPrice = document.getElementById('cart-total-price');

  featuredContainer.innerHTML = ''; 

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
//featured
  function displayFeaturedProducts(container) {
      container.innerHTML = '';
      fashionItems.forEach(category => {
          category.items.filter(item => item.featured).forEach(product => {
              const productHTML = createProductHTML(product);
              container.innerHTML += productHTML;
          });
      });

      // Cart
      container.querySelectorAll('.carticon').forEach(cartIcon => {
          cartIcon.addEventListener('click', addToCart);
      });
  }

  function displayProducts(container, filter) {
      container.innerHTML = '';
      fashionItems.forEach(category => {
          category.items.filter(item => item.type === filter).forEach(product => {
              const productHTML = createProductHTML(product);
              container.innerHTML += productHTML;
          });
      });

      // Cart
      container.querySelectorAll('.carticon').forEach(cartIcon => {
          cartIcon.addEventListener('click', addToCart);
      });
  }
//Lägg till i Cart
  function addToCart(e) {
      const productElement = e.target.closest('.product');
      const productName = productElement.querySelector('p').innerText;
      const productPrice = productElement.querySelector('span').innerText;

      const cartItemHTML = `
          <div class="cart-item">
              <p class='cartbold'>${productName}</p>
              <span>${productPrice}</span>
              <button class="remove-from-cart">Remove</button>
          </div>
      `;

      cartItems.innerHTML += cartItemHTML;

      // Uppdatera pris
      let total = parseFloat(cartTotalPrice.innerText.replace('€', ''));
      total += parseFloat(productPrice.replace('€', ''));
      cartTotalPrice.innerText = `€${total.toFixed(2)}`;

      // Event listener ta bort
      cartItems.querySelectorAll('.remove-from-cart').forEach(button => {
          button.addEventListener('click', removeFromCart);
      });
  }
//Ta bort från cart
  function removeFromCart(e) {
      const cartItem = e.target.closest('.cart-item');
      const productPrice = cartItem.querySelector('span').innerText;

      // Ta bort från cart
      cartItem.remove();

      // Uppdatera pris 
      let total = parseFloat(cartTotalPrice.innerText.replace('€', ''));
      total -= parseFloat(productPrice.replace('€', ''));
      cartTotalPrice.innerText = `€${total.toFixed(2)}`;
  }

  cartIcon.addEventListener('click', (e) => {
      e.preventDefault(); 
      cartContainer.classList.toggle('hidden');
  });

  displayFeaturedProducts(featuredContainer);

  document.getElementById('dresses').addEventListener('click', () => displayProducts(productList, 'Dress'));
  document.getElementById('shoes').addEventListener('click', () => displayProducts(productList, 'Shoes'));
  document.getElementById('suits').addEventListener('click', () => displayProducts(productList, 'Suit'));
  document.getElementById('shirts').addEventListener('click', () => displayProducts(productList, 'Shirt'));
});

// Spara till LocalStorage
function saveCartToLocalStorage(cartItems) {
  localStorage.setItem('cart', JSON.stringify(cartItems));
}

// Ladda från Local Storage
function loadCartFromLocalStorage() {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
}

// Lägg till i cart
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

// Uppdatera cart 
function updateCartDisplay(cartItems) {
  const cartItemsContainer = document.getElementById('cart-items');
  const cartTotalPrice = document.getElementById('cart-total-price');

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

  // Ta-bort-knappar
  cartItemsContainer.querySelectorAll('.remove-from-cart').forEach(button => {
      button.addEventListener('click', removeFromCart);
  });
}

// Ladda cart när sidan laddas
document.addEventListener('DOMContentLoaded', () => {
  const cartItems = loadCartFromLocalStorage();
  updateCartDisplay(cartItems);


});

