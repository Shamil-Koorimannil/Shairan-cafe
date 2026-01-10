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


   // --- 2. SLIDESHOW LOGIC (Fixed Infinite Loop) ---
    const slides = document.querySelectorAll('.slide');
    let slideIndex = 0;

    if (slides.length > 0) {
        
        // 1. INITIAL SETUP
        // Hide all, ready for animation
        gsap.set(slides, { 
            opacity: 0, 
            scale: 1.2, 
            zIndex: 0 // Background layer
        });

        // Show the first one immediately
        gsap.set(slides[0], { 
            opacity: 1, 
            scale: 1, 
            zIndex: 1 // Active layer (Bottom)
        });

        function nextSlide() {
            const currentSlide = slides[slideIndex];
            // Calculate next index
            slideIndex = (slideIndex + 1) % slides.length;
            const nextSlideEl = slides[slideIndex];

            const tl = gsap.timeline({
                onComplete: () => {
                    // AFTER ANIMATION:
                    // Downgrade the "New Active" slide to Layer 1
                    // So the NEXT incoming slide (Layer 2) can cover it later
                    gsap.set(nextSlideEl, { zIndex: 1 });
                    
                    // Call the function again
                    gsap.delayedCall(3, nextSlide);
                }
            });

            // ANIMATION SEQUENCE
            // 1. Place Next Slide on Top (Layer 2) & Zoomed In
            tl.set(nextSlideEl, { 
                zIndex: 2, 
                opacity: 0, 
                scale: 1.2 
            })
            // 2. Animate it Visible
            .to(nextSlideEl, { 
                duration: 1.8, 
                opacity: 1, 
                scale: 1, 
                ease: "power2.out" 
            })
            // 3. Hide the Old Slide (Layer 0)
            .set(currentSlide, { 
                zIndex: 0, 
                opacity: 0 
            });
        }

        // Start the loop
        gsap.delayedCall(3.5, nextSlide);
    }
});