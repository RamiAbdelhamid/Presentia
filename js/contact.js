  const firebaseConfig = {
            apiKey: "AIzaSyDyZX5XE9X5_YLrsiNY6k2oxSPEyLU7Oa4",
            authDomain: "ahmad-e97be.firebaseapp.com",
            projectId: "ahmad-e97be",
            storageBucket: "ahmad-e97be.firebasestorage.app",
            messagingSenderId: "121003235207",
            appId: "1:121003235207:web:714704f916ea59b1552522",
            measurementId: "G-XK1EWE6Q3K"
        };

        firebase.initializeApp(firebaseConfig);
        const dbRef = firebase.database().ref('contacts');

        document.getElementById('contactForm').addEventListener('submit', function (e) {
            e.preventDefault(); 

            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !phone || !message) {
                alert('All fields are required. Please fill out the form completely.');
                return;
            }

            dbRef.push({
                name: name,
                email: email,
                phone: phone,
                message: message,
                timestamp: new Date().toISOString()
            })
                .then(() => {
                    alert('Your message has been sent successfully!');
                    document.getElementById('contactForm').reset(); 
                })
                .catch((error) => {
                    console.error('Error sending message:', error);
                    alert('Failed to send your message. Please try again later.');
                });
        });