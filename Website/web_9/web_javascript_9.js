```javascript
// Functionality to show an alert when the button is clicked
document.getElementById("myButton").addEventListener("click", function() {
  alert("Button clicked!");
});

// Functionality to change the background color of the text when hovered over
document.getElementById("myText").addEventListener("mouseover", function() {
  this.style.backgroundColor = "lightblue";
});
document.getElementById("myText").addEventListener("mouseout", function() {
  this.style.backgroundColor = "";
});

// Additional feature: Functionality to toggle the visibility of an image when a link is clicked
document.getElementById("myLink").addEventListener("click", function() {
  var image = document.getElementById("myImage");
  if (image.style.display === "none") {
    image.style.display = "block";
  } else {
    image.style.display = "none";
  }
});
```