```javascript
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');

    mobileMenuToggle.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
    });

    const ctaButton = document.querySelector('.cta-button');

    ctaButton.addEventListener('click', function(event) {
        event.preventDefault();
        // Add your desired functionality for the CTA button here
    });

    // Implement slider functionality for the featured section here

    const newsletterForm = document.querySelector('.newsletter form');

    newsletterForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const emailInput = document.querySelector('.newsletter input[type="email"]');
        const email = emailInput.value.trim();

        if (email !== '') {
            // Handle the form submission with the email value
            console.log('Subscribed with email: ' + email);
            emailInput.value = ''; // Clear the input after submission
        } else {
            alert('Please enter a valid email address.');
        }
    });
});
```