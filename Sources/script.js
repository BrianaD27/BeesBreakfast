let menu = document.getElementById('menu-list');

let basket = JSON.parse(localStorage.getItem("data")) || [];

let generateMenu = () => {
    //.map = for every item in the array which is objects, x will target the attributes.
    return (menu.innerHTML = menuItemsData.map((x)=>{
        let { id, dataTitle, dataPrice, dataCal, img, alt, price, calories } = x;
        let search = basket.find((x) => x.id === id) || [];
        return `
        <div id=dish-id-${id} data-title=${dataTitle} data-price=${dataPrice} data-cal=${dataCal} class="menu-item col-lg-4 col-md-4 col-sm-6 col-6 flex-column align-items-center justify-content text-center">
            <img class="w-50 my-1" src=${img} alt=${alt}>
            <h6 class="title fw-bold my-1">${dataTitle}</h6>
            <p class="my-1" >Price: $${price} | ${calories} Calories</p>

            <div class="d-flex flex-row align-items-center justify-content-around w-50 rounded-pill" id="dishButton">
              <button onclick="decrease(${id})" class="bg-transparent border-0 h3 ">-</button>
              <p id=${id} class="bg-transparent text-center my-auto h4">
              ${search.item === undefined ? 0: search.item}
              </p>
              <button onclick="increase(${id})" class="bg-transparent border-0 h3 ">+</button>
            </div>
        </div>
        `
    }).join("")); //joins items together with no space!
};

generateMenu();

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
    // console.log(basket);
    localStorage.setItem("data", JSON.stringify(basket));
};

let update = (id) => {
    let search = basket.find((x)=> x.id === id);
    document.getElementById(id).innerHTML = search.item;

    totalCartDishes();
};

let totalCartDishes = () => {
    let cartItem = document.getElementById('cartNumber');
    cartItem.innerHTML = basket.map((x)=> x.item).reduce((num1,num2)=>num1+num2,0);
};
totalCartDishes();

// Variable that tracks the amount of selected stars 
let selectedRating = 0;

// Event listener for each star 
document.querySelectorAll(".star").forEach(star => {
    star.addEventListener('click', function () {

        //sets the amount of stars selected via the number from the data-rating value (super smart)
        selectedRating = parseInt(this.getAttribute('data-rating'));

        //Updates the image of the star when clicked
        document.querySelectorAll('.star').forEach((s, index) => {
            s.src = index < selectedRating 
              ? '/BeesBreakfast/Assets/star.png' 
              : '/BeesBreakfast/Assets/greyStar.png';
          });
    });
});

//Handle form submission
document.getElementById('post').addEventListener('click', function(event) {
    event.preventDefault();

    //pull data 
    const name = document.getElementById("review-name").value;
    const review = document.getElementById("review-text").value;

    //Created review object to put in local storage 
    const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    reviews.push({name, review, rating: selectedRating});
    localStorage.setItem('reviews', JSON.stringify(reviews));

    //Clear form fields and resets stars
    document.getElementById('review-name').value = '';
    document.getElementById('review-text').value = '';
    selectedRating = 0;
    document.querySelectorAll('.star').forEach(s => s.src = '/BeesBreakfast/Assets/greyStar.png');

    //Redirects to reviews.html to see review
    window.location.href = "/BeesBreakfast/Pages/reviews.html"; 
})

//Handles file input for profile picture 
const fileInput = document.getElementById('file-input');
const profilePic = document.getElementById('pfp');

fileInput.addEventListener('change', function(upload) {
    const file = upload.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(upload) {
            profilePic.src = upload.target.result;
        }
        reader.readAsDataURL(file);
    }
});

function sortMenuByPrice(order) {
    const menuList = document.getElementById('menu-list'); 
    let menuItems = Array.from(menuList.getElementsByClassName('menu-item')); //Creates Array 

    menuItems.sort((a,b) => {
        const priceA = parseFloat(a.getAttribute('data-price'));
        const priceB = parseFloat(b.getAttribute('data-price'));

        if (order === 'low-to-high') {
            return priceA - priceB;
        } else if (order === 'high-to-low') {
            return priceB - priceA;
        }
    });

    menuItems.forEach(item => menuList.appendChild(item));
}

function sortMenuByCals(order) {
    const menuList = document.getElementById('menu-list'); 
    let menuItems = Array.from(menuList.getElementsByClassName('menu-item')); //Creates Array 

    menuItems.sort((a,b) => {
        const priceA = parseFloat(a.getAttribute('data-cal'));
        const priceB = parseFloat(b.getAttribute('data-cal'));

        if (order === 'low-to-high') {
            return priceA - priceB;
        } else if (order === 'high-to-low') {
            return priceB - priceA;
        }
    });

    menuItems.forEach(item => menuList.appendChild(item));
}

function search() {
    const input = document.getElementById('search-item').value.toUpperCase();
    const menuItems = document.querySelectorAll('.menu-item');

    menuItems.forEach(item => {
        const title = item.getAttribute('data-title').toUpperCase();

        if (title.includes(input)) {
            item.style.display = "";
        } else {
            item.style.display = "none";
        }
    }); 

}

function searchMobile() {
    const input = document.getElementById('search-item-mobile').value.toUpperCase();
    const menuItems = document.querySelectorAll('.menu-item');

    menuItems.forEach(item => {
        const title = item.getAttribute('data-title').toUpperCase();

        if (title.includes(input)) {
            item.style.display = "";
        } else {
            item.style.display = "none";
        }
    }); 

}

//Google Maps Script
var map; 
var service;
var infowindow;

function initialize() {
    var pyrmont = new google.maps.LatLng(37.2279,-77.4019);

    map = new google.maps.Map(document.getElementById('map'),{
        center: pyrmont,
        zoom: 15
    })

    var input = document.getElementById('searchTextField')

    let autocomplete = new google.maps.places.Autocomplete(input)

    autocomplete.bindTo('bounds', map)

    let marker = new google.maps.Marker({
        map:map
    })

    google.maps.event.addListener(autocomplete, 'place_changed', () => {
        let place = autocomplete.getPlace()
        console.log(place)
        console.log(place.photos[0].getUrl())

        if(place.geometry.viewport){
            map.fitBounds(place.geometry.viewport)
        } else {
            map.setCenter(place.geometry.location)
            map.setZoom(17)
        }

        marker.setPosition(place.geometry.location)
        marker.setVisible(true)

        var request = {
            location: place.geometry.location,
            radius: '500',
            type: ['doctor']
        }

        service = new google.maps.places.PlacesService(map)
        service.nearbySearch(request, callback)
    })
}

function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i =0; i< results.length; i++ ) {
            var place = results[i];
            createMarker(results[i]);
        }
    }
}

function createMarker(place) {
    var marker = new google.maps.Marker({
        map:map,
        position: place.geometry.location
    });

    google.maps.event.addListener (marker, 'click', function () {
        alert(place.name);
        window.open(place.photos[0].getUrl(), "_blank");
        infowindow.open(map, this);
    });
}

google.maps.event.addDomListener(window, 'load', initialize)

