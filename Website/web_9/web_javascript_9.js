```javascript
// Dark Mode Toggle
const toggleDarkMode = () => {
  const body = document.body;
  body.classList.toggle('dark-mode');
  localStorage.setItem('darkMode', body.classList.contains('dark-mode'));
};

// Apply user's preferred color scheme
if (localStorage.getItem('darkMode') === 'true' || window.matchMedia('(prefers-color-scheme: dark)').matches) {
  document.body.classList.add('dark-mode');
}

// Language Switcher
const switchLanguage = (lang) => {
  document.documentElement.setAttribute('lang', lang);
  localStorage.setItem('language', lang);
};

// Apply saved language preference
const savedLanguage = localStorage.getItem('language');
if (savedLanguage) {
  switchLanguage(savedLanguage);
}

// Accordion for FAQs
document.querySelectorAll('.accordion').forEach(accordion => {
  accordion.addEventListener('click', function () {
    this.classList.toggle('active');
    const panel = this.nextElementSibling;
    panel.style.display = (panel.style.display === 'block') ? 'none' : 'block';
  });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
  });
});

// Form Validation
const validateForm = (form) => {
  let isValid = true;
  form.querySelectorAll('input, textarea').forEach(input => {
    if (!input.checkValidity()) {
      isValid = false;
      input.classList.add('invalid');
    } else {
      input.classList.remove('invalid');
    }
  });
  return isValid;
};

document.querySelectorAll('form').forEach(form => {
  form.addEventListener('submit', function (e) {
    if (!validateForm(this)) {
      e.preventDefault();
    }
  });
});

// Animated Slider
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const showSlide = (index) => {
  slides.forEach((slide, i) => {
    slide.style.display = (i === index) ? 'block' : 'none';
  });
};

document.querySelector('.next').addEventListener('click', () => {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
});

document.querySelector('.prev').addEventListener('click', () => {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
});

showSlide(currentSlide);

// Performance Optimizations: Lazy Loading
document.addEventListener('DOMContentLoaded', () => {
  const lazyImages = document.querySelectorAll('img.lazy');
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        observer.unobserve(img);
      }
    });
  });

  lazyImages.forEach(img => {
    observer.observe(img);
  });
});

// Service Worker for Offline Capabilities
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js').then(registration => {
    console.log('Service Worker registered with scope:', registration.scope);
  }).catch(error => {
    console.error('Service Worker registration failed:', error);
  });
}
```