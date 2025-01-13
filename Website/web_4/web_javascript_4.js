```javascript
document.addEventListener('DOMContentLoaded', function () {
    const menuButton = document.querySelector('.md:hidden button');
    const navLinks = document.querySelector('.md:hidden + div');

    menuButton.addEventListener('click', function () {
        navLinks.classList.toggle('hidden');
    });
});
```