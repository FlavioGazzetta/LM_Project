```javascript
document.addEventListener("DOMContentLoaded", function() {
    // Requirement 1: Add event listener to the button
    const button = document.getElementById("myButton");
    button.addEventListener("click", function() {
        // Requirement 2: Change the color of the text on button click
        button.style.color = "red";
    });

    // Requirement 3: Display an alert when hovering over the header
    const header = document.getElementById("myHeader");
    header.addEventListener("mouseover", function() {
        alert("You are hovering over the header!");
    });

    // Requirement 4: Change the background color of the body on double click
    document.body.addEventListener("dblclick", function() {
        document.body.style.backgroundColor = "lightblue";
    });

    // Additional Feature 1: Hide the header when the button is double-clicked
    button.addEventListener("dblclick", function() {
        header.style.display = "none";
    });

    // Additional Feature 2: Change the font size of the header on right-click
    header.addEventListener("contextmenu", function(event) {
        event.preventDefault();
        const currentSize = parseInt(window.getComputedStyle(header).getPropertyValue("font-size"));
        header.style.fontSize = currentSize + 2 + "px";
    });
});
```