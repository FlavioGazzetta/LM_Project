```javascript
// Dark Mode Toggle
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;

darkModeToggle.addEventListener('change', () => {
    if (darkModeToggle.checked) {
        body.classList.add('dark');
    } else {
        body.classList.remove('dark');
    }
});

// Gamification Badges
const badgesButton = document.querySelector('.bg-yellow-400');

badgesButton.addEventListener('click', () => {
    // Add functionality to earn badges here
    alert('You earned a new badge!');
});

// Push Notifications
const notificationsButton = document.querySelector('.bg-green-400');

notificationsButton.addEventListener('click', () => {
    // Add functionality to enable push notifications here
    alert('Push notifications enabled!');
});
```