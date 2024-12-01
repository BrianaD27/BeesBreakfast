let title = document.getElementById('title');
let shoppingCart = document.getElementById('shopping-cart');
let label = document.getElementById('label');
let labelTotal = document.getElementById('labelTotal');
let cartNumber = document.getElementById('cartNumber');

let basket = JSON.parse(localStorage.getItem("data")) || [];

let totalCartDishes = () => {
    let cartItem = document.getElementById('cartNumber');
    cartItem.innerHTML = basket.map((x)=> x.item).reduce((num1,num2)=>num1+num2,0);
};
totalCartDishes();

let generateCartItem = () => {
    if(basket.length !== 0) {
        return shoppingCart.innerHTML = basket.map((x)=>{
            let { id, item } = x;
            let search = menuItemsData.find((y)=>y.id === id) || [];

            return `
            <div id="dish-card" class="mr-5 item-card d-flex justify-content-center align-items-center position-relative">
                <button id="x-button-container" class="bg-transparent border-0 position-absolute">
                <img id="x-button-img" onclick="removeDish(${id})" class="img-fluid" src="/BeesBreakfast/Assets/x.png" alt="" srcset="">
                </button>

                <div class="img-container">
                    <img src=${search.img} class="img-fluid" alt=""/>
                    </div>
                    
                    <div class="">
                        <h4 class="title fw-bold my-1">${search.dataTitle}</h6>
                        <p class="my-1" >Price: $${search.price} | ${search.calories} Calories</p>

                        <div class="d-flex align-items-center ">
                            <div class="mr-3 d-flex flex-row align-items-center justify-content-around w-50 rounded-pill" id="dishButton">
                                <button onclick="decrease(${id})" class="bg-transparent border-0 h3">-</button>
                                <p id="${id}" class="bg-transparent text-center my-auto h4">${item}</p>
                                <button onclick="increase(${id})"  class="bg-transparent border-0 h3">+</button>
                            </div>

                            <h4>$${(item * search.price).toFixed(2)}</h4>
                        </div>
                    </div>
                </div>
            </div>
            `;
        });
        
    } else {
        shoppingCart.innerHTML = ``
        title.innerHTML = `
        <h2>Cart Is Empty</h2>
        <a href="/BeesBreakfast/Pages/index.html#menu">
        <button>Return To Menu</button>
        </a>
        `
        label.innerHTML = ` `
        cartNumber.innerHTML = 0
    }
};

generateCartItem();

let increase = (id) => {
    let selectedDish = id;
    let search = basket.find((x)=> x.id ===  selectedDish.id); //searches for the item I selected. does it exits or not?

    if (search === undefined) { // If id(item) doesn't exit in basket, then it will be pushed to it
        basket.push({
            id: selectedDish.id,
            item: 1
        });
    } else {
        search.item += 1; //Bc search is set to the object from the basket, we can access its attributes through it.
    }

    // console.log(basket);
    update(selectedDish.id);
    generateCartItem();
    totalAmount();
    localStorage.setItem("data", JSON.stringify(basket));
};

let decrease = (id) => {
    let selectedDish = id;
    let search = basket.find((x)=> x.id ===  selectedDish.id); //searches for the item I selected. does it exits or not?

    if (search === undefined ) {
        return;
    } else if (search.item === 0) {
        return;
    } else {
        search.item -= 1; //Bc search is set to the object from the basket, we can access its attributes through it.
    }
    
    update(selectedDish.id);
    basket = basket.filter((x) => x.item !== 0);
    generateCartItem();
    totalAmount();
    localStorage.setItem("data", JSON.stringify(basket));
};

let update = (id) => {
    let search = basket.find((x)=> x.id === id);
    document.getElementById(id).innerHTML = search.item;

    totalCartDishes();
};

let removeDish = (id) => {
    let selectedDish = id;
    
    basket = basket.filter((x)=>x.id !== selectedDish.id);
    localStorage.setItem("data", JSON.stringify(basket));
    generateCartItem();
};

let totalAmount = () => {
    if (basket.length !== 0) {
        let amount = basket.map((x) => {
            let { id, item} = x;
            let search = menuItemsData.find((y)=>y.id === id) || [];
            return item * search.price;
        }).reduce((x,y)=>x+y, 0);

        labelTotal.innerHTML = `Total: $${amount.toFixed(2)}`;

    } else {
        return;
    }

};

totalAmount();

let clearCart = () => {
    basket = [];
    generateCartItem();
    localStorage.setItem("data", JSON.stringify(basket))
};
