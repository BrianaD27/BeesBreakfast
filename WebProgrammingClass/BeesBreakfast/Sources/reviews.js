window.addEventListener('load', function() {
    const reviewsContainer = document.getElementById('reviews-container');
    const reviews = JSON.parse(localStorage.getItem('reviews')) || [];

    reviews.forEach(review => {
        //Create a container for each review 
        const reviewContainer = document.createElement('div');
        reviewContainer.className = 'col-12 col-md-4 col-lg-3 col-sm-12';

        //Generate star based on rating 
        let starsHTML = '';
        for (let i = 0; i<5; i++) {
            starsHTML += i <  review.rating ? '<img class="img-fluid" src="/BeesBreakfast/Assets/star.png" alt="">' 
              : '<img class="img-fluid" src="/BeesBreakfast/Assets/greyStar.png" alt="">';
        }

        //Insert review content
        reviewContainer.innerHTML = `
                <div class="topReview d-flex flex-row justify-content-start align-items-center">
                    <img class="pfp img-fluid" src="/BeesBreakfast/Assets/smallPfp.png" alt="" srcset="">
                    <p>${review.name}</p>
                </div>

                <div class="bottomReview">
                    ${starsHTML}
                    <p>${review.review}</p>
                </div>
        `
        
        // Append to the reviews container
        reviewsContainer.appendChild(reviewContainer);
    })
    
})