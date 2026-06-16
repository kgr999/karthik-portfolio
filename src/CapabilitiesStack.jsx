import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import './CapabilitiesStack.css';
import LazyVideo from './components/LazyVideo';

// High-fidelity capabilities data representing your AI Creative Producer capabilities
const capabilities = [
    {
        id: '01',
        title: 'AI Creative Direction',
        desc: 'Orchestrating complex generative worldbuilding, style lockups, and cinematic continuity.',
        image: 'assets/images/capdirector.png',
        tags: ['Multimodal AI', 'Cinematic Worldbuilding'],
        color: '#3B82F6', // Blue
        glow: 'rgba(59, 130, 246, 0.25)'
    },
    {
        id: '02',
        title: 'Content Research & Strategy',
        desc: 'Analyzing cultural metrics and local audience retention pipelines to direct resonant campaigns.',
        image: 'assets/images/capstoryboarding.png',
        tags: ['Audience Insights', 'Data Analytics'],
        color: '#10B981', // Emerald
        glow: 'rgba(16, 185, 129, 0.25)'
    },
    {
        id: '03',
        title: 'Character Building',
        desc: 'Locking physical visual seeds across multiple angles and scenes for high-retention stories.',
        image: 'assets/images/capcharbuilding.png',
        tags: ['Multi-Shot Continuity', 'Asset Locking'],
        color: '#8B5CF6', // Purple
        glow: 'rgba(139, 92, 246, 0.25)'
    },
    {
        id: '04',
        title: 'Storyboarding & Pre-Visuals',
        desc: 'Drafting core sequential spatial outlines, shot layouts, and camera angles for production pre-renders.',
        image: 'assets/images/storyboarding.png',
        tags: ['Sequenced Layouts', 'Shot Design'],
        color: '#F59E0B', // Amber
        glow: 'rgba(245, 158, 11, 0.25)'
    },
    {
        id: '05',
        title: 'Visual Storytelling',
        desc: 'Directing cinematic shot pacing, dramatic narrative weight, and ambient lighting sequences.',
        video: 'assets/videos/storyboardingoutput.mp4',
        tags: ['Composition', 'Lighting & Pacing'],
        color: '#EC4899', // Pink
        glow: 'rgba(236, 72, 153, 0.25)'
    },
    {
        id: '06',
        title: 'AI Audio & Narration Design',
        desc: 'Generating cloned voice architectures, cinematic soundscapes, and multilayered sound FX environments.',
        image: 'assets/images/capaudio.png',
        tags: ['Voice Cloning', 'Sound FX Layer'],
        color: '#06B6D4', // Cyan
        glow: 'rgba(6, 182, 212, 0.25)'
    },
    {
        id: '07',
        title: 'Video Editing (Intermediate)',
        desc: 'Fine-tuning visual rhythm, sequence transitions, and cinematic narrative flows in production pipelines.',
        image: 'assets/images/capvideo.png',
        tags: ['Pacing & Rhythm', 'Narrative Flow'],
        color: '#F43F5E', // Rose
        glow: 'rgba(244, 63, 94, 0.25)'
    }
];

export default function CapabilitiesStack() {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Simple swiping mechanism that rotates and cycles items to the back of the deck
    const handleSwipe = (direction) => {
        setCurrentIndex((prev) => (prev + 1) % capabilities.length);
    };

    // Calculate indices for stacked visual cards (Top, Middle, Base)
    const getActiveCards = () => {
        const top = currentIndex;
        const middle = (currentIndex + 1) % capabilities.length;
        const bottom = (currentIndex + 2) % capabilities.length;
        return [
            { item: capabilities[top], depth: 0 },
            { item: capabilities[middle], depth: 1 },
            { item: capabilities[bottom], depth: 2 }
        ];
    };

    return (
        <div className="capabilities-stack-wrapper flex flex-col items-center justify-center py-8 px-4 select-none" style={{ touchAction: 'none' }}>
            
            {/* Header telemetry info */}
            <div className="text-center mb-6">
                <span className="text-[10px] uppercase tracking-[3px] font-mono text-red-600">Tactile Touch System</span>
                <h3 className="text-xl font-bold text-white tracking-tight mt-1">Capabilities Deck</h3>
                <p className="text-xs font-mono text-zinc-500 mt-1">Swipe left or right to explore stack</p>
            </div>

            {/* Stacking Deck Container */}
            <div className="relative w-full max-w-[340px] h-[410px] flex items-center justify-center">
                <AnimatePresence>
                    {getActiveCards().map(({ item, depth }) => (
                        <SwipeCard 
                            key={item.id} 
                            item={item} 
                            depth={depth} 
                            onSwipe={handleSwipe} 
                        />
                    ))}
                </AnimatePresence>
            </div>

            {/* Bottom Symmetrical Interactive Deck Control Dots */}
            <div className="flex items-center gap-2 mt-8 z-10">
                {capabilities.map((c, index) => (
                    <button
                        key={c.id}
                        onClick={() => setCurrentIndex(index)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                            index === currentIndex 
                            ? 'w-6 bg-red-600 shadow-[0_0_8px_rgba(229,9,20,0.4)]' 
                            : 'w-1.5 bg-zinc-700 hover:bg-zinc-600'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}

// Subcomponent governing each swipeable card physics using Framer Motion gestures
function SwipeCard({ item, depth, onSwipe }) {
    const isTopCard = depth === 0;

    // Framer motion values to track dragging displacement
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Map horizontal displacement (x) to dynamic rotation and scale opacity decay
    const rotate = useTransform(x, [-200, 200], [-18, 18]);
    const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0.5, 1, 1, 1, 0.5]);

    // Handle end of swipe gesture: trigger dismiss if passed swipe threshold (120px)
    const handleDragEnd = (event, info) => {
        if (!isTopCard) return;

        const swipeThreshold = 120;
        const offsetX = info.offset.x;

        if (offsetX > swipeThreshold) {
            onSwipe('right');
        } else if (offsetX < -swipeThreshold) {
            onSwipe('left');
        }
    };

    // Card Stack Depth Spec (Scaling & Vertical translations)
    const stackStyles = {
        0: { scale: 1, y: 0, zIndex: 30, opacity: 1, pointerEvents: 'auto' },
        1: { scale: 0.94, y: 15, zIndex: 20, opacity: 0.85, pointerEvents: 'none' },
        2: { scale: 0.88, y: 30, zIndex: 10, opacity: 0.5, pointerEvents: 'none' }
    };

    const currentStyle = stackStyles[depth] || stackStyles[2];

    return (
        <motion.div
            drag={isTopCard ? "x" : false}
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            dragElastic={0.7}
            onDragEnd={handleDragEnd}
            style={{
                x,
                y,
                rotate: isTopCard ? rotate : 0,
                opacity: isTopCard ? opacity : currentStyle.opacity,
                zIndex: currentStyle.zIndex,
                pointerEvents: currentStyle.pointerEvents,
                position: 'absolute',
                width: '100%',
                height: '100%',
                cursor: isTopCard ? 'grab' : 'normal',
                transformOrigin: 'bottom center',
                boxSizing: 'border-box'
            }}
            animate={{
                scale: currentStyle.scale,
                y: currentStyle.y,
                opacity: isTopCard ? undefined : currentStyle.opacity,
                transition: { type: 'spring', stiffness: 300, damping: 25 }
            }}
            whileDrag={isTopCard ? { cursor: 'grabbing', scale: 1.02 } : {}}
            className="rounded-2xl border border-white/8 bg-[#09090b]/85 backdrop-blur-xl p-4 shadow-2xl flex flex-col justify-between overflow-hidden"
        >
            {/* Card Upper Section: Cinematic Media Panel */}
            <div className="relative w-full aspect-[16/10] bg-black/40 rounded-xl overflow-hidden border border-white/5 flex items-center justify-center">
                {/* Floating Glass Numbering Badge */}
                <div className="absolute top-2.5 left-2.5 bg-black/75 backdrop-blur-md border border-white/10 rounded px-2 py-0.5 flex items-center gap-1.5 z-10">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-600 pulse-glow"></span>
                    <span className="font-mono text-[9px] font-bold text-red-600 tracking-wider">{item.id}</span>
                </div>

                {/* Telemetry Active Line Tag */}
                <div className="absolute bottom-2.5 left-2.5 bg-black/75 backdrop-blur-md border border-white/10 rounded px-1.5 py-0.5 z-10">
                    <span className="font-mono text-[8px] text-zinc-400 uppercase tracking-widest">LIVE // SCAN</span>
                </div>

                {/* Main Asset Display (Supports clean landscape image and active looping video) */}
                {item.video ? (
                    <LazyVideo 
                        src={item.video} 
                        className="w-full h-full object-cover opacity-85" 
                        loop 
                        muted 
                        playsInline 
                        autoPlay 
                    />
                ) : (
                    <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-full object-cover opacity-85"
                    />
                )}

                {/* Subtle Cinematic HUD Grid Overlay */}
                <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(transparent_50%,rgba(0,0,0,0.6)_100%)]" />
                <div 
                    className="absolute inset-0 pointer-events-none opacity-10" 
                    style={{
                        backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
                        backgroundSize: '16px 16px'
                    }}
                />
            </div>

            {/* Card Content & Focus Area */}
            <div className="flex-1 flex flex-col justify-end mt-4">
                <h4 className="font-bold text-base text-white tracking-tight leading-snug">{item.title}</h4>
                <p className="text-zinc-400 text-xs mt-1 leading-normal font-light line-clamp-2">{item.desc}</p>
                
                {/* Focus Pill Tags */}
                <div className="flex flex-wrap gap-1.5 mt-3.5">
                    {item.tags.map((tag) => (
                        <span 
                            key={tag}
                            className="text-[9px] uppercase tracking-wider text-zinc-300 bg-white/5 border border-white/8 px-2 py-0.5 rounded-full font-mono"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            {/* Glowing Accent Ring (Dynamic based on card theme color) */}
            <div 
                className="absolute inset-x-0 bottom-0 h-[2px] transition-all duration-300 pointer-events-none"
                style={{ 
                    background: `linear-gradient(90deg, transparent, ${item.color}, transparent)`,
                    boxShadow: `0 0 12px ${item.glow}` 
                }} 
            />

            {/* Custom Telemetry CSS animations */}
            <style dangerouslySetInnerHTML={{__html: `
                @keyframes pulseGlow {
                    0%, 100% { opacity: 0.6; filter: drop-shadow(0 0 1px #e50914); }
                    50% { opacity: 1; filter: drop-shadow(0 0 4px #e50914); }
                }
                .pulse-glow {
                    animation: pulseGlow 2s infinite ease-in-out;
                }
            `}} />
        </motion.div>
    );
}
