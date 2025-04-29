let title = document.getElementById("title");
let shoppingCart = document.getElementById("shopping-cart");
let label = document.getElementById("label");
let labelTotal = document.getElementById("labelTotal");
let cartNumber = document.getElementById("cartNumber");

// Get cart contents from localStorage
let basket = JSON.parse(localStorage.getItem("data")) || [];

// Wait for dish data to be available
function getDishData() {
  return new Promise((resolve) => {
    // First check if data is already in localStorage
    const storedData = JSON.parse(localStorage.getItem("dishData"));
    if (storedData && storedData.length > 0) {
      resolve(storedData);
    } else {
      // If not, fetch it directly (backup plan)
      fetch("http://localhost:8080/dish")
        .then(response => response.json())
        .then(data => {
          localStorage.setItem("dishData", JSON.stringify(data));
          resolve(data);
        })
        .catch(err => {
          console.error("Error loading dish data in cart.js:", err);
          resolve([]); // Return empty array if fetch fails
        });
    }
  });
}

// Define totalCartDishes if not already defined
if (typeof window.totalCartDishes === 'undefined') {
  window.totalCartDishes = () => {
    let cartItem = document.getElementById("cartNumber");
    if (cartItem) {
      cartItem.innerHTML = basket
        .map((x) => x.item)
        .reduce((num1, num2) => num1 + num2, 0);
    }
  };
}

totalCartDishes();

// Initialize cart with dish data
getDishData().then(menuItemsData => {
  generateCartItem(menuItemsData);
  totalAmount(menuItemsData);
});

function generateCartItem(menuItemsData) {
  if (basket.length !== 0) {
    shoppingCart.innerHTML = basket.map((x) => {
      let { id, item } = x;
      let search = menuItemsData.find((y) => y.dishId === id) || {};
      
      if (!search.dishName && !search.imageUrl) {
        console.error(`Could not find dish with id: ${id}`);
        console.log("Available dishes:", menuItemsData);
        return "";
      }

      return `
        <div id="dish-card" class="mr-5 item-card d-flex justify-content-center align-items-center position-relative">
          <button id="x-button-container" class="bg-transparent border-0 position-absolute">
            <img id="x-button-img" onclick="removeDish('${id}')" class="img-fluid" src="/BeesBreakfast/Assets/x.png" alt="">
          </button>

          <div class="img-container">
            <img src="${search.imageUrl}" class="img-fluid" alt=""/>
          </div>

          <div>
            <h4 class="title fw-bold my-1">${search.dishName}</h4>
            <p class="my-1">Price: $${search.price} | ${search.calories} Calories</p>

            <div class="d-flex align-items-center">
              <div class="mr-3 d-flex flex-row align-items-center justify-content-around w-50 rounded-pill" id="dishButton">
                <button onclick="decrease('${id}')" class="bg-transparent border-0 h3">-</button>
                <p id="${id}" class="bg-transparent text-center my-auto h4">${item}</p>
                <button onclick="increase('${id}')" class="bg-transparent border-0 h3">+</button>
              </div>
              <h4>$${(item * search.price).toFixed(2)}</h4>
            </div>
          </div>
        </div>
      `;
    }).join("");
  } else {
    shoppingCart.innerHTML = ``;
    title.innerHTML = `
      <h2>Cart Is Empty</h2>
      <a href="/BeesBreakfast/Pages/index.html#menu">
        <button>Return To Menu</button>
      </a>
    `;
    label.innerHTML = ``;
    cartNumber.innerHTML = 0;
  }
}

function totalAmount(menuItemsData) {
  if (basket.length !== 0) {
    let amount = basket
      .map((x) => {
        let { id, item } = x;
        let search = menuItemsData.find((y) => y.dishId === id) || {};
        return item * (search.price || 0);
      })
      .reduce((x, y) => x + y, 0);

    labelTotal.innerHTML = `Total: $${amount.toFixed(2)}`;
  }
}

// These functions use the global basket variable and need to update local storage
let increase = (id) => {
  let search = basket.find((x) => x.id === id);

  if (search === undefined) {
    basket.push({
      id: id,
      item: 1,
    });
  } else {
    search.item += 1;
  }

  getDishData().then(menuItemsData => {
    generateCartItem(menuItemsData);
    totalAmount(menuItemsData);
    update(id);
    localStorage.setItem("data", JSON.stringify(basket));
  });
};

let decrease = (id) => {
  let search = basket.find((x) => x.id === id);

  if (search === undefined || search.item === 0) return;
  search.item -= 1;

  basket = basket.filter((x) => x.item !== 0);
  
  getDishData().then(menuItemsData => {
    generateCartItem(menuItemsData);
    totalAmount(menuItemsData);
    update(id);
    localStorage.setItem("data", JSON.stringify(basket));
  });
};

let update = (id) => {
  let search = basket.find((x) => x.id === id);
  let element = document.getElementById(id);
  if (element && search) {
    element.innerHTML = search.item;
  }
  totalCartDishes();
};

let removeDish = (id) => {
  basket = basket.filter((x) => x.id !== id);
  localStorage.setItem("data", JSON.stringify(basket));
  
  getDishData().then(menuItemsData => {
    generateCartItem(menuItemsData);
    totalAmount(menuItemsData);
  });
};

let clearCart = () => {
  basket = [];
  localStorage.setItem("data", JSON.stringify(basket));
  
  getDishData().then(menuItemsData => {
    generateCartItem(menuItemsData);
    totalAmount(menuItemsData);
  });
};

// Make these functions available to the window
window.increase = increase;
window.decrease = decrease;
window.removeDish = removeDish;
window.clearCart = clearCart;

// Function to push data from the order to Cart
window.checkout = async () => {
  const basket = JSON.parse(localStorage.getItem("data")) || [];
  const dishData = JSON.parse(localStorage.getItem("dishData")) || [];

  if (basket.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  // Pulls userid from local storage
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  if (!user) {
    alert("Please log in before checking out.");
    return;
  }
  const userId = user.userId;
  

  const now = new Date();
  const date = now.toISOString().split("T")[0];
  const time = now.toTimeString().split(" ")[0];

  const orderRequests = basket.map((item) => {
    const dish = dishData.find((d) => d.dishId === item.id);
    return fetch("http://localhost:8080/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        orderId: item.id,
        dishName: dish?.dishName || "Unknown Dish",
        amount: item.item,
        date: date,
        time: time,
      }),
    });
  });

  try {
    await Promise.all(orderRequests);
    alert("Order placed successfully!");
    clearCart();
  } catch (err) {
    console.error("Error posting order:", err);
    alert("Something went wrong placing your order.");
  }
};
