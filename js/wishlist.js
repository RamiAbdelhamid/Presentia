const firebaseConfig = {
  apiKey: "AIzaSyDyZX5XE9X5_YLrsiNY6k2oxSPEyLU7Oa4",
  authDomain: "ahmad-e97be.firebaseapp.com",
  projectId: "ahmad-e97be",
  storageBucket: "ahmad-e97be.firebasestorage.app",
  messagingSenderId: "121003235207",
  appId: "1:121003235207:web:714704f916ea59b1552522",
  measurementId: "G-XK1EWE6Q3K",
};

const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database(app);

const wishlistTable = document.getElementById("wishlistTable");

function deleteItem(itemKey) {
  const itemRef = database.ref("Wishlist").child(itemKey);

  itemRef
    .remove()
    .then(() => {
      console.log("Item deleted successfully");
      loadWishlist();
    })
    .catch((error) => {
      console.error("Error deleting item:", error);
    });
}

function loadWishlist() {
  const wishlistRef = database.ref("Wishlist");
  wishlistRef.once("value", (snapshot) => {
    const wishlist = snapshot.val();
    console.log(wishlist);

    wishlistTable.innerHTML = "";

    if (wishlist === null) {
      // Wishlist collection does not exist
      wishlistTable.innerHTML =
        "<tr><td colspan='5' class='text-center'>No products added to your wishlist.</td></tr>";
    } else if (Object.keys(wishlist).length === 0) {
      // Wishlist exists but is empty
      wishlistTable.innerHTML =
        "<tr><td colspan='5' class='text-center'>No products added to your wishlist.</td></tr>";
    } else {
      // Wishlist has items, load them
      for (const key in wishlist) {
        const item = wishlist[key];
        const row = `
          <tr>
              <td width="45%">
                  <div class="display-flex align-center">
                      <div class="img-product">
                          <img src="${item.image}" alt="${
          item.title
        }" class="mCS_img_loaded">
                      </div>
                      <div class="name-product">
                          ${item.title}
                      </div>
                  </div>
              </td>
              <td width="15%" class="price">$${item.price}</td>
              <td width="15%">
                  <span class="${
                    item.Stock === "true" ? "in-stock-box" : "out-of-stock-box"
                  }">
                      ${item.Stock === "true" ? "In Stock" : "Out of Stock"}
                  </span>
              </td>
              <td width="15%">
                  <button class="round-black-btn small-btn" ${
                    item.Stock === "false" ? "disabled" : ""
                  }>Add to Cart</button>
              </td>
              <td width="10%" class="text-center">
                  <a href="#" class="trash-icon" onclick="deleteItem('${key}')">
                      <i class="far fa-trash-alt"></i>
                  </a>
              </td>
          </tr>
        `;
        wishlistTable.innerHTML += row;
      }
    }
  });
}

loadWishlist();
