document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. BADGE REPULSION & CLICK EFFECT ---
    const badge = document.querySelector('.floating-badge');
    
    // Select all grid items EXCEPT the Navbar and the Badge itself
    const blocks = document.querySelectorAll('.main-container > *:not(.header-card):not(.floating-badge)');

    if (badge) {
        badge.addEventListener('click', () => {
            
            // --- A. ANIMATE THE BADGE ITSELF ("Stroke Reduces") ---
            const badgeTl = gsap.timeline();
            
            badgeTl.to(badge, {
                duration: 0.15,
                scale: 0.9,          // Shrink the whole badge slightly
                borderWidth: "2px",  // THIN STROKE: Reduces from 12px to 2px
                ease: "power2.out"
            })
            .to(badge, {
                duration: 1.2,
                scale: 1,            // Return to normal size
                borderWidth: "12px", // THICK STROKE: Returns to 12px
                ease: "elastic.out(1, 0.3)" // Big wobble on return
            });


            // --- B. ANIMATE THE SURROUNDING BLOCKS (Repulsion) ---
            
            // Get center of badge
            const badgeRect = badge.getBoundingClientRect();
            const badgeCX = badgeRect.left + (badgeRect.width / 2);
            const badgeCY = badgeRect.top + (badgeRect.height / 2);

            blocks.forEach(block => {
                const rect = block.getBoundingClientRect();
                const blockCX = rect.left + (rect.width / 2);
                const blockCY = rect.top + (rect.height / 2);

                const dirX = blockCX - badgeCX;
                const dirY = blockCY - badgeCY;

                const distance = Math.sqrt(dirX * dirX + dirY * dirY) || 1; 
                const force = 30; 
                
                const moveX = (dirX / distance) * force;
                const moveY = (dirY / distance) * force;

                const tl = gsap.timeline();

                // Push Away
                tl.to(block, {
                    duration: 0.2,
                    x: moveX,
                    y: moveY,
                    scale: 0.98, 
                    ease: "power2.out"
                })
                // Return
                .to(block, {
                    duration: 1,
                    x: 0,
                    y: 0,
                    scale: 1,
                    ease: "elastic.out(1, 0.4)",
                    delay: 0.05
                });
            });
        });
    }


    // --- 2. SLIDESHOW LOGIC ---
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');

    function showNextSlide() {
        if (slides.length === 0) return;
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    if(slides.length > 0) {
        slides[0].classList.add('active');
        setInterval(showNextSlide, 3000);
    }
});