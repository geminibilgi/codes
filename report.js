  const jsonUrl = 'https://ekatalog.nevsehir.edu.tr/cgi-bin/koha/svc/report?id=78';
        const slidesContainer = document.getElementById('slides');
        let slideIndex = 0;

        // Fetch JSON data and generate slides
        async function fetchBooks() {
            try {
                const response = await fetch(jsonUrl);
                const data = await response.json();

                // Iterate through the JSON data and create slides
                data.forEach(item => {
                    const slide = document.createElement('div');
                    slide.classList.add('slide');

                    const title = item[0];
                    const imgHtml = item[1];

                    if (imgHtml) {
                        const imgSrc = imgHtml.match(/src="([^"]+)"/)?.[1];
                        if (imgSrc) {
                            slide.innerHTML = `
                                <img src="${imgSrc}" alt="${title}">
                                <h2>${title}</h2>
                            `;
                        } else {
                            slide.innerHTML = `<h2>${title}</h2>`;
                        }
                    } else {
                        slide.innerHTML = `<h2>${title}</h2>`;
                    }

                    slidesContainer.appendChild(slide);
                });

                startSlideshow();
            } catch (error) {
                console.error('Error fetching JSON data:', error);
            }
        }

        function startSlideshow() {
            const slides = document.querySelectorAll('.slide');

            function showSlide() {
                slidesContainer.style.transform = `translateX(-${slideIndex * 100}%)`;
                slideIndex = (slideIndex + 1) % slides.length;
            }

            setInterval(showSlide, 3000); // Change slide every 3 seconds
            showSlide();
        }

        // Start the slideshow
        fetchBooks();
