
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
  import { getDatabase, ref, set, remove, onValue } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-database.js";

  const firebaseConfig = {
    apiKey: "AIzaSyAgc0tYF5WXG_kArW0h3YAnQ_BKjPXJZOw",
    authDomain: "presentia-55b8b.firebaseapp.com",
    databaseURL: "https://presentia-55b8b-default-rtdb.firebaseio.com",
    projectId: "presentia-55b8b",
    storageBucket: "presentia-55b8b.firebasestorage.app",
    messagingSenderId: "28781643269",
    appId: "1:28781643269:web:16fa963453ab31c9e43e6c"
  };

  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);
  const wishlistTable = document.getElementById("wishlistTable");

  const fetchWishlist = () => {
    const wishlistRef = ref(db, "wishlist/");
    onValue(wishlistRef, (snapshot) => {
      wishlistTable.innerHTML = ""; // Clear table
      const wishlist = snapshot.val();
      if (wishlist) {
        Object.keys(wishlist).forEach((key) => {
          const item = wishlist[key];
          const stockStatus = item.stock; // Ensure accurate stock status
          const row = `
            <tr>
              <td style="display: flex; align-items: center;">
                <img src="${item.image}" alt="${item.title}" style="width: 50px; height: 50px; margin-right: 10px;">
                ${item.title}
              </td>
              <td>${item.price}</td>
              <td>
                <span class="stock-status ${stockStatus ? 'available' : 'unavailable'}">
                  ${stockStatus ? "In Stock" : "Out of Stock"}
                </span>
              </td>
              <td>
                <button 
                  class="add-to-cart-btn ${stockStatus ? 'active' : 'disabled'}"
                  ${stockStatus ? "" : "disabled"}
                  onclick="addToCart('${key}')"
                >
                  Add to Cart
                </button>
               
              </td>
              <td>
                <button class="remove-btn" onclick="removeItem('${key}')">
                  Remove
                </button>
              </td>
            </tr>
          `;
          wishlistTable.insertAdjacentHTML("beforeend", row);
        });
      }
    });
  };

  const addItem = (id, title, price, stock, image) => {
    const wishlistRef = ref(db, `wishlist/${id}`);
    set(wishlistRef, { id, title, price, stock, image });
  };

  const removeItem = (id) => {
    const itemRef = ref(db, `wishlist/${id}`);
    remove(itemRef);
  };

  const addToCart = (id) => {
    alert(`Item ${id} added to cart!`);
  };

  const buyNow = (id) => {
    alert(`Buying item ${id} now!`);
  };

  fetchWishlist();
