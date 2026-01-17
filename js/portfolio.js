document.addEventListener('DOMContentLoaded', () => {
    console.log('Initializing portfolio page...');
    
    const arrowRight = document.querySelector('.portfolio-box .navigation .arrow-right');
    const arrowLeft = document.querySelector('.portfolio-box .navigation .arrow-left');
    
    if (arrowRight && arrowLeft) {
        console.log('Found portfolio navigation arrows');
        
        let index = 0;
        const portfolioDetails = document.querySelectorAll('.portfolio-detail');
        const totalItems = portfolioDetails.length;
        
        console.log(`Total portfolio items: ${totalItems}`);

        const activePortfolio = () => {
            const imgSlide = document.querySelector('.portfolio-carousel .img-slide');
            
            if (imgSlide) {
                // Calculate the transform with gap
                const gap = 2; // rem
                const translateX = index * -100;
                imgSlide.style.transform = `translateX(calc(${translateX}% - ${index * gap}rem))`;
                console.log(`Transform: translateX(calc(${translateX}% - ${index * gap}rem))`);
            }

            // Update active portfolio detail
            portfolioDetails.forEach((detail, i) => {
                if (i === index) {
                    detail.classList.add('active');
                } else {
                    detail.classList.remove('active');
                }
            });

            // Update arrow states
            arrowLeft.classList.toggle('disabled', index === 0);
            arrowRight.classList.toggle('disabled', index === totalItems - 1);
            
            console.log(`Current index: ${index}, Left disabled: ${index === 0}, Right disabled: ${index === totalItems - 1}`);
        };

        arrowRight.addEventListener('click', () => {
            console.log('Right arrow clicked');
            if (index < totalItems - 1) {
                index++;
                activePortfolio();
            }
        });

        arrowLeft.addEventListener('click', () => {
            console.log('Left arrow clicked');
            if (index > 0) {
                index--;
                activePortfolio();
            }
        });

        // Initialize active state
        activePortfolio();
        
        // Log the elements for debugging
        console.log('Arrow Right:', arrowRight);
        console.log('Arrow Left:', arrowLeft);
        console.log('Image Slide:', document.querySelector('.portfolio-carousel .img-slide'));
        console.log('Portfolio Details:', portfolioDetails);
    } else {
        console.error('Could not find portfolio navigation arrows');
        console.log('Arrow Right found:', !!arrowRight);
        console.log('Arrow Left found:', !!arrowLeft);
    }
});