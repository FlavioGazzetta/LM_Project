```javascript
document.addEventListener('DOMContentLoaded', function() {
    const hamburgerBtn = document.querySelector('.block');
    const links = document.querySelector('.hidden');
    
    hamburgerBtn.addEventListener('click', function() {
        links.classList.toggle('hidden');
    });
});
```