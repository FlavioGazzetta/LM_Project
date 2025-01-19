```javascript
                // Ensure all slider items are hidden before showing the correct one
                item, i) => {
                item.style.transform = `translateX(-${index * 100}%)`;
                item.style.transition = 'transform 0.5s ease';
            });
        }

        function autoSlide() {
            sliderIndex = (sliderIndex + 1) % sliderItems.length;
            showSliderItem(sliderIndex);
        }

        // Initialize slider
        showSliderItem(sliderIndex);
        setInterval(autoSlide, 3000); // Change slide every 3 seconds

        // Enhance Footer Email Subscription with Animation
        const emailInput = document.querySelector('input[type="email"]');
        const subscribeButton = emailInput.nextElementSibling;

        subscribeButton.addEventListener('click', (event) => {
            event.preventDefault();
            if (emailInput.value) {
                emailInput.value = ''; // Clear input
                subscribeButton.innerText = 'Subscribed!';
                setTimeout(() => {
                    subscribeButton.innerText = '// Subscribe';
                }, 2000);
            } else {
                emailInput.style.borderColor = 'red';
                setTimeout(() => {
                    emailInput.style.borderColor = '';
                }, 500);
            }
        });

        // Animate Social Media Icons in Footer
        const socialMediaIcons = document.querySelectorAll('footer .// Social Media Links a');
        socialMediaIcons.forEach(icon => {
            icon.addEventListener('mouseover', () => {
                icon.style.transform = 'scale(1.2)';
                icon.style.transition = 'transform 0.3s';
            });
            icon.addEventListener('mouseout', () => {
                icon.style.transform = 'scale(1)';
            });
        });

        // Add Keyboard Navigation for Main Menu
        const mainMenuLinks = document.querySelectorAll('nav .md\\:block a');
        mainMenuLinks.forEach((link, index) => {
            link.addEventListener('keydown', (event) => {
                if (event.key === 'ArrowDown') {
                    event.preventDefault();
                    mainMenuLinks[(index + 1) % mainMenuLinks.length].focus();
                } else if (event.key === 'ArrowUp') {
                    event.preventDefault();
                    mainMenuLinks[(index - 1 + mainMenuLinks.length) % mainMenuLinks.length].focus();
                }
            });
        });
    </script>
```