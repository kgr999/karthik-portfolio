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

    // 3. Custom Cursor Logic
    const cursor = document.getElementById('cursor');
    const follower = document.getElementById('cursor-follower');
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });

    function animateFollower() {
        followerX += (mouseX - followerX) * 0.12;
        followerY += (mouseY - followerY) * 0.12;
        follower.style.left = followerX + 'px';
        follower.style.top = followerY + 'px';
        follower.style.transform = `translate(-50%, -50%)`;
        requestAnimationFrame(animateFollower);
    }
    animateFollower();

    // Interactive Cursor States
    document.querySelectorAll('a, button, .project-img, .step').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(3)';
            cursor.style.background = 'rgba(250, 255, 0, 0.2)';
            follower.style.width = '60px';
            follower.style.height = '60px';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.background = '#faff00';
            follower.style.width = '40px';
            follower.style.height = '40px';
        });
    });

    // 4. Freelance Badge Logic
    const badge = document.getElementById('freelance-badge');
    const closeBtn = document.querySelector('.close-badge');
    if (closeBtn && badge) {
        closeBtn.addEventListener('click', () => {
            badge.style.display = 'none';
        });
    }

    // 5. Marquee Loop Logic
    const marquees = document.querySelectorAll('.marquee-content');
    marquees.forEach(m => {
        const content = m.innerHTML;
        m.innerHTML = content + content + content;
    });

    console.log("%c GEN AI CREATIVE DIRECTION ACTIVE ", "background: #faff00; color: #000; font-weight: bold; padding: 5px;");
});
