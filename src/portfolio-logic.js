import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

// Register plugin and expose globally for index.html or older scripts
gsap.registerPlugin(ScrollTrigger);
window.gsap = gsap;
window.ScrollTrigger = ScrollTrigger;
window.Lenis = Lenis;

export function initPortfolio() {
    if (window.portfolioInitialized) {
        console.log("Portfolio logic already initialized");
        return;
    }
    window.portfolioInitialized = true;

    // 1. Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
        duration: 1.4, // Heavier, more luxurious inertia scrolling (Apple-style)
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 1.8
    });
    window.lenis = lenis;

    // Connect Lenis to GSAP ScrollTrigger for flawless scroll sync with zero micro-stutter
    lenis.on('scroll', ScrollTrigger.update);

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // 2. GSAP Animations Setup
    // ScrollTrigger is registered globally above

    // Hero Entrance Animations (Apple Fluid Reveal)
    gsap.fromTo('.hero-reveal-text', 
        { opacity: 0, y: 40, filter: 'blur(4px)', scale: 0.98 },
        {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            scale: 1,
            duration: 1.2,
            stagger: 0.12,
            ease: 'power4.out'
        }
    );

    gsap.fromTo('.hero-reveal-item', 
        { opacity: 0, y: 30, filter: 'blur(3px)' },
        {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 1.4,
            stagger: 0.08,
            ease: 'power3.out',
            delay: 0.25
        }
    );

    // Reveal Text Animation (Apple Scroll-Scrubbed Text Reveal)
    gsap.utils.toArray('.reveal-text').forEach((text) => {
        gsap.fromTo(text, 
            { opacity: 0.15, y: 30, filter: 'brightness(0.5) blur(1px)' },
            {
                scrollTrigger: {
                    trigger: text,
                    start: 'top 92%',
                    end: 'top 65%',
                    scrub: 1
                },
                opacity: 1,
                y: 0,
                filter: 'brightness(1) blur(0px)',
                ease: 'power2.out'
            }
        );
    });

    // Reveal Items Animation (Apple Spatial Reveal)
    gsap.utils.toArray('.reveal-item').forEach((item) => {
        gsap.fromTo(item, 
            { opacity: 0, y: 40, scale: 0.97, filter: 'blur(3px)' },
            {
                scrollTrigger: {
                    trigger: item,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                },
                opacity: 1,
                y: 0,
                scale: 1,
                filter: 'blur(0px)',
                duration: 1.5,
                ease: 'power4.out'
            }
        );
    });

    // 2.5. Premium Capabilities Cards Float Stagger (Apple Spatial Reveal)
    const capCardsV2 = gsap.utils.toArray('.cap-card-v2');
    if (capCardsV2.length > 0) {
        gsap.fromTo(capCardsV2, 
            { opacity: 0, y: 50, scale: 0.96, filter: 'blur(3px)' },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                filter: 'blur(0px)',
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
            { opacity: 0, scale: 0.94, rotationX: -18, filter: 'blur(2px)', transformPerspective: 1000 },
            {
                opacity: 1,
                scale: 1,
                rotationX: 0,
                filter: 'blur(0px)',
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
                { opacity: 0, y: 50, scale: 1.04, filter: 'blur(4px)' },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    filter: 'blur(0px)',
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

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Fast cursor dot
        if (cursor) {
            cursor.style.left = mouseX + 'px';
            cursor.style.top = mouseY + 'px';
        }
    });

    function animateFollower() {
        if (follower) {
            // Smooth lerp for follower
            followerX += (mouseX - followerX) * 0.15;
            followerY += (mouseY - followerY) * 0.15;

            follower.style.left = followerX + 'px';
            follower.style.top = followerY + 'px';
            follower.style.transform = `translate(-50%, -50%)`;
        }

        requestAnimationFrame(animateFollower);
    }
    animateFollower();

    // Pixel Particle Burst on Click
    document.addEventListener('click', (e) => {
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
                    document.body.removeChild(particle);
                }
            });
        }
    }

    // Interactive Cursor States
    const interactiveElements = document.querySelectorAll('a, button, .video-card, .gallery-item, .cap-card, .cap-card-v2, .cert-card, .presence-card, .step, .avatar-card-outer');

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
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

        el.addEventListener('mouseleave', () => {
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
    marquees.forEach(m => {
        const content = m.innerHTML;
        m.innerHTML = content + content + content;
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

        // Start animation loop
        animateCard(0);
        
        // Pause on hover, resume on leave, allow manual click switch
        capCards.forEach((card, idx) => {
            card.addEventListener('mouseenter', () => {
                if (cardTimeline) cardTimeline.pause();
            });
            card.addEventListener('mouseleave', () => {
                if (cardTimeline) cardTimeline.resume();
            });
            
            // Allow manual click to switch
            card.addEventListener('click', () => {
                if (currentCardIndex !== idx) {
                    currentCardIndex = idx;
                    animateCard(currentCardIndex);
                }
            });
        });
    }

    // 6. Section Specific Interactions (Parallax/Glow)
    document.querySelectorAll('section').forEach(section => {
        section.addEventListener('mousemove', (e) => {
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
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            mobileMenu.classList.toggle('active');

            // Prevent body scroll when menu is open
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : 'auto';
        });

        // Close menu when a link is clicked
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
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
        
        chip.addEventListener('mouseenter', () => {
            chip.style.setProperty('--glow-color', glowColor + '26'); // 15% in hex is 26
        });
        
        chip.addEventListener('mouseleave', () => {
            chip.style.setProperty('--glow-color', 'rgba(255, 255, 255, 0.04)');
        });
    });

    // 10. Luxury Microinteraction: 3D Tilt on Category Cards
    document.querySelectorAll('.eco-category').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            card.style.transform = `perspective(1000px) rotateX(${-y * 3}deg) rotateY(${x * 3}deg) translateY(-2px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
        });
    });

    // 10.5. Luxury Microinteraction: 3D Tilt & Mouse-Tracking Glow on Capability Cards
    document.querySelectorAll('.cap-card-v2').forEach(card => {
        card.addEventListener('mousemove', (e) => {
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
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
            card.style.setProperty('--mx', '50%');
            card.style.setProperty('--my', '50%');
        });
    });

    // 13. Collaborations Hover Brand-Glow Interaction
    document.querySelectorAll('.client-item[data-glow]').forEach(item => {
        const glowColor = item.getAttribute('data-glow');
        item.style.setProperty('--glow-color', 'rgba(255, 255, 255, 0.04)');
        
        item.addEventListener('mouseenter', () => {
            item.style.setProperty('--glow-color', glowColor + '26'); // 15% opacity glow
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.setProperty('--glow-color', 'rgba(255, 255, 255, 0.04)');
        });
    });

    // 14. Cinematic Self-Visuals Cards - 3D Tilt & Hover Glow
    document.querySelectorAll('.cinema-card').forEach(card => {
        const glowColor = card.getAttribute('data-glow');
        card.style.setProperty('--glow-color', 'rgba(77, 163, 255, 0.1)'); // Default electric blue glow
        
        card.addEventListener('mousemove', (e) => {
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
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
            card.style.setProperty('--glow-color', 'rgba(77, 163, 255, 0.1)');
        });
    });

    // Dynamic Navbar Shrink on Scroll
    const nav = document.querySelector('nav');
    if (nav) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        });
    }

    // ═══════════════════════════════════════════════════════════
    // 15. EXPERIENCE JOURNEY — Cinematic Creative OS Controller
    // ═══════════════════════════════════════════════════════════

    const xpSection = document.getElementById('experience-journey');
    const xpWindows = document.querySelectorAll('.xp-interface-window');

    if (xpSection && xpWindows.length > 0) {
        
        // Alternating premium slide-in transitions for Experience windows (optimized for mobile viewport width)
        const isMobileScreen = window.innerWidth < 768;
        const offsetX = isMobileScreen ? 35 : 80;

        const falWindow = document.querySelector('.xp-window-fal');
        const davinciWindow = document.querySelector('.xp-window-davinci');
        const lensWindow = document.querySelector('.xp-window-lens');

        if (falWindow) {
            gsap.fromTo(falWindow,
                { opacity: 0, x: -offsetX },
                {
                    opacity: 1,
                    x: 0,
                    duration: 1.2,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: falWindow,
                        start: 'top 85%',
                        toggleActions: 'play none none none'
                    }
                }
            );
        }

        if (davinciWindow) {
            gsap.fromTo(davinciWindow,
                { opacity: 0, x: offsetX },
                {
                    opacity: 1,
                    x: 0,
                    duration: 1.2,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: davinciWindow,
                        start: 'top 85%',
                        toggleActions: 'play none none none'
                    }
                }
            );
        }

        if (lensWindow) {
            gsap.fromTo(lensWindow,
                { opacity: 0, x: -offsetX },
                {
                    opacity: 1,
                    x: 0,
                    duration: 1.2,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: lensWindow,
                        start: 'top 85%',
                        toggleActions: 'play none none none'
                    }
                }
            );
        }

        // ── Ambient Particle System ──
        const pCanvas = document.getElementById('xp-particles');
        if (pCanvas) {
            const pCtx = pCanvas.getContext('2d');
            let particles = [];
            const PARTICLE_COUNT = 50;

            function resizeParticleCanvas() {
                pCanvas.width = xpSection.offsetWidth;
                pCanvas.height = xpSection.offsetHeight;
            }
            resizeParticleCanvas();
            window.addEventListener('resize', resizeParticleCanvas);

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

            function animateParticles() {
                pCtx.clearRect(0, 0, pCanvas.width, pCanvas.height);
                particles.forEach(p => { p.update(); p.draw(); });
                requestAnimationFrame(animateParticles);
            }
            animateParticles();
        }

        // ── Per-Node Themed Canvas Animations ──
        document.querySelectorAll('.xp-node-canvas').forEach(canvas => {
            const ctx = canvas.getContext('2d');
            const theme = canvas.dataset.theme;
            let animId;

            function resizeNodeCanvas() {
                const parent = canvas.parentElement;
                canvas.width = parent.offsetWidth;
                canvas.height = parent.offsetHeight;
            }
            resizeNodeCanvas();
            window.addEventListener('resize', resizeNodeCanvas);

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
                (function drawAI() {
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
                })();
            }



            // AR Holographic — floating wireframe face mesh + neon particles
            if (theme === 'ar-holographic') {
                let frame = 0;
                const arParticles = [];
                for (let i = 0; i < 30; i++) {
                    arParticles.push({
                        x: Math.random(), y: Math.random(),
                        vx: (Math.random() - 0.5) * 0.002,
                        vy: (Math.random() - 0.5) * 0.002,
                        size: Math.random() * 2 + 1
                    });
                }
                (function drawAR() {
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
                })();
            }
        });
    }



    console.log("%c CINEMATIC DIGITAL IDENTITY ACTIVE ", "background: #050505; color: #F5F5F5; font-weight: bold; padding: 10px; border: 1px solid rgba(255,255,255,0.1);");

}
