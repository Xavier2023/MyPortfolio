const resumeBtns = document.querySelectorAll('.resume-btn')
const resumeDetails = document.querySelectorAll('.resume-details')

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