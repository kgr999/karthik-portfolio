import React, { useEffect, useRef, useState } from 'react';
import './ContactPhysicsArena.css';

const LOGO_BALLS_DATA = [
    { id: 2, name: "ChatGPT", logo: "https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/openai.svg", color: "#10a37f" },
    { id: 3, name: "HeyGen", logo: "https://www.google.com/s2/favicons?domain=heygen.com&sz=128", color: "#06b6d4" },
    { id: 4, name: "NanoBanana", logo: "https://raw.githubusercontent.com/lobehub/lobe-icons/refs/heads/master/packages/static-png/dark/nanobanana-color.png", color: "#eab308" },
    { id: 5, name: "Fal AI", logo: "https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/fal-color.svg", color: "#ff4154" },
    { id: 6, name: "Kling", logo: "https://www.google.com/s2/favicons?domain=klingai.com&sz=128", color: "#3b82f6" }
];

export default function ContactPhysicsArena() {
    const arenaRef = useRef(null);
    const aeroRef = useRef(null);
    const aeraRef = useRef(null);
    const giftRef = useRef(null);
    const heartsContainerRef = useRef(null);
    const ballsRef = useRef([]);
    const [aeroWink, setAeroWink] = useState(false);

    // Keep track of interactive dimensions & state variables in refs for 60fps physics
    const dimensions = useRef({ width: 0, height: 0 });
    const ballsState = useRef([]);
    const aeroState = useRef({
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        radius: 40,
        state: 'chase',
        targetBallId: null,
        heldBallId: null,
        holdTimer: 0,
        dodgeTimer: 0,
        hoverActive: false,
        giftActive: false,
        giftEmoji: '',
        giftX: 0,
        giftY: 0,
        giftProgress: 0,
        giftStep: 'carry'
    });

    const aeraState = useRef({
        x: 0,
        y: 0,
        radius: 40,
        state: 'idle',
        happyTimer: 0,
        hoverActive: false
    });

    const heartsState = useRef([]);

    const isDragging = useRef(null); // id of ball being dragged
    const dragOffset = useRef({ x: 0, y: 0 });
    const prevMousePos = useRef({ x: 0, y: 0, t: 0 });

    useEffect(() => {
        if (!arenaRef.current) return;

        const spawnHearts = (count, startX, startY) => {
            if (!heartsContainerRef.current) return;
            for (let i = 0; i < count; i++) {
                const heartEl = document.createElement('div');
                heartEl.className = 'physics-heart-particle';
                heartEl.innerHTML = ['❤️', '💖', '💝', '💕', '💗'][Math.floor(Math.random() * 5)];
                heartsContainerRef.current.appendChild(heartEl);

                heartsState.current.push({
                    id: Math.random() + i,
                    el: heartEl,
                    x: startX + (Math.random() - 0.5) * 25,
                    y: startY - 12,
                    vx: (Math.random() - 0.5) * 3,
                    vy: -2 - Math.random() * 3,
                    scale: 0.5 + Math.random() * 0.7,
                    opacity: 1,
                    rotation: (Math.random() - 0.5) * 45,
                    decay: 0.012 + Math.random() * 0.01
                });
            }
        };

        // 1. Calculate parent layout sizes
        const updateDimensions = () => {
            const rect = arenaRef.current.getBoundingClientRect();
            dimensions.current = {
                width: rect.width,
                height: rect.height
            };
            // Dynamic coordinates for pink bot Aera in the bottom-right corner
            aeraState.current.x = rect.width - 120;
            aeraState.current.y = rect.height - 100;
        };

        updateDimensions();
        window.addEventListener('resize', updateDimensions);

        // 2. Initialize balls state with random dispersed coordinates and speeds
        const w = dimensions.current.width || 800;
        const h = dimensions.current.height || 400;

        ballsState.current = LOGO_BALLS_DATA.map((b, idx) => ({
            ...b,
            x: 100 + idx * ((w - 200) / (LOGO_BALLS_DATA.length - 1 || 4)),
            y: 50 + Math.random() * 80,
            vx: (Math.random() - 0.5) * 4,
            vy: 2 + Math.random() * 3,
            radius: 24, // 48px diameter
            mass: 1
        }));

        // Initialize Aera (Pink Female Bot) bottom right
        aeraState.current.x = w - 120;
        aeraState.current.y = h - 100;

        // Initialize Aero (Blue Bot) bottom left-center
        aeroState.current.x = w * 0.3;
        aeroState.current.y = h - 100;

        // 3. High framerate physics loop
        let animationFrameId;
        const elasticity = 0.85;
        const friction = 0.99;

        const updatePhysics = () => {
            const arenaW = dimensions.current.width;
            const arenaH = dimensions.current.height;
            if (arenaW === 0 || arenaH === 0) {
                animationFrameId = requestAnimationFrame(updatePhysics);
                return;
            }

            const balls = ballsState.current;
            const aero = aeroState.current;

            // ── A. UPDATE DRAGGED BALL ──
            if (isDragging.current !== null) {
                const draggedBall = balls.find(b => b.id === isDragging.current);
                if (draggedBall) {
                    // Velocity is calculated from mouse throw speed, but decays if user holds it still
                    const timeSinceLastMove = Date.now() - prevMousePos.current.t;
                    if (timeSinceLastMove > 80) {
                        draggedBall.vx *= 0.65;
                        draggedBall.vy *= 0.65;
                        if (Math.abs(draggedBall.vx) < 0.1) draggedBall.vx = 0;
                        if (Math.abs(draggedBall.vy) < 0.1) draggedBall.vy = 0;
                    }
                }
            }

            // ── B. UPDATE INDIVIDUAL BALLS & WALL REBOUNDS ──
            balls.forEach(b => {
                if (b.id === isDragging.current || b.id === aero.heldBallId) return; // Skip updating physics for item being dragged or held

                // Apply velocity
                b.x += b.vx;
                b.y += b.vy;

                // Apply drag/friction
                b.vx *= friction;
                b.vy *= friction;

                // Bounce off left/right borders
                if (b.x - b.radius < 0) {
                    b.x = b.radius;
                    b.vx = -b.vx * elasticity;
                } else if (b.x + b.radius > arenaW) {
                    b.x = arenaW - b.radius;
                    b.vx = -b.vx * elasticity;
                }

                // Bounce off top/bottom borders
                if (b.y - b.radius < 0) {
                    b.y = b.radius;
                    b.vy = -b.vy * elasticity;
                } else if (b.y + b.radius > arenaH) {
                    b.y = arenaH - b.radius;
                    b.vy = -b.vy * elasticity;
                }
            });

            // ── C. BALL-TO-BALL ELASTIC COLLISIONS ──
            for (let i = 0; i < balls.length; i++) {
                for (let j = i + 1; j < balls.length; j++) {
                    const b1 = balls[i];
                    const b2 = balls[j];

                    if (b1.id === aero.heldBallId || b2.id === aero.heldBallId) continue;

                    const dx = b2.x - b1.x;
                    const dy = b2.y - b1.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    const minDist = b1.radius + b2.radius;

                    if (dist < minDist) {
                        // Dynamic vector overlap resolution
                        const overlap = minDist - dist;
                        const angle = Math.atan2(dy, dx);

                        if (b1.id !== isDragging.current && b2.id !== isDragging.current) {
                            b1.x -= Math.cos(angle) * overlap * 0.5;
                            b1.y -= Math.sin(angle) * overlap * 0.5;
                            b2.x += Math.cos(angle) * overlap * 0.5;
                            b2.y += Math.sin(angle) * overlap * 0.5;

                            // Elastic velocity vector exchanges
                            const nx = dx / dist;
                            const ny = dy / dist;
                            const kx = b1.vx - b2.vx;
                            const ky = b1.vy - b2.vy;
                            const p = 2 * (nx * kx + ny * ky) / 2;

                            b1.vx -= p * nx * elasticity;
                            b1.vy -= p * ny * elasticity;
                            b2.vx += p * nx * elasticity;
                            b2.vy += p * ny * elasticity;
                        } else if (b1.id === isDragging.current && b2.id !== isDragging.current) {
                            // b1 is being dragged, push b2 away and apply velocity
                            b2.x += Math.cos(angle) * overlap;
                            b2.y += Math.sin(angle) * overlap;

                            // Apply dynamic push velocity based on b1's current drag speed
                            const pushSpeed = Math.max(Math.sqrt(b1.vx * b1.vx + b1.vy * b1.vy) * 0.8, 8);
                            b2.vx = Math.cos(angle) * pushSpeed;
                            b2.vy = Math.sin(angle) * pushSpeed;
                        } else if (b2.id === isDragging.current && b1.id !== isDragging.current) {
                            // b2 is being dragged, push b1 away and apply velocity
                            b1.x -= Math.cos(angle) * overlap;
                            b1.y -= Math.sin(angle) * overlap;

                            // Apply dynamic push velocity based on b2's current drag speed
                            const pushSpeed = Math.max(Math.sqrt(b2.vx * b2.vx + b2.vy * b2.vy) * 0.8, 8);
                            b1.vx = -Math.cos(angle) * pushSpeed;
                            b1.vy = -Math.sin(angle) * pushSpeed;
                        }
                    }
                }
            }

            // ── D. AUTOMATED AERO ROBOT SUCTION, DELIVER & DODGE STATE MACHINE ──
            if (!aero.state) aero.state = 'chase';

            if (aero.state === 'chase') {
                // Find closest non-dragged, non-hidden ball to chase
                let targetBall = null;
                let minDist = Infinity;

                balls.forEach(b => {
                    if (b.id === isDragging.current || b.hidden) return;
                    const dx = b.x - aero.x;
                    const dy = b.y - aero.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < minDist) {
                        minDist = dist;
                        targetBall = b;
                    }
                });

                if (targetBall && !aero.hoverActive) {
                    aero.targetBallId = targetBall.id;

                    // Steer the head suction cup directly under the ball
                    const targetX = targetBall.x;
                    const targetY = targetBall.y + targetBall.radius + aero.radius - 8;

                    const dx = targetX - aero.x;
                    const dy = targetY - aero.y;

                    // Glide towards target coordinates
                    aero.vx += dx * 0.0035;
                    aero.vy += dy * 0.0035;

                    // Check for suction capture zone
                    const cupX = aero.x;
                    const cupY = aero.y - aero.radius;
                    const distToCup = Math.sqrt(Math.pow(targetBall.x - cupX, 2) + Math.pow(targetBall.y - cupY, 2));

                    if (distToCup < 46) {
                        // Activate vacuum lock!
                        aero.state = 'hold';
                        aero.heldBallId = targetBall.id;
                        aero.holdTimer = Date.now() + 1200; // 1.2s lock timer
                        targetBall.vx = 0;
                        targetBall.vy = 0;
                        targetBall.scale = 1;
                    }
                }
            } else if (aero.state === 'hold') {
                // Lock held ball's position relative to Aero's top gravity cup
                const heldBall = balls.find(b => b.id === aero.heldBallId);

                // If user forces drag on held ball, interrupt suction immediately
                if (!heldBall || heldBall.id === isDragging.current) {
                    aero.state = 'dodge';
                    aero.dodgeTimer = Date.now() + 2500;
                    aero.heldBallId = null;
                } else {
                    heldBall.x = aero.x;
                    heldBall.y = aero.y - aero.radius - heldBall.radius + 4;
                    heldBall.vx = aero.vx;
                    heldBall.vy = aero.vy;

                    // Dynamically animate the ball scaling down as if sucked in!
                    const elapsed = Date.now() - (aero.holdTimer - 1200);
                    if (elapsed > 900) {
                        // Shrink in the final 300ms
                        heldBall.scale = Math.max(0, 1 - (elapsed - 900) / 300);
                    } else {
                        heldBall.scale = 1;
                    }

                    // Hover stabilization deceleration
                    aero.vx *= 0.88;
                    aero.vy *= 0.88;

                    // Check if holding timer has elapsed
                    if (Date.now() >= aero.holdTimer) {
                        // Determine emoji gift output based on tool category mapping
                        let emoji = '🎁';
                        if (heldBall.id === 2) emoji = '💬'; // ChatGPT -> Text msg
                        else if (heldBall.id === 3) emoji = '🎵'; // HeyGen -> Music
                        else if (heldBall.id === 4) emoji = '🖼️'; // NanoBanana -> Image
                        else if (heldBall.id === 5) emoji = '🎨'; // Fal AI -> Art
                        else if (heldBall.id === 6) emoji = '📸'; // Kling -> Photo/Video

                        // Consume/hide this ball and schedule a delayed respawn from top
                        heldBall.hidden = true;
                        heldBall.scale = 1;
                        const respawnId = heldBall.id;
                        setTimeout(() => {
                            const b = ballsState.current.find(ball => ball.id === respawnId);
                            if (b) {
                                b.x = 100 + Math.random() * (dimensions.current.width - 200);
                                b.y = -35;
                                b.vx = (Math.random() - 0.5) * 3;
                                b.vy = 2 + Math.random() * 2;
                                b.scale = 1;
                                b.hidden = false;
                            }
                        }, 3500);

                        // Trigger floating gift emoji particle above Aero's head
                        aero.giftActive = true;
                        aero.giftEmoji = emoji;
                        aero.giftX = aero.x;
                        aero.giftY = aero.y - aero.radius - 18;
                        aero.giftProgress = 0;
                        aero.giftStep = 'carry';

                        // Transition Aero to deliver state
                        aero.state = 'deliver';
                        aero.heldBallId = null;
                    }
                }
            } else if (aero.state === 'deliver') {
                // Steer Aero towards Aera's hover point (just to her left)
                const targetX = aera.x - 70;
                const targetY = aera.y - 15;

                const dx = targetX - aero.x;
                const dy = targetY - aero.y;

                aero.vx += dx * 0.0035;
                aero.vy += dy * 0.0035;

                // Carry emoji directly above Aero
                if (aero.giftStep === 'carry') {
                    aero.giftX = aero.x;
                    aero.giftY = aero.y - aero.radius - 18;

                    const distToAera = Math.sqrt(Math.pow(aero.x - aera.x, 2) + Math.pow(aero.y - aera.y, 2));
                    if (distToAera < 110) {
                        // Start interpolation flight handover!
                        aero.giftStep = 'fly';
                        aero.giftProgress = 0;
                    }
                } else if (aero.giftStep === 'fly') {
                    aero.giftProgress += 0.045; // Smooth 22 frames transition

                    if (aero.giftProgress >= 1) {
                        // Handover complete!
                        aero.giftActive = false;
                        aero.giftStep = 'carry';

                        // Aera happy heart-burst reaction
                        aera.state = 'happy';
                        aera.happyTimer = Date.now() + 2000;

                        // Spawn 10 heart particles
                        spawnHearts(10, aera.x, aera.y - aera.radius);

                        // Flee! Backwards surprised recoil
                        aero.state = 'dodge';
                        aero.dodgeTimer = Date.now() + 2500;
                    } else {
                        // Arc trajectory interpolation from Aero's suction cup to Aera's head
                        const t = aero.giftProgress;
                        const startX = aero.x;
                        const startY = aero.y - aero.radius - 18;
                        const endX = aera.x;
                        const endY = aera.y - aera.radius - 12;
                        
                        const arcHeight = -35;
                        aero.giftX = startX + (endX - startX) * t;
                        aero.giftY = startY + (endY - startY) * t + Math.sin(t * Math.PI) * arcHeight;
                    }
                }
            } else if (aero.state === 'dodge') {
                // Evade active balls and stay away from Aera
                balls.forEach(b => {
                    if (b.id === isDragging.current || b.hidden) return;
                    const dx = aero.x - b.x;
                    const dy = aero.y - b.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 160) {
                        const force = (160 - dist) / 160;
                        aero.vx += (dx / (dist || 1)) * force * 0.95;
                        aero.vy += (dy / (dist || 1)) * force * 0.95;
                    }
                });

                // Repulse from Aera
                const dx = aero.x - aera.x;
                const dy = aero.y - aera.y;
                const distToAera = Math.sqrt(dx * dx + dy * dy);
                if (distToAera < 200) {
                    const force = (200 - distToAera) / 200;
                    aero.vx += (dx / (distToAera || 1)) * force * 0.9;
                    aero.vy += (dy / (distToAera || 1)) * force * 0.9;
                }

                if (Date.now() >= aero.dodgeTimer) {
                    aero.state = 'chase';
                }
            }

            // Sync Aero DOM data-state attribute
            if (aeroRef.current) {
                if (aeroRef.current.getAttribute('data-state') !== aero.state) {
                    aeroRef.current.setAttribute('data-state', aero.state);
                }
            }

            // Sync Aera DOM happy state winks & heart-eyes
            if (aera.state === 'happy' && Date.now() >= aera.happyTimer) {
                aera.state = 'idle';
            }

            if (aeraRef.current) {
                if (aeraRef.current.getAttribute('data-state') !== aera.state) {
                    aeraRef.current.setAttribute('data-state', aera.state);
                }
            }

            // Apply friction to Aero's drift velocity
            aero.vx *= 0.93;
            aero.vy *= 0.93;

            // Update Aero position
            aero.x += aero.vx;
            aero.y += aero.vy;

            // Restrict Aero inside borders
            if (aero.x - aero.radius < 20) {
                aero.x = aero.radius + 20;
                aero.vx = -aero.vx * 0.5;
            } else if (aero.x + aero.radius > arenaW - 20) {
                aero.x = arenaW - aero.radius - 20;
                aero.vx = -aero.vx * 0.5;
            }

            if (aero.y - aero.radius < 20) {
                aero.y = aero.radius + 20;
                aero.vy = -aero.vy * 0.5;
            } else if (aero.y + aero.radius > arenaH - 20) {
                aero.y = arenaH - aero.radius - 20;
                aero.vy = -aero.vy * 0.5;
            }

            // ── E. COLLISION RESOLUTIONS (AERO & AERA COLLIDERS) ──
            balls.forEach(b => {
                if (b.id === aero.heldBallId || b.hidden) return; // Skip if ball is held or consumed

                // 1. Aero Bounces
                const dx1 = b.x - aero.x;
                const dy1 = b.y - aero.y;
                const dist1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);
                const collisionDist1 = b.radius + aero.radius - 6;

                if (dist1 < collisionDist1) {
                    const angle = Math.atan2(dy1, dx1);
                    
                    if (b.id !== isDragging.current) {
                        b.x = aero.x + Math.cos(angle) * (collisionDist1 + 2);
                        b.y = aero.y + Math.sin(angle) * (collisionDist1 + 2);

                        const speed = Math.sqrt(b.vx * b.vx + b.vy * b.vy);
                        const pushPower = Math.max(speed * 0.6, 7.5);
                        b.vx = Math.cos(angle) * pushPower;
                        b.vy = Math.sin(angle) * pushPower;

                        aero.vx -= Math.cos(angle) * 3.5;
                        aero.vy -= Math.sin(angle) * 3.5;

                        setAeroWink(true);
                        setTimeout(() => setAeroWink(false), 800);
                    }
                }

                // 2. Aera Static Rebound (Static collidable circle boundary)
                const dx2 = b.x - aera.x;
                const dy2 = b.y - aera.y;
                const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
                const collisionDist2 = b.radius + aera.radius - 6;

                if (dist2 < collisionDist2) {
                    const angle = Math.atan2(dy2, dx2);
                    
                    if (b.id !== isDragging.current) {
                        b.x = aera.x + Math.cos(angle) * (collisionDist2 + 2);
                        b.y = aera.y + Math.sin(angle) * (collisionDist2 + 2);

                        const speed = Math.sqrt(b.vx * b.vx + b.vy * b.vy);
                        const bounceSpeed = Math.max(speed * elasticity, 5);
                        b.vx = Math.cos(angle) * bounceSpeed;
                        b.vy = Math.sin(angle) * bounceSpeed;
                    }
                }
            });

            // ── F. UPDATE HEARTS & GIPH EMOJI TRAJECTORIES ──
            const hearts = heartsState.current;
            for (let i = hearts.length - 1; i >= 0; i--) {
                const h = hearts[i];
                h.y += h.vy;
                h.x += h.vx;
                h.x += Math.sin(Date.now() * 0.01 + h.id) * 0.5; // gentle swaying
                h.vy *= 0.98;
                h.vx *= 0.98;
                h.opacity -= h.decay;
                h.rotation += h.vx * 2;

                if (h.opacity <= 0) {
                    if (h.el && h.el.parentNode) {
                        h.el.parentNode.removeChild(h.el);
                    }
                    hearts.splice(i, 1);
                } else {
                    h.el.style.transform = `translate3d(${h.x - 10}px, ${h.y - 10}px, 0) scale(${h.scale}) rotate(${h.rotation}deg)`;
                    h.el.style.opacity = h.opacity;
                }
            }

            if (giftRef.current) {
                if (aero.giftActive) {
                    giftRef.current.style.display = 'block';
                    const scale = aero.giftStep === 'fly' ? 1 - aero.giftProgress * 0.4 : 1;
                    giftRef.current.style.transform = `translate3d(${aero.giftX - 12}px, ${aero.giftY - 12}px, 0) scale(${scale})`;
                    giftRef.current.textContent = aero.giftEmoji;
                } else {
                    giftRef.current.style.display = 'none';
                }
            }

            // ── G. WRITE DIRECT TRANSLATE TRANSFORMS FOR MAXIMUM PERFORMANCE ──
            balls.forEach((b, idx) => {
                const ballEl = ballsRef.current[idx];
                if (ballEl) {
                    if (b.hidden) {
                        ballEl.style.display = 'none';
                    } else {
                        ballEl.style.display = 'flex';
                        const scale = b.scale !== undefined ? b.scale : 1;
                        ballEl.style.transform = `translate3d(${b.x - b.radius}px, ${b.y - b.radius}px, 0) scale(${scale})`;
                    }
                }
            });

            if (aeroRef.current) {
                const tilt = Math.min(Math.max(aero.vx * 1.8, -12), 12);
                aeroRef.current.style.transform = `translate3d(${aero.x - aero.radius}px, ${aero.y - aero.radius}px, 0) rotate(${tilt}deg)`;
            }

            // Static Aera floating hover drift
            if (aeraRef.current) {
                const aeraHoverOffset = Math.sin(Date.now() * 0.002) * 3.5;
                const aeraTilt = Math.sin(Date.now() * 0.001) * 1.5;
                aeraRef.current.style.transform = `translate3d(${aera.x - aera.radius}px, ${aera.y - aera.radius + aeraHoverOffset}px, 0) rotate(${aeraTilt}deg)`;
            }

            animationFrameId = requestAnimationFrame(updatePhysics);
        };

        animationFrameId = requestAnimationFrame(updatePhysics);

        return () => {
            window.removeEventListener('resize', updateDimensions);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    // ── G. MOUSE/TOUCH INTERACTION AND FLICK DRAGGING LOGIC ──
    const handleMouseDown = (ballId, e) => {
        e.preventDefault();
        const clientX = e.clientX || (e.touches && e.touches[0].clientX);
        const clientY = e.clientY || (e.touches && e.touches[0].clientY);

        const arenaRect = arenaRef.current.getBoundingClientRect();
        const mouseX = clientX - arenaRect.left;
        const mouseY = clientY - arenaRect.top;

        const ball = ballsState.current.find(b => b.id === ballId);
        if (ball) {
            isDragging.current = ballId;
            dragOffset.current = {
                x: mouseX - ball.x,
                y: mouseY - ball.y
            };
            prevMousePos.current = {
                x: mouseX,
                y: mouseY,
                t: Date.now()
            };
        }
    };

    const handleMouseMove = (e) => {
        if (isDragging.current === null) return;
        
        const clientX = e.clientX || (e.touches && e.touches[0].clientX);
        const clientY = e.clientY || (e.touches && e.touches[0].clientY);

        const arenaRect = arenaRef.current.getBoundingClientRect();
        const mouseX = clientX - arenaRect.left;
        const mouseY = clientY - arenaRect.top;

        const ball = ballsState.current.find(b => b.id === isDragging.current);
        if (ball) {
            // Update drag position
            ball.x = Math.max(ball.radius, Math.min(dimensions.current.width - ball.radius, mouseX - dragOffset.current.x));
            ball.y = Math.max(ball.radius, Math.min(dimensions.current.height - ball.radius, mouseY - dragOffset.current.y));

            // Record trajectory speeds for release flick velocity
            const now = Date.now();
            const dt = now - prevMousePos.current.t;
            if (dt > 10) {
                const dx = mouseX - prevMousePos.current.x;
                const dy = mouseY - prevMousePos.current.y;
                ball.vx = (dx / dt) * 16;
                ball.vy = (dy / dt) * 16;

                prevMousePos.current = {
                    x: mouseX,
                    y: mouseY,
                    t: now
                };
            }
        }
    };

    const handleMouseUp = () => {
        if (isDragging.current === null) return;
        isDragging.current = null;
    };

    // Aero mouse over effect (Cute recoil pop!)
    const handleAeroMouseEnter = () => {
        aeroState.current.hoverActive = true;
        aeroState.current.vx = (Math.random() - 0.5) * 10;
        aeroState.current.vy = (Math.random() - 0.5) * 10;
        setAeroWink(true);
        setTimeout(() => setAeroWink(false), 800);
    };

    const handleAeroMouseLeave = () => {
        aeroState.current.hoverActive = false;
    };

    return (
        <div 
            className="contact-physics-arena" 
            ref={arenaRef}
            onMouseMove={handleMouseMove}
            onTouchMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onTouchEnd={handleMouseUp}
            onMouseLeave={handleMouseUp}
        >
            {/* Hearts Particle Overlay */}
            <div className="hearts-container" ref={heartsContainerRef}></div>

            {/* Gift Delivery Emoji Element */}
            <div className="physics-gift-emoji" ref={giftRef}>🎁</div>

            {/* Redesigned Premium Cybernetic Hover Assistant Aero (Blue Bot) */}
            <div 
                className={`aero-contact-robot ${aeroWink ? 'contact-wink-active' : ''}`} 
                ref={aeroRef}
                data-state="chase"
                onMouseEnter={handleAeroMouseEnter}
                onMouseLeave={handleAeroMouseLeave}
            >
                <div className="aero-body-wrapper" style={{ transform: 'none', animation: 'none' }}>
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
                        <div className="suction-cone"></div>
                        <div className="aero-antenna">
                            <div className="aero-antenna-line"></div>
                            <div className="aero-antenna-tip"></div>
                        </div>
                        <div className="aero-visor">
                            <div className="aero-eye left"></div>
                            <div className="aero-eye right"></div>
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

            {/* Redesigned Premium Cybernetic Hover Assistant Aera (Pink Bot) */}
            <div 
                className="aera-contact-robot" 
                ref={aeraRef}
                data-state="idle"
            >
                <div className="aero-body-wrapper" style={{ transform: 'none', animation: 'none' }}>
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
                            <div className="aero-eye left"></div>
                            <div className="aero-eye right"></div>
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

            {/* Dynamic Colored Logo Balls */}
            {LOGO_BALLS_DATA.map((ball, idx) => (
                <div
                    key={ball.id}
                    className="physics-logo-ball"
                    ref={el => ballsRef.current[idx] = el}
                    style={{
                        '--ball-glow': ball.color,
                        cursor: 'grab'
                    }}
                    onMouseDown={(e) => handleMouseDown(ball.id, e)}
                    onTouchStart={(e) => handleMouseDown(ball.id, e)}
                >
                    <div className="ball-inner-shield">
                        <img 
                            src={ball.logo} 
                            alt={ball.name} 
                            className={`ball-logo-img ${ball.name === 'Midjourney' || ball.name === 'ChatGPT' ? 'logo-invert' : ''}`}
                            draggable="false"
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}
