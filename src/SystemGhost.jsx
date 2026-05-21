import React, { useEffect, useRef, useState, useCallback } from 'react';
import './SystemGhost.css';

// ═══════════════════════════════════════════════════════
// SYSTEM GHOST — Cinematic Ambient Intelligence Layer
// ═══════════════════════════════════════════════════════
//
// An invisible, atmospheric intelligence that makes the
// portfolio feel alive, reactive, and cinematic. The user
// should FEEL its presence rather than directly see it.

const TRANSMISSIONS = [
    'Creative signal active.',
    'Narrative systems online.',
    'Visual architecture initialized.',
    'Signal received.',
    'Attention systems calibrated.',
    'Rendering cinematic systems…',
    'Creative intelligence detected.',
    'Operational awareness active.',
    'Cinematic pipeline engaged.',
];

// Section-to-mood mapping
const SECTION_MOODS = {
    'hero': 'landing',
    'capabilities': 'capabilities',
    'tech-stack': 'capabilities',
    'self-visuals': 'capabilities',
    'visuals': 'experience',
    'experience-journey': 'experience',
    'certs': 'contact',
    'contact': 'contact',
};

// Which sections exist (ordered by page flow)
const SECTION_IDS = [
    'capabilities',
    'tech-stack',
    'self-visuals',
    'visuals',
    'experience-journey',
    'certs',
    'contact',
];

export default function SystemGhost({ isInitialized }) {
    const orbRef = useRef(null);
    const layerRef = useRef(null);
    const scanlineRef = useRef(null);
    const pulseRef = useRef(null);
    const transmissionRef = useRef(null);

    // Internal state refs (not React state — avoids re-renders)
    const mousePos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    const orbPos = useRef({ x: window.innerWidth * 0.6, y: window.innerHeight * 0.4 });
    const lastScrollY = useRef(0);
    const lastScrollDir = useRef(0);
    const scrollDirChangeTimer = useRef(null);
    const currentMood = useRef('landing');
    const txTimeoutRef = useRef(null);
    const animFrameRef = useRef(null);
    const timeRef = useRef(0);
    const lastTxIndex = useRef(-1);

    // ── Cursor proximity awareness ──
    const handleMouseMove = useCallback((e) => {
        mousePos.current = { x: e.clientX, y: e.clientY };
    }, []);

    // ── Scroll direction detection for scan line ──
    const handleScroll = useCallback(() => {
        const currentY = window.scrollY;
        const dir = currentY > lastScrollY.current ? 1 : -1;

        // Detect direction change
        if (dir !== lastScrollDir.current && lastScrollDir.current !== 0) {
            // Trigger scan line on direction change (debounced)
            if (!scrollDirChangeTimer.current) {
                triggerScanLine();
                scrollDirChangeTimer.current = setTimeout(() => {
                    scrollDirChangeTimer.current = null;
                }, 3000); // 3s cooldown between scans
            }
        }

        lastScrollDir.current = dir;
        lastScrollY.current = currentY;
    }, []);

    // ── Trigger neural scan line ──
    const triggerScanLine = useCallback(() => {
        const scanline = scanlineRef.current;
        if (!scanline) return;

        // Remove class to reset animation
        scanline.classList.remove('ghost-scan-active');

        // Force reflow
        void scanline.offsetWidth;

        // Re-add to trigger animation
        scanline.classList.add('ghost-scan-active');

        // Clean up after animation
        setTimeout(() => {
            if (scanline) scanline.classList.remove('ghost-scan-active');
        }, 1900);
    }, []);

    // ── Trigger pulse ring at section transitions ──
    const triggerPulseRing = useCallback(() => {
        const pulse = pulseRef.current;
        if (!pulse) return;

        // Position at center of viewport
        pulse.style.left = '50%';
        pulse.style.top = '50%';

        pulse.classList.remove('ghost-pulse-active');
        void pulse.offsetWidth;
        pulse.classList.add('ghost-pulse-active');

        setTimeout(() => {
            if (pulse) pulse.classList.remove('ghost-pulse-active');
        }, 2100);
    }, []);

    // ── Micro transmission scheduler ──
    const scheduleTransmission = useCallback(() => {
        // Random interval: 25–40 seconds
        const delay = (25 + Math.random() * 15) * 1000;

        txTimeoutRef.current = setTimeout(() => {
            const tx = transmissionRef.current;
            if (!tx) return;

            // Pick a random message (avoid repeating last one)
            let idx;
            do {
                idx = Math.floor(Math.random() * TRANSMISSIONS.length);
            } while (idx === lastTxIndex.current && TRANSMISSIONS.length > 1);
            lastTxIndex.current = idx;

            tx.textContent = TRANSMISSIONS[idx];
            tx.classList.add('ghost-tx-visible');

            // Hold for 3 seconds, then fade out
            setTimeout(() => {
                if (tx) tx.classList.remove('ghost-tx-visible');
            }, 3000);

            // Schedule next transmission
            scheduleTransmission();
        }, delay);
    }, []);

    // ── Section observer for mood shifts ──
    useEffect(() => {
        if (!isInitialized) return;

        const observerOptions = {
            root: null,
            rootMargin: '-30% 0px -30% 0px',
            threshold: 0,
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.id;
                    const mood = SECTION_MOODS[sectionId] || 'landing';

                    if (mood !== currentMood.current) {
                        currentMood.current = mood;
                        if (layerRef.current) {
                            layerRef.current.setAttribute('data-mood', mood);
                        }
                        // Trigger a subtle pulse on mood transition
                        triggerPulseRing();
                    }
                }
            });
        }, observerOptions);

        // Observe all portfolio sections
        SECTION_IDS.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, [isInitialized, triggerPulseRing]);

    // ── Main animation loop ──
    useEffect(() => {
        if (!isInitialized) return;

        // Activate ghost layer with fade-in
        const activateTimer = setTimeout(() => {
            if (layerRef.current) {
                layerRef.current.classList.add('ghost-active');
                layerRef.current.setAttribute('data-mood', 'capabilities');
            }
        }, 800);

        // Start transmission scheduler
        // First transmission after 12–18 seconds
        const firstTxDelay = (12 + Math.random() * 6) * 1000;
        txTimeoutRef.current = setTimeout(() => {
            const tx = transmissionRef.current;
            if (tx) {
                tx.textContent = TRANSMISSIONS[0];
                tx.classList.add('ghost-tx-visible');
                setTimeout(() => {
                    if (tx) tx.classList.remove('ghost-tx-visible');
                }, 3000);
            }
            scheduleTransmission();
        }, firstTxDelay);

        // Attach event listeners
        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        window.addEventListener('scroll', handleScroll, { passive: true });

        // Animation loop
        const animate = () => {
            timeRef.current += 0.008;
            const orb = orbRef.current;
            if (orb) {
                const target = orbPos.current;
                const mouse = mousePos.current;

                // Autonomous drift — slow sine wave movement
                const driftX = Math.sin(timeRef.current * 0.7) * 60;
                const driftY = Math.cos(timeRef.current * 0.5) * 40;

                // Base position (center-ish of viewport with drift)
                const baseX = window.innerWidth * 0.55 + driftX;
                const baseY = window.innerHeight * 0.45 + driftY;

                // Very gentle cursor influence (0.02 lerp — barely perceptible)
                const cursorInfluenceX = (mouse.x - baseX) * 0.02;
                const cursorInfluenceY = (mouse.y - baseY) * 0.02;

                // Smooth lerp to final position
                target.x += ((baseX + cursorInfluenceX) - target.x) * 0.015;
                target.y += ((baseY + cursorInfluenceY) - target.y) * 0.015;

                orb.style.left = target.x + 'px';
                orb.style.top = target.y + 'px';
            }

            animFrameRef.current = requestAnimationFrame(animate);
        };

        animFrameRef.current = requestAnimationFrame(animate);

        // Cleanup
        return () => {
            clearTimeout(activateTimer);
            clearTimeout(txTimeoutRef.current);
            clearTimeout(scrollDirChangeTimer.current);
            cancelAnimationFrame(animFrameRef.current);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isInitialized, handleMouseMove, handleScroll, scheduleTransmission]);

    return (
        <>
            {/* Ghost Layer — atmospheric ambient intelligence */}
            <div
                ref={layerRef}
                className="ghost-layer"
                data-mood="landing"
                aria-hidden="true"
            >
                {/* Ambient Glow Orb */}
                <div ref={orbRef} className="ghost-orb" />

                {/* Neural Scan Line */}
                <div ref={scanlineRef} className="ghost-scanline" />

                {/* Section Transition Pulse Ring */}
                <div ref={pulseRef} className="ghost-pulse-ring" />
            </div>

            {/* Micro Transmissions — whispered system messages */}
            <div
                ref={transmissionRef}
                className="ghost-transmission"
                aria-hidden="true"
            />
        </>
    );
}
