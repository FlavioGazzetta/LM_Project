```javascript
// Add event listener for DOMContentLoaded
document.addEventListener("DOMContentLoaded", function() {
    
    // // Mobile Menu Toggle Functionality
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });

    // // Smooth Scroll for Navigation Links
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            window.scrollTo({
                top: targetSection.offsetTop,
                behavior: 'smooth'
            });
        });
    });

    // // Slider Functionality
    const slider = document.querySelector('.slider');
    let slideIndex = 0;
    function showSlides() {
        const slides = slider.children;
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = 'none';
        }
        slideIndex++;
        if (slideIndex > slides.length) slideIndex = 1;
        slides[slideIndex - 1].style.display = 'block';
        setTimeout(showSlides, 5000); // Slide change every 5 seconds
    }
    if (slider) showSlides();

    // // Dark Mode Toggle Functionality
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    darkModeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
    });

    // // Contact Form Validation
    const contactForm = document.querySelector('#contact form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            const fields = contactForm.querySelectorAll('input, textarea');
            let isValid = true;
            fields.forEach(field => {
                if (!field.value) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            if (!isValid) event.preventDefault();
        });
    }

    // // FAQ Toggle Functionality
    const faqSection = document.querySelector('.faq');
    if (faqSection) {
        const faqItems = faqSection.children;
        for (let faq of faqItems) {
            faq.addEventListener('click', function() {
                this.classList.toggle('active');
                const answer = this.querySelector('.answer');
                if (answer) {
                    answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
                }
            });
        }
    }

    // // Newsletter Subscription with Confirmation
    const newsletterForm = document.querySelector('.newsletter');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(event) {
            event.preventDefault();
            alert('Thank you for subscribing to our newsletter!');
        });
    }

    // // Chat Support Interaction
    const chatSupport = document.querySelector('.chat-support');
    if (chatSupport) {
        chatSupport.addEventListener('click', function() {
            alert('Welcome to our chat support! How can we assist you?');
        });
    }

});
```