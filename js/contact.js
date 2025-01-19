import { database, ref, set } from "./shared/config.js";

function submitContactForm(name, email, phone, message) {
  set(ref(database, "contact/") , {
    name: name,
    email: email,
    phone: phone,
    message: message,
    timestamp: new Date().toISOString(),
  })
  
    .then(() => {
      alert("Data saved successfully!");
    })
    .catch((error) => {
      alert("error!"+ error);
    });
   
}

document.getElementById("contactForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const message = document.getElementById("message").value;

   if (!name || !email || !phone || !message) {
     alert("All fields are required. Please fill out the form completely.");
     return;
   }

  submitContactForm(name, email, phone, message);
});
