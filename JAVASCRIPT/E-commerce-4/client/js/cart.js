const modalContainer = document.getElementById("modal-container");
const modalOverlay = document.getElementById("modal-overlay");
const cartBtn = document.getElementById("cartBtn");
const cartCounter = document.getElementById("cart-counter");

// Función para mostrar el carrito
const displayCart = () => {
    modalContainer.innerHTML = ""; // Limpia el contenido del modal
    modalContainer.style.display = "block";
    modalOverlay.style.display = "block";

    // Modal Header
    const modalHeader = document.createElement("div");
    modalHeader.className = "modal-header";

    const modalClose = document.createElement("div");
    modalClose.innerText = "❎";
    modalClose.className = "modal-close";
    modalHeader.append(modalClose);

    modalClose.addEventListener("click", () => {
        modalContainer.style.display = "none";
        modalOverlay.style.display = "none";
    });

    const modalTitle = document.createElement("div");
    modalTitle.innerText = "Carrito de Compras";
    modalTitle.className = "modal-title";
    modalHeader.append(modalTitle);

    modalContainer.append(modalHeader);

    // Modal Body
    if (cart.length > 0) {
        cart.forEach(product => {
            const modalBody = document.createElement("div");
            modalBody.className = "modal-body";
            modalBody.innerHTML = `
                <div class="product">
                    <img class="product-img" src="${product.img}" />
                    <div class="product-info">
                        <h4>${product.productName}</h4>
                    </div>
                    <div class="quantity">
                        <span class="quantity-btn-decrease">-</span>
                        <span class="quantity-input">${product.quantity}</span>
                        <span class="quantity-btn-increase">+</span>
                    </div>
                    <div class="price">$${product.price * product.quantity}</div>
                    <div class="delete-product">❎</div>
                </div>
            `;
            modalContainer.append(modalBody);

            const decrease = modalBody.querySelector('.quantity-btn-decrease');
            decrease.addEventListener('click', () => {
                if (product.quantity > 1) {
                    product.quantity--;
                } else {
                    deleteCartProduct(product.id);  // Elimina el producto si la cantidad es 0
                }
                displayCart();
                displayCartCounter();
            });

            const increase = modalBody.querySelector('.quantity-btn-increase');
            increase.addEventListener('click', () => {
                product.quantity++;
                displayCart();
                displayCartCounter();
            });

            const deleteProduct = modalBody.querySelector('.delete-product');
            deleteProduct.addEventListener('click', () => {
                deleteCartProduct(product.id);
            });
        });

        // Modal Footer
        const total = cart.reduce((acc, el) => acc + el.price * el.quantity, 0);
        const modalFooter = document.createElement("div");
        modalFooter.className = "modal-footer";
        modalFooter.innerHTML = `<div class="total-price">Total: $${total}</div>`;
        modalContainer.append(modalFooter);

        // Añadir el botón de PayPal
        const paypalButtonContainer = document.createElement('div');
        paypalButtonContainer.id = 'paypal-button-container';
        modalContainer.append(paypalButtonContainer);

        if (paypal && paypal.Buttons) {
            paypal.Buttons({
                createOrder: function(data, actions) {
                    return actions.order.create({
                        purchase_units: [{
                            amount: {
                                value: total.toString()
                            }
                        }]
                    });
                },
                onApprove: function(data, actions) {
                    return actions.order.capture().then(function(details) {
                        alert('Transaction completed by ' + details.payer.name.given_name);
                        cart = [];
                        displayCart();
                        displayCartCounter();
                    });
                }
            }).render('#paypal-button-container'); 
        }
    } else {
        const modalText = document.createElement("h2");
        modalText.className = "modal-body";
        modalText.innerText = "El carrito está vacío";
        modalContainer.append(modalText);
    }
};

// Listener para el botón del carrito
cartBtn.addEventListener("click", displayCart);

const deleteCartProduct = (id) => {
    const foundId = cart.findIndex((element) => element.id === id);
    if (foundId !== -1) {
        cart.splice(foundId, 1);
    }
    displayCart();
    displayCartCounter();
};

const displayCartCounter = () => {
    const cartLength = cart.reduce((acc, el) => acc + el.quantity, 0);
    if (cartLength > 0) {
        cartCounter.style.display = "block";
        cartCounter.innerText = cartLength;
    } else {
        cartCounter.style.display = "none";
    }
};
