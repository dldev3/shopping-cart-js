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
        return (ShoppingCart.innerHTML = basket.map((x) => {
            let { id, item } = x;
            let search = shopItemsData.find((y) => y.id == id) || [];
            return `
                <div class="cart-item">
                    <img width="100" src="${search.img}" />
                    <div class="details">

                        <div class="title-price-x">
                            <h4 class="title-price">
                            <p>${search.name}</p>
                            <p class="cart-item-price">$ ${search.price}</p>
                            </h4>
                            <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
                        </div>
                        
                       <div class="buttons">
                        <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                        <div id="${id}" class="quantity">
                            ${item}
                        </div>
                        <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                    </div>
                        
                        <h3> $ ${item * search.price}</h3>
                        </div>
                </div>
    `;
        }).join(""))
    } else {
        // console.log("basket is totally empty");
        ShoppingCart.innerHTML = ``;
        label.innerHTML = `
        <h2> Cart is empty </h2>
        <a href="index.html">
            <button class="HomeBtn">Back to Home</button>
        </a>
        `;
    }
};

generateCartItems();

let increment = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem)

    if (search === undefined) {
        basket.push({
            id: selectedItem,
            item: 1,
        })
    } else {
        search.item += 1;
    }
    generateCartItems();
    update(selectedItem);
    localStorage.setItem("data", JSON.stringify(basket));
}

let decrement = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem);

    if (search === undefined) return
    else if (search.item === 0) return
    else {
        search.item -= 1;
    }

    update(selectedItem);
    basket = basket.filter((x) => x.item !== 0);
    generateCartItems();
    localStorage.setItem("data", JSON.stringify(basket));
}

let update = (id) => {
    let search = basket.find((x) => x.id === id)
    document.getElementById(id).innerHTML = search.item
    calculation();
    totalAmount();
}

let removeItem = (id) => {
    let selectedItem = id;
    basket = basket.filter((x) => x.id !== selectedItem);
    generateCartItems();
    totalAmount();
    calculation();
    localStorage.setItem("data", JSON.stringify(basket));
}

let clearCart = () => {
    basket = []
    generateCartItems();
    localStorage.setItem("data", JSON.stringify(basket));
    calculation();
}

let totalAmount = () => {
    if (basket.length !== 0) {
        var amount = basket.map((x) => {
            var { item, id } = x;
            var search = shopItemsData.find((y) => y.id === id) || [];
            return item * search.price;
        }).reduce((a, b) => a + b, 0);
        label.innerHTML = `
            <h2>$ ${amount}</h2>
            <button class="checkout">Checkout</button>
            <button onclick="clearCart()" class="removeAll">Clear Cart</button>
        `;
    } else return;
}

totalAmount();