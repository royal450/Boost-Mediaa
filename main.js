
// Smooth scroll for internal links (anchor links)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// Button click event example
const startButton = document.getElementById('start-button');
startButton.addEventListener('click', function() {
    alert('Welcome to Boost Media! Your website is ready.');
});

// Simple form validation (example)
const form = document.getElementById('contact-form');
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission to check validation

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    
    if (!nameInput.value || !emailInput.value) {
        alert('Please fill in all the fields.');
    } else {
        alert('Form submitted successfully!');
        form.reset(); // Clear the form after submission
    }
});

// Example of changing background color on button click
const colorButton = document.getElementById('color-button');
colorButton.addEventListener('click', function() {
    document.body.style.backgroundColor = '#e1f7fc'; // Change to a light color
});
