import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

// Register plugin and expose globally for index.html or older scripts
gsap.registerPlugin(ScrollTrigger);
window.gsap = gsap;
window.ScrollTrigger = ScrollTrigger;
window.Lenis = Lenis;

function playVideoAudio(videoEl) {
    if (!videoEl) return;
    if (window.innerWidth <= 900) return;
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

    // Set volume to 0 before unmuting to avoid a loud audio pop
    if (videoEl.muted) {
        videoEl.volume = 0;
        videoEl.muted = false;
    }
    
    gsap.killTweensOf(videoEl, { volume: true });
    
    gsap.to(videoEl, {
        volume: 0.25,
        duration: 0.4,
        ease: "power1.out"
    });
}

function stopVideoAudio(videoEl) {
    if (!videoEl) return;
    
    gsap.killTweensOf(videoEl, { volume: true });
    
    gsap.to(videoEl, {
        volume: 0,
        duration: 0.5,
        ease: "power1.out",
        onComplete: () => {
            videoEl.muted = true;
        }
    });
}

export function initPortfolio() {
    if (window.portfolioInitialized) {
        console.log("Portfolio logic already initialized");
        return () => {};
    }
    window.portfolioInitialized = true;

    // Track all event listeners and animation frames for proper cleanup
    const listeners = [];
    const nodeCanvasRafs = [];
    let followerRaf;
    let particlesRaf;
    let activeLinkRaf;

    function addManagedListener(element, type, handler, options = {}) {
        if (!element) return;
        element.addEventListener(type, handler, options);
        listeners.push({ element, type, handler });
    }

    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // 1. Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
        lerp: 0.08, // Premium Apple-style easing transition (luxurious smooth interpolation)
        smoothWheel: true,
        syncTouch: true // Smooth touch scroll
    });
    window.lenis = lenis;

    // Connect Lenis to GSAP ScrollTrigger for flawless scroll sync with zero micro-stutter
    lenis.on('scroll', ScrollTrigger.update);

    // Synchronize Lenis scrolling inside GSAP's optimized requestAnimationFrame loop
    const lenisTicker = (time) => {
        lenis.raf(time * 1000);
    };
    gsap.ticker.add(lenisTicker);

    // Disable lag smoothing in GSAP to keep tick calculations aligned perfectly
    gsap.ticker.lagSmoothing(0);

    // Global contextmenu & dragstart security block to prevent downloading images/videos
    addManagedListener(window, 'contextmenu', (e) => {
        const tag = e.target.tagName;
        if (tag === 'IMG' || tag === 'VIDEO' || e.target.closest('.cinema-video-wrapper') || e.target.closest('.visual-media') || e.target.closest('.kuku-tv-card') || e.target.closest('.xp-window-body') || e.target.closest('.cap-image-wrapper') || e.target.closest('.visual-item')) {
            e.preventDefault();
        }
    });
    addManagedListener(window, 'dragstart', (e) => {
        const tag = e.target.tagName;
        if (tag === 'IMG' || tag === 'VIDEO') {
            e.preventDefault();
        }
    });

    // 2. GSAP Animations Setup
    // ScrollTrigger is registered globally above

    // Hero Entrance Animations (Apple Fluid Reveal)
    gsap.fromTo('.hero-reveal-text', 
        { opacity: 0, y: 40, scale: 0.98 },
        {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            stagger: 0.12,
            ease: 'power4.out'
        }
    );

    gsap.fromTo('.hero-reveal-item', 
        { opacity: 0, y: 30 },
        {
            opacity: 1,
            y: 0,
            duration: 1.4,
            stagger: 0.08,
            ease: 'power3.out',
            delay: 0.25
        }
    );

    // Reveal Text Animation (Apple Scroll-Scrubbed Text Reveal)
    gsap.utils.toArray('.reveal-text').forEach((text) => {
        gsap.fromTo(text, 
            { opacity: 0.15, y: 30 },
            {
                scrollTrigger: {
                    trigger: text,
                    start: 'top 92%',
                    end: 'top 65%',
                    scrub: 1
                },
                opacity: 1,
                y: 0,
                ease: 'power2.out'
            }
        );
    });

    // Reveal Items Animation (Apple Spatial Reveal)
    gsap.utils.toArray('.reveal-item').forEach((item) => {
        gsap.fromTo(item, 
            { opacity: 0, y: 40, scale: 0.97 },
            {
                scrollTrigger: {
                    trigger: item,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                },
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 1.5,
                ease: 'power4.out'
            }
        );
    });

    // 2.5. Premium Capabilities Cards Float Stagger (Apple Spatial Reveal)
    const capCardsV2 = gsap.utils.toArray('.cap-card-v2');
    if (capCardsV2.length > 0) {
        gsap.fromTo(capCardsV2, 
            { opacity: 0, y: 50, scale: 0.96 },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 1.4,
                stagger: 0.1,
                ease: 'power4.out',
                scrollTrigger: {
                    trigger: '#capabilities',
                    start: 'top 82%',
                    toggleActions: 'play none none none'
                }
            }
        );
    }

    // 3D Stagger Entrance for Tech Stack Cards (Apple Refinement)
    const techStackCards = gsap.utils.toArray('.tech-stack-card');
    if (techStackCards.length > 0) {
        gsap.fromTo(techStackCards,
            { opacity: 0, scale: 0.94, rotationX: -18, transformPerspective: 1000 },
            {
                opacity: 1,
                scale: 1,
                rotationX: 0,
                duration: 1.2,
                stagger: 0.05,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '#tech-stack',
                    start: 'top 82%',
                    toggleActions: 'play none none none'
                }
            }
        );
    }

    // Apple-style Cinematic Cards Zoom Reveal
    const cinemaCards = gsap.utils.toArray('.cinema-card');
    if (cinemaCards.length > 0) {
        cinemaCards.forEach((card) => {
            gsap.fromTo(card, 
                { opacity: 0, y: 50, scale: 1.04 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 1.6,
                    ease: 'power4.out',
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 88%',
                        toggleActions: 'play none none none'
                    }
                }
            );
        });
    }

    // 3. Advanced Custom Cursor Logic
    const cursor = document.getElementById('cursor');
    const follower = document.getElementById('cursor-follower');
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    addManagedListener(document, 'mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Fast cursor dot (hardware accelerated translate3d)
        if (cursor) {
            cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
        }
    });

    function animateFollower() {
        if (follower) {
            // Smooth lerp for follower
            followerX += (mouseX - followerX) * 0.15;
            followerY += (mouseY - followerY) * 0.15;

            follower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0) translate(-50%, -50%)`;
        }

        if (window.innerWidth > 900) {
            followerRaf = requestAnimationFrame(animateFollower);
        }
    }
    if (window.innerWidth > 900) {
        animateFollower();
    }

    // Pixel Particle Burst on Click
    addManagedListener(document, 'click', (e) => {
        createParticles(e.clientX, e.clientY);
    });

    function createParticles(x, y) {
        const particleCount = 8;
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'cursor-particle';
            document.body.appendChild(particle);

            const size = Math.random() * 4 + 2;
            const destinationX = (Math.random() - 0.5) * 100;
            const destinationY = (Math.random() - 0.5) * 100;

            gsap.set(particle, {
                x: x,
                y: y,
                width: size,
                height: size,
                opacity: 1,
                backgroundColor: '#F5F5F5'
            });

            gsap.to(particle, {
                x: x + destinationX,
                y: y + destinationY,
                opacity: 0,
                duration: 0.6,
                onComplete: () => {
                    if (particle.parentNode) {
                        document.body.removeChild(particle);
                    }
                }
            });
        }
    }

    // Interactive Cursor States
    const interactiveElements = document.querySelectorAll('a, button, .video-card, .gallery-item, .cap-card, .cap-card-v2, .cert-card, .presence-card, .step, .avatar-card-outer');

    interactiveElements.forEach(el => {
        addManagedListener(el, 'mouseenter', () => {
            if (follower) {
                gsap.to(follower, {
                    width: 60,
                    height: 60,
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    borderColor: '#F5F5F5',
                    duration: 0.3
                });
            }
            if (cursor) {
                gsap.to(cursor, {
                    scale: 2,
                    duration: 0.3
                });
            }
        });

        addManagedListener(el, 'mouseleave', () => {
            if (follower) {
                gsap.to(follower, {
                    width: 40,
                    height: 40,
                    backgroundColor: 'transparent',
                    borderColor: '#F5F5F5',
                    duration: 0.3
                });
            }
            if (cursor) {
                gsap.to(cursor, {
                    scale: 1,
                    duration: 0.3
                });
            }
        });
    });


    // 5. Marquee Loop Logic
    const marquees = document.querySelectorAll('.marquee-content');
    const originalMarqueeHTML = [];
    marquees.forEach((m, idx) => {
        originalMarqueeHTML[idx] = m.innerHTML;
        m.innerHTML = m.innerHTML + m.innerHTML + m.innerHTML;
    });

    // 5.5. Capability Cards Progress Animation
    const capCards = document.querySelectorAll('#capabilities-grid-animated .cap-card');
    if (capCards.length > 0) {
        let currentCardIndex = 0;
        let cardTimeline = null;
        
        function animateCard(index) {
            // Reset all cards
            capCards.forEach((card) => {
                card.classList.remove('active');
                const progressFill = card.querySelector('.card-progress-fill');
                if (progressFill) {
                    gsap.killTweensOf(progressFill);
                    gsap.set(progressFill, { width: "0%" });
                }
            });

            // Activate target card
            const targetCard = capCards[index];
            if (targetCard) {
                targetCard.classList.add('active');
                
                const progressFill = targetCard.querySelector('.card-progress-fill');
                if (progressFill) {
                    cardTimeline = gsap.to(progressFill, {
                        width: "100%",
                        duration: 4, // 4 seconds per card
                        ease: "linear",
                        onComplete: () => {
                            currentCardIndex = (currentCardIndex + 1) % capCards.length;
                            animateCard(currentCardIndex);
                        }
                    });
                }
            }
        }

        // Start animation loop
        animateCard(0);
        
        // Pause on hover, resume on leave, allow manual click switch
        capCards.forEach((card, idx) => {
            addManagedListener(card, 'mouseenter', () => {
                if (cardTimeline) cardTimeline.pause();
            });
            addManagedListener(card, 'mouseleave', () => {
                if (cardTimeline) cardTimeline.resume();
            });
            
            // Allow manual click to switch
            addManagedListener(card, 'click', () => {
                if (currentCardIndex !== idx) {
                    currentCardIndex = idx;
                    animateCard(currentCardIndex);
                }
            });
        });
    }

    // 6. Section Specific Interactions (Parallax/Glow)
    document.querySelectorAll('section').forEach(section => {
        addManagedListener(section, 'mousemove', (e) => {
            const { clientX: x, clientY: y } = e;
            const { left, top, width, height } = section.getBoundingClientRect();
            const xPos = (x - left) / width;
            const yPos = (y - top) / height;

            // Subtle ambient glow follows mouse in sections
            // (Implemented via CSS vars if needed, but keeping it light)
        });
    });

    // 8. Mobile Menu Toggle Logic
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-menu-inner a');

    if (menuToggle && mobileMenu) {
        addManagedListener(menuToggle, 'click', () => {
            menuToggle.classList.toggle('active');
            mobileMenu.classList.toggle('active');

            // Prevent body scroll when menu is open
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : 'auto';
        });

        // Close menu when a link is clicked
        mobileLinks.forEach(link => {
            addManagedListener(link, 'click', () => {
                menuToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });
    }

    // 9. Creative Ecosystem — Premium Restrained Hover Glow
    document.querySelectorAll('.eco-chip[data-glow]').forEach(chip => {
        const glowColor = chip.getAttribute('data-glow');
        chip.style.setProperty('--glow-color', 'rgba(255, 255, 255, 0.04)');
        
        addManagedListener(chip, 'mouseenter', () => {
            chip.style.setProperty('--glow-color', glowColor + '26'); // 15% in hex is 26
        });
        
        addManagedListener(chip, 'mouseleave', () => {
            chip.style.setProperty('--glow-color', 'rgba(255, 255, 255, 0.04)');
        });
    });

    // 10. Luxury Microinteraction: 3D Tilt on Category Cards
    document.querySelectorAll('.eco-category').forEach(card => {
        addManagedListener(card, 'mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            card.style.transform = `perspective(1000px) rotateX(${-y * 3}deg) rotateY(${x * 3}deg) translateY(-2px)`;
        });
        
        addManagedListener(card, 'mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
        });
    });

    // 10.5. Luxury Microinteraction: 3D Tilt & Mouse-Tracking Glow on Capability Cards
    document.querySelectorAll('.cap-card-v2').forEach(card => {
        addManagedListener(card, 'mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Set CSS variables for holographic border gradient tracking
            card.style.setProperty('--mx', `${x}px`);
            card.style.setProperty('--my', `${y}px`);
            
            // 3D perspective tilt
            const rotX = -((e.clientY - rect.top) / rect.height - 0.5) * 3;
            const rotY = ((e.clientX - rect.left) / rect.width - 0.5) * 3;
            card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-4px)`;
        });
        
        addManagedListener(card, 'mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
            card.style.setProperty('--mx', '50%');
            card.style.setProperty('--my', '50%');
        });
    });

    // 13. Collaborations Hover Brand-Glow Interaction
    document.querySelectorAll('.client-item[data-glow]').forEach(item => {
        const glowColor = item.getAttribute('data-glow');
        item.style.setProperty('--glow-color', 'rgba(255, 255, 255, 0.04)');
        
        addManagedListener(item, 'mouseenter', () => {
            item.style.setProperty('--glow-color', glowColor + '26'); // 15% opacity glow
        });
        
        addManagedListener(item, 'mouseleave', () => {
            item.style.setProperty('--glow-color', 'rgba(255, 255, 255, 0.04)');
        });
    });

    // 14. Cinematic Self-Visuals Cards - 3D Tilt & Hover Glow
    document.querySelectorAll('.cinema-card').forEach(card => {
        const glowColor = card.getAttribute('data-glow');
        card.style.setProperty('--glow-color', 'rgba(77, 163, 255, 0.1)'); // Default electric blue glow
        
        addManagedListener(card, 'mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            
            // Highly elegant, subtle perspective tilt
            card.style.transform = `perspective(1000px) rotateX(${-y * 2.5}deg) rotateY(${x * 2.5}deg) translateY(-4px)`;
            
            // Brighten glow on mouse movement
            if (glowColor) {
                card.style.setProperty('--glow-color', glowColor + '33'); // 20% opacity glow
            }
        });
        
        addManagedListener(card, 'mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
            card.style.setProperty('--glow-color', 'rgba(77, 163, 255, 0.1)');
        });
    });

    // Sound Design on Hover (Procedural Sub-bass Drone) - Desktop Only
    // Sound Design on Hover (Unmute & Fade Video Audio) - Desktop Only
    document.querySelectorAll('#self-visuals .cinema-card, #key-art-showcase .cinema-card').forEach((card) => {
        const videoEl = card.querySelector('video');
        if (videoEl) {
            addManagedListener(card, 'mouseenter', () => {
                playVideoAudio(videoEl);
            });
            
            addManagedListener(card, 'mouseleave', () => {
                stopVideoAudio(videoEl);
            });
        }
    });

    // Dynamic Navbar Shrink on Scroll & ScrollSpy Logic
    const nav = document.querySelector('nav');
    if (nav) {
        addManagedListener(window, 'scroll', () => {
            if (window.scrollY > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        });

        // ScrollSpy implementation (desktop/sidebar active highlights)
        const spySections = [
            { id: 'hero', selector: '#hero', linkSelector: 'nav .nav-link-item[href="#"]' },
            { id: 'experience-journey', selector: '#experience-journey', linkSelector: 'nav .nav-link-item[href="#experience-journey"]' },
            // { id: 'featured-projects', selector: '#featured-projects', linkSelector: 'nav .nav-link-item[href="#featured-projects"]' },
            { id: 'tech-stack', selector: '#tech-stack', linkSelector: 'nav .nav-link-item[href="#tech-stack"]' },
            { id: 'contact', selector: '#contact', linkSelector: 'nav .nav-link-item[href="#contact"]' }
        ];

        let isThrottled = false;
        function updateActiveLinkThrottled() {
            if (isThrottled) return;
            isThrottled = true;
            activeLinkRaf = requestAnimationFrame(() => {
                updateActiveLink();
                setTimeout(() => { isThrottled = false; }, 80);
            });
        }

        function updateActiveLink() {
            let activeLink = null;
            const scrollPos = window.scrollY;

            // Find current active section
            for (let i = spySections.length - 1; i >= 0; i--) {
                const sec = spySections[i];
                const el = document.querySelector(sec.selector);
                if (el) {
                    const top = el.getBoundingClientRect().top + window.scrollY;
                    // Trigger section active highlight if scrolled past the top (with a 200px threshold offset)
                    if (scrollPos >= top - 200) {
                        activeLink = document.querySelector(sec.linkSelector);
                        break;
                    }
                }
            }

            // Fallback default: if at top, Home is active
            if (!activeLink || scrollPos < 100) {
                activeLink = document.querySelector('nav .nav-link-item[href="#"]');
            }

            if (activeLink) {
                document.querySelectorAll('nav .nav-link-item').forEach(item => {
                    item.classList.remove('active-link');
                });
                activeLink.classList.add('active-link');
            }
        }

        addManagedListener(window, 'scroll', updateActiveLinkThrottled);
        addManagedListener(window, 'resize', updateActiveLinkThrottled);
        // Run immediately after brief delay to let page settle
        setTimeout(updateActiveLink, 250);
    }

    // ═══════════════════════════════════════════════════════════
    // 15. EXPERIENCE JOURNEY — Cinematic Creative OS Controller
    // ═══════════════════════════════════════════════════════════

    const xpSection = document.getElementById('experience-journey');
    const xpWindows = document.querySelectorAll('.xp-interface-window');
    const observers = [];

    if (xpSection && xpWindows.length > 0) {
        
        // ── Ambient Particle System ──
        const pCanvas = document.getElementById('xp-particles');
        if (pCanvas) {
            const pCtx = pCanvas.getContext('2d');
            let particles = [];
            const PARTICLE_COUNT = 30; // Reduced from 50 to optimize rendering overhead

            function resizeParticleCanvas() {
                pCanvas.width = xpSection.offsetWidth;
                pCanvas.height = xpSection.offsetHeight;
            }
            resizeParticleCanvas();
            addManagedListener(window, 'resize', debounce(resizeParticleCanvas, 150));

            class Particle {
                constructor() {
                    this.reset();
                }
                reset() {
                    this.x = Math.random() * pCanvas.width;
                    this.y = Math.random() * pCanvas.height;
                    this.vx = (Math.random() - 0.5) * 0.3;
                    this.vy = (Math.random() - 0.5) * 0.3;
                    this.size = Math.random() * 1.5 + 0.5;
                    this.opacity = Math.random() * 0.3 + 0.05;
                    this.life = Math.random() * 400 + 200;
                    this.age = 0;
                }
                update() {
                    this.x += this.vx;
                    this.y += this.vy;
                    this.age++;
                    if (this.age > this.life || this.x < 0 || this.x > pCanvas.width || this.y < 0 || this.y > pCanvas.height) {
                        this.reset();
                    }
                }
                draw() {
                    const fadeRatio = 1 - (this.age / this.life);
                    pCtx.beginPath();
                    pCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                    pCtx.fillStyle = `rgba(77, 163, 255, ${this.opacity * fadeRatio})`;
                    pCtx.fill();
                }
            }

            for (let i = 0; i < PARTICLE_COUNT; i++) {
                particles.push(new Particle());
            }

            let isXpVisible = false;
            function animateParticles() {
                if (!isXpVisible) return;
                pCtx.clearRect(0, 0, pCanvas.width, pCanvas.height);
                particles.forEach(p => { p.update(); p.draw(); });
                particlesRaf = requestAnimationFrame(animateParticles);
            }

            // IntersectionObserver to pause loop when offscreen
            const xpObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    isXpVisible = entry.isIntersecting;
                    if (isXpVisible) {
                        animateParticles();
                    } else {
                        cancelAnimationFrame(particlesRaf);
                    }
                });
            }, { threshold: 0.02 });
            xpObserver.observe(xpSection);
            observers.push(xpObserver);
        }

        // ── Per-Node Themed Canvas Animations ──
        document.querySelectorAll('.xp-node-canvas').forEach((canvas, nodeIdx) => {
            const ctx = canvas.getContext('2d');
            const theme = canvas.dataset.theme;
            let animId;
            let isCanvasVisible = false;
            let drawFn = null;

            function resizeNodeCanvas() {
                const parent = canvas.parentElement;
                if (parent) {
                    canvas.width = parent.offsetWidth;
                    canvas.height = parent.offsetHeight;
                }
            }
            resizeNodeCanvas();
            addManagedListener(window, 'resize', debounce(resizeNodeCanvas, 150));

            // AI Workflow — connected floating nodes
            if (theme === 'ai-workflow') {
                const nodes = [];
                for (let i = 0; i < 12; i++) {
                    nodes.push({
                        x: Math.random() * 0.8 + 0.1,
                        y: Math.random() * 0.8 + 0.1,
                        vx: (Math.random() - 0.5) * 0.0008,
                        vy: (Math.random() - 0.5) * 0.0008,
                        r: Math.random() * 3 + 2
                    });
                }
                drawFn = function drawAI() {
                    if (!isCanvasVisible) return;
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    const w = canvas.width, h = canvas.height;
                    // connections
                    for (let i = 0; i < nodes.length; i++) {
                        for (let j = i + 1; j < nodes.length; j++) {
                            const dx = (nodes[i].x - nodes[j].x) * w;
                            const dy = (nodes[i].y - nodes[j].y) * h;
                            const dist = Math.sqrt(dx * dx + dy * dy);
                            if (dist < 200) {
                                ctx.beginPath();
                                ctx.moveTo(nodes[i].x * w, nodes[i].y * h);
                                ctx.lineTo(nodes[j].x * w, nodes[j].y * h);
                                ctx.strokeStyle = `rgba(77,163,255,${0.08 * (1 - dist / 200)})`;
                                ctx.lineWidth = 1;
                                ctx.stroke();
                            }
                        }
                    }
                    // nodes
                    nodes.forEach(n => {
                        n.x += n.vx;
                        n.y += n.vy;
                        if (n.x < 0.05 || n.x > 0.95) n.vx *= -1;
                        if (n.y < 0.05 || n.y > 0.95) n.vy *= -1;
                        ctx.beginPath();
                        ctx.arc(n.x * w, n.y * h, n.r, 0, Math.PI * 2);
                        ctx.fillStyle = 'rgba(77,163,255,0.15)';
                        ctx.fill();
                        ctx.beginPath();
                        ctx.arc(n.x * w, n.y * h, n.r * 0.4, 0, Math.PI * 2);
                        ctx.fillStyle = 'rgba(77,163,255,0.4)';
                        ctx.fill();
                    });
                    animId = requestAnimationFrame(drawAI);
                    nodeCanvasRafs[nodeIdx] = animId;
                };
            }

            // AR Holographic — floating wireframe face mesh + neon particles
            if (theme === 'ar-holographic') {
                let frame = 0;
                const arParticles = [];
                for (let i = 0; i < 20; i++) { // Reduced from 30 to optimize overhead
                    arParticles.push({
                        x: Math.random(), y: Math.random(),
                        vx: (Math.random() - 0.5) * 0.002,
                        vy: (Math.random() - 0.5) * 0.002,
                        size: Math.random() * 2 + 1
                    });
                }
                drawFn = function drawAR() {
                    if (!isCanvasVisible) return;
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    const w = canvas.width, h = canvas.height;
                    const cx = w * 0.7, cy = h * 0.4;

                    // Face mesh wireframe (simplified ellipse grid)
                    const meshR = Math.min(w, h) * 0.18;
                    ctx.save();
                    ctx.translate(cx, cy);
                    for (let ring = 1; ring <= 4; ring++) {
                        const r = meshR * (ring / 4);
                        const wobble = Math.sin(frame * 0.02 + ring) * 2;
                        ctx.beginPath();
                        ctx.ellipse(0, wobble, r, r * 1.3, 0, 0, Math.PI * 2);
                        ctx.strokeStyle = `rgba(255,234,77,${0.06 + ring * 0.02})`;
                        ctx.lineWidth = 0.8;
                        ctx.stroke();
                    }
                    // Cross lines
                    for (let i = 0; i < 6; i++) {
                        const angle = (i / 6) * Math.PI;
                        ctx.beginPath();
                        ctx.moveTo(Math.cos(angle) * meshR, Math.sin(angle) * meshR * 1.3);
                        ctx.lineTo(-Math.cos(angle) * meshR, -Math.sin(angle) * meshR * 1.3);
                        ctx.strokeStyle = 'rgba(255,234,77,0.04)';
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                    ctx.restore();

                    // Floating neon particles
                    arParticles.forEach(p => {
                        p.x += p.vx;
                        p.y += p.vy;
                        if (p.x < 0 || p.x > 1) p.vx *= -1;
                        if (p.y < 0 || p.y > 1) p.vy *= -1;
                        ctx.beginPath();
                        ctx.arc(p.x * w, p.y * h, p.size, 0, Math.PI * 2);
                        ctx.fillStyle = `rgba(255,234,77,${0.08 + Math.sin(frame * 0.03) * 0.04})`;
                        ctx.fill();
                    });
                    frame++;
                    animId = requestAnimationFrame(drawAR);
                    nodeCanvasRafs[nodeIdx] = animId;
                };
            }

            if (drawFn) {
                const canvasObserver = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        isCanvasVisible = entry.isIntersecting;
                        if (isCanvasVisible) {
                            drawFn();
                        } else {
                            cancelAnimationFrame(animId);
                        }
                    });
                }, { threshold: 0.02 });
                canvasObserver.observe(canvas);
                observers.push(canvasObserver);
            }
        });
    }

    // 16. SCROLL PROGRESS BAR & HEADING UNDERLINE REVEALS
    const headings = gsap.utils.toArray('.section-heading');
    headings.forEach((heading) => {
        gsap.to(heading, {
            '--underline-scale': 1,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: heading,
                start: 'top 85%',
                toggleActions: 'play none none none'
            }
        });
    });

    console.log("%c CINEMATIC DIGITAL IDENTITY ACTIVE ", "background: #050505; color: #F5F5F5; font-weight: bold; padding: 10px; border: 1px solid rgba(255,255,255,0.1);");

    // Comprehensive cleanup returned to the React wrapper
    return () => {
        // Remove all managed event listeners
        listeners.forEach(({ element, type, handler }) => {
            if (element) {
                element.removeEventListener(type, handler);
            }
        });

        // Disconnect all observers
        observers.forEach(obs => obs.disconnect());

        // Cancel all animation loop requestAnimationFrames
        cancelAnimationFrame(followerRaf);
        cancelAnimationFrame(particlesRaf);
        cancelAnimationFrame(activeLinkRaf);
        nodeCanvasRafs.forEach(id => cancelAnimationFrame(id));

        // Reset marquees to their original content to avoid double multiplication on hot-reload
        marquees.forEach((m, idx) => {
            if (originalMarqueeHTML[idx]) {
                m.innerHTML = originalMarqueeHTML[idx];
            }
        });

        // Kill all GSAP timelines, tweens and ScrollTriggers registered during this init
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        gsap.killTweensOf('*');

        // Unsubscribe from GSAP ticker loop
        gsap.ticker.remove(lenisTicker);

        // Reset initialization token
        window.portfolioInitialized = false;
    };
}
