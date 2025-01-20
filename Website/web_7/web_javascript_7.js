```javascript
document.addEventListener('DOMContentLoaded', function() {
    // Implementing Dark Mode Toggle
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    darkModeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
    });

    // Implementing Language Toggle
    const languageButtons = document.querySelectorAll('.language-toggle button');
    languageButtons.forEach(button => {
        button.addEventListener('click', function() {
            setLanguage(this.innerText);
        });
    });

    function setLanguage(lang) {
        // Placeholder for changing language content
        console.log(`Language set to: ${lang}`);
    }

    // Implementing Back to Top Button
    const backToTopButton = document.getElementById('back-to-top');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 200) {
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    });

    backToTopButton.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Enhancing Navigation Bar for Mobile
    const hamburgerMenu = document.querySelector('.hamburger-menu input');
    const navLinks = document.querySelector('.nav-links');
    hamburgerMenu.addEventListener('change', function() {
        if (this.checked) {
            navLinks.style.display = 'block';
        } else {
            navLinks.style.display = 'none';
        }
    });

    // Implementing Slider for Featured Section
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.style.display = i === index ? 'block' : 'none';
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    setInterval(nextSlide, 5000); // Switch slides every 5 seconds
    showSlide(currentSlide);

    // Implementing Feedback Form Submission
    const feedbackForm = document.querySelector('#feedback form');
    feedbackForm.addEventListener('submit', function(event) {
        event.preventDefault();
        alert('Thank you for your feedback!');
        feedbackForm.reset();
    });

    // Enhance contact form validation
    const contactForm = document.querySelector('#contact form');
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const name = contactForm.querySelector('input[type="text"]');
        const email = contactForm.querySelector('input[type="email"]');
        const message = contactForm.querySelector('textarea');
        if (name.value && email.value && message.value) {
            alert('Message Sent!');
            contactForm.reset();
        } else {
            alert('Please fill in all fields.');
        }
    });

    // Auto-hide the newsletter input after subscription
    const newsletterForm = document.querySelector('.newsletter');
    newsletterForm.querySelector('button').addEventListener('click', function() {
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        if (emailInput.value) {
            alert('Subscribed Successfully!');
            emailInput.value = ''; // Clear input
        } else {
            alert('Please enter an email address.');
        }
    });

    // Detect preferred color scheme and set initial dark mode state
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.body.classList.add('dark-mode');
    }
});
```