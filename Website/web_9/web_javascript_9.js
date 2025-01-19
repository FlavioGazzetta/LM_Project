```javascript
// Ensure DOM is fully loaded before executing scripts
document.addEventListener("DOMContentLoaded", () => {
    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    menuToggle.addEventListener('click', () => {
        // Toggle mobile menu visibility
        mobileMenu.classList.toggle('hidden');
    });

    // Initialize Swiper for the featured section
    const swiper = new Swiper('.swiper-container', {
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });

    // Sticky Navbar on Scroll
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 0) {
            header.classList.add('bg-opacity-90');
        } else {
            header.classList.remove('bg-opacity-90');
        }
    });

    // Smooth Scrolling for Anchor Links
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            targetElement.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Form Validation Alert
    const contactForm = document.querySelector('form');
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;

        if (name && email) {
            alert("Thank you for contacting us, " + name + "!");
            contactForm.reset();
        } else {
            alert("Please fill in all fields.");
        }
    });

    // Back to Top Button
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopButton.className = 'fixed bottom-10 right-10 bg-indigo-600 text-white p-3 rounded-full shadow-lg hidden';
    document.body.appendChild(backToTopButton);

    window.addEventListener('scroll', () => {
        if (window.scrollY > window.innerHeight / 2) {
            backToTopButton.classList.remove('hidden');
        } else {
            backToTopButton.classList.add('hidden');
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Improve Swiper with AutoPlay
    swiper.params.autoplay = {
        delay: 3000,
        disableOnInteraction: false,
    };
    swiper.autoplay.start();
});
```