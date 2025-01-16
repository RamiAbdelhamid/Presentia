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
}, 20000);
