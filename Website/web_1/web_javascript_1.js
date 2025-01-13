```javascript
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('nav button');
    const navLinks = document.querySelectorAll('nav a');

    navToggle.addEventListener('click', function() {
        document.querySelector('nav div.hidden').classList.toggle('hidden');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});
```