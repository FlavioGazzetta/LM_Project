```javascript
// JavaScript code to enhance functionality of the HTML

// Requirement 1: Add a click event listener to the button element
const button = document.querySelector('#myButton');
button.addEventListener('click', function() {
  alert('Button clicked!');
});

// Requirement 2: Change the text content of the heading element
const heading = document.querySelector('h1');
heading.textContent = 'Updated Heading Text';

// Requirement 3: Toggle a class on the second paragraph element
const paragraph = document.querySelectorAll('p')[1];
paragraph.addEventListener('click', function() {
  this.classList.toggle('highlighted');
});

// New Feature 1: Change background color on hover for all paragraph elements
const paragraphs = document.querySelectorAll('p');
paragraphs.forEach(paragraph => {
  paragraph.addEventListener('mouseover', function() {
    this.style.backgroundColor = 'lightblue';
  });
  paragraph.addEventListener('mouseout', function() {
    this.style.backgroundColor = 'white';
  });
});

// New Feature 2: Hide and show the image element on button click
const image = document.querySelector('img');
button.addEventListener('click', function() {
  if (image.style.display === 'none') {
    image.style.display = 'block';
  } else {
    image.style.display = 'none';
  }
});

// New Feature 3: Change font size of the heading element on double click
heading.addEventListener('dblclick', function() {
  const currentSize = parseInt(window.getComputedStyle(this).fontSize);
  this.style.fontSize = (currentSize + 2) + 'px';
});
```