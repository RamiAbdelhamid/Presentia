import { database } from "./conifg.js";
import { ref, set } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-database.js";

//create user
function createUser(userId, text) {
    set(ref (database, 'reviews/' + userId),{
        text: text,
    })
    .then(() => {
        alert('thanks for your feedback');
    })
    .catch((error) => {
        console.error('Error saving data:', error);
    });
}
document.getElementById('customer-review').addEventListener('submit', (event) => {
    event.preventDefault(); 
    const text = document.getElementById('userComment').value;
    const userId = new Date().getTime().toString();
    createUser(userId,text);
});