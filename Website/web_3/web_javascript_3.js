```javascript
// Ensure initial requirements are met

document.addEventListener('DOMContentLoaded', function () {
    // Add smooth scrolling to all links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach((link) => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substr(1);
            const targetElement = document.getElementById(targetId);
            targetElement.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Add active class to navbar link based on section in view
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', function () {
        let current = '';
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - 50) {
                current = section.getAttribute('id');
            }
        });
        const navLinks = document.querySelectorAll('.navbar-nav a');
        navLinks.forEach((link) => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
});

// Add new features

// 1. Add a sticky navbar that sticks to the top when scrolling
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('sticky');
    } else {
        navbar.classList.remove('sticky');
    }
});

// 2. Implement a light/dark mode toggle
const toggleSwitch = document.createElement('input');
toggleSwitch.setAttribute('type', 'checkbox');
toggleSwitch.id = 'theme-switch';
const label = document.createElement('label');
label.setAttribute('for', 'theme-switch');
label.textContent = 'Toggle Dark Mode';
document.querySelector('.navbar').appendChild(toggleSwitch);
document.querySelector('.navbar').appendChild(label);

toggleSwitch.addEventListener('change', function () {
    document.body.classList.toggle('dark-mode');
});

// 3. Implement a back-to-top button
const backToTopBtn = document.createElement('button');
backToTopBtn.textContent = 'Back to Top';
backToTopBtn.classList.add('back-to-top-btn');
document.body.appendChild(backToTopBtn);

backToTopBtn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
```