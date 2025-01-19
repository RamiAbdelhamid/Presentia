// heart waterfall//*************************************************************
const heartContainer = document.querySelector(".heart-container");

function createFallingHeart() {
  const heart = document.createElement("div");
  heart.classList.add("heart");

  // Randomize the horizontal position
  heart.style.left = Math.random() * 100 + "vw";

  // Randomize the size and animation duration
  heart.style.width = heart.style.height = Math.random() * 20 + 10 + "px";
  heart.style.animationDuration = Math.random() * 2 + 3 + "s";

  heartContainer.appendChild(heart);

  // Remove the heart after it falls off the screen
  setTimeout(() => {
    heart.remove();
  }, 5000);
}

// Start generating hearts and stop after 15 seconds
const heartInterval = setInterval(createFallingHeart, 200);
setTimeout(() => {
  clearInterval(heartInterval); // Stop generating hearts after 15 seconds
}, 2500);

// end heart waterfall//**********************************************************










// Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  onValue,
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-database.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyAgc0tYF5WXG_kArW0h3YAnQ_BKjPXJZOw",
    authDomain: "presentia-55b8b.firebaseapp.com",
    databaseURL: "https://presentia-55b8b-default-rtdb.firebaseio.com",
    projectId: "presentia-55b8b",
    storageBucket: "presentia-55b8b.firebasestorage.app",
    messagingSenderId: "28781643269",
    appId: "1:28781643269:web:16fa963453ab31c9e43e6c",
  };


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
export { database };

// function writeUserData(userId, name, email, price) {
//   const db = getDatabase();
//   set(ref(db, "users/" + userId), {
//     name: name,
//     email: email,
//     // profile_picture: "https://picsum.photos/seed/picsum/200/300", // Add the image URL
//     price: price,
//   });
// }

// Example: Write data
// writeUserData(1, "rami", "rami@gamil.com", "5 JD");








// // Listen for data changes
// const starCountRef = ref(database, "products/");
// onValue(starCountRef, (snapshot) => {
//   const data = snapshot.val();

//   let formattedData = "";

//   if (!data) {
//     // If no data exists, clear the DOM or show a message
//     formattedData = "<p>No data available.</p>";
//   } else {
//     // If data exists, create cards
//  const productKeys = Object.keys(data); // Get all keys of the data
//  productKeys.slice(0, 8).forEach((userId) => {
//    // Limit to 8 cards
//    const products = data[userId];

//    formattedData += `
//         <div class="cardfetch" >
//           <img src="${products.image}" alt="User Profile Picture" style="width:500px; height:200px; class="card-img";>
//           <hr>
//           <p> ${products.title}</p>
//           <p>${products.description}</p>
//           <div style="height: 20px;"></div>
//           <p>Price: ${products.price}</p>
//         </div>
//       `;
//  });
//   }

//   // Display formatted data in the DOM
//   document.getElementById("cards-containerz").innerHTML = formattedData;
// });




// reviews

// Listen for data changes
const reviewsRef = ref(database, "reviews/");
onValue(reviewsRef, (snapshot) => {
  const data = snapshot.val();

  const reviewBoxes = document.querySelectorAll(".cardreviwe .card__details"); // Select all review boxes

  // Clear all review boxes
  reviewBoxes.forEach((box) => {
    box.innerHTML = ""; // Clear content of each review box
  });

  if (!data) {
    // If no reviews exist, show a message in the first box
    if (reviewBoxes[0]) {
      reviewBoxes[0].innerHTML =
        "<p>No reviews available yet. Be the first to review!</p>";
    }
  } else {
    // If reviews exist, distribute them across the boxes
    const reviewArray = Object.values(data); // Convert data to an array
    reviewArray.forEach((review, index) => {
      if (reviewBoxes[index]) {
        // Ensure the box exists for this review
        reviewBoxes[index].innerHTML = `
          <p>${review.reviewText}</p>
          <h4>${review.reviewerName}</h4>
        `;
      }
    });
  }
});
















// upward arrow hidden in top
document.addEventListener("DOMContentLoaded", () => {
  const backToTopButton = document.querySelector(".back-to-top");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 200) {
      // يظهر السهم عند تجاوز 200 بكسل من التمرير
      backToTopButton.classList.add("visible");
    } else {
      backToTopButton.classList.remove("visible");
    }
  });

  backToTopButton.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" }); // التمرير للأعلى بسلاسة
  });
});





// whatsapp 

// Opens sticky-chat automatically within 5 seconds of page load
document.addEventListener("DOMContentLoaded", function () {
  setTimeout(function () {
    document.getElementById("offchat-menu").checked = true;
  }, 5000);
});