```javascript
// Additional features and improvements
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

const subscribeInput = document.querySelector('input[type="email"]');
const subscribeBtn = document.querySelector('button');
subscribeBtn.addEventListener('click', () => {
    const email = subscribeInput.value;
    if (email) {
        alert(`Subscribed with email: ${email}`);
        subscribeInput.value = '';
    } else {
        alert('Please enter a valid email address');
    }
});

// Additional feature: Highlight active menu item
const sections = document.querySelectorAll('section');
const menuLinks = document.querySelectorAll('#menu a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - sectionHeight / 3) {
            current = section.getAttribute('id');
        }
    });

    menuLinks.forEach(link => {
        link.classList.remove('text-blue-500');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('text-blue-500');
        }
    });
});
```