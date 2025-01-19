// checkout.js

// (1) Import Firebase dependencies
import { database } from "./shared/config.js";
import { ref, get } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-database.js";

// (2) Function to get Product Data from Firebase by productId
function getProductData(productId) {
    return get(ref(database, 'products/' + productId))
        .then((snapshot) => {
            if (snapshot.exists()) {
                const product = snapshot.val();
                const price = product.price;
                return price; // Return price for use in checkout
            } else {
                alert('Product not found');
                return null;
            }
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
            return null;
        });
}

// (3) Function to handle checkout logic and display price
async function handleCheckout() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('cardId');
    
    if (productId) {
        // Get the price of the selected product
        const price = await getProductData(productId);
        if (price !== null) {
            // Display the price on the checkout page
            const checkoutTotalElement = document.querySelector(".checkout-total"); 
            if (checkoutTotalElement) {
                checkoutTotalElement.textContent = `$${price}`; // Format as currency
            }
            // Log for debugging
            console.log("Proceeding with checkout, total price:", price);
        }
    } else {
        alert('No product selected for checkout');
    }
}

// (4) Call the handleCheckout function when the checkout page loads
document.addEventListener('DOMContentLoaded', handleCheckout);
