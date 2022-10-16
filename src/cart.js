let label = document.getElementById("label");
let ShoppingCart = document.getElementById("shopping-cart");



var basket = JSON.parse(window.localStorage.getItem("data")) || [];

let calculation = () => {
    let cartIcon = document.getElementById("cartAmount");
    let basketSum = basket.map((x) => x.item)
    cartIcon.innerHTML = basketSum.reduce((a, b) => a + b, 0);
}

calculation();

let generateCartItems = () => {
    if (basket.length !== 0) {
        // console.log("basket is not empty");
    } else {
        // console.log("basket is totally empty");
        ShoppingCart.innerHTML = ``;
        label.innerHTML = `
            <h2> Cart is empty </h2>
            <a href="index.html">
                <button class="HomeBtn">Back to Home</button>
            </a>        `;
    }
};

generateCartItems();