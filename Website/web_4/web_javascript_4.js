```javascript
// JavaScript to toggle navigation menu for mobile

const nav = document.querySelector('nav');
const hamburger = document.createElement('div');
hamburger.classList.add('hamburger');
hamburger.innerHTML = '&#9776;';

nav.appendChild(hamburger);

hamburger.addEventListener('click', () => {
  nav.classList.toggle('active');
});

// JavaScript for slider in the featured section (assuming it's a basic image slider)

const featuredSection = document.querySelector('.featured');
const images = ['image1.jpg', 'image2.jpg', 'image3.jpg'];
let currentIndex = 0;

function showImage(index) {
  const image = document.createElement('img');
  image.src = images[index];
  image.alt = `Featured Image ${index + 1}`;
  featuredSection.innerHTML = '';
  featuredSection.appendChild(image);
}

function nextImage() {
  currentIndex = (currentIndex + 1) % images.length;
  showImage(currentIndex);
}

setInterval(nextImage, 5000); // Change image every 5 seconds
```