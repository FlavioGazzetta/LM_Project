```javascript
// JavaScript Enhancements

document.addEventListener('DOMContentLoaded', () => {
    // Dark Mode Toggle
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });

    // Accordion-style FAQ
    const faqItems = document.querySelectorAll('.faq-item button');
    faqItems.forEach(button => {
        button.addEventListener('click', () => {
            const expanded = button.getAttribute('aria-expanded') === 'true';
            button.setAttribute('aria-expanded', !expanded);
            const content = button.nextElementSibling;
            content.style.display = expanded ? 'none' : 'block';
        });
    });

    // Form Validation
    const contactForm = document.querySelector('#contact form');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        validateForm(contactForm);
    });

    const feedbackForm = document.querySelector('#feedback form');
    feedbackForm.addEventListener('submit', (e) => {
        e.preventDefault();
        validateForm(feedbackForm);
    });

    function validateForm(form) {
        let isValid = true;
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            if (!input.checkValidity()) {
                isValid = false;
                input.classList.add('invalid');
            } else {
                input.classList.remove('invalid');
            }
        });
        if (isValid) {
            form.submit();
        } else {
            alert('Please fill out the form correctly.');
        }
    }

    // Smooth Scroll
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            targetElement.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Slideshow
    const slides = document.querySelectorAll('.slider .slide');
    let currentSlide = 0;
    setInterval(() => {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }, 3000);

    // New Feature: Language Switcher (Basic Example)
    const languageSwitcher = document.createElement('button');
    languageSwitcher.textContent = 'Switch Language';
    document.body.prepend(languageSwitcher);
    let isEnglish = true;
    languageSwitcher.addEventListener('click', () => {
        isEnglish = !isEnglish;
        if (isEnglish) {
            translateToEnglish();
        } else {
            translateToSpanish();
        }
    });

    function translateToEnglish() {
        document.querySelector('.hero h1').textContent = 'Welcome to Our Website';
        document.querySelector('#faq h2').textContent = 'FAQs';
        document.querySelector('#contact h2').textContent = 'Contact Us';
    }

    function translateToSpanish() {
        document.querySelector('.hero h1').textContent = 'Bienvenidos a Nuestro Sitio Web';
        document.querySelector('#faq h2').textContent = 'Preguntas Frecuentes';
        document.querySelector('#contact h2').textContent = 'Contáctanos';
    }
    
    // New Feature: Lazy Loading Images
    const lazyImages = document.querySelectorAll('img[data-src]');
    const lazyImageObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                lazyImageObserver.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => {
        lazyImageObserver.observe(img);
    });
});
```