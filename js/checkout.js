// (1) Import
import { database } from "./shared/config.js";
import { ref, get } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-database.js";

// (2) Function to get Price from Firebase
function getProductData(productId) {
    get(ref(database, 'products/' + productId))
        .then((snapshot) => {
            if (snapshot.exists()) {
                const product = snapshot.val();
                const price = product.price;
                const totalPriceElement = document.querySelector(".d-flex.justify-content-between.mb-4.small strong.text-dark");
                if (totalPriceElement) {
                    totalPriceElement.textContent = `$${price}`;
                }
                
            } else {
                alert('Product not found');
            }
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
}

const productCard = document.querySelector(".product-card");
const productId = 'productid11'
if (productId) {
    getProductData(productId);
} else {
    alert('No product ID found on card');}