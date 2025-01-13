```javascript
document.addEventListener('DOMContentLoaded', function() {
  const toggleBtn = document.getElementById('toggle-btn');
  const mobileNav = document.getElementById('mobile-nav');

  toggleBtn.addEventListener('click', function() {
    mobileNav.classList.toggle('active');
  });
});
```