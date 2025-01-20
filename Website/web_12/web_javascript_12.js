```javascript
document.addEventListener('DOMContentLoaded', () => {
    // Dark Mode Toggle
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode') ? 'enabled' : 'disabled');
    });

    // Persist Dark Mode
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
    }

    // Current Year
    document.getElementById('year').textContent = new Date().getFullYear();

    // Local Time
    const updateTime = () => {
        document.getElementById('localTime').textContent = `Local Time: ${new Date().toLocaleTimeString()}`;
    };
    setInterval(updateTime, 1000);
    updateTime();

    // Back to Top Button
    const backToTopButton = document.querySelector('.back-to-top');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopButton.style.display = 'block';
            backToTopButton.style.opacity = '0.9';
        } else {
            backToTopButton.style.opacity = '0';
            setTimeout(() => {
                backToTopButton.style.display = 'none';
            }, 300);
        }
    });
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Notification Banner
    setTimeout(() => {
        const notificationBanner = document.querySelector('.notification-banner');
        notificationBanner.style.display = 'block';
        setTimeout(() => {
            notificationBanner.style.display = 'none';
        }, 5000);
    }, 1000);

    // Random Background Color
    const randomColorButton = document.querySelector('.random-color-button');
    randomColorButton.addEventListener('click', () => {
        const randomColor = `#${Math.floor(Math.random()*16777215).toString(16)}`;
        document.body.style.backgroundColor = randomColor;
    });

    // Automatic Slideshow for Carousel
    $('.carousel').carousel({
        interval: 3000,
        pause: false
    });

    // Add Smooth Scroll to Links
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth'
            });
        });
    });

    // Enable Popovers
    $(function () {
        $('[data-toggle="popover"]').popover()
    });

    // Handle Hero Section Parallax Effect
    window.addEventListener('scroll', () => {
        const hero = document.querySelector('.hero');
        hero.style.backgroundPositionY = `${window.scrollY * 0.5}px`;
    });

    // Navbar Hide on Scroll
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > lastScrollTop && scrollTop > 60) {
            navbar.style.top = '-60px';
        } else {
            navbar.style.top = '0';
        }
        lastScrollTop = scrollTop;
    });

    // Random Notification
    const randomNotification = () => {
        const messages = [
            'Check out our latest features!',
            'Subscribe to our newsletter for updates.',
            'Don’t miss our new blog post!',
            'New products added to our catalog!'
        ];
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        const notificationBanner = document.querySelector('.notification-banner');
        notificationBanner.querySelector('p').textContent = randomMessage;
        notificationBanner.style.display = 'block';
        setTimeout(() => {
            notificationBanner.style.display = 'none';
        }, 5000);
    };
    setInterval(randomNotification, 15000);
});
```