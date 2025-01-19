```javascript
// Dark Mode Toggle
const toggle = document.getElementById('darkModeToggle');
toggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
});

// Persist Dark Mode setting
window.addEventListener('load', () => {
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }
});

// Scroll to Top Button
const scrollToTopBtn = document.getElementById('scrollToTopBtn');
window.addEventListener('scroll', () => {
    if (window.scrollY > 200) {
        scrollToTopBtn.classList.remove('hidden');
        scrollToTopBtn.style.transform = 'translateY(0)';
    } else {
        scrollToTopBtn.style.transform = 'translateY(100px)';
        setTimeout(() => scrollToTopBtn.classList.add('hidden'), 300);
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Responsive Navigation Toggle
const navToggle = document.createElement('button');
navToggle.innerText = '☰';
navToggle.style.fontSize = '20px';
navToggle.style.position = 'absolute';
navToggle.style.top = '12px';
navToggle.style.right = '12px';
navToggle.style.display = 'block';
navToggle.style.cursor = 'pointer';
navToggle.className = 'md:hidden';
const navBar = document.querySelector('nav .md\\:block');
navBar.parentNode.insertBefore(navToggle, navBar);

navToggle.addEventListener('click', () => {
    navBar.classList.toggle('hidden');
});

// Hero Section CTA Button Effect
const heroButton = document.querySelector('header button');
heroButton.addEventListener('mouseover', () => {
    heroButton.style.transform = 'scale(1.1)';
});
heroButton.addEventListener('mouseout', () => {
    heroButton.style.transform = 'scale(1)';
});

// Featured Section Auto Slider
const sliderItems = document.querySelectorAll('.flex.overflow-x-scroll .w-1\\/3.flex-none');
let sliderIndex = 0;

function showSliderItem(index) {
    sliderItems.forEach((item, i) => {
        item.style.display = i === index ? 'block' : 'none';
    });
}

function nextSlide() {
    sliderIndex = (sliderIndex + 1) % sliderItems.length;
    showSliderItem(sliderIndex);
}

setInterval(nextSlide, 3000); // Change slide every 3 seconds

// Show the first slide initially
showSliderItem(sliderIndex);

// Enhanced Feature: Animate Navigation Bar on Scroll
const navbar = document.querySelector('nav');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    if (scrollTop > lastScrollTop) {
        navbar.style.top = '-100px';
    } else {
        navbar.style.top = '0';
    }
    lastScrollTop = scrollTop;
});

// Enhanced Feature: Newsletter Subscription Confirmation
document.querySelector('footer form').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for subscribing to our newsletter!');
});

// Enhanced Feature: Lazy Load Images
const images = document.querySelectorAll('img');
const lazyLoad = target => {
    const io = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                const src = img.getAttribute('data-src');
                img.setAttribute('src', src);
                observer.disconnect();
            }
        });
    });
    io.observe(target);
};

images.forEach(lazyLoad);

// Enhanced Feature: Implement Search Icon with Modal
const searchIcon = document.querySelectorAll('.text-gray-500')[0];
searchIcon.addEventListener('click', () => {
    const searchModal = document.createElement('div');
    searchModal.style.position = 'fixed';
    searchModal.style.top = '0';
    searchModal.style.left = '0';
    searchModal.style.width = '100%';
    searchModal.style.height = '100%';
    searchModal.style.backgroundColor = 'rgba(0,0,0,0.8)';
    searchModal.style.display = 'flex';
    searchModal.style.justifyContent = 'center';
    searchModal.style.alignItems = 'center';
    searchModal.innerHTML = `
        <div style="background: white; padding: 20px; border-radius: 8px; width: 300px;">
            <input type="text" placeholder="Search..." style="width: 100%; padding: 10px; border: 1px solid #ccc; margin-bottom: 10px;">
            <button style="width: 100%; padding: 10px; background-color: blue; color: white; border: none; border-radius: 5px;">Search</button>
            <button style="margin-top: 10px; width: 100%; padding: 10px; background-color: red; color: white; border: none; border-radius: 5px;">Close</button>
        </div>
    `;
    document.body.appendChild(searchModal);

    searchModal.querySelector('button:last-child').addEventListener('click', () => {
        document.body.removeChild(searchModal);
    });
});
```