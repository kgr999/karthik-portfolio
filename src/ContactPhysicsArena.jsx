import React, { useEffect, useRef, useState } from 'react';
import './ContactPhysicsArena.css';

const BASE_FRAMES = [
    { image: "assets/images/capdirector.webp" },
    { image: "assets/images/capcharbuild.webp" },
    { image: "assets/images/storyboarding.webp" },
    { image: "assets/images/instaviral.webp" },
    { image: "assets/images/capaudio.webp" },
    { image: "assets/images/capvideo.webp" }
];

// Duplicate the array to create a long scrollable track
const FILM_FRAMES = [...BASE_FRAMES, ...BASE_FRAMES, ...BASE_FRAMES];

export default function ContactPhysicsArena() {
    const arenaRef = useRef(null);
    const aeroRef = useRef(null);
    const stripRef = useRef(null);
    const reelRef = useRef(null);
    const leftEyeRef = useRef(null);
    const rightEyeRef = useRef(null);
    
    const [aeroExpression, setAeroExpression] = useState('idle');

    // Dynamic state trackers
    const cursorPositionRef = useRef({ x: 0, y: 0 });
    const isCursorInsideRef = useRef(false);
    const aeroState = useRef({ x: 150, y: 200 });
    
    // Scroll tracking refs
    const lastScrollY = useRef(window.scrollY);
    const rotationRef = useRef(0);

    useEffect(() => {
        if (!arenaRef.current) return;

        // Ambient mobile expressions timer
        let expressionTimeout;
        const triggerRandomExpression = () => {
            const isMobile = window.innerWidth <= 768;
            if (!isMobile) {
                setAeroExpression('idle');
                expressionTimeout = setTimeout(triggerRandomExpression, 3000);
                return;
            }

            const expressions = ['look-left', 'look-right', 'wink', 'double-blink', 'idle'];
            const randomExpr = expressions[Math.floor(Math.random() * expressions.length)];

            if (randomExpr === 'wink') {
                setAeroExpression('wink');
                setTimeout(() => setAeroExpression('idle'), 800);
            } else if (randomExpr === 'double-blink') {
                setAeroExpression('blink');
                setTimeout(() => {
                    setAeroExpression('idle');
                    setTimeout(() => {
                        setAeroExpression('blink');
                        setTimeout(() => setAeroExpression('idle'), 150);
                    }, 100);
                }, 150);
            } else if (randomExpr === 'look-left' || randomExpr === 'look-right') {
                setAeroExpression(randomExpr);
                setTimeout(() => setAeroExpression('idle'), 1200);
            } else {
                setAeroExpression('idle');
            }

            const nextDelay = 4000 + Math.random() * 4000;
            expressionTimeout = setTimeout(triggerRandomExpression, nextDelay);
        };

        expressionTimeout = setTimeout(triggerRandomExpression, 3000);

        // 1. Mouse/Touch Move Listeners to trail cursor
        const handleMouseMove = (e) => {
            if (!arenaRef.current) return;
            const rect = arenaRef.current.getBoundingClientRect();
            const clientX = e.clientX || (e.touches && e.touches[0].clientX);
            const clientY = e.clientY || (e.touches && e.touches[0].clientY);

            // Out-of-bounds check (add padding to allow edge tracking)
            const padding = 100;
            if (
                clientY < rect.top - padding || 
                clientY > rect.bottom + padding || 
                clientX < rect.left - padding || 
                clientX > rect.right + padding
            ) {
                isCursorInsideRef.current = false;
                return;
            }

            const mouseX = clientX - rect.left;
            const mouseY = clientY - rect.top;

            cursorPositionRef.current = { x: mouseX, y: mouseY };
            isCursorInsideRef.current = true;
        };

        const handleMouseLeave = () => {
            isCursorInsideRef.current = false;
        };

        // 2. Scroll Parallax & Reel Rotation Event Handler
        const handleScroll = () => {
            if (!arenaRef.current) return;
            const rect = arenaRef.current.getBoundingClientRect();
            const viewportH = window.innerHeight;

            // Only run transitions when the contact section is on-screen
            const entry = rect.top - viewportH;
            const exit = rect.bottom;

            if (entry < 0 && exit > 0) {
                const scrollProgress = -entry / (rect.height + viewportH);

                // Horizontal translation of the film strip (parallax) - Desktop only
                if (stripRef.current) {
                    const isMobile = window.innerWidth <= 768;
                    if (!isMobile) {
                        const maxTranslation = 800; // max slide in pixels
                        const translation = (scrollProgress * 2 - 1) * maxTranslation;
                        stripRef.current.style.transform = `translate3d(${translation}px, 0, 0)`;
                    } else {
                        // Clear inline styles on mobile to let CSS infinite marquee run
                        stripRef.current.style.transform = '';
                    }
                }

                // Dynamic speed-up for movie reel spin on scroll
                if (reelRef.current) {
                    const currentScroll = window.scrollY;
                    const diff = Math.abs(currentScroll - lastScrollY.current);
                    lastScrollY.current = currentScroll;

                    // Add scroll impulse to rotation
                    rotationRef.current += diff * 0.35;
                }
            }
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        window.addEventListener('touchmove', handleMouseMove, { passive: true });
        window.addEventListener('scroll', handleScroll, { passive: true });

        const contactSection = document.getElementById('contact') || arenaRef.current;
        if (contactSection) {
            contactSection.addEventListener('mouseleave', handleMouseLeave, { passive: true });
        }

        // 3. High framerate animation loop for Aero and movie reel
        let animationFrameId;

        const loop = () => {
            const arenaW = arenaRef.current ? arenaRef.current.getBoundingClientRect().width : 800;
            const arenaH = arenaRef.current ? arenaRef.current.getBoundingClientRect().height : 400;

            if (arenaW > 0 && arenaH > 0) {
                const prevX = aeroState.current.x;
                // Aero LERP movement
                if (isCursorInsideRef.current) {
                    const targetX = cursorPositionRef.current.x;
                    const targetY = cursorPositionRef.current.y + 35; // Center slightly below cursor
                    aeroState.current.x += (targetX - aeroState.current.x) * 0.08;
                    aeroState.current.y += (targetY - aeroState.current.y) * 0.08;
                } else {
                    const isMobile = window.innerWidth <= 768;
                    const time = Date.now() * 0.0008; // slightly slower for elegant motion
                    let targetX, targetY;
                    if (isMobile) {
                        // Dynamic wide floating loop for mobile view
                        targetX = arenaW * 0.5 + Math.sin(time) * (arenaW * 0.35);
                        targetY = arenaH * 0.5 + Math.cos(time * 1.5) * (arenaH * 0.22);
                    } else {
                        // Desktop resting floating loop
                        targetX = arenaW * 0.25 + Math.sin(time * 1.25) * 45;
                        targetY = arenaH * 0.5 + Math.sin(time * 2.5) * 20;
                    }
                    aeroState.current.x += (targetX - aeroState.current.x) * 0.04;
                    aeroState.current.y += (targetY - aeroState.current.y) * 0.04;
                }

                // Apply constraints to keep Aero inside bounds
                const isMobile = window.innerWidth <= 768;
                const limit = isMobile ? 30 : 45;
                aeroState.current.x = Math.max(limit, Math.min(arenaW - limit, aeroState.current.x));
                aeroState.current.y = Math.max(limit, Math.min(arenaH - limit, aeroState.current.y));

                // Translate & rotate Aero based on slide velocity with scaling for mobile
                if (aeroRef.current) {
                    const vx = aeroState.current.x - prevX;
                    const tilt = Math.min(Math.max(vx * 1.8, -12), 12);
                    
                    let scaleVal = 1;
                    if (window.innerWidth <= 480) {
                        scaleVal = 0.55;
                    } else if (window.innerWidth <= 768) {
                        scaleVal = 0.70;
                    }
                    const scaleStr = scaleVal !== 1 ? ` scale(${scaleVal})` : '';
                    
                    aeroRef.current.style.transform = `translate3d(${aeroState.current.x - 40}px, ${aeroState.current.y - 45}px, 0) rotate(${tilt}deg)${scaleStr}`;
                }

                // Resolve eye containers dynamically inside loop to avoid frozen null closures
                if (!leftEyeRef.current && aeroRef.current) {
                    leftEyeRef.current = aeroRef.current.querySelector('.aero-eye-container.left');
                }
                if (!rightEyeRef.current && aeroRef.current) {
                    rightEyeRef.current = aeroRef.current.querySelector('.aero-eye-container.right');
                }

                const leftEye = leftEyeRef.current;
                const rightEye = rightEyeRef.current;

                // Apply interactive cursor tracking to eyes dynamically (charming display look)
                if (leftEye && rightEye) {
                    const hasActiveExpr = aeroRef.current.className.includes('contact-expr-') && 
                                         !aeroRef.current.className.includes('contact-expr-idle');
                    if (hasActiveExpr) {
                        leftEye.style.transform = '';
                        rightEye.style.transform = '';
                    } else if (isCursorInsideRef.current) {
                        const diffX = cursorPositionRef.current.x - aeroState.current.x;
                        const diffY = (cursorPositionRef.current.y + 35) - aeroState.current.y;
                        // Map displacement to subtle visual offset
                        const eyeX = Math.min(Math.max(diffX * 0.05, -2.5), 2.5);
                        const eyeY = Math.min(Math.max(diffY * 0.05, -2), 2);
                        leftEye.style.transform = `translate3d(${eyeX}px, ${eyeY}px, 0)`;
                        rightEye.style.transform = `translate3d(${eyeX}px, ${eyeY}px, 0)`;
                    } else {
                        leftEye.style.transform = 'translate3d(0, 0, 0)';
                        rightEye.style.transform = 'translate3d(0, 0, 0)';
                    }
                }

                // Update movie reel slow ambient spin + scroll inertia decay
                if (reelRef.current) {
                    // Decay the scroll rotation momentum slowly (inertia friction)
                    rotationRef.current *= 0.94;
                    
                    const timeSpin = (Date.now() * 0.015) % 360; // slow ambient spin
                    const totalRotation = (timeSpin + rotationRef.current) % 360;
                    reelRef.current.style.transform = `rotate(${totalRotation}deg)`;
                }
            }

            animationFrameId = requestAnimationFrame(loop);
        };

        animationFrameId = requestAnimationFrame(loop);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('touchmove', handleMouseMove);
            window.removeEventListener('scroll', handleScroll);
            if (contactSection) {
                contactSection.removeEventListener('mouseleave', handleMouseLeave);
            }
            cancelAnimationFrame(animationFrameId);
            clearTimeout(expressionTimeout);
        };
    }, []);

    const handleArenaClick = (e) => {
        // Prevent click events on anchors/buttons from triggering wink
        if (e.target.closest('a') || e.target.closest('button')) return;

        setAeroExpression('wink');
        setTimeout(() => setAeroExpression('idle'), 600);
    };

    const handleAeroMouseEnter = () => {
        setAeroExpression('wink');
        setTimeout(() => setAeroExpression('idle'), 800);
    };

    return (
        <div 
            className="contact-physics-arena" 
            ref={arenaRef}
            onClick={handleArenaClick}
        >
            {/* Spinning Vintage Movie Reel Background */}
            <div className="cinematic-reel-bg" ref={reelRef}>
                <svg viewBox="0 0 200 200" width="100%" height="100%">
                    {/* Outer rim */}
                    <circle cx="100" cy="100" r="95" fill="none" stroke="rgba(255, 255, 255, 0.07)" strokeWidth="6" />
                    <circle cx="100" cy="100" r="86" fill="none" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="1.5" />
                    
                    {/* Center spindle cap */}
                    <circle cx="100" cy="100" r="22" fill="none" stroke="rgba(255, 255, 255, 0.07)" strokeWidth="4" />
                    <circle cx="100" cy="100" r="7" fill="rgba(255, 255, 255, 0.07)" />
                    
                    {/* Spool hollow cutouts */}
                    <circle cx="100" cy="52" r="16" fill="none" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="3" />
                    <circle cx="146" cy="85" r="16" fill="none" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="3" />
                    <circle cx="128" cy="138" r="16" fill="none" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="3" />
                    <circle cx="72" cy="138" r="16" fill="none" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="3" />
                    <circle cx="54" cy="85" r="16" fill="none" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="3" />
                    
                    {/* Spoke support bars */}
                    <line x1="100" y1="100" x2="100" y2="5" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="3" />
                    <line x1="100" y1="100" x2="195" y2="100" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="3" />
                    <line x1="100" y1="100" x2="100" y2="195" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="3" />
                    <line x1="100" y1="100" x2="5" y2="100" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="3" />
                </svg>
            </div>

            {/* Horizontal Rolling Film Strip */}
            <div className="cinematic-film-strip-container">
                {/* Premium Cybernetic Running Robot (Active only on Mobile) */}
                <div className="aero-running-robot">
                    <div className="run-bot-body-wrapper">
                        {/* Head & visor */}
                        <div className="run-bot-head">
                            <div className="run-bot-visor">
                                <div className="run-bot-eye"></div>
                            </div>
                            <div className="run-bot-antenna"></div>
                        </div>
                        {/* Torso & Core */}
                        <div className="run-bot-torso">
                            <div className="run-bot-chest-core"></div>
                        </div>
                        {/* Dual-joint Arms */}
                        <div className="run-bot-arm left">
                            <div className="run-bot-forearm"></div>
                        </div>
                        <div className="run-bot-arm right">
                            <div className="run-bot-forearm"></div>
                        </div>
                        {/* Dual-joint Legs */}
                        <div className="run-bot-leg left">
                            <div className="run-bot-calf"></div>
                        </div>
                        <div className="run-bot-leg right">
                            <div className="run-bot-calf"></div>
                        </div>
                    </div>
                </div>

                <div className="cinematic-film-strip" ref={stripRef}>
                    {/* Sprocket Holes on top */}
                    <div className="sprocket-holes-row top"></div>

                    {/* Frame Contents Track */}
                    <div className="film-frames-track">
                        <div className="film-frames-group">
                             {FILM_FRAMES.map((frame, index) => (
                                 <div key={`frame-1-${index}`} className="film-frame">
                                     <div className="film-frame-image" style={{ backgroundImage: `url(${frame.image})` }}></div>
                                     <div className="film-frame-header">
                                         <span className="frame-num">SCN {String((index % BASE_FRAMES.length) + 1).padStart(2, '0')}</span>
                                         <span className="frame-perf">KGR 35MM</span>
                                     </div>
                                 </div>
                             ))}
                        </div>
                        <div className="film-frames-group">
                             {FILM_FRAMES.map((frame, index) => (
                                 <div key={`frame-2-${index}`} className="film-frame">
                                     <div className="film-frame-image" style={{ backgroundImage: `url(${frame.image})` }}></div>
                                     <div className="film-frame-header">
                                         <span className="frame-num">SCN {String((index % BASE_FRAMES.length) + 1).padStart(2, '0')}</span>
                                         <span className="frame-perf">KGR 35MM</span>
                                     </div>
                                 </div>
                             ))}
                        </div>
                    </div>

                    {/* Sprocket Holes on bottom */}
                    <div className="sprocket-holes-row bottom"></div>
                </div>
            </div>

            {/* Premium Cybernetic Assistant Bot Aero */}
            <div 
                className={`aero-contact-robot contact-expr-${aeroExpression}`} 
                ref={aeroRef}
                onMouseEnter={handleAeroMouseEnter}
            >
                <div className="aero-body-wrapper">
                    {/* Waving/Pointing Arm (Right Arm) */}
                    <div className="aero-arm-right">
                        <svg viewBox="0 0 40 100" className="aero-arm-svg">
                            <path d="M15,12 L15,62" fill="none" stroke="var(--accent)" strokeWidth="4" strokeLinecap="round" />
                            <circle cx="15" cy="12" r="5.5" fill="#151518" stroke="var(--accent)" strokeWidth="2" />
                            <circle cx="15" cy="62" r="3.5" fill="#151518" stroke="var(--accent)" strokeWidth="1.5" />
                            <g className="aero-hand-group">
                                <path d="M11,66 C7,70 8,78 13,82 C18,80 19,72 16,67" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" />
                                <circle cx="13" cy="74" r="2" fill="var(--accent)" />
                            </g>
                        </svg>
                    </div>

                    {/* Torso & Core */}
                    <div className="aero-torso">
                        <div className="aero-chest">
                            <div className="aero-core-pulse"></div>
                            <div className="aero-core"></div>
                        </div>
                    </div>

                    {/* Head & Face Visor */}
                    <div className="aero-head">
                        <div className="aero-antenna">
                            <div className="aero-antenna-line"></div>
                            <div className="aero-antenna-tip"></div>
                        </div>
                        <div className="aero-visor">
                            <div className="aero-eye-container left">
                                <div className="aero-eye left"></div>
                            </div>
                            <div className="aero-eye-container right">
                                <div className="aero-eye right"></div>
                            </div>
                        </div>
                        <div className="aero-ears">
                            <div className="aero-ear left"></div>
                            <div className="aero-ear right"></div>
                        </div>
                    </div>

                    {/* Pointing/Waving Arm (Left Arm) */}
                    <div className="aero-arm-left">
                        <svg viewBox="0 0 40 100" className="aero-arm-svg">
                            <path d="M25,12 L25,62" fill="none" stroke="var(--accent)" strokeWidth="4" strokeLinecap="round" />
                            <circle cx="25" cy="12" r="5.5" fill="#151518" stroke="var(--accent)" strokeWidth="2" />
                            <circle cx="25" cy="62" r="3.5" fill="#151518" stroke="var(--accent)" strokeWidth="1.5" />
                            <g className="aero-hand-group">
                                <path d="M29,66 C33,70 32,78 27,82 C22,80 21,72 24,67" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" />
                                <circle cx="27" cy="74" r="2" fill="var(--accent)" />
                            </g>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
}
