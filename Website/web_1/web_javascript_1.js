```javascript
// Function to toggle a class for the navigation bar on scroll
window.onscroll = function() {
    const navBar = document.querySelector('nav');
    if (window.scrollY > 50) {
        navBar.classList.add('bg-gray-600');
    } else {
        navBar.classList.remove('bg-gray-600');
    }
};

// Function to handle smooth scrolling when clicking on navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Function to handle click event for the quick access icons
document.querySelector('.quick-access-icons').addEventListener('click', function(e) {
    // Add your functionality here for the quick access icons
});

// Additional JavaScript functionalities can be added as needed
```