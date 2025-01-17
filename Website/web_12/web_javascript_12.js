```javascript
// Requirements:
// 1. Add an event listener to the button with id "btn"
// 2. When the button is clicked, display an alert with the text "Button clicked!"
// 3. Add a class "highlight" to the button when it is clicked
// 4. Add a class "larger" to the button when the mouse is over it

const button = document.getElementById("btn");

button.addEventListener("click", function() {
    alert("Button clicked!");
    this.classList.add("highlight");
});

button.addEventListener("mouseover", function() {
    this.classList.add("larger");
});
```

Additional Features:
- 5. Change the button text to "Clicked!" when it is clicked
- 6. Reset the button text back to "Click Me" after 2 seconds of being clicked

```javascript
button.addEventListener("click", function() {
    alert("Button clicked!");
    this.classList.add("highlight");
    this.textContent = "Clicked!";
    
    setTimeout(() => {
        this.textContent = "Click Me";
    }, 2000);
});

button.addEventListener("mouseover", function() {
    this.classList.add("larger");
});

button.addEventListener("mouseout", function() {
    this.classList.remove("larger");
});
```