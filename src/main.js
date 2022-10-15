let shop = document.getElementById("shop");

let shopItemsData = [{
    id: "1001",
    name: "casual shirt 01",
    price: 45,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
    img: "images/img-1.jpg"
}, {
    id: "1002",
    name: "casual shirt 02",
    price: 45,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
    img: "images/img-2.jpg"
}, {
    id: "1003",
    name: "casual shirt 03",
    price: 45,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
    img: "images/img-3.jpg"
}, {
    id: "1004",
    name: "casual shirt 04",
    price: 45,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
    img: "images/img-4.jpg"
}];

var basket = JSON.parse(window.localStorage.getItem("data")) || [];

let generateShop = () => {
    return (shop.innerHTML =
        shopItemsData.map((element) => {
            let { id, name, price, desc, img } = element;
            let search = basket.find((x) => x.id === id) || 0;

            return (`
    <div id="product-id-${id}" class="item">
            <img width="220" src="${img}" alt="">
            <div class="details">
                <h3>${name}</h3>
                <p>${desc}</p>
                <div class="price-quantity">
                    <h2>$ ${price}</h2>
                    <div class="buttons">
                        <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                        <div id="${id}" class="quantity">
                            ${search.item === undefined ? 0 : search.item}
                        </div>
                        <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                    </div>
                </div>
            </div>
        </div>
    `)
        }).join(""));
}

generateShop();

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
    localStorage.setItem("data", JSON.stringify(basket));
}

let update = (id) => {
    let search = basket.find((x) => x.id === id)
    document.getElementById(id).innerHTML = search.item
    calculation();
}

let calculation = () => {
    let cartIcon = document.getElementById("cartAmount");
    let basketSum = basket.map((x) => x.item)
    cartIcon.innerHTML = basketSum.reduce((a, b) => a + b, 0);
}

calculation();







