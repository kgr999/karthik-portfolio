document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 2
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // 2. GSAP Animations Setup
    gsap.registerPlugin(ScrollTrigger);

    // Reveal Text Animation
    gsap.utils.toArray('.reveal-text').forEach((text) => {
        gsap.to(text, {
            scrollTrigger: {
                trigger: text,
                start: 'top 90%',
                toggleActions: 'play none none none'
            },
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: 'power4.out'
        });
    });

    // Reveal Items Animation
    gsap.utils.toArray('.reveal-item').forEach((item) => {
        gsap.to(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            opacity: 1,
            y: 0,
            duration: 1.5,
            ease: 'expo.out'
        });
    });

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
    const interactiveElements = document.querySelectorAll('a, button, .video-card, .gallery-item, .cap-card, .cert-card, .presence-card, .step');

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
    const xpLid = document.querySelector('.xp-lid');
    const xpBootSeq = document.querySelector('.xp-boot-sequence');
    const xpBloom = document.querySelector('.xp-screen-bloom');
    const xpOsBar = document.querySelector('.xp-os-bar');
    const xpViewport = document.querySelector('.xp-viewport');
    const xpNodes = document.querySelectorAll('.xp-node');
    const xpTimelineRail = document.querySelector('.xp-timeline-rail');
    const xpTimelineNodes = document.querySelectorAll('.xp-timeline-node');
    const xpTimelineProgress = document.querySelector('.xp-timeline-progress');
    const xpClock = document.getElementById('xp-os-clock');

    if (xpSection && xpLid) {

        // ── OS Clock ──
        function updateClock() {
            const now = new Date();
            xpClock.textContent = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
        }
        updateClock();
        setInterval(updateClock, 30000);

        // ── Master scroll timeline ──
        const xpLaptopWrapper = document.querySelector('.xp-laptop-wrapper');
        const xpMasterTl = gsap.timeline({
            scrollTrigger: {
                trigger: xpSection,
                start: 'top top',
                end: 'bottom bottom',
                scrub: 1.2,
                pin: xpLaptopWrapper,
                pinSpacing: false,
                onUpdate: (self) => {
                    const p = self.progress;

                    // Boot sequence fades out early
                    if (xpBootSeq) {
                        xpBootSeq.style.opacity = p < 0.08 ? 1 - (p / 0.08) : 0;
                        xpBootSeq.style.pointerEvents = p > 0.05 ? 'none' : 'auto';
                    }

                    // Lid opens (90deg → 0deg) between 5% and 25%
                    const lidProgress = Math.min(1, Math.max(0, (p - 0.05) / 0.2));
                    const lidAngle = 90 * (1 - lidProgress);
                    xpLid.style.transform = `rotateX(${lidAngle}deg)`;

                    // Bloom and OS bar appear when lid is mostly open
                    if (lidProgress > 0.7) {
                        if (xpBloom) xpBloom.style.opacity = '1';
                        if (xpOsBar) xpOsBar.style.opacity = '1';
                    } else {
                        if (xpBloom) xpBloom.style.opacity = '0';
                        if (xpOsBar) xpOsBar.style.opacity = '0';
                    }

                    // Show/hide timeline rail
                    if (xpTimelineRail) {
                        if (lidProgress > 0.9) {
                            xpTimelineRail.classList.add('visible');
                        } else {
                            xpTimelineRail.classList.remove('visible');
                        }
                    }

                    // Determine active node based on scroll progress (after lid opens)
                    const contentProgress = Math.max(0, (p - 0.3) / 0.65); // 30%-95% of section
                    let activeIndex = 0;
                    if (contentProgress > 0.66) activeIndex = 2;
                    else if (contentProgress > 0.33) activeIndex = 1;

                    // Activate the correct node
                    xpNodes.forEach((node, i) => {
                        if (i === activeIndex && lidProgress > 0.9) {
                            node.classList.add('active');
                        } else {
                            node.classList.remove('active');
                        }
                    });

                    // Scroll viewport to active node
                    if (xpViewport && xpNodes[activeIndex] && lidProgress > 0.9) {
                        const targetScroll = xpNodes[activeIndex].offsetTop - 10;
                        xpViewport.scrollTo({ top: targetScroll, behavior: 'smooth' });
                    }

                    // Update orbital timeline
                    if (xpTimelineProgress) {
                        xpTimelineProgress.style.height = `${contentProgress * 100}%`;
                    }
                    xpTimelineNodes.forEach((tn, i) => {
                        if (i === activeIndex && lidProgress > 0.9) {
                            tn.classList.add('active');
                        } else {
                            tn.classList.remove('active');
                        }
                    });
                }
            }
        });

        // ── Click on orbital nodes to jump ──
        xpTimelineNodes.forEach((tn, i) => {
            tn.addEventListener('click', () => {
                // Calculate target scroll position
                const sectionTop = xpSection.offsetTop;
                const sectionHeight = xpSection.scrollHeight - window.innerHeight;
                const targetProgress = 0.3 + (i * 0.325 * 0.65);
                const targetScroll = sectionTop + (targetProgress * sectionHeight);
                window.scrollTo({ top: targetScroll, behavior: 'smooth' });
            });
        });

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

            // Editing Timeline — horizontal waveform lines
            if (theme === 'editing-timeline') {
                let frame = 0;
                (function drawEdit() {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    const w = canvas.width, h = canvas.height;
                    const tracks = 5;
                    const trackH = h / (tracks + 1);
                    for (let t = 1; t <= tracks; t++) {
                        const y = t * trackH;
                        ctx.beginPath();
                        ctx.moveTo(0, y);
                        for (let x = 0; x < w; x += 3) {
                            const amp = Math.sin((x + frame * 2 + t * 40) * 0.02) * (8 + t * 3) *
                                        Math.sin((x + frame) * 0.005 + t) * 0.5;
                            ctx.lineTo(x, y + amp);
                        }
                        const alpha = 0.06 + (t % 2) * 0.04;
                        ctx.strokeStyle = `rgba(255,180,100,${alpha})`;
                        ctx.lineWidth = 1.5;
                        ctx.stroke();
                    }
                    // Scrubber line
                    const scrubX = (frame * 0.8) % w;
                    ctx.beginPath();
                    ctx.moveTo(scrubX, 0);
                    ctx.lineTo(scrubX, h);
                    ctx.strokeStyle = 'rgba(255,180,100,0.12)';
                    ctx.lineWidth = 1;
                    ctx.stroke();
                    frame++;
                    animId = requestAnimationFrame(drawEdit);
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
                        ctx.strokeStyle = `rgba(180,120,255,${0.06 + ring * 0.02})`;
                        ctx.lineWidth = 0.8;
                        ctx.stroke();
                    }
                    // Cross lines
                    for (let i = 0; i < 6; i++) {
                        const angle = (i / 6) * Math.PI;
                        ctx.beginPath();
                        ctx.moveTo(Math.cos(angle) * meshR, Math.sin(angle) * meshR * 1.3);
                        ctx.lineTo(-Math.cos(angle) * meshR, -Math.sin(angle) * meshR * 1.3);
                        ctx.strokeStyle = 'rgba(180,120,255,0.04)';
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
                        ctx.fillStyle = `rgba(180,120,255,${0.08 + Math.sin(frame * 0.03) * 0.04})`;
                        ctx.fill();
                    });
                    frame++;
                    animId = requestAnimationFrame(drawAR);
                })();
            }
        });
    }

    console.log("%c CINEMATIC DIGITAL IDENTITY ACTIVE ", "background: #050505; color: #F5F5F5; font-weight: bold; padding: 10px; border: 1px solid rgba(255,255,255,0.1);");
});
