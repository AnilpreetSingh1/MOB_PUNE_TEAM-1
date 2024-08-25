document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector('form');
    
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting the traditional way

        // Get the input values
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('pwd').value.trim();

        // Example credentials for demonstration purposes
        const adminCredentials = {
            email: 'admin@gmail.com',
            password: 'admin123'
        };

        const userCredentials = {
            email: 'user@gmail.com',
            password: 'user123'
        };
        const Manager={
            email:'manager@gmail.com',
            password:'manager123'
        }
        if (email === adminCredentials.email && password === adminCredentials.password) {
            // Set admin login status
      
            sessionStorage.setItem('isAdmin', 'true');
            sessionStorage.setItem('isLoggedIn', 'true');
            alert('Admin logged in successfully');
    // Redirect to admin dashboard
        } else if (email === userCredentials.email && password === userCredentials.password) {
            // Set user login status
     
            sessionStorage.setItem('isUser', 'true');
            sessionStorage.setItem('isLoggedIn', 'true');
            alert('User logged in successfully');
            // Redirect to user home page
        }else if(email==Manager.email && password==Manager.password){
               sessionStorage.setItem('isManager','true');
               sessionStorage.setItem('isLoggedIn','true'); 
         
        }else {
            alert('Invalid email or password. Please try again.');
        }
        window.location.href = '../Dashboard/index.html'; 
    });
});
