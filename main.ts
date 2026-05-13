/**
 * Karthik G Raj | Gen AI Creative Director Portfolio
 * TypeScript Logic for Animations and Interactions
 */

interface ScrollOptions {
    threshold: number;
    rootMargin?: string;
}

// Ensure Lenis is available globally from CDN
declare const Lenis: any;
declare const gsap: any;
declare const ScrollTrigger: any;

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 2
    });

    function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // 2. GSAP Animations Setup
    gsap.registerPlugin(ScrollTrigger);

    // Reveal Text Animation
    const revealTexts = gsap.utils.toArray('.reveal-text');
    revealTexts.forEach((text: HTMLElement) => {
        gsap.to(text, {
            scrollTrigger: {
                trigger: text,
                start: 'top 90%',
                toggleActions: 'play none none none'
            },
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: 'power4.out',
            stagger: 0.1
        });
    });

    // Reveal Items Animation
    const revealItems = gsap.utils.toArray('.reveal-item');
    revealItems.forEach((item: HTMLElement) => {
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
    const cursor = document.getElementById('cursor') as HTMLElement;
    const follower = document.getElementById('cursor-follower') as HTMLElement;
    
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e: MouseEvent) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Fast cursor dot
        cursor.style.left = `${mouseX}px`;
        cursor.style.top = `${mouseY}px`;
    });

    function animateFollower() {
        // Linear interpolation for smooth trailing
        followerX += (mouseX - followerX) * 0.12;
        followerY += (mouseY - followerY) * 0.12;
        
        follower.style.left = `${followerX}px`;
        follower.style.top = `${followerY}px`;
        follower.style.transform = `translate(-50%, -50%)`;
        
        requestAnimationFrame(animateFollower);
    }
    animateFollower();

    // Interactive Cursor States
    const interactiveSelectors = 'a, button, .project-img, .step, .logo-text';
    const interactiveElements = document.querySelectorAll(interactiveSelectors);

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(3)';
            cursor.style.background = 'rgba(250, 255, 0, 0.2)';
            follower.style.width = '60px';
            follower.style.height = '60px';
            follower.style.borderColor = '#faff00';
            follower.style.borderWidth = '2px';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.background = '#faff00';
            follower.style.width = '40px';
            follower.style.height = '40px';
            follower.style.borderColor = '#faff00';
            follower.style.borderWidth = '1px';
        });
    });

    // 4. Freelance Badge Persistence
    const badge = document.getElementById('freelance-badge');
    const closeBtn = document.querySelector('.close-badge');
    
    if (closeBtn && badge) {
        closeBtn.addEventListener('click', () => {
            gsap.to(badge, {
                opacity: 0,
                x: 100,
                duration: 0.5,
                ease: 'power2.in',
                onComplete: () => {
                    (badge as HTMLElement).style.display = 'none';
                }
            });
        });
    }

    // 5. Marquee Seamless Loop Optimization
    const marquees = document.querySelectorAll('.marquee-content');
    marquees.forEach(m => {
        const content = m.innerHTML;
        // Triplicate for extra safety on wide screens
        m.innerHTML = content + content + content;
    });

    // 6. Infographic Hover Effects
    const steps = document.querySelectorAll('.step');
    steps.forEach((step, index) => {
        gsap.from(step, {
            scrollTrigger: {
                trigger: step,
                start: 'top 95%'
            },
            opacity: 0,
            x: -20,
            duration: 0.8,
            delay: index * 0.2
        });
    });

    console.log(
        "%c GEN AI CREATIVE DIRECTION // ACTIVATED ",
        "background: #faff00; color: #000; font-weight: bold; padding: 10px; font-family: 'Space Grotesk', sans-serif;"
    );
});
