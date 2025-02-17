const resumeBtns = document.querySelectorAll('.resume-btn')
const resumeDetails = document.querySelectorAll('.resume-details')
const arrowRight = document.querySelector('.portfolio-box .navigation .arrow-right')
const arrowLeft = document.querySelector('.portfolio-box .navigation .arrow-left')
const lightMode = document.querySelector('#light-mode')
const menuIcon = document.querySelector('#menu-icon')
const navBar = document.querySelector('header nav')
const Link = document.querySelector('a')

// Link.addEventListener('click', (e) => {
//     e.preventDefault()
// })



// lightMode.addEventListener('click', () => { 
//     lightMode.classList.toggle('bx-moon')
//     lightMode.classList.toggle('bx-sun')
//     document.body.classList.toggle('light-mode')
// })

    
menuIcon.addEventListener('click', () => {
    menuIcon.classList.toggle('bx-x')
    navBar.classList.toggle("active")
})

resumeBtns.forEach((btn, index) => {  
    btn.addEventListener('click', () => {

        resumeDetails.forEach(detail => {
            detail.classList.remove('active')
        })
        resumeBtns.forEach(btn => {
            btn.classList.remove('active')
        })
        btn.classList.add('active')
        resumeDetails[index].classList.add('active')
    })
})


let index = 0;

const activePortfolio = () => {
    const imgSlide = document.querySelector('.portfolio-carousel .img-slide');
    const portfolioDetails = document.querySelectorAll('.portfolio-detail')

    imgSlide.style.transform = `translateX(calc(${index * -100}% - ${index * 2}rem))`;

    portfolioDetails.forEach(detail => {
        detail.classList.remove('active')
    })
    portfolioDetails[index].classList.add('active')
}

arrowRight.addEventListener('click', () => {
    
    if (index < 4) {
        index++;
        arrowLeft.classList.remove('disabled')
    } else {
        index = 5;
        arrowRight.classList.add('disabled')
    }

    activePortfolio();
})

arrowLeft.addEventListener('click', () => {
    if (index > 1) {
        index--;
        arrowRight.classList.remove('disabled')
    } else {
        index = 0;
        arrowLeft.classList.add('disabled')

    }

    activePortfolio();
}) 

// Dark and Light mode
