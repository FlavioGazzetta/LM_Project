```javascript
            scrollTopButton.style.padding = '10px';
            scrollTopButton.style.backgroundColor = '#333';
            scrollTopButton.style.color = '#fff';
            scrollTopButton.style.display = 'none';

            scrollTopButton.onclick = function() {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            };

            document.body.appendChild(scrollTopButton);

            window.addEventListener('scroll', function() {
                if (window.scrollY > 300) {
                    scrollTopButton.style.display = 'block';
                } else {
                    scrollTopButton.style.display = 'none';
                }
            });

            // Enhance featured slider with auto-scroll
            let slider = document.querySelector('.featured-slider');
            let isDown = false;
            let startX;
            let scrollLeft;

            slider.addEventListener('mousedown', (e) => {
                isDown = true;
                slider.classList.add('active');
                startX = e.pageX - slider.offsetLeft;
                scrollLeft = slider.scrollLeft;
            });

            slider.addEventListener('mouseleave', () => {
                isDown = false;
                slider.classList.remove('active');
            });

            slider.addEventListener('mouseup', () => {
                isDown = false;
                slider.classList.remove('active');
            });

            slider.addEventListener('mousemove', (e) => {
                if (!isDown) return;
                e.preventDefault();
                const x = e.pageX - slider.offsetLeft;
                const walk = (x - startX) * 3; //scroll-fast
                slider.scrollLeft = scrollLeft - walk;
            });

            // Auto-scroll for featured slider
            setInterval(() => {
                if (!isDown) {
                    slider.scrollLeft += 1;
                    if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth) {
                        slider.scrollLeft = 0;
                    }
                }
            }, 20);

            // Newsletter subscription alert
            const subscribeButton = document.querySelector('.newsletter button');
            subscribeButton.addEventListener('click', function() {
                const emailInput = document.querySelector('.newsletter input[type="email"]');
                if (emailInput.value) {
                    alert('// Thank you for subscribing!');
                    emailInput.value = '';
                } else {
                    alert('// Please enter a valid email address.');
                }
            });

        });
    </script>
```