```javascript
// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Subscribe feature for newsletter
const subscribeForm = document.getElementById('subscribe-form');

subscribeForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const emailInput = document.getElementById('email');
    const email = emailInput.value;

    // Perform validation on the email address
    if (email.trim() === '') {
        alert('Please enter a valid email address');
        return;
    }

    // Send the email to the backend for processing
    // Code for sending email goes here

    alert('Thank you for subscribing!');
    emailInput.value = '';
});
```