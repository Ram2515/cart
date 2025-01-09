document.addEventListener("DOMContentLoaded", () => {
    const apiURL = "https://cdn.shopify.com/s/files/1/0883/2188/4479/files/apiCartData.json?v=1728384889";


    const cartList = document.getElementById("cart-list");
    const subtotalEl = document.getElementById("subtotal");
    const totalEl = document.getElementById("total");
    let cartItems = [];

    // Fetch cart data
    fetch(apiURL)
        .then((response) => response.json())
        .then((data) => {
            cartItems = data.items;
            updateCart();
        })
        .catch((error) => {
            console.error("Error fetching cart data:", error);
        });

    // Update the cart UI
    function updateCart() {
        cartList.innerHTML = "";
        let subtotal = 0;

        cartItems.forEach((item, index) => {
            const itemTotal = (item.price / 100) * item.quantity;
            subtotal += itemTotal;

            cartList.innerHTML += `
                <div class="cart-item" data-index="${index}">
                    <img src="${item.image}" alt="${item.title}" />
                    <div class="details">
                        <h4>${item.title}</h4>
                        <p>₹${(item.price / 100).toFixed(2)}</p>
                        <input type="number" value="${item.quantity}" class="quantity" min="1">
                    </div>
                    <div class="actions">
                        <p>Subtotal: ₹${itemTotal.toFixed(2)}</p>
                        <button class="remove-item">Remove</button>
                    </div>
                </div>
            `;
        });

        subtotalEl.textContent = subtotal.toFixed(2);
        totalEl.textContent = subtotal.toFixed(2);

        addEventListeners();
    }

    // Add event listeners to dynamic elements
    function addEventListeners() {
        document.querySelectorAll(".quantity").forEach((input) => {
            input.addEventListener("change", updateQuantity);
        });

        document.querySelectorAll(".remove-item").forEach((btn) => {
            btn.addEventListener("click", removeItem);
        });
    }

    // Update quantity
    function updateQuantity(e) {
        const index = e.target.closest(".cart-item").dataset.index;
        const newQuantity = parseInt(e.target.value);

        if (newQuantity > 0) {
            cartItems[index].quantity = newQuantity;
            updateCart();
        }
    }

    // Remove item
    function removeItem(e) {
        const index = e.target.closest(".cart-item").dataset.index;
        cartItems.splice(index, 1);
        updateCart();
    }
});
