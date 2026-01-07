document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Product Data ---
    const products = [
        {
            title: "Irani chai",
            desc: "Rich milky tea with a hint of cardamom and spices.",
            bgText: "Chai", 
            color: "#eb6d2f", 
            img: "../assets/images/Chai cup.png" 
        },
        {
            title: "Butter Jam",
            desc: "The perfect sweet and salty biscuit companion.",
            bgText: "Jam",
            color: "#eb6d2f", // Adjusted to a lighter biscuit color for contrast
            img: "../assets/images/bun1.png"
        },  
        {
            title: "Chocolate Bun",
            desc: "Golden tea infused with premium Kashmiri choco.",
            bgText: "Chocolate", 
            color: "#eb6d2f", // Darker orange
            img: "../assets/images/bun2.png"
        }
    ];

    let currentIndex = 0;
    let isAnimating = false; // Prevents spam-clicking buttons

    // --- 2. ELEMENTS ---
    const stageEl = document.querySelector('.product-stage');
    const imgEl = document.getElementById('main-product-image');
    const titleEl = document.getElementById('product-title');
    const descEl = document.getElementById('product-desc');
    const bgTextEl = document.querySelector('.bg-text'); 
    
    const nextBtn = document.getElementById('next-btn');
    const prevBtn = document.getElementById('prev-btn');

    // --- 3. ANIMATION FUNCTION (GSAP POWERED) ---
    function updateProduct(index, direction) {
        if (isAnimating) return;
        isAnimating = true;

        const product = products[index];
        
        // Calculate slide direction (1 for next, -1 for prev)
        const dir = direction === 'next' ? 1 : -1;

        // --- PHASE 1: EXIT ANIMATION ---
        const tl = gsap.timeline({
            onComplete: () => {
                isAnimating = false; // Re-enable buttons when done
            }
        });

        // 1. Slide everything OUT
        tl.to(imgEl, { 
            x: -100 * dir, // Move left or right depending on click
            opacity: 0, 
            rotation: -10 * dir, // Slight tilt for realism
            duration: 0.4, 
            ease: "power2.in" 
        })
        .to([titleEl, descEl], { 
            y: -20, 
            opacity: 0, 
            duration: 0.3, 
            stagger: 0.05 
        }, "<") // "<" means start at same time as previous tween
        .to(bgTextEl, { 
            opacity: 0, 
            scale: 1.2, // Text grows slightly as it fades
            duration: 0.4 
        }, "<");

        // --- PHASE 2: SWAP CONTENT (Hidden) ---
        tl.call(() => {
            if(imgEl) imgEl.src = product.img;
            if(titleEl) titleEl.textContent = product.title;
            if(descEl) descEl.textContent = product.desc;
            if(bgTextEl) bgTextEl.textContent = product.bgText;
            
            // Smoothly animate background color
            gsap.to(stageEl, { backgroundColor: product.color, duration: 0.8 });
        });

        // --- PHASE 3: ENTER ANIMATION ---
        // Prepare elements for entry (set starting position)
        tl.set(imgEl, { x: 100 * dir, rotation: 10 * dir, opacity: 0 })
          .set([titleEl, descEl], { y: 20, opacity: 0 })
          .set(bgTextEl, { scale: 0.8, opacity: 0 });

        // Animate IN
        tl.to(imgEl, { 
            x: 0, 
            opacity: 1, 
            rotation: 0, 
            duration: 0.8, 
            ease: "back.out(1.7)" // The "Bounce" effect
        })
        .to(bgTextEl, { 
            opacity: 0.2, // KEPT YOUR REQUEST: Low opacity
            scale: 1, 
            duration: 0.6 
        }, "<0.2") // Start 0.2s after image starts
        .to([titleEl, descEl], { 
            y: 0, 
            opacity: 1, 
            duration: 0.5, 
            stagger: 0.1 // Title comes first, then desc
        }, "<0.1");
    }

    // --- 4. LISTENERS ---
    if(nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % products.length;
            updateProduct(currentIndex, 'next');
        });
    }

    if(prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + products.length) % products.length;
            updateProduct(currentIndex, 'prev');
        });
    }
});