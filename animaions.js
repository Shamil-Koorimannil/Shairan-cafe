document.addEventListener("DOMContentLoaded", () => {
    
    console.log("Animation Script: Loaded (Universal Pop-Up)");

    if (typeof gsap === "undefined") {
        console.error("GSAP is missing!");
        return;
    }

    // --- 1. SELECTOR LOGIC (Strict Filtering) ---
    // Grab all grid items
// Select direct children, BUT skip the wrapper and grab its insides instead
const allGridItems = document.querySelectorAll('.main-container > *:not(.carousel-wrapper), .carousel-wrapper > *');    
    // Filter out Header, Header Card, and Floating Badge
    // We ONLY want to animate the content (Hero, Cards, Footer, etc.)
    const contentToAnimate = Array.from(allGridItems).filter(el => {
        const tagName = el.tagName.toUpperCase();
        
        // Exclude Header Tag
        if (tagName === "HEADER") return false;
        
        // Exclude Header Class
        if (el.classList.contains("header-card")) return false;
        
        // Exclude Floating Badge (Home Page)
        if (el.classList.contains("floating-badge")) return false;

        return true; 
    });

    // --- 2. ENTRY ANIMATION (Universal Elastic Pop) ---
    // This runs on BOTH Desktop and Mobile
    
    // Set initial state: Slightly smaller and invisible
    gsap.set(contentToAnimate, { 
        opacity: 0, 
        scale: 0.92, 
        transformOrigin: "center center" // Scales from middle
    });

    // Animate to full size with a bounce
    gsap.to(contentToAnimate, {
        duration: 1.0, 
        opacity: 1,
        scale: 1,
        stagger: 0.08, // Items appear one after another
        ease: "elastic.out(1, 0.6)", // The "Butter Smooth" Bounce
        clearProps: "all" // Clean up CSS after animation so hover effects work
    });


    // --- 3. EXIT ANIMATION (Universal Shrink) ---
    const links = document.querySelectorAll('nav a, .footer-social a, .footer-card a, .story-hero-card a, .cta-btn');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetUrl = link.getAttribute('href');
            
            // Safety Checks (Ignore external/same page links)
            if (!targetUrl || targetUrl === "#" || targetUrl.startsWith("http") || link.target === "_blank") return;
            if (targetUrl === window.location.pathname || window.location.href.endsWith(targetUrl)) return;

            e.preventDefault(); // Stop immediate load

            // Animate Out: Fade & Shrink
            gsap.to(contentToAnimate, {
                duration: 0.3,
                opacity: 0, 
                scale: 0.95, // Subtle shrink
                ease: "power2.in",
                onComplete: () => window.location.href = targetUrl
            });
        });
    });
});