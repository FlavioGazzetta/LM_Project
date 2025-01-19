```javascript
            // Continue to showSliderItem logic
            item, i) => {
                item.style.transform = `translateX(${(i - index) * 100}%)`;
                item.style.transition = 'transform 0.5s ease-in-out';
            });
        }

        function autoSlide() {
            sliderIndex = (sliderIndex + 1) % sliderItems.length;
            showSliderItem(sliderIndex);
        }

        setInterval(autoSlide, 3000);

        // Newsletter Form Validation
        const newsletterForm = document.querySelector('footer form');
        const emailInput = newsletterForm.querySelector('input[type="email"]');

        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailValue = emailInput.value.trim();
            if (validateEmail(emailValue)) {
                alert('Thank you for subscribing!');
                emailInput.value = '';
            } else {
                alert('Please enter a valid email address.');
            }
        });

        function validateEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        }

        // Enhance Search Icon Functionality
        const searchIcon = document.querySelector('nav a:nth-child(1)');
        searchIcon.addEventListener('click', (e) => {
            e.preventDefault();
            const searchPrompt = prompt('Please enter your search query:');
            if (searchPrompt) {
                alert(`You searched for: ${searchPrompt}`);
            }
        });

        // Social Media Icons Animation
        const socialIcons = document.querySelectorAll('nav a:nth-child(3)');
        socialIcons.forEach(icon => {
            icon.addEventListener('mouseover', () => {
                icon.style.transform = 'scale(1.2)';
                icon.style.transition = 'transform 0.3s';
            });
            icon.addEventListener('mouseout', () => {
                icon.style.transform = 'scale(1)';
            });
        });

        // Improve Page Load Performance
        window.addEventListener('load', () => {
            const images = document.querySelectorAll('img');
            images.forEach(image => {
                image.loading = 'lazy';
            });
        });
    </script>
```