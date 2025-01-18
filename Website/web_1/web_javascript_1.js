```javascript
// JavaScript to enhance functionality

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Carousel pause on hover
const carousel = document.getElementById('featured-slider');
carousel.addEventListener('mouseover', function() {
    const carouselInstance = bootstrap.Carousel.getInstance(carousel);
    carouselInstance.pause();
});
carousel.addEventListener('mouseleave', function() {
    const carouselInstance = bootstrap.Carousel.getInstance(carousel);
    carouselInstance.cycle();
});

// To Top Button
const toTopBtn = document.createElement('button');
toTopBtn.innerHTML = 'To Top';
toTopBtn.classList.add('btn', 'btn-primary', 'to-top-btn');
document.body.appendChild(toTopBtn);

toTopBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Show/Hide To Top Button
window.addEventListener('scroll', function() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        toTopBtn.style.display = 'block';
    } else {
        toTopBtn.style.display = 'none';
    }
});
```