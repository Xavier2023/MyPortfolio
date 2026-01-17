document.addEventListener('DOMContentLoaded', () => {
    console.log('Initializing resume page...');
    
    const resumeBtns = document.querySelectorAll('.resume-btn');
    const resumeDetails = document.querySelectorAll('.resume-details');
    
    if (resumeBtns.length > 0 && resumeDetails.length > 0) {
        console.log(`Found ${resumeBtns.length} buttons and ${resumeDetails.length} details`);
        
        // Initialize first section as active
        resumeBtns[0].classList.add('active');
        resumeDetails[0].classList.add('active');
        
        // Add click event to each button
        resumeBtns.forEach((btn, index) => {
            btn.addEventListener('click', (e) => {
                console.log(`Button ${index} clicked: ${btn.textContent}`);
                
                // Remove active class from all details and buttons
                resumeDetails.forEach(detail => {
                    detail.classList.remove('active');
                });
                
                resumeBtns.forEach(btn => {
                    btn.classList.remove('active');
                });

                // Add active class to clicked button and corresponding detail
                btn.classList.add('active');
                resumeDetails[index].classList.add('active');
            });
        });
        
        // Test: simulate a click on the second button to check if it works
        console.log('Resume page initialized successfully');
    } else {
        console.error('Could not find resume buttons or details');
        console.log('Buttons found:', resumeBtns.length);
        console.log('Details found:', resumeDetails.length);
    }
});