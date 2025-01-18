```javascript
// Document Ready Event
document.addEventListener('DOMContentLoaded', function() {
    // Hamburger menu toggle
    document.querySelector('.hamburger').addEventListener('click', function() {
        document.querySelector('nav ul').classList.toggle('show');
    });

    // Dark Mode Toggle
    const darkModeToggle = document.createElement('button');
    darkModeToggle.textContent = '// Toggle Dark Mode';
    darkModeToggle.style.position = 'fixed';
    darkModeToggle.style.bottom = '20px';
    darkModeToggle.style.right = '20px';
    darkModeToggle.style.padding = '10px';
    darkModeToggle.style.backgroundColor = '#333';
    darkModeToggle.style.color = '#fff';
    
    darkModeToggle.onclick = function() {
        document.body.classList.toggle('dark-mode');
        // Save preference to local storage
        if(document.body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    };
    document.body.appendChild(darkModeToggle);

    // Retrieve theme preference on load
    if(localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
    }

    // Scroll to top button
    const scrollTopButton = document.createElement('button');
    scrollTopButton.textContent = '// Scroll to Top';
    scrollTopButton.style.position = 'fixed';
    scrollTopButton.style.bottom = '60px';
    scrollTopButton.style.right = '20px';
    scrollTopButton.style.padding = '10px';
    scrollTopButton.style.backgroundColor = '#007BFF';
    scrollTopButton.style.color = '#fff';
    scrollTopButton.style.display = 'none';

    scrollTopButton.onclick = function() {
        window.scrollTo({top: 0, behavior: 'smooth'});
    };
    document.body.appendChild(scrollTopButton);

    window.addEventListener('scroll', function() {
        if(window.scrollY > 200) {
            scrollTopButton.style.display = 'block';
        } else {
            scrollTopButton.style.display = 'none';
        }
    });

    // Newsletter Subscription Alert
    document.querySelector('footer .newsletter button').addEventListener('click', function() {
        const email = document.querySelector('footer .newsletter input[type="email"]').value;
        if(email) {
            alert('// Thank you for subscribing!');
            document.querySelector('footer .newsletter input[type="email"]').value = ''; // Clear input
        } else {
            alert('// Please enter a valid email address.');
        }
    });

    // Featured section slider improvement
    const slider = document.querySelector('.featured-slider');
    let isDown = false;
    let startX;
    let scrollLeft;

    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        slider.classList.add('active');
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('mouseleave', () => {
        isDown = false;
        slider.classList.remove('active');
    });

    slider.addEventListener('mouseup', () => {
        isDown = false;
        slider.classList.remove('active');
    });

    slider.addEventListener('mousemove', (e) => {
        if(!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 2; //scroll-fast
        slider.scrollLeft = scrollLeft - walk;
    });
});
```