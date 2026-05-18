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

    console.log("%c CINEMATIC DIGITAL IDENTITY ACTIVE ", "background: #050505; color: #F5F5F5; font-weight: bold; padding: 10px; border: 1px solid rgba(255,255,255,0.1);");
});
