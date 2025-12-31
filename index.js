document.addEventListener('DOMContentLoaded', () => {
    // Select navigation links
    const navLinks = document.querySelectorAll('.nav-pills a');
    const badge = document.querySelector('.floating-badge');

    // 1. Handle Navigation Click
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            // Remove active class from all
            navLinks.forEach(l => l.classList.remove('active'));
            // Add to clicked
            link.classList.add('active');
        });
    });

    // 2. Simple Badge Animation Effect
    badge.addEventListener('click', () => {
        alert("Navigating to Special Offers for Shairan Cafe!");
    });
});