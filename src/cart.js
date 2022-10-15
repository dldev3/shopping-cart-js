var basket = JSON.parse(window.localStorage.getItem("data")) || [];

let calculation = () => {
    let cartIcon = document.getElementById("cartAmount");
    let basketSum = basket.map((x) => x.item)
    cartIcon.innerHTML = basketSum.reduce((a, b) => a + b, 0);
}

calculation();