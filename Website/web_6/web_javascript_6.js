```javascript
document.addEventListener("DOMContentLoaded", function() {
    // Requirement 1: When the "Click Me" button is clicked, change the text of the paragraph to "Button clicked!"
    const clickMeButton = document.getElementById("click-me-button");
    const paragraph = document.getElementById("target-paragraph");

    clickMeButton.addEventListener("click", function() {
        paragraph.textContent = "Button clicked!";
    });

    // Requirement 2: When the "Change Color" button is clicked, change the background color of the page to light blue
    const changeColorButton = document.getElementById("change-color-button");

    changeColorButton.addEventListener("click", function() {
        document.body.style.backgroundColor = "lightblue";
    });

    // Requirement 3: When the mouse hovers over the paragraph, change the font color to red
    paragraph.addEventListener("mouseover", function() {
        paragraph.style.color = "red";
    });

    paragraph.addEventListener("mouseout", function() {
        paragraph.style.color = ""; // Reset color on mouse out
    });

    // Additional Feature: When the "Reset" button is clicked, reset the paragraph text and background color
    const resetButton = document.getElementById("reset-button");

    resetButton.addEventListener("click", function() {
        paragraph.textContent = "Hover over me and click the buttons!";
        document.body.style.backgroundColor = "";
    });
});
```