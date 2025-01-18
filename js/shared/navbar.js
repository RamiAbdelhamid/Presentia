// (1) Imports
import { monitorAuthState } from './auth.js';


// (2) Function to send data into Firebase
function loadNavbar(isLoggedIn) {
        const navbarPath = isLoggedIn ? '../html/shared/logged-navbar.html' : '../html/shared/navbar.html';
        
        fetch(navbarPath)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch navbar');
                }
                return response.text();
            })
            .then(data => {
                document.getElementById('navbar-placeholder').innerHTML = data;
            })
            .catch(error => console.error('Error loading navbar:', error));
}


// (3) Handle Auth State Changes
monitorAuthState((user) => {
            loadNavbar(!!user);
});
