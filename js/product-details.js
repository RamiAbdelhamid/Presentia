import { database, ref, set, get } from "./shared/config.js";
import { push } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-database.js";
import { monitorAuthState } from './shared/auth.js';

// (1) Function to handle checkout logic and display product details
async function getProductData(productId) {
    const productRef = ref(database, 'products/' + productId);
    const snapshot = await get(productRef);
    
    if (snapshot.exists()) {
        return snapshot.val(); 
    } else {
        console.log('No product data found');
        return null;
    }
}

// (2) Function to display product details on the page
async function displayProductDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('cardId'); 
    
    if (productId) {
        const productData = await getProductData(productId);
        
        if (productData) {
            // Display product title
            const titleElement = document.querySelector(".pro-d-title a");
            if (titleElement) {
                titleElement.textContent = productData.title.toUpperCase();
                titleElement.href = "#";
            }
            
            // Display product price
            const priceElement = document.querySelector(".pro-price");
            if (priceElement) {
                priceElement.textContent = `$${productData.price}`;
            }
            
            // Display product image
            const imgElement = document.querySelector(".pro-img-details img");
            if (imgElement) {
                imgElement.src = productData.image; 
            }
            
            // Display product description
            const descriptionElement = document.querySelector(".pro-d-title + p");
            if (descriptionElement) {
                descriptionElement.textContent = productData.description;
            }
            
            // Display product categories
            const categoryElement = document.querySelector(".categories");
            if (categoryElement) {
                categoryElement.textContent = productData.category.toLowerCase();
            }
        }
    } else {
        alert('No product selected');
    }
}

// (3) Function to get the logged-in user's name from localStorage
async function getUserName() {
    const userId = localStorage.getItem('userId'); // Retrieve the userId from localStorage

    if (!userId) {
        return 'Visitor'; // If no userId is found, return 'Visitor'
    }

    const userRef = ref(database, 'users/' + userId); // Reference to the user's data in Firebase
    const snapshot = await get(userRef); // Fetch user data from Firebase

    if (snapshot.exists()) {
        const userData = snapshot.val(); // Retrieve user data
        const fName = userData.firstName;
        const lName = userData.lastName;
        console.log(`${fName || ''} ${lName || ''}`.trim())
        return `${fName || ''} ${lName || ''}`.trim(); // Return the full name or a trimmed empty string if not found
    } else {
        console.error('User data not found in Firebase');
        return 'Visitor'; // Default to 'Visitor' if user data is not found
    }
}


// (4) Function to display product reviews
// (4) Function to display product reviews
async function displayReviews(productId) {
    const reviewsRef = ref(database, 'reviews/' + productId);
    const snapshot = await get(reviewsRef); // Fetch reviews from the Firebase database
    
    const reviewsContainer = document.querySelector(".reviews");
    reviewsContainer.innerHTML = ''; // Clear any existing reviews
    
    if (snapshot.exists()) {
        const reviews = snapshot.val(); // Get the reviews data
        for (const review of Object.values(reviews)) {
            const reviewElement = document.createElement('div');
            reviewElement.classList.add('review');
            
            // Await the user's name to display properly
            const userName = await getUserName();
            
            reviewElement.innerHTML = `
                <h5>${userName}</h5>
                <p>${review.comment}</p>
            `;
            reviewsContainer.appendChild(reviewElement); // Append each review to the reviews container
        }
    } else {
        reviewsContainer.innerHTML = '<p>No reviews found.</p>';
    }
}


// (5) Function to add a new review to Firebase
async function addReview(productId, comment) {
    const userName = await  getUserName(); // Get the logged-in user's name
    const newReviewRef = push(ref(database, 'reviews/' + productId)); // Create a new review reference
    await set(newReviewRef, {
        user: userName,
        comment: comment,
    });

    // After adding, refresh the reviews section
    displayReviews(productId);
}

// (6) Event listener to handle the submit event for adding a new review
document.querySelector('form').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent form submission from reloading the page
    
    const textarea = document.querySelector('form textarea');
    const comment = textarea.value.trim(); // Get the comment value from the textarea
    
    if (comment) {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('cardId'); // Get the productId from URL params
        
        if (productId) {
            await addReview(productId, comment); // Add the review to Firebase
            textarea.value = ''; // Clear the textarea after submission
        }
    }
});

// (7) Call the displayProductDetails and displayReviews functions when the page loads
document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('cardId'); // Get the productId from URL params
    
    if (productId) {
        await displayProductDetails(); // Display product details
        await displayReviews(productId); // Display product reviews
    }
});
