// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getDatabase,
    ref,
    onValue, } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-database.js";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBntQeSVrkCU0t31WU0jNejuBTwFXimrqA",
  authDomain: "presentia-project2025.firebaseapp.com",
  databaseURL: "https://presentia-project2025-default-rtdb.firebaseio.com",
  projectId: "presentia-project2025",
  storageBucket: "presentia-project2025.firebasestorage.app",
  messagingSenderId: "690855895947",
  appId: "1:690855895947:web:25b7bccfa92caee879858e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
export { database };



// Listen for data changes
const starCountRef = ref(database, "products/");
onValue(starCountRef, (snapshot) => {
  const data = snapshot.val();

  let formattedData = "";

  if (!data) {
    
    formattedData = "<p>No data available.</p>";
  } else {
    
    for (const productId in data) {
      if (data.hasOwnProperty(productId)) {
        const product = data[productId];
        
        formattedData += `
          <div class="col-sm-6 col-md-4 col-lg-3">
            <div class="box">
              <a href="" class="text-decoration-none">
                <div class="img-box">
                  <img src="${product.image}" alt="">
                </div>
                <hr>
                <div class="detail-box">
                  <h6 class="title">
                    ${product.title}
                  </h6>
                  <h6>
                    <span>
                      ${product.price}
                    </span>
                  </h6>
                </div>
                <div class="position-absolute d-flex align-items-center justify-content-center" 
                  style="top: 0.5rem; left: 0.5rem; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); transition: transform 0.3s ease-in-out;">
                  <i class="fas fa-heart text-danger" style="font-size: 1.2rem; transition: transform 0.3s ease-in-out;"></i>
                </div>
                <div class="description">
                  <p class="title" style="font-family: 'Space Grotesk', sans-serif;">${product.description}</p>
                </div>
                <button class="container-fluid buy-now">BUY NOW</button>
              </a>
            </div>
          </div>
        `;
      }
    }
  }
 
  document.getElementById("product-container").innerHTML = formattedData;
});

