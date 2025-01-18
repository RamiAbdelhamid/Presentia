// (1) Imports
import { auth, createUserWithEmailAndPassword, ref, set, database } from './shared/config.js';


//----------------------------- DOM Elements -----------------------------//
const registrationForm = document.getElementById('registration-form');
const alertContainer = document.getElementById('alert-container');


//--------------------------------- Form ---------------------------------//
registrationForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Get form field values
    const firstName = document.getElementById('first-name').value.trim();
    const lastName = document.getElementById('last-name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const phoneNumber = document.getElementById('phone-number').value.trim();
    const address = document.getElementById('address').value;
    const preferredGiftCategory = document.getElementById('preferred-gift-categories').value;

    // Validate phone
    const phoneRegex = /^(077|078|079)\d{7}$/;
    if (!phoneRegex.test(phoneNumber)) {
        alertContainer.innerHTML = '<div class="alert alert-danger">Please enter a valid Jordanian phone number starting with 077, 078, or 079.</div>';
        return;
    }

    // Check address
    if (!address) {
        alertContainer.innerHTML = '<div class="alert alert-danger">Please select your location.</div>';
        return;
    }

    // Check passwords
    if (password !== confirmPassword) {
        alertContainer.innerHTML = '<div class="alert alert-danger">Passwords do not match!</div>';
        return;
    }

    try {
         // Create a new user
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Add user
        const userRef = ref(database, 'users/' + user.uid);
        await set(userRef, {
            firstName,
            lastName,
            email,
            preferredGiftCategory,
            phoneNumber,
            address,
        });

        // Success
        alertContainer.innerHTML = '<div class="alert alert-success">Account created successfully!</div>';
        setTimeout(() => { window.location.href = '../html/home.html'; }, 2000);
    } catch (error) {
        // Failed
        let errorMessage;
        if (error.code === 'auth/email-already-in-use') {
            errorMessage = 'The email address is already in use by another account.';
        } else {
            errorMessage = error.message;
        }
        
        alertContainer.innerHTML = `<div class="alert alert-danger">${errorMessage}</div>`;
    }
});
