document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Product Data ---
    const products = [
        {
            title: "Irani Chai",
            desc: "Slow brewed, richly layered, and perfectly comforting our Irani Chai is a timeless tradition in every sip. Balanced notes of tea, milk, and warmth come together effortlessly. One cup, and you'll know why it's unforgettable.",
            bgText: "شاي", 
            color: "#eb6d2f", 
            imgDesktop: "../assets/images/hero-Iran.png",
            imgMobile: "../assets/images/hero-Iran.png" 
        },
        {
            title: "Pistachio Khunafa",
            desc: "A luxurious fusion of soft, freshly baked bun and authentic Arabic kunafa, filled with rich creamy cheese and layered with golden, crispy kataifi. Gently soaked in fragrant sugar syrup and finished with a touch of elegance for a perfectly balanced sweetness.",
            bgText: "كنافة",
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
        },
        {
            title: "Croissant",
            desc: "Buttery, flaky, and delicately golden, the croissant is a timeless pastry born from the art of perfect layers. Each bite reveals crisp folds outside and a soft, airy heart inside. A simple pleasure that turns any moment into a little taste of Paris",
            bgText: "كرواسون", 
            color: "#eb6d2f", 
            imgDesktop: "../assets/images/croissant-desktop.png",
            imgMobile: "../assets/images/croissant-mobile.png" 
        },
        {
            title: "Butter bun",
            desc: "Freshly baked and irresistibly soft, the butter bun is pure comfort in every bite. Rich, creamy butter melts into the warm bread, filling it with indulgent flavor. Lightly sweet and perfectly fluffy, it satisfies both hunger and heart. A classic delight that turns simple moments into delicious memories.",
            bgText: "سمنة", 
            color: "#eb6d2f", 
            imgDesktop: "../assets/images/butterbun-desktop.png",
            imgMobile: "../assets/images/butterbun-mobile.png" 
        }
    ];

    let currentIndex = 0;
    let isAnimating = false;

    // --- 2. ELEMENTS ---
    const visualContainer = document.querySelector('.product-visual');
    const imgEl = document.getElementById('main-product-image');
    const titleEl = document.getElementById('product-title');
    const descEl = document.getElementById('product-desc');
    const bgTextEl = document.querySelector('.bg-text'); 
    
    const nextBtn = document.getElementById('next-btn');
    const prevBtn = document.getElementById('prev-btn');

    // --- HELPER: Get Correct Image ---
    function getResponsiveImage(product) {
        return window.innerWidth <= 768 ? product.imgMobile : product.imgDesktop;
    }

    // --- 3. ANIMATION FUNCTION ---
    function updateProduct(index, direction) {
        if (isAnimating) return;
        isAnimating = true;

        const product = products[index];
        const selectedImg = getResponsiveImage(product);
        
        // Title Formatting
        const words = product.title.split(" ");
        const firstWord = words[0]; 
        const restWords = words.slice(1).join(" "); 
        const formattedTitle = `${firstWord} <span>${restWords}</span>`;

        // --- STEP A: CLONE OLD IMAGE (For smooth Crossfade) ---
        const oldImg = imgEl.cloneNode(true);
        oldImg.style.position = 'absolute';
        oldImg.style.top = '0';
        oldImg.style.left = '0';
        oldImg.style.width = '100%';
        oldImg.style.height = '100%';
        oldImg.style.zIndex = '5'; // Sit on TOP
        oldImg.style.objectFit = 'cover';
        visualContainer.appendChild(oldImg);

        // --- STEP B: SET NEW IMAGE (Behind Clone) ---
        imgEl.src = selectedImg;
        imgEl.style.zIndex = '1';
        
        // Prepare new image (Slightly zoomed in, fully opaque)
        gsap.set(imgEl, { scale: 1.2, opacity: 1, xPercent: 0, rotation: 0 });

        const tl = gsap.timeline({
            onComplete: () => {
                isAnimating = false;
                if(oldImg) oldImg.remove(); // Cleanup clone
            }
        });

        // --- STEP C: SYNCHRONIZED TRANSITION ---
        
        // 1. Fade OUT Old Image (revealing New Image underneath)
        tl.to(oldImg, { 
            duration: 0.8, 
            opacity: 0, 
            scale: 1.1, 
            ease: "power2.inOut" 
        })
        
        // 2. Fade OUT Text & BG Text (AT SAME TIME as Image fade "<")
        .to([titleEl, descEl], { 
            y: -20, 
            opacity: 0, 
            duration: 0.4, // Faster than image so it's gone before swap
            stagger: 0.05 
        }, "<")
        
        .to(bgTextEl, { 
            opacity: 0, 
            scale: 1.2, 
            duration: 0.4 
        }, "<")

        // 3. Swap Content (Hidden)
        .call(() => {
            titleEl.innerHTML = formattedTitle; 
            descEl.textContent = product.desc;
            bgTextEl.textContent = product.bgText;
            
            // FORCE BG TEXT TO BE WHITE AND VISIBLE
            gsap.set(bgTextEl, { 
                color: "white", 
                mixBlendMode: "normal", 
                scale: 0.8,
                opacity: 0 // Keep hidden until fade in
            });
        })

        // 4. Animate NEW Image settling (Concurrent with fade out)
        .to(imgEl, { 
            duration: 0.8, 
            scale: 1, 
            ease: "power2.out"
        }, "<") 

        // 5. Fade IN Text & BG Text
        .set([titleEl, descEl], { y: 20, opacity: 0 }) // Reset position
        
        .to(bgTextEl, { 
            opacity: 0.4, // VISIBLE WHITE (Adjust to 0.8 if you want it brighter)
            scale: 1, 
            duration: 0.6 
        }, ">-0.3") // Start slightly before image settles
        
        .to([titleEl, descEl], { 
            y: 0, 
            opacity: 1, 
            duration: 0.5, 
            stagger: 0.1 
        }, "<0.1");
    }

    // --- 4. LISTENERS ---
    if(nextBtn) nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % products.length;
        updateProduct(currentIndex, 'next');
    });

    if(prevBtn) prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + products.length) % products.length;
        updateProduct(currentIndex, 'prev');
    });

    // --- 5. INITIAL LOAD ---
    if(imgEl) {
        imgEl.src = getResponsiveImage(products[currentIndex]);
        if(bgTextEl) {
            // Initial State: White, Normal Blend, Visible
            gsap.set(bgTextEl, { 
                opacity: 0.4, 
                color: "white",
                mixBlendMode: "normal" 
            });
        }
    }

    window.addEventListener('resize', () => {
        if(!isAnimating && imgEl) {
            imgEl.src = getResponsiveImage(products[currentIndex]);
        }
    });
});