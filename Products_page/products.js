document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Product Data (Now with Mobile & Desktop Images) ---
    const products = [
        {
            title: "Irani Chai",
            desc: "Slow brewed, richly layered, and perfectly comforting our Irani Chai is a timeless tradition in every sip. Balanced notes of tea, milk, and warmth come together effortlessly. One cup, and you'll know why it's unforgettable.",
            bgText: "شاي", 
            color: "#eb6d2f", 
            
            // DEFINE TWO IMAGES HERE:
            imgDesktop: "../assets/images/hero-Iran.png",
            imgMobile: "../assets/images/hero-Iran.png" 
        },
        {
            title: "Pistachio Khunafa",
            desc: "TA luxurious fusion of soft, freshly baked bun and authentic Arabic kunafa, filled with rich creamy cheese and layered with golden, crispy kataifi. Gently soaked in fragrant sugar syrup and finished with a touch of elegance for a perfectly balanced sweetness. A premium dessert bun that brings the soul of Middle Eastern tradition to every bite",
            bgText: "Khunafa",
            color: "#eb6d2f", 
            
            imgDesktop: "../assets/images/boing water.png",
            imgMobile: "../assets/images/boing water.png" 
        },  
        {
            title: "Falafel Rolls",
            desc: "Golden tea infused with premium Kashmiri choco. A delightful fusion that melts in your mouth, offering a rich cocoa experience paired with the warmth of freshly baked bread.",
            bgText: "فلافل", 
            color: "#eb6d2f", 
            
            imgDesktop: "../assets/images/new.png",
            imgMobile: "../assets/images/roll - mobile.png" 
        }
    ];

    let currentIndex = 0;
    let isAnimating = false;

    // --- 2. ELEMENTS ---
    const stageEl = document.querySelector('.product-stage');
    const imgEl = document.getElementById('main-product-image');
    const titleEl = document.getElementById('product-title');
    const descEl = document.getElementById('product-desc');
    const bgTextEl = document.querySelector('.bg-text'); 
    
    const nextBtn = document.getElementById('next-btn');
    const prevBtn = document.getElementById('prev-btn');

    // --- HELPER: Get Correct Image based on Screen Size ---
    function getResponsiveImage(product) {
        if (window.innerWidth <= 768) {
            return product.imgMobile;
        } else {
            return product.imgDesktop;
        }
    }

    // --- 3. ANIMATION FUNCTION ---
    function updateProduct(index, direction) {
        if (isAnimating) return;
        isAnimating = true;

        const product = products[index];
        const dir = direction === 'next' ? 1 : -1;

        // Title Formatting Logic
        const words = product.title.split(" ");
        const firstWord = words[0]; 
        const restWords = words.slice(1).join(" "); 
        const formattedTitle = `${firstWord} <span>${restWords}</span>`;

        // Determine which image to use right now
        const selectedImg = getResponsiveImage(product);

        // --- VISIBILITY FIX: Higher Opacity & Solid White ---
        // Mobile: 0.9 (Very visible), Desktop: 0.5 (Visible)
        const targetOpacity = window.innerWidth <= 768 ? 0.4 : 0.5;

        const tl = gsap.timeline({
            onComplete: () => {
                isAnimating = false;
            }
        });

        // --- PHASE 1: EXIT ANIMATION ---
        tl.to(imgEl, { 
            xPercent: -100 * dir, 
            opacity: 0, 
            rotation: -10 * dir, 
            duration: 0.4, 
            ease: "power2.in" 
        })
        .to([titleEl, descEl], { y: -20, opacity: 0, duration: 0.3, stagger: 0.05 }, "<")
        .to(bgTextEl, { opacity: 0, scale: 1.2, duration: 0.4 }, "<");

        // --- PHASE 2: SWAP CONTENT ---
        tl.call(() => {
            if(imgEl) imgEl.src = selectedImg;
            
            if(titleEl) titleEl.innerHTML = formattedTitle; 
            if(descEl) descEl.textContent = product.desc;
            if(bgTextEl) bgTextEl.textContent = product.bgText;
            
            gsap.to(stageEl, { backgroundColor: product.color, duration: 0.8 });
        });

        // --- PHASE 3: ENTER ANIMATION ---
        tl.set(imgEl, { xPercent: 100 * dir, rotation: 10 * dir, opacity: 0 }) 
          .set([titleEl, descEl], { y: 20, opacity: 0 })
          // FORCE NORMAL BLEND MODE so it looks WHITE, not transparent
          .set(bgTextEl, { scale: 0.8, opacity: 0, mixBlendMode: "normal" }); 

        tl.to(imgEl, { 
            xPercent: 0, 
            opacity: 1, 
            rotation: 0, 
            duration: 0.8, 
            ease: "back.out(1.7)"
        })
        .to(bgTextEl, { opacity: targetOpacity, scale: 1, duration: 0.6 }, "<0.2")
        .to([titleEl, descEl], { y: 0, opacity: 1, duration: 0.5, stagger: 0.1 }, "<0.1");
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

    // --- 5. INITIAL LOAD CHECK ---
    if(imgEl) {
        imgEl.src = getResponsiveImage(products[currentIndex]);
        
        // --- INITIAL VISIBILITY FIX ---
        if(bgTextEl) {
            const initialOpacity = window.innerWidth <= 768 ? 0.4 : 0.5;
            // Force normal blend mode and high opacity immediately
            gsap.set(bgTextEl, { opacity: initialOpacity, mixBlendMode: "normal" });
        }
    }

    window.addEventListener('resize', () => {
        if(!isAnimating && imgEl) {
            imgEl.src = getResponsiveImage(products[currentIndex]);
        }
    });
});