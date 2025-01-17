```javascript
// Ensure all the first document's requirements are met
document.addEventListener('DOMContentLoaded', function() {
    const button = document.getElementById('submit-btn');
    const input = document.getElementById('user-input');
    const output = document.getElementById('output');
    
    button.addEventListener('click', function() {
        output.textContent = input.value;
    });
    
    const resetBtn = document.getElementById('reset-btn');
    
    resetBtn.addEventListener('click', function() {
        input.value = '';
        output.textContent = '';
    });
    
    const toggleBtn = document.getElementById('toggle-btn');
    const sidebar = document.getElementById('sidebar');
    
    toggleBtn.addEventListener('click', function() {
        sidebar.classList.toggle('active');
    });
    
    // Additional feature: Change background color on button hover
    button.addEventListener('mouseover', function() {
        button.style.backgroundColor = 'lightblue';
    });
    
    button.addEventListener('mouseout', function() {
        button.style.backgroundColor = '';
    });
});
```