```javascript
// JavaScript to enhance the HTML functionality

document.addEventListener('DOMContentLoaded', () => {
    // // Mobile menu toggle
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // // Initialize Swiper for the featured section
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

    // // Form validation for the contact form
    const contactForm = document.querySelector('form');
    contactForm.addEventListener('submit', (event) => {
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        
        if (name === '' || email === '') {
            alert('Please fill out all fields.');
            event.preventDefault();
        } else {
            // Simple email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                event.preventDefault();
            }
        }
    });

    // // Smooth scrolling for navigation links
    const smoothLinks = document.querySelectorAll('a[href^="#"]');
    smoothLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Adjust for fixed header
                behavior: 'smooth'
            });
        });
    });

    // // Add fade-in animation to all sections on scroll
    const animateOnScroll = () => {
        const sections = document.querySelectorAll('section');
        const triggerBottom = window.innerHeight / 5 * 4; // Adjust trigger point
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            if (sectionTop < triggerBottom) {
                section.classList.add('animate-fade-in');
            } else {
                section.classList.remove('animate-fade-in');
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Initialize on page load

    // // Feature: Night mode toggle
    const toggleNightMode = () => {
        document.body.classList.toggle('bg-gray-800');
        document.body.classList.toggle('text-white');
    };
    
    const nightModeButton = document.createElement('button');
    nightModeButton.innerHTML = '<i class="fas fa-moon"></i>';
    nightModeButton.className = 'fixed bottom-4 right-4 p-2 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700';
    nightModeButton.addEventListener('click', toggleNightMode);
    
    document.body.appendChild(nightModeButton);

    // // Accessibility: Add aria-expanded to menu toggle button
    menuToggle.addEventListener('click', () => {
        const expanded = menuToggle.getAttribute('aria-expanded') === 'true' || false;
        menuToggle.setAttribute('aria-expanded', !expanded);
    });
});
```