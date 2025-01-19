import { database, ref } from './shared/config.js'
import { onValue, } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-database.js";


// Listen for data changes
const starCountRef = ref(database, "products/");
onValue(starCountRef, (snapshot) => {
  const data = snapshot.val();
  displayProducts(data);
});

// Function to display products
function displayProducts(data, filterCategory = "all") {
  let formattedData = "";

  if (!data) {
    formattedData = "<p>No data available.</p>";
  } else {
    for (const productId in data) {
      if (data.hasOwnProperty(productId)) {
        const product = data[productId];

        // Check category filter
        if (
          filterCategory === "all" ||
          (filterCategory === "option-1" && product.category === "flowerBouquets") ||
          (filterCategory === "option-2" && product.category === "Chocolate bouquets") ||
          (filterCategory === "option-3" && product.category === "Candy bouquets")
        ) {
          formattedData += `
            <div class="col-sm-6 col-md-4 col-lg-3">
              <a href="product-details.html?cardId=${productId}" class="text-decoration-none">
                <div class="box">
                  <div class="img-box">
                    <img src="${product.image}" alt="">
                  </div>
                  <hr>
                  <div class="detail-box">
                    <h6 class="title">${product.title}</h6>
                    <h6><span>${product.price}</span></h6>
                  </div>
                  <div class="description">
                    <p class="title">${product.description}</p>
                  </div></a>
                  <a href="checkout.html?cardId=${productId}" class="text-decoration-none">
                    <button class="container-fluid buy-now">BUY NOW</button>
                  </a>
                </div>
            </div>
          `;
        }
      }
    }
  }

  document.getElementById("product-container").innerHTML = formattedData;
}

// Listen for dropdown changes
document.querySelectorAll('.options input[type="radio"]').forEach((input) => {
  input.addEventListener('change', (event) => {
    const selectedCategory = event.target.id;

    // Fetch and filter products based on the selected category
    const starCountRef = ref(database, "products/");
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      displayProducts(data, selectedCategory);
    });
  });
});
