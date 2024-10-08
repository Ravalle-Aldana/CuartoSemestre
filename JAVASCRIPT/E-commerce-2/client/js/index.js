document.addEventListener("DOMContentLoaded", () => {
    const shopContent = document.getElementById("shopContent");
    const cart = []; // Este es nuestro carrito, un array vacío

    productos.forEach((product) => {
        const content = document.createElement("div");
        content.innerHTML = `
            <img src="${product.img}" alt="${product.productName}">
            <h3>${product.productName}</h3>
            <p>${product.price} $</p>
        `;
        shopContent.append(content);

        const buyButton = document.createElement("button");
        buyButton.innerText = "Comprar";
        content.append(buyButton);

        buyButton.addEventListener("click", () => {
            cart.push({
                id: product.id,
                productName: product.productName,
                price: product.price,
                quantity: product.quantity,
                img: product.img,
            });
            console.log(cart);
        });
    });
});
