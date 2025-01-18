```javascript
// JavaScript for Interactive Product Carousel Feature
const productImages = ["product1.jpg", "product2.jpg", "product3.jpg"]; // Array of product images

let currentImageIndex = 0; // Index to track the current image displayed

const productImage = document.querySelector('.md.w-1/3 img');
const productTitle = document.querySelector('.md.w-2/3 h3');
const productDescription = document.querySelector('.md.w-2/3 p');

// Function to update the product details based on the current image index
function updateProductDetails(index) {
    productImage.src = productImages[index];
    productTitle.textContent = `Product ${index + 1} Title`;
    productDescription.textContent = `Product ${index + 1} Description`;
}

// Initial product details display
updateProductDetails(currentImageIndex);

// Button to view next product
const nextButton = document.querySelector('.bg-blue-500');
nextButton.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex + 1) % productImages.length;
    updateProductDetails(currentImageIndex);
});
```