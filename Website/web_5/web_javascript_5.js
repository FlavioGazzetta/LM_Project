```javascript
// JavaScript for Interactive Product Carousel
const carouselItems = document.querySelectorAll('.carousel-item');
const prevButton = document.querySelector('.prev-btn');
const nextButton = document.querySelector('.next-btn');
let currentIndex = 0;

function showItem(index) {
  carouselItems.forEach(item => item.style.display = 'none');
  carouselItems[index].style.display = 'block';
}

function prevItem() {
  currentIndex = (currentIndex === 0) ? carouselItems.length - 1 : currentIndex - 1;
  showItem(currentIndex);
}

function nextItem() {
  currentIndex = (currentIndex === carouselItems.length - 1) ? 0 : currentIndex + 1;
  showItem(currentIndex);
}

prevButton.addEventListener('click', prevItem);
nextButton.addEventListener('click', nextItem);

// Additional Feature: Auto Play Carousel
let autoPlayInterval = setInterval(nextItem, 3000);

function startAutoPlay() {
  autoPlayInterval = setInterval(nextItem, 3000);
}

function stopAutoPlay() {
  clearInterval(autoPlayInterval);
}

// Additional Feature: Hover Effects on Carousel Items
carouselItems.forEach(item => {
  item.addEventListener('mouseover', () => {
    stopAutoPlay();
  });
  
  item.addEventListener('mouseout', () => {
    startAutoPlay();
  });
});
```