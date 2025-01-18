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
}, 5000);

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
  apiKey: "AIzaSyD-1whEUJkPFDsGplbPI-sSB6ck4bpTbBQ",
  authDomain: "realtime-c0239.firebaseapp.com",
  databaseURL: "https://realtime-c0239-default-rtdb.firebaseio.com",
  projectId: "realtime-c0239",
  storageBucket: "realtime-c0239.firebasestorage.app",
  messagingSenderId: "657803082414",
  appId: "1:657803082414:web:db894345dedca8d669cb3f",
  measurementId: "G-XN2P7WPXHB",
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








// Listen for data changes
const starCountRef = ref(database, "users/");
onValue(starCountRef, (snapshot) => {
  const data = snapshot.val();

  let formattedData = "";

  if (!data) {
    // If no data exists, clear the DOM or show a message
    formattedData = "<p>No data available.</p>";
  } else {
    // If data exists, create cards
    Object.keys(data).forEach((userId) => {
      const user = data[userId];

      formattedData += `
        <div class="cardfetch" >
          <img src="${user.pic}" alt="User Profile Picture" style="width:500px; height:200px; class="card-img";>
          <hr>
          <p>Name: ${user.name}</p>
          <p>Description: ${user.Description}</p>
          <div style="height: 20px;"></div>
          <p>Price: ${user.price}</p>
        </div>
      `;
    });
  }

  // Display formatted data in the DOM
  document.getElementById("cards-containerz").innerHTML = formattedData;
});






// reviews

// Listen for data changes
const reviewsRef = ref(database, "reviews/");
onValue(reviewsRef, (snapshot) => {
  const data = snapshot.val();

  let formattedReviews = "";
  let formattedReviewsname = "";

  if (!data) {
    // If no reviews exist, show a message
    formattedReviews =
      "<p>No reviews available yet. Be the first to review!</p>";
 formattedReviewsname =
    "<p>No reviews available yet. Be the first to review!</p>";


  } else {
    // If reviews exist, create review cards
    for (const reviewId in data) {
      if (data.hasOwnProperty(reviewId)) {
        const review = data[reviewId];

        formattedReviews += `<p> ${review.comment}</p>`;
        formattedReviews += `<div style="height: 20px;"></div>`; // Spacer

formattedReviewsname += `
  <p style="color: var(--primary-color); font-size: 1rem; font-weight: 500;">
    <strong></strong> ${review.name}
  </p>`;

      }
    }
  }

  // Display reviews in the DOM
  document.getElementById("reviwes").innerHTML = formattedReviews;
    document.getElementById("reviwesn").innerHTML = formattedReviewsname;

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