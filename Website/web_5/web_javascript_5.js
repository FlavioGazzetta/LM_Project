```javascript
// JavaScript for enhancing the website functionality

document.addEventListener('DOMContentLoaded', () => {
    // Toggle mobile menu
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Initialize Swiper for the featured section
    const swiper = new Swiper('.swiper-container', {
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        autoplay: {
            delay: 5000,
        },
    });

    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Form validation for contact form
    const contactForm = document.querySelector('#contact form');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();

        if (name === '' || email === '') {
            alert('Please fill all the required fields.');
            return;
        }

        if (!validateEmail(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        alert('Form submitted successfully');
        contactForm.reset();
    });

    // Email validation function
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Feature: Back to top button
    const backToTopButton = document.createElement('button');
    backToTopButton.textContent = '↑';
    backToTopButton.className = 'fixed bottom-4 right-4 bg-indigo-600 text-white p-2 rounded-full shadow-lg hidden';
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    document.body.appendChild(backToTopButton);

    // Show/hide back to top button
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.classList.remove('hidden');
        } else {
            backToTopButton.classList.add('hidden');
        }
    });

    // Feature: Dark mode toggle
    const darkModeToggle = document.createElement('button');
    darkModeToggle.textContent = '🌙';
    darkModeToggle.className = 'fixed top-4 right-4 bg-gray-800 text-white p-2 rounded-full shadow-lg';
    document.body.appendChild(darkModeToggle);

    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark');
    });

    // Apply dark mode styles
    const darkModeStyles = `
        body.dark {
            background-color: #1a202c;
            color: #cbd5e0;
        }
        body.dark .bg-white {
            background-color: #2d3748;
        }
        body.dark .text-gray-800 {
            color: #e2e8f0;
        }
        body.dark .text-indigo-600 {
            color: #63b3ed;
        }
        body.dark .bg-indigo-600 {
            background-color: #3182ce;
        }
        body.dark .bg-gray-100 {
            background-color: #2d3748;
        }
        body.dark .bg-gray-200 {
            background-color: #4a5568;
        }
        body.dark input, body.dark textarea {
            background-color: #2d3748;
            color: #cbd5e0;
            border-color: #4a5568;
        }
    `;

    // Append dark mode styles to the head
    const styleElement = document.createElement('style');
    styleElement.innerHTML = darkModeStyles;
    document.head.appendChild(styleElement);
});
```