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
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });

    function animateFollower() {
        // Smooth lerp for follower
        followerX += (mouseX - followerX) * 0.15;
        followerY += (mouseY - followerY) * 0.15;
        
        follower.style.left = followerX + 'px';
        follower.style.top = followerY + 'px';
        follower.style.transform = `translate(-50%, -50%)`;
        
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
                backgroundColor: '#3b82f6'
            });

            gsap.to(particle, {
                x: x + destinationX,
                y: y + destinationY,
                opacity: 0,
                duration: 0.6,
                ease: 'power2.out',
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
            gsap.to(follower, {
                width: 60,
                height: 60,
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                borderColor: '#3b82f6',
                duration: 0.3
            });
            gsap.to(cursor, {
                scale: 2,
                duration: 0.3
            });
        });

        el.addEventListener('mouseleave', () => {
            gsap.to(follower, {
                width: 40,
                height: 40,
                backgroundColor: 'transparent',
                borderColor: '#3b82f6',
                duration: 0.3
            });
            gsap.to(cursor, {
                scale: 1,
                duration: 0.3
            });
        });
    });

    // 4. Freelance Badge Logic
    const badge = document.getElementById('freelance-badge');
    const closeBtn = document.querySelector('.close-badge');
    if (closeBtn && badge) {
        closeBtn.addEventListener('click', () => {
            gsap.to(badge, {
                opacity: 0,
                y: 20,
                duration: 0.5,
                onComplete: () => badge.style.display = 'none'
            });
        });
    }

    // 5. Marquee Loop Logic
    const marquees = document.querySelectorAll('.marquee-content');
    marquees.forEach(m => {
        const content = m.innerHTML;
        m.innerHTML = content + content + content;
    });

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

    // 7. Scroll Progress Logic (Logo Area)
    const progressBar = document.querySelector('.progress-bar');
    const progressText = document.querySelector('.progress-text');

    gsap.to('.progress-bar', {
        scrollTrigger: {
            trigger: 'body',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.3,
            onUpdate: (self) => {
                const progress = Math.round(self.progress * 100);
                if (progressText) progressText.innerText = `${progress}%`;
                
                // Toggle green state at 100%
                const progressContainer = document.querySelector('.logo-progress');
                if (progress >= 100) {
                    progressContainer.classList.add('is-complete');
                } else {
                    progressContainer.classList.remove('is-complete');
                }
            }
        },
        width: '100%',
        ease: 'none'
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

    console.log("%c CINEMATIC DIGITAL IDENTITY ACTIVE ", "background: #050505; color: #faff00; font-weight: bold; padding: 10px; border: 1px solid #faff00;");
});
