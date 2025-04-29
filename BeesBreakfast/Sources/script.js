// // ===== script.js =====

// // Grab the menu container from the HTML so we can put dishes inside it
// let menu = document.getElementById("menu-list");

// // If the shopping cart (called basket) doesn’t exist yet, create it from saved data or make a new one
// if (typeof window.basket === 'undefined') {
//   window.basket = JSON.parse(localStorage.getItem("data")) || [];
// }

// // This updates the number shown next to a dish when we add or remove it
// function update(id) {
//   let search = basket.find((x) => x.id === id);
//   document.getElementById(id).innerHTML = search?.item || 0;
//   totalCartDishes(); // also update the cart number in the top right
// }

// // This counts how many total items are in the basket and shows it in the cart icon
// function totalCartDishes() {
//   let cartItem = document.getElementById("cartNumber");
//   if (cartItem) {
//     cartItem.innerHTML = basket.map((x) => x.item).reduce((a, b) => a + b, 0);
//   }
// }

// totalCartDishes(); // Call it once when page loads

// // If we are on the menu page, fetch dish data from the server
// if (menu) {
//   fetch("http://localhost:8080/dish") // Ask the server for dish info
//     .then((response) => response.json()) // Turn it into real JavaScript
//     .then((data) => {
//       localStorage.setItem("dishData", JSON.stringify(data)); // Save dish data so other pages can use it later

//       renderMenu(data);         // Show the dishes on screen
//       setupSearchAndSort(data); // Make search and sort work

//       // Make sorting work when clicking price buttons
//       window.sortMenuByPrice = function (direction) {
//         let sorted = [...data].sort((a, b) => {
//           return direction === 'high-to-low' ? b.price - a.price : a.price - b.price;
//         });
//         renderMenu(sorted);
//       };

//       // Make sorting work when clicking calorie buttons
//       window.sortMenuByCals = function (direction) {
//         let sorted = [...data].sort((a, b) => {
//           return direction === 'high-to-low' ? b.calories - a.calories : a.calories - b.calories;
//         });
//         renderMenu(sorted);
//       };

//       // This is for mobile search bar
//       window.searchMobile = function () {
//         let mobileSearch = document.getElementById("search-item-mobile");
//         if (!mobileSearch) return;

//         let keyword = mobileSearch.value.toLowerCase();
//         let filtered = data.filter((item) =>
//           item.dishName.toLowerCase().includes(keyword)
//         );
//         renderMenu(filtered); // Only show matching items
//       };
//     })
//     .catch((err) => console.error("Error loading menu from API:", err));
// }

// // This function puts each dish onto the page
// function renderMenu(data) {
//   menu.innerHTML = data
//     .map((x) => {
//       const { dishId, dishName, price, calories, imageUrl } = x;
//       let search = basket.find((item) => item.id === dishId) || {};

//       // We return a little HTML card with all the dish details
//       return `
//         <div id="dish-id-${dishId}" data-title="${dishName}" data-price="${price}" data-cal="${calories}" class="menu-item col-lg-4 col-md-4 col-sm-6 col-6 flex-column align-items-center justify-content text-center">
//             <img class="w-50 my-1" src="${imageUrl}" alt="${dishName}">
//             <h6 class="title fw-bold my-1">${dishName}</h6>
//             <p class="my-1">Price: $${price} | ${calories} Calories</p>
//             <div class="d-flex flex-row align-items-center justify-content-around w-50 rounded-pill" id="dishButton">
//               <button onclick="decrease('${dishId}')" class="bg-transparent border-0 h3">-</button>
//               <p id="${dishId}" class="bg-transparent text-center my-auto h4">
//                 ${search.item || 0}
//               </p>
//               <button onclick="increase('${dishId}')" class="bg-transparent border-0 h3">+</button>
//             </div>
//         </div>
//       `;
//     })
//     .join(""); // Turn all items into one big HTML string
// }

// // This makes the search bar and dropdown sort work
// function setupSearchAndSort(data) {
//   const searchBar = document.getElementById("search-item");
//   const sortSelect = document.getElementById("sort-options");

//   if (searchBar) {
//     searchBar.addEventListener("input", () => {
//       let keyword = searchBar.value.toLowerCase();
//       let filtered = data.filter((item) =>
//         item.dishName.toLowerCase().includes(keyword)
//       );
//       renderMenu(filtered); // Show matching items
//     });
//   }

//   if (sortSelect) {
//     sortSelect.addEventListener("change", () => {
//       let sortedData = [...data];
//       if (sortSelect.value === "price-asc") {
//         sortedData.sort((a, b) => a.price - b.price);
//       } else if (sortSelect.value === "price-desc") {
//         sortedData.sort((a, b) => b.price - a.price);
//       }
//       renderMenu(sortedData); // Show sorted items
//     });
//   }
// }

// // This adds 1 to a dish in the basket when you click +
// if (typeof window.increase === 'undefined') {
//   window.increase = function (id) {
//     let search = basket.find((x) => x.id === id);
//     if (!search) {
//       basket.push({ id, item: 1 });
//     } else {
//       search.item += 1;
//     }
//     update(id);
//     localStorage.setItem("data", JSON.stringify(basket));
//   };
// }

// // This subtracts 1 from a dish in the basket when you click -
// if (typeof window.decrease === 'undefined') {
//   window.decrease = function (id) {
//     let search = basket.find((x) => x.id === id);
//     if (!search || search.item === 0) return;
//     search.item -= 1;
//     basket = basket.filter((x) => x.item !== 0);
//     update(id);
//     localStorage.setItem("data", JSON.stringify(basket));
//   };
// }

// ===== script.js =====

// Grab the menu container from the HTML so we can put dishes inside it
let menu = document.getElementById("menu-list");

// If the shopping cart (called basket) doesn’t exist yet, create it from saved data or make a new one
if (typeof window.basket === 'undefined') {
  window.basket = JSON.parse(localStorage.getItem("data")) || [];
}

// This updates the number shown next to a dish when we add or remove it
function update(id) {
  let search = basket.find((x) => x.id === id);
  document.getElementById(id).innerHTML = search?.item || 0;
  totalCartDishes(); // also update the cart number in the top right
}

// This counts how many total items are in the basket and shows it in the cart icon
function totalCartDishes() {
  let cartItem = document.getElementById("cartNumber");
  if (cartItem) {
    cartItem.innerHTML = basket.map((x) => x.item).reduce((a, b) => a + b, 0);
  }
}

totalCartDishes(); // Call it once when page loads

// Always fetch dish data (for menu or order page)
fetch("http://localhost:8080/dish")
  .then((response) => response.json())
  .then((data) => {
    localStorage.setItem("dishData", JSON.stringify(data)); // Save so cart.js can use it too

    if (menu) {
      renderMenu(data);
      setupSearchAndSort(data);

      window.sortMenuByPrice = function (direction) {
        let sorted = [...data].sort((a, b) =>
          direction === 'high-to-low' ? b.price - a.price : a.price - b.price
        );
        renderMenu(sorted);
      };

      window.sortMenuByCals = function (direction) {
        let sorted = [...data].sort((a, b) =>
          direction === 'high-to-low' ? b.calories - a.calories : a.calories - b.calories
        );
        renderMenu(sorted);
      };

      window.searchMobile = function () {
        let mobileSearch = document.getElementById("search-item-mobile");
        if (!mobileSearch) return;

        let keyword = mobileSearch.value.toLowerCase();
        let filtered = data.filter((item) =>
          item.dishName.toLowerCase().includes(keyword)
        );
        renderMenu(filtered);
      };
    }
  })
  .catch((err) => console.error("Error loading dish data:", err));

// This function puts each dish onto the page
function renderMenu(data) {
  menu.innerHTML = data
    .map((x) => {
      const { dishId, dishName, price, calories, imageUrl } = x;
      let search = basket.find((item) => item.id === dishId) || {};

      // We return a little HTML card with all the dish details
      return `
        <div id="dish-id-${dishId}" data-title="${dishName}" data-price="${price}" data-cal="${calories}" class="menu-item col-lg-4 col-md-4 col-sm-6 col-6 flex-column align-items-center justify-content text-center">
            <img class="w-50 my-1" src="${imageUrl}" alt="${dishName}">
            <h6 class="title fw-bold my-1">${dishName}</h6>
            <p class="my-1">Price: $${price} | ${calories} Calories</p>
            <div class="d-flex flex-row align-items-center justify-content-around w-50 rounded-pill" id="dishButton">
              <button onclick="decrease('${dishId}')" class="bg-transparent border-0 h3">-</button>
              <p id="${dishId}" class="bg-transparent text-center my-auto h4">
                ${search.item || 0}
              </p>
              <button onclick="increase('${dishId}')" class="bg-transparent border-0 h3">+</button>
            </div>
        </div>
      `;
    })
    .join(""); // Turn all items into one big HTML string
}

// This makes the search bar and dropdown sort work
function setupSearchAndSort(data) {
  const searchBar = document.getElementById("search-item");
  const sortSelect = document.getElementById("sort-options");

  if (searchBar) {
    searchBar.addEventListener("input", () => {
      let keyword = searchBar.value.toLowerCase();
      let filtered = data.filter((item) =>
        item.dishName.toLowerCase().includes(keyword)
      );
      renderMenu(filtered); // Show matching items
    });
  }

  if (sortSelect) {
    sortSelect.addEventListener("change", () => {
      let sortedData = [...data];
      if (sortSelect.value === "price-asc") {
        sortedData.sort((a, b) => a.price - b.price);
      } else if (sortSelect.value === "price-desc") {
        sortedData.sort((a, b) => b.price - a.price);
      }
      renderMenu(sortedData); // Show sorted items
    });
  }
}

// This adds 1 to a dish in the basket when you click +
if (typeof window.increase === 'undefined') {
  window.increase = function (id) {
    let search = basket.find((x) => x.id === id);
    if (!search) {
      basket.push({ id, item: 1 });
    } else {
      search.item += 1;
    }
    update(id);
    localStorage.setItem("data", JSON.stringify(basket));
  };
}

// This subtracts 1 from a dish in the basket when you click -
if (typeof window.decrease === 'undefined') {
  window.decrease = function (id) {
    let search = basket.find((x) => x.id === id);
    if (!search || search.item === 0) return;
    search.item -= 1;
    basket = basket.filter((x) => x.item !== 0);
    update(id);
    localStorage.setItem("data", JSON.stringify(basket));
  };
}