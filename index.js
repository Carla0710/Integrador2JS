// Obtener elementos del menú
const mobileMenuIcon = document.getElementById("mobile-menu-icon");
const menuToggle = document.getElementById("menu-toggle");
const cartToggle = document.getElementById("cart-toggle");
const navbarList = document.querySelector(".navbar-list");
const cartMenu = document.querySelector(".cartmenu");
const overlay = document.querySelector(".overlay");
const categoryButtons = document.querySelectorAll(".category");
const productContainer = document.getElementById("product-container");
const clearCartButton = document.getElementById("clear-cart-btn");
const clearCartModal = document.getElementById("clear-cart-modal");
const confirmClearButton = document.getElementById("confirm-clear");
const cancelClearButton = document.getElementById("cancel-clear");

//Productos
const productosData = [
  {
      id: 1,
      name: "América",
      price: 1000,
      category: "America",
      cardImg: "assets/argentina.jpg",
     },
    {
     id: 2,
     name: "Europa",
     price: 2000,
     category: "Europa",
     cardImg: "assets/paris.jpg",
    },
    {
     id: 3,
     name: "África",
     price: 3000,
     category: "Africa",
     cardImg: "assets/africa.jpg",
    },
    {
     id: 4,
     name: "Asia",
     price: 4000,
     category: "Asia",
     cardImg: "assets/asia.jpg",
    },

]

// Función para abrir/cerrar el menú de navegación
function toggleNavMenu() {
  navbarList.classList.toggle("open-menu");
  overlay.classList.toggle("show-overlay");
}

// Controlador de eventos al icono de menú
mobileMenuIcon.addEventListener("click", function () {
  // Alternar la visibilidad del menú desplegable al hacer clic en el ícono del menú
  navbarList.style.display = (navbarList.style.display === "block") ? "none" : "block";
});

// Función para mostrar/ocultar el menú en pantallas pequeñas
function toggleMobileMenu() {
  const windowWidth = window.innerWidth; // Obtener el ancho de la ventana
  if (windowWidth <= 768) {
    navbarList.classList.toggle("open-menu");
    overlay.classList.toggle("show-overlay");
  } else {
    // Si la pantalla es más grande, asegúrate de que el menú esté cerrado
    navbarList.classList.remove("open-menu");
    overlay.classList.remove("show-overlay");
  }
}

// Función para abrir/cerrar carrito
function toggleCartMenu() {
  cartMenu.classList.toggle("open-cart");
  overlay.classList.toggle("show-overlay");
}

// Agregar eventos
menuToggle.addEventListener("change", toggleNavMenu);
cartToggle.addEventListener("change", toggleCartMenu);
overlay.addEventListener("click", () => {
  menuToggle.checked = false;
  cartToggle.checked = false;
  toggleNavMenu();
  toggleCartMenu();
});

// Función para actualizar la interfaz
function updateCartUI() {
  const cartItemsContainer = document.querySelector('.cart-items');
  const cartTotalElement = document.querySelector('.total');
  
// Limpia el contenido actual del carrito
  cartItemsContainer.innerHTML = '';
  
// Recorre los productos en el carrito
  let total = 0;

  cart.forEach(product => {
      const cartItem = document.createElement('div');
      cartItem.classList.add('cart-item');

      const nameElement = document.createElement('p');
    nameElement.textContent = product.name;
    
    const priceElement = document.createElement('p');
    priceElement.textContent = `${product.price} USD`;

    cartItem.appendChild(nameElement);
    cartItem.appendChild(priceElement);
        
  cartItemsContainer.appendChild(cartItem);
  });
  
  cartTotalElement.textContent = total;
}

function renderProductCards() {
const productContainer = document.getElementById("product-container");
  productContainer.innerHTML = '';

  productosData.forEach((product) => {
    const productCard = createProductCard(product);
    productContainer.appendChild(productCard);

    const addButton = productCard.querySelector(".add-btn");
    addButton.addEventListener("click", () => {
      addToCart(product);
    });
  });
}

//Filtros de cards
 
function filterProducts(category) {
   const filteredProducts = productosData.filter((product) => {
    return category === "Todo" || product.category === category;
  });

  // Mostrar productos filtrados en el contenedor
  productContainer.innerHTML = ""; 

  if (category === "Todo") {
      renderProductCards();
  } else {
        filteredProducts.forEach((product) => {
      const productCard = createProductCard(product);
      productContainer.appendChild(productCard);
    });
  }
}

// Agregar un controlador de eventos a cada botón de categoría
categoryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedCategory = button.getAttribute("data-category");
    filterProducts(selectedCategory);
  });
});

const showAllButton = document.querySelector(".category[data-category='Todo']");
showAllButton.addEventListener("click", () => {
  filterProducts("Todo");
});

filterProducts("Mostrar todo");

//Agregar productos al carrito 
const cart = [];
function addToCart(product) {
  const existingProduct = cart.find((item) => item.id === product.id);
  if (existingProduct) {
   existingProduct.quantity += 1;
  } else {
 cart.push({ ...product, quantity: 1 });
}

  updateCartUI();
  updateCartBubble();

// Muestra un mensaje de éxito
const successMessage = document.getElementById('success-message');
successMessage.textContent = `${product.name} ha sido agregado al carrito.`;
successMessage.style.display = 'block';

setTimeout(() => {
  successMessage.style.display = 'none';
}, 3000);

setTimeout(() => {
  successMessage.style.display = 'none';
}, 3000);

//Confirmación de limpiar el carrito
clearCartButton.addEventListener("click", () => {
  clearCartModal.style.display = "block";
});

cancelClearButton.addEventListener("click", () => {
 clearCartModal.style.display = "none";
});

confirmClearButton.addEventListener("click", () => {
  clearCart();
  clearCartModal.style.display = "none";
});

function clearCart() {
  cart.length = 0;
  updateCartUI();
  updateCartBubble();
}

  // Guarda el carrito en localStorage
  localStorage.setItem('cart', JSON.stringify(cart));
 }
 
// Eliminar productos del carrito
function removeFromCart(productId) {
  const productIndex = cart.findIndex(product => product.id === productId);

  if (productIndex !== -1) {
    if (cart[productIndex].quantity > 1) {
      cart[productIndex].quantity -= 1;
    } else {
    cart.splice(productIndex, 1);
    }

    updateCartUI();
    updateCartBubble();
    
    // Actualiza el carrito en localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
  }
}
  
// Función para actualizar el número en el cart-bubble
function updateCartBubble() {
  const cartBubble = document.getElementById("cart-bubble");
  const cartItemCount = cart.length;
  cartBubble.textContent = cartItemCount;
}

function updateCartUI() {
  const cartItemsContainer = document.querySelector('.cart-items');
  const cartTotalElement = document.querySelector('.total');
  
  cartItemsContainer.innerHTML = '';

// Función para limpiar el carrito
function clearCart() {
  cart.length = 0;
  updateCartUI(); 
  updateCartBubble();

  // Limpia el carrito en localStorage
  localStorage.removeItem('cart');
}

const clearButton = document.querySelector('.clear-btn');
clearButton.addEventListener('click', clearCart);

  
  let total = 0;
  cart.forEach(product => {
  const cartItem = document.createElement('div');
  cartItem.classList.add('cart-item');
    
// Agrega estos elementos al contenedor cartItem
    
    const nameElement = document.createElement('p');
    nameElement.textContent = product.name;
    
    const priceElement = document.createElement('p');
    priceElement.textContent = `${product.price} U$D`;

    const quantityElement = document.createElement('p');
    quantityElement.textContent = `U:${product.quantity}`;
    
    cartItem.appendChild(nameElement);
    cartItem.appendChild(priceElement);
    cartItem.appendChild(quantityElement);
    
    cartItemsContainer.appendChild(cartItem);
    
    // Suma el precio del producto al total
    total += product.price * product.quantity;
  });

  cartTotalElement.textContent = total;
}

// Función para crear cards de producto
function createProductCard(product) {
  const productCard = document.createElement("div");
  productCard.classList.add("product-card");

  const img = document.createElement("img");
  img.src = product.cardImg;
  img.alt = product.name;

  const name = document.createElement("h3");
  name.textContent = product.name;

  const price = document.createElement("p");
  price.textContent = `${product.price} U$D`;

  const addButton = document.createElement("button");
  addButton.textContent = "Agregar al carrito";
  addButton.classList.add("add-btn");  

  productCard.appendChild(img);
  productCard.appendChild(name);
  productCard.appendChild(price);
  productCard.appendChild(addButton);

  return productCard;
}

renderProductCards();

//Seccion Contacto
// Agrega un evento para el envío del formulario
document.getElementById("form").addEventListener("submit", function (e) {
e.preventDefault();

const name = document.getElementById("input-name").value.trim();
const email = document.getElementById("input-email").value.trim();
const subject = document.getElementById("subject").value.trim();
const formMessage = document.getElementById("form-message");

// Validación del correo electrónico
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

// Realiza la validación
  if (name === "" || email === "" || subject === "") {
    formMessage.textContent = "Por favor, completa todos los campos.";
    formMessage.classList.remove("success");
    formMessage.classList.add("error");
    formMessage.style.display = "block"; // Error
  } else if (!isValidEmail(email)) {
    formMessage.textContent = "Por favor, ingresa un correo electrónico válido.";
    formMessage.classList.remove("success");
    formMessage.classList.add("error");
    formMessage.style.display = "block"; // Error
  } else {
    // Si pasa todas las validaciones, muestra un mensaje de éxito
    formMessage.textContent = "Mensaje enviado con éxito.";
    formMessage.classList.remove("error");
    formMessage.classList.add("success");
    formMessage.style.display = "block"; // Éxito

    // Limpia los campos del formulario después de un envío exitoso
    document.getElementById("input-name").value = "";
    document.getElementById("input-email").value = "";
    document.getElementById("subject").value = "";
  }
});
