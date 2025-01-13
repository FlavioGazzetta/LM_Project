You have already included some JavaScript code to toggle the navigation menu on mobile devices. Here is the enhanced JavaScript code to add smooth scrolling functionality to the navigation links when clicked:

```html
<script>
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - document.querySelector('nav').offsetHeight,
                    behavior: 'smooth'
                });
            }
        });
    });
</script>
```

This script adds an event listener to each navigation link (excluding the menu toggle button) to handle smooth scrolling to the corresponding section on the page when clicked. It calculates the target element's position and scrolls to it with a smooth animation.

Remember to adjust the script if you add new sections with different IDs or modify the structure of the page. This script improves user experience by providing a seamless scrolling effect when navigating through the different sections of your website.