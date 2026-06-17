import React, { useEffect, useState, Suspense, lazy } from 'react';
import LightRays from './LightRays';
import { initPortfolio } from './portfolio-logic';
import useIsMobile from './hooks/useIsMobile';
import { locations } from './data/portfolioData';

const ContactPhysicsArena = lazy(() => import('./ContactPhysicsArena'));

// Custom split components
import HeroSection from './components/HeroSection';
import CapabilitiesSection from './components/CapabilitiesSection';
import FeaturedProjects from './components/FeaturedProjects';
import CinematicVisuals from './components/CinematicVisuals';
import PosterShowcase from './components/PosterShowcase';
import ExperienceJourney from './components/ExperienceJourney';
import ActiveProjects from './components/ActiveProjects';
import CurrentLearning from './components/CurrentLearning';
import CreativeRider from './components/CreativeRider';
const techStackCategories = [
    {
        num: "01",
        name: "CREATIVE INTELLIGENCE",
        tools: [
            { name: "ChatGPT", logo: "https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/openai.svg", glow: "#10a37f", level: "98%" },
            { name: "Claude", logo: "https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/claude-color.svg", glow: "#d97757", level: "95%" },
            { name: "Gemini", logo: "https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/gemini-color.svg", glow: "#4285f4", level: "90%" }
        ]
    },
    {
        num: "02",
        name: "CREATIVE PIPELINE",
        tools: [
            { name: "Storyboarding", svg: "storyboard", glow: "#faff00", level: "92%" },
            { name: "Narrative Design", svg: "narrative", glow: "#faff00", level: "95%" },
            { name: "Custom API Workflows", svg: "apiworkflow", glow: "#a78bfa", level: "85%" },
            { name: "Proprietary Platforms", svg: "proprietary", glow: "#f59e0b", level: "88%" }
        ]
    },
    {
        num: "03",
        name: "PLATFORMS & WORKFLOWS",
        tools: [
            { name: "Fal AI", logo: "https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/fal-color.svg", glow: "#ff4154", level: "88%" },
            { name: "Higgsfield AI", logo: "https://www.google.com/s2/favicons?domain=higgsfield.ai&sz=128", glow: "#a855f7", level: "82%" },
            { name: "Runway", logo: "https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/runway.svg", glow: "#c084fc", level: "94%" },
            { name: "ComfyUI", logo: "https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/comfyui-color.svg", glow: "#4ade80", level: "90%", learning: true }
        ]
    },
    {
        num: "04",
        name: "IMAGE GENERATION",
        tools: [
            { name: "GPT Image", logo: "https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/openai.svg", glow: "#10a37f", level: "95%" },
            { name: "NanoBanana", logo: "https://raw.githubusercontent.com/lobehub/lobe-icons/refs/heads/master/packages/static-png/dark/nanobanana-color.png", svg: "nanobanana", glow: "#eab308", level: "80%" },
            { name: "Midjourney", logo: "https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/midjourney.svg", glow: "#ffffff", level: "96%" }
        ]
    },
    {
        num: "05",
        name: "VIDEO GENERATION",
        tools: [
            { name: "Kling", logo: "https://www.google.com/s2/favicons?domain=klingai.com&sz=128", glow: "#3b82f6", level: "92%" },
            { name: "Veo", logo: "https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/google-color.svg", glow: "#4285f4", level: "90%" },
            { name: "Gen-4 Turbo", logo: "https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/runway.svg", glow: "#c084fc", level: "95%" },
            { name: "Seedance", logo: "https://mixhubai.com/ModelsLogos/seedance_logo.webp", svg: "seedance", glow: "#06b6d4", level: "85%" }
        ]
    },
    {
        num: "06",
        name: "AI AVATAR & DESIGN",
        tools: [
            { name: "HeyGen", logo: "https://www.google.com/s2/favicons?domain=heygen.com&sz=128", glow: "#06b6d4", level: "90%" },
            { name: "Kling AI Avatar", logo: "https://www.google.com/s2/favicons?domain=klingai.com&sz=128", glow: "#3b82f6", level: "88%" },
            { name: "Canva", logo: "https://www.google.com/s2/favicons?domain=canva.com&sz=128", glow: "#00c4cc", level: "95%" },
            { name: "Adobe Express", logo: "https://www.google.com/s2/favicons?domain=adobe.com&sz=128", glow: "#ff3c00", level: "90%" }
        ]
    },
    {
        num: "07",
        name: "POST PRODUCTION & AUDIO",
        tools: [
            { name: "ElevenLabs", logo: "https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/elevenlabs.svg", glow: "#fbbf24", level: "95%" },
            { name: "VN", customBadge: "VN", color: "#ffffff", bg: "#000000", glow: "#ffffff", level: "92%" },
            { name: "Topaz", logo: "https://www.ai-stat.ru/icons/png/dark/topazlabs.png", customBadge: "Tp", color: "#00c3ff", bg: "#001e4e", glow: "#00c3ff", level: "90%" },
            { name: "DaVinci Resolve", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/DaVinci_Resolve_Studio.png/250px-DaVinci_Resolve_Studio.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail", glow: "#05FF99", level: "90%", learning: true }
        ]
    }
];

const ToolLogoImage = ({ src, alt, size, className, fallback }) => {
    const [failed, setFailed] = useState(false);

    if (failed) {
        return fallback;
    }

    return (
        <img
            src={src}
            alt={alt}
            style={{ width: `${size}px`, height: `${size}px`, objectFit: 'contain' }}
            className={className}
            onError={() => setFailed(true)}
        />
    );
};

const renderToolIcon = (tool, size = 16) => {
    const isMedium = size > 20;
    const borderRadius = isMedium ? 5 : 3;
    const fontSize = isMedium ? 11 : 8;

    // Handle special case for Nanobanana URL (which is an HTML landing page)
    if (tool.logo === "https://imgbin.com/free-png/nano-banana") {
        return renderToolIcon({ ...tool, logo: undefined, svg: 'nanobanana' }, size);
    }

    if (tool.logo) {
        // Define fallback (what to render if the logo fails to load)
        const fallbackElement = tool.svg ? (
            renderToolIcon({ ...tool, logo: undefined }, size)
        ) : tool.customBadge ? (
            renderToolIcon({ ...tool, logo: undefined }, size)
        ) : (
            <span className="tool-logo-icon" style={{ fontSize: `${fontSize}px` }}>🛠️</span>
        );

        return (
            <ToolLogoImage
                src={tool.logo}
                alt={tool.name}
                size={size}
                className={`tool-logo-img ${tool.name === 'Midjourney' || tool.name === 'ChatGPT' || tool.name === 'GPT Image' || tool.name === 'Runway' || tool.name === 'Gen-4 Turbo' || tool.name === 'ElevenLabs' ? 'eco-logo-invert' : ''}`}
                fallback={fallbackElement}
            />
        );
    }

    if (tool.customBadge) {
        return (
            <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: `${size}px`,
                height: `${size}px`,
                borderRadius: `${borderRadius}px`,
                fontSize: `${fontSize}px`,
                fontWeight: '900',
                background: tool.bg || '#08080c',
                color: tool.color || '#ffffff',
                border: `1px solid ${tool.color || 'rgba(255,255,255,0.15)'}`,
                lineHeight: 1,
                fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                flexShrink: 0
            }}>
                {tool.customBadge}
            </span>
        );
    }

    switch (tool.svg) {
        case 'storyboard':
            return (
                <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="tool-logo-svg">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <path d="M3 9h18M3 15h18M9 3v18M15 3v18" />
                </svg>
            );
        case 'narrative':
            return (
                <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="tool-logo-svg">
                    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
                    <path d="M6 6h10M6 10h10" />
                </svg>
            );
        case 'visual':
            return (
                <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="tool-logo-svg">
                    <circle cx="12" cy="12" r="10" />
                    <path d="m22 12-4-4v8l4-4ZM2 12h16" />
                </svg>
            );
        case 'concept':
            return (
                <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="tool-logo-svg">
                    <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .6 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
                    <path d="M9 18h6M10 22h4" />
                </svg>
            );
        case 'nanobanana':
            return (
                <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
                    <defs>
                        <linearGradient id="banana-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#fef08a" />
                            <stop offset="70%" stopColor="#f59e0b" />
                            <stop offset="100%" stopColor="#d97706" />
                        </linearGradient>
                        <filter id="banana-glow" x="-20%" y="-20%" width="140%" height="140%">
                            <feGaussianBlur stdDeviation="1" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                    </defs>
                    <path
                        d="M21.97 3.74a1 1 0 0 0-1-.22c-2.73.84-5.36 2.1-7.75 3.73A19.46 19.46 0 0 0 7.9 11.8c-1.37 1.77-2.6 3.7-3.6 5.8a1 1 0 0 0 .54 1.34c1.93.88 3.96 1.48 6.03 1.78a16.66 16.66 0 0 0 8-1.54c2.14-1.12 4.07-2.6 5.75-4.4a1 1 0 0 0-.25-1.55c-1.95-1.07-3.64-2.5-5-4.22a15.86 15.86 0 0 1-2.53-5.38 1 1 0 0 0-.87-.89Z"
                        fill="url(#banana-grad)"
                        filter="url(#banana-glow)"
                    />
                    <path
                        d="M21.97 3.74c-.2-.06-.41-.09-.63-.09-.5 0-.96.25-1.22.68-.46.77-.97 1.51-1.52 2.22-.16.21-.13.51.08.67.21.16.51.13.67-.08.58-.75 1.12-1.53 1.61-2.34.18-.3.14-.68-.06-.86c-.19-.18-.46-.22-.55-.2z"
                        fill="#ca8a04"
                    />
                </svg>
            );
        case 'apiworkflow':
            return (
                <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="tool-logo-svg">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
            );
        case 'proprietary':
            return (
                <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="tool-logo-svg">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                    <line x1="8" y1="21" x2="16" y2="21" />
                    <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
            );
        case 'seedance':
            return (
                <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
                    <defs>
                        <linearGradient id="seed-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#22d3ee" />
                            <stop offset="100%" stopColor="#06b6d4" />
                        </linearGradient>
                    </defs>
                    <circle cx="12" cy="12" r="10" stroke="url(#seed-grad)" strokeWidth="1.5" opacity="0.35" />
                    <path
                        d="M10 8.5v7l6-3.5-6-3.5z"
                        fill="url(#seed-grad)"
                        stroke="url(#seed-grad)"
                        strokeWidth="1"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M12 3a9 9 0 0 1 9 9"
                        stroke="url(#seed-grad)"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                    />
                    <path
                        d="M12 21a9 9 0 0 1-9-9"
                        stroke="url(#seed-grad)"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                    />
                </svg>
            );
        default:
            return <span className="tool-logo-icon" style={{ fontSize: `${fontSize}px` }}>🛠️</span>;
    }
};

const renderCategoryIcon = (num) => {
    switch (num) {
        case "01": // CREATIVE INTELLIGENCE (Brain/Intellect outline SVG)
            return (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1 0-4.12 2.5 2.5 0 0 1 0-4.88 2.5 2.5 0 0 1 0-4.12A2.5 2.5 0 0 1 9.5 2Z" />
                    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 0-4.12 2.5 2.5 0 0 0 0-4.88 2.5 2.5 0 0 0 0-4.12A2.5 2.5 0 0 0 14.5 2Z" />
                </svg>
            );
        case "02": // CREATIVE DIRECTION (Camera/Compass/Director SVG)
            return (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m22 8-6 4 6 4V8Z" />
                    <rect width="14" height="12" x="2" y="6" rx="2" ry="2" />
                </svg>
            );
        case "03": // PLATFORMS & WORKFLOWS (Layers SVG)
            return (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 2 7 12 12 22 7 12 2" />
                    <polyline points="2 17 12 22 22 17" />
                    <polyline points="2 12 12 17 22 12" />
                </svg>
            );
        case "04": // IMAGE GENERATION (Palette/Image SVG)
            return (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 14.7255 3.09032 17.1962 4.85857 19C5.34863 19.5 5.2341 20.3341 4.79377 20.8A1 1 0 0 0 4.74 22H12Z" />
                    <circle cx="7.5" cy="10.5" r="1.5" fill="currentColor" />
                    <circle cx="11.5" cy="7.5" r="1.5" fill="currentColor" />
                    <circle cx="16.5" cy="9.5" r="1.5" fill="currentColor" />
                    <circle cx="15.5" cy="14.5" r="1.5" fill="currentColor" />
                </svg>
            );
        case "05": // VIDEO GENERATION (Film SVG)
            return (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="20" x="2" y="2" rx="2.18" ry="2.18" />
                    <path d="M7 2v20M17 2v20M2 12h20M2 7h5M2 17h5M17 17h5M17 7h5" />
                </svg>
            );
        case "06": // AI AVATARS (User Profile SVG)
            return (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                </svg>
            );
        case "07": // AUDIO GENERATION (Volume/Waves SVG)
            return (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2v20M17 5v14M22 9v6M7 8v8M2 10v4" />
                </svg>
            );


        default:
            return (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="16" />
                    <line x1="8" y1="12" x2="16" y2="12" />
                </svg>
            );
    }
};

// Extended SVG icons for Platform Adaptability tools
const renderPlatformToolIcon = (tool, size = 16) => {
    if (tool.logo) {
        return renderToolIcon(tool, size);
    }
    switch (tool.svg) {
        case 'apiworkflow':
            return (
                <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="tool-logo-svg">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
            );
        case 'proprietary':
            return (
                <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="tool-logo-svg">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                    <line x1="8" y1="21" x2="16" y2="21" />
                    <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
            );
        default:
            return <span className="tool-logo-icon" style={{ fontSize: '8px' }}>🛠️</span>;
    }
};
import CertificationsSection from './components/CertificationsSection';

export default function App() {
    const isMobile = useIsMobile();

    const isMountReadyRef = React.useRef(false);
    useEffect(() => {
        const timer = setTimeout(() => {
            isMountReadyRef.current = true;
        }, 500);
        return () => clearTimeout(timer);
    }, []);

    const [locIdx, setLocIdx] = useState(0);
    const [hoveredTool, setHoveredTool] = useState(null);
    const [hoveredCategory, setHoveredCategory] = useState(null);

    // Expandable prompts states
    const [midjourneyExpanded, setMidjourneyExpanded] = useState(false);
    const [seedanceExpanded, setSeedanceExpanded] = useState(false);

    // OS Initialization States
    const [isInitialized, setIsInitialized] = useState(false);
    const [swipeState, setSwipeState] = useState('idle'); // 'idle', 'swiping-up', 'swiping-down'
    const [isInitializing, setIsInitializing] = useState(false);
    const [initProgress, setInitProgress] = useState(0);

    // Theme Switcher State (Locked to Netflix Crimson Mode)
    const theme = 'cyber';

    useEffect(() => {
        document.body.classList.remove('theme-cyber', 'theme-kuku');
        document.body.classList.add('theme-cyber');
    }, []);

    // Creative Rider Overlay State
    const [isRiderOpen, setIsRiderOpen] = useState(false);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                setIsRiderOpen(false);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Cinematic Clapper Slate states
    const [showClapper, setShowClapper] = useState(false);
    const [isClapping, setIsClapping] = useState(false);
    const [isImpact, setIsImpact] = useState(false);
    const [clapperDate, setClapperDate] = useState('');
    const [clapperTime, setClapperTime] = useState('');

    const playClapSound = () => {
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (!AudioContext) return;
            const ctx = new AudioContext();
            
            // Noise burst for clack high-end crunch
            const bufferSize = ctx.sampleRate * 0.08;
            const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
            const data = buffer.getChannelData(0);
            for (let i = 0; i < bufferSize; i++) {
                data[i] = Math.random() * 2 - 1;
            }
            
            const noise = ctx.createBufferSource();
            noise.buffer = buffer;
            const noiseFilter = ctx.createBiquadFilter();
            noiseFilter.type = 'bandpass';
            noiseFilter.frequency.value = 1200;
            noiseFilter.Q.value = 3;
            
            const noiseGain = ctx.createGain();
            noiseGain.gain.setValueAtTime(0.35, ctx.currentTime);
            noiseGain.gain.exponentialRampToValueAtTime(0.005, ctx.currentTime + 0.06);
            
            noise.connect(noiseFilter);
            noiseFilter.connect(noiseGain);
            noiseGain.connect(ctx.destination);
            
            // Low-freq resonator oscillator for hollow wood snap
            const osc = ctx.createOscillator();
            const oscGain = ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(160, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(70, ctx.currentTime + 0.04);
            
            oscGain.gain.setValueAtTime(0.7, ctx.currentTime);
            oscGain.gain.exponentialRampToValueAtTime(0.005, ctx.currentTime + 0.05);
            
            osc.connect(oscGain);
            oscGain.connect(ctx.destination);
            
            noise.start();
            osc.start();
            noise.stop(ctx.currentTime + 0.08);
            osc.stop(ctx.currentTime + 0.08);
        } catch (e) {
            console.error("Audio clack error:", e);
        }
    };

    // Hero AI Assistant Robot (Aero) states
    const [robotState, setRobotState] = useState('stage-spawn'); // 'stage-spawn', 'stage-wave', 'stage-blink', 'stage-point-look', 'stage-move', 'stage-idle'
    const [cloneStatus, setCloneStatus] = useState('loading'); // 'loading', 'active'

    useEffect(() => {
        // Reset states on mount
        setRobotState('stage-spawn');
        setCloneStatus('loading');

        // Timeline:
        // 1. At 0.5s: Aero waves with its right hand
        const timer1 = setTimeout(() => {
            setRobotState('stage-wave');
        }, 500);

        // 2. At 2.0s: Lowers its right hand down, blinks
        const timer2 = setTimeout(() => {
            setRobotState('stage-blink');
        }, 2000);

        // 3. At 3.0s: Points towards profile card in its left hand, tilts head
        const timer3 = setTimeout(() => {
            setRobotState('stage-point-look');
        }, 3000);

        // 4. At 3.8s: Moves dramatically towards the left under the Initialize Portfolio button
        const timer4 = setTimeout(() => {
            setRobotState('stage-point-look stage-move');
        }, 3800);

        // 5. At 5.6s: Arrives under the button, AI Clone active status completes (green dot!)
        const timer5 = setTimeout(() => {
            setCloneStatus('active');
            setRobotState('stage-idle');
        }, 5600);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
            clearTimeout(timer4);
            clearTimeout(timer5);
        };
    }, []);

    // Real-time clock for simulator viewports
    const [simTime, setSimTime] = useState(() => {
        const now = new Date();
        let hours = now.getHours();
        const minutes = now.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        const minutesStr = minutes < 10 ? '0' + minutes : minutes;
        return `${hours}:${minutesStr} ${ampm}`;
    });

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            let hours = now.getHours();
            const minutes = now.getMinutes();
            const ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12;
            hours = hours ? hours : 12;
            const minutesStr = minutes < 10 ? '0' + minutes : minutes;
            setSimTime(`${hours}:${minutesStr} ${ampm}`);
        }, 10000);
        return () => clearInterval(timer);
    }, []);

    const handleInitialize = () => {
        if (isInitialized || swipeState !== 'idle' || showClapper) return;
        
        // Capture exact click date and time
        const clickDate = new Date();
        const formattedDate = clickDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).toUpperCase();
        const formattedTime = clickDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }).toUpperCase();
        setClapperDate(formattedDate);
        setClapperTime(formattedTime);
        
        setShowClapper(true);
        setIsClapping(false);
        setIsImpact(false);
        
        // Step 1: Start smooth hinge clap at 300ms (hinge starts rotating down)
        const clapTimer = setTimeout(() => {
            setIsClapping(true);
        }, 300);

        // Step 2: Impact at 700ms (hinge finishes rotating, plays sound, triggers drop & flash)
        const impactTimer = setTimeout(() => {
            setIsImpact(true);
            playClapSound();
        }, 700);

        // Step 3: At 1100ms, slide up the tactical cover panel
        const swipeUpTimer = setTimeout(() => {
            setSwipeState('swiping-up');
        }, 1100);

        // Step 4: At 1600ms (covered), execute layout switch and reset clapper overlay
        const initTimer = setTimeout(() => {
            setIsInitialized(true);
            setIsInitializing(false);
            setShowClapper(false);
            setSwipeState('swiping-down');
            
            // Enable scroll and start Lenis
            document.body.style.overflow = '';
            if (window.lenis) {
                window.lenis.start();
                setTimeout(() => {
                    window.lenis.resize();
                }, 150);
            }

            // Instantly position page to active projects
            const activeProjectsSection = document.getElementById('active-projects');
            if (activeProjectsSection) {
                activeProjectsSection.scrollIntoView({ behavior: 'auto', block: 'start' });
            }
            if (window.ScrollTrigger) {
                window.ScrollTrigger.refresh();
            }
        }, 1300);

        // Step 4: At 1850ms (swiped down off top), reset swipe state to idle
        const swipeResetTimer = setTimeout(() => {
            setSwipeState('idle');
            if (window.ScrollTrigger) {
                window.ScrollTrigger.refresh();
            }
        }, 1850);
    };

    useEffect(() => {
        // Prevent browser from automatically restoring scroll position on page refresh
        if ('scrollRestoration' in history) {
            history.scrollRestoration = 'manual';
        }
        window.scrollTo(0, 0);

        initPortfolio();
        const interval = setInterval(() => {
            setLocIdx((prev) => (prev + 1) % locations.length);
        }, 1500);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        // Prevent scroll until system is fully initialized on desktop, but allow mobile scroll fallback, or when Rider is open
        if (!isInitialized || isRiderOpen) {
            if (isMobile && !isRiderOpen) {
                document.body.style.overflow = 'auto';
                document.documentElement.style.overflow = 'auto';
            } else {
                document.body.style.overflow = 'hidden';
            }
            if (window.lenis) {
                window.lenis.stop();
            }
        } else {
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
            if (window.lenis) {
                window.lenis.start();
                // Push recalculation to next render frame to allow height shifts to commit
                setTimeout(() => {
                    window.lenis.resize();
                }, 150);
            }
        }
    }, [isInitialized, isMobile, isRiderOpen]);

    useEffect(() => {
        if (!isMobile) return;

        let isTransitioning = false; // Guard to prevent re-entrant calls during animation
        let rafId = null;
        let touchStartY = 0;

        const smoothScrollTo = (targetY, duration = 600) => {
            const startY = window.scrollY;
            const diff = targetY - startY;
            if (Math.abs(diff) < 2) return;
            const startTime = performance.now();

            const step = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                // Smooth ease-out cubic
                const ease = 1 - Math.pow(1 - progress, 3);
                window.scrollTo(0, startY + diff * ease);
                if (progress < 1) {
                    requestAnimationFrame(step);
                }
            };
            requestAnimationFrame(step);
        };

        const enterPortfolio = () => {
            if (isTransitioning || isInitialized) return;
            isTransitioning = true;

            setIsInitialized(true);
            setIsInitializing(false);
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';

            // After React re-renders and the hero fades, smoothly scroll to active projects
            requestAnimationFrame(() => {
                setTimeout(() => {
                    const activeProjectsSection = document.getElementById('active-projects');
                    if (activeProjectsSection) {
                        const targetY = activeProjectsSection.offsetTop;
                        smoothScrollTo(targetY, 700);
                    }
                    if (window.ScrollTrigger) {
                        window.ScrollTrigger.refresh();
                    }
                    // Release the guard after the scroll animation completes
                    setTimeout(() => { isTransitioning = false; }, 750);
                }, 100);
            });
        };

        const returnToLanding = () => {
            if (isTransitioning || !isInitialized) return;
            isTransitioning = true;

            // Smooth scroll to top first, then restore state
            smoothScrollTo(0, 500);

            setTimeout(() => {
                setIsInitialized(false);
                setIsInitializing(false);
                setRobotState('stage-spawn');

                // Restart Aero's futuristic introduction timeline
                if (window.aeroTimers) {
                    window.aeroTimers.forEach(t => clearTimeout(t));
                }
                const t1 = setTimeout(() => setRobotState('stage-wave'), 500);
                const t2 = setTimeout(() => setRobotState('stage-blink'), 2000);
                const t3 = setTimeout(() => setRobotState('stage-point-look'), 3000);
                const t4 = setTimeout(() => setRobotState('stage-point-look stage-move'), 3800);
                const t5 = setTimeout(() => {
                    setCloneStatus('active');
                    setRobotState('stage-idle');
                }, 5600);
                window.aeroTimers = [t1, t2, t3, t4, t5];

                // Release the guard after landing page has fully restored
                setTimeout(() => { isTransitioning = false; }, 600);
            }, 550);
        };

        const handleTouchStart = (e) => {
            if (e.touches && e.touches[0]) {
                touchStartY = e.touches[0].clientY;
            }
        };

        const handleTouchMove = (e) => {
            if (isTransitioning) return;
            if (e.touches && e.touches[0]) {
                const diffY = touchStartY - e.touches[0].clientY;
                if (!isInitialized && diffY > 30) {
                    enterPortfolio();
                } else if (isInitialized && diffY < -40 && window.scrollY < 80) {
                    returnToLanding();
                }
            }
        };

        const handleWheel = (e) => {
            if (isTransitioning) return;
            if (e.deltaY > 15 && !isInitialized) {
                enterPortfolio();
            } else if (e.deltaY < -15 && isInitialized && window.scrollY < 80) {
                returnToLanding();
            }
        };

        const handleScroll = () => {
            if (!isMountReadyRef.current) return;
            if (isTransitioning) return;
            if (rafId) return;
            rafId = requestAnimationFrame(() => {
                rafId = null;
                if (!isInitialized && window.scrollY > 50) {
                    enterPortfolio();
                }
            });
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('touchstart', handleTouchStart, { passive: true });
        window.addEventListener('touchmove', handleTouchMove, { passive: true });
        window.addEventListener('wheel', handleWheel, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('wheel', handleWheel);
            if (rafId) cancelAnimationFrame(rafId);
            if (window.aeroTimers) {
                window.aeroTimers.forEach(t => clearTimeout(t));
            }
        };
    }, [isInitialized, isMobile]);



    return (
        <>
            <div className={`scroll-progress-bar ${isInitialized || isMobile ? 'visible' : ''}`}></div>
            <div className={isInitializing ? 'bg-grayscale' : ''} style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', pointerEvents: 'none', zIndex: -1, opacity: 0.45 }}>
                <LightRays
                    raysOrigin="top-center"
                    raysColor={theme === 'kuku' ? '#B20710' : '#E50914'}
                    raysSpeed={1.7}
                    lightSpread={2.2}
                    rayLength={1.8}
                    followMouse={true}
                    mouseInfluence={0.4}
                    noiseAmount={0.23}
                    distortion={0.05}
                    className="custom-rays"
                    pulsating
                    saturation={2}
                />
            </div>
            <nav 
                className={`${isInitialized ? '' : 'nav-standby'} ${isInitializing ? 'bg-grayscale' : ''}`}
                style={{
                    opacity: isInitialized ? 1 : 0,
                    visibility: isInitialized ? 'visible' : 'hidden',
                    pointerEvents: isInitialized ? 'auto' : 'none'
                }}
            >
                <div className="nav-inner">
                    <div className="nav-links">
                        <a href="#" className="nav-link-item active-link">Home</a>
                        <a href="#featured-projects" className="nav-link-item">Projects</a>
                        <a href="#experience-journey" className="nav-link-item">Experience</a>
                        <a href="#tech-stack" className="nav-link-item">Skills</a>
                        <a href="#contact" className="nav-link-item">Contact</a>
                    </div>

                    <button className="menu-toggle" aria-label="Toggle Menu">
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </nav>

            <a 
                href="#" 
                className="logo-link-standalone"
                style={{
                    opacity: isInitialized ? 1 : 0,
                    visibility: isInitialized ? 'visible' : 'hidden',
                    pointerEvents: isInitialized ? 'auto' : 'none'
                }}
            >
                <span className="logo-text-standalone">KARTHIK G RAJ<span className="logo-dot-standalone">.</span></span>
            </a>

            {/* Mobile Menu Overlay */}
            <div className={`mobile-menu ${isInitialized ? '' : 'mobile-menu-standby'}`}>
                <div className="mobile-menu-inner">
                    <a href="#featured-projects" className="mobile-menu-link">Projects</a>
                    <a href="#experience-journey" className="mobile-menu-link">Experience</a>
                    <a href="#tech-stack" className="mobile-menu-link">Skills</a>
                    <a href="#contact" className="mobile-menu-link">Contact</a>
                    <a 
                        href="#work-with-me" 
                        className="mobile-menu-link"
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setIsRiderOpen(true);
                            // Explicitly collapse the mobile menu
                            const menuToggle = document.querySelector('.menu-toggle');
                            const mobileMenu = document.querySelector('.mobile-menu');
                            if (menuToggle && mobileMenu) {
                                menuToggle.classList.remove('active');
                                mobileMenu.classList.remove('active');
                            }
                        }}
                    >Work With Me</a>
                </div>
            </div>

            <main className={isInitializing ? 'bg-grayscale' : ''}>
                {(!isInitialized || isMobile) && (
                    <HeroSection
                        isMobile={isMobile}
                        isInitialized={isInitialized}
                        isInitializing={isInitializing}
                        robotState={robotState}
                        cloneStatus={cloneStatus}
                        handleInitialize={handleInitialize}
                        theme={theme}
                    />
                )}

                <div className={`portfolio-sections-wrapper ${isInitialized || isMobile ? 'revealed' : 'veiled'}`}>
                    <ActiveProjects revealed={isInitialized || isMobile} />
                    <CapabilitiesSection />
                    <FeaturedProjects />
                    {/* 10. Creative Ecosystem — Cinematic Connected Neural Dashboard */}
                    <section id="tech-stack" className="workflow-router-section">
                        <div className="container">
                            <div className="section-header text-center">
                                <h2 className="section-heading reveal-text" style={{ marginBottom: '10px' }}>My Creative Tech Stack</h2>
                            </div>

                            <div className="tech-stack-dashboard reveal-item">

                                {/* Dashboard Columns Grid */}
                                <div className="tech-stack-columns">

                                    {/* ROW 1: Categories 01 to 04 */}
                                    <div className="tech-stack-row row-4">
                                        {techStackCategories.filter(c => ["01", "02", "03", "04"].includes(c.num)).map((category) => (
                                            <div
                                                key={category.name}
                                                className={`tech-stack-card ${hoveredCategory === category.name ? 'active-card' : ''}`}
                                                onMouseEnter={() => setHoveredCategory(category.name)}
                                                onMouseLeave={() => setHoveredCategory(null)}
                                            >
                                                <div className="tech-stack-card-header">
                                                    <div className="category-icon-box">
                                                        {renderCategoryIcon(category.num)}
                                                    </div>
                                                    <span className="category-level-badge">LEVEL {category.num}</span>
                                                </div>

                                                <h3 className="category-display-title">{category.name}</h3>

                                                <div className="tech-stack-divider"></div>

                                                <div className="category-skills-grid" data-level={category.num}>
                                                    {category.tools.map((tool) => (
                                                        <div
                                                            key={tool.name}
                                                            className={`category-skill-tile ${hoveredTool === tool.name ? 'active-tile' : ''}`}
                                                            style={{ '--tool-glow': tool.glow }}
                                                            onMouseEnter={(e) => {
                                                                e.stopPropagation();
                                                                setHoveredTool(tool.name);
                                                                setHoveredCategory(category.name);
                                                            }}
                                                            onMouseLeave={(e) => {
                                                                e.stopPropagation();
                                                                setHoveredTool(null);
                                                            }}
                                                        >
                                                            {tool.learning && (
                                                                <span className="skill-tile-learning-badge">learning...</span>
                                                            )}
                                                            <div className="tech-stack-tile-icon">
                                                                {renderToolIcon(tool, 24)}
                                                            </div>
                                                            <span className="category-skill-tile-name">
                                                                {tool.name === "Storyboarding" ? (
                                                                    <>
                                                                        <span className="hide-on-mobile">STORYBOARDING</span>
                                                                        <span className="show-on-mobile">STORYBOARD</span>
                                                                    </>
                                                                ) : (
                                                                    tool.name.toUpperCase()
                                                                )}
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* ROW 2: Categories 05 to 07 */}
                                    <div className="tech-stack-row row-3">
                                        {techStackCategories.filter(c => ["05", "06", "07"].includes(c.num)).map((category) => (
                                            <div
                                                key={category.name}
                                                className={`tech-stack-card ${hoveredCategory === category.name ? 'active-card' : ''}`}
                                                onMouseEnter={() => setHoveredCategory(category.name)}
                                                onMouseLeave={() => setHoveredCategory(null)}
                                            >
                                                <div className="tech-stack-card-header">
                                                    <div className="category-icon-box">
                                                        {renderCategoryIcon(category.num)}
                                                    </div>
                                                    <span className="category-level-badge">LEVEL {category.num}</span>
                                                </div>

                                                <h3 className="category-display-title">{category.name}</h3>

                                                <div className="tech-stack-divider"></div>

                                                <div className="category-skills-grid" data-level={category.num}>
                                                    {category.tools.map((tool) => (
                                                        <div
                                                            key={tool.name}
                                                            className={`category-skill-tile ${hoveredTool === tool.name ? 'active-tile' : ''}`}
                                                            style={{ '--tool-glow': tool.glow }}
                                                            onMouseEnter={(e) => {
                                                                e.stopPropagation();
                                                                setHoveredTool(tool.name);
                                                                setHoveredCategory(category.name);
                                                            }}
                                                            onMouseLeave={(e) => {
                                                                e.stopPropagation();
                                                                setHoveredTool(null);
                                                            }}
                                                        >
                                                            {tool.learning && (
                                                                <span className="skill-tile-learning-badge">learning...</span>
                                                            )}
                                                            <div className="tech-stack-tile-icon">
                                                                {renderToolIcon(tool, 24)}
                                                            </div>
                                                            <span className="category-skill-tile-name">
                                                                {tool.name === "Storyboarding" ? (
                                                                    <>
                                                                        <span className="hide-on-mobile">STORYBOARDING</span>
                                                                        <span className="show-on-mobile">STORYBOARD</span>
                                                                    </>
                                                                ) : (
                                                                    tool.name.toUpperCase()
                                                                )}
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <CinematicVisuals
                        midjourneyExpanded={midjourneyExpanded}
                        setMidjourneyExpanded={setMidjourneyExpanded}
                        seedanceExpanded={seedanceExpanded}
                        setSeedanceExpanded={setSeedanceExpanded}
                    />
                    <PosterShowcase />
                    <ExperienceJourney locIdx={locIdx} simTime={simTime} />
                    <CurrentLearning />
                    <CertificationsSection />

                    {/* Contact Section */}
                    <section id="contact" style={{ position: 'relative', overflow: 'hidden' }}>
                        <Suspense fallback={
                            <div style={{ height: '350px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255, 255, 255, 0.4)', fontSize: '0.85rem', fontFamily: 'var(--font-primary)', letterSpacing: '1px' }}>
                                <span className="status-dot animate-ping" style={{ background: '#3b82f6', width: '8px', height: '8px', borderRadius: '50%', marginRight: '10px' }}></span>
                                LOADING CREATIVE SANDBOX...
                            </div>
                        }>
                            <ContactPhysicsArena />
                        </Suspense>

                        <div className="container" style={{ position: 'relative', zIndex: 2, pointerEvents: 'none' }}>
                            <div className="status-badge-container reveal-text">
                                <div className="status-badge">
                                    <span className="status-dot"></span>
                                    <span className="status-text">Open for Creative Opportunities</span>
                                </div>
                            </div>

                            <div className="contact-center-group">
                                <a href="mailto:hello@karthikgraj.in" className="contact-mail reveal-text" style={{ position: 'relative', zIndex: 5, pointerEvents: 'auto' }}>hello@karthikgraj.in</a>

                                {/* Interactive Social Media Dock */}
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <div className="social-dock-title reveal-text">
                                        Let's Connect
                                    </div>
                                    <div className="social-dock-wrapper reveal-text" style={{ position: 'relative', zIndex: 5, pointerEvents: 'auto' }}>
                                        <div className="social-dock">
                                            {/* LinkedIn Button */}
                                            <a href="https://www.linkedin.com/in/karthikgraj" target="_blank" rel="noopener noreferrer" className="social-dock-btn linkedin">
                                                <div className="btn-glow-bg"></div>
                                                <svg className="social-icon" viewBox="0 0 24 24" width="18" height="18" fill="currentColor" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
                                                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                                                </svg>
                                                <span className="btn-text">LinkedIn</span>
                                                <span className="btn-hover-indicator"></span>
                                            </a>

                                            {/* Divider */}
                                            <div className="dock-divider"></div>

                                            {/* Instagram Button */}
                                            <a href="https://www.instagram.com/karthik.graj" target="_blank" rel="noopener noreferrer" className="social-dock-btn instagram">
                                                <div className="btn-glow-bg"></div>
                                                <svg className="social-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
                                                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                                                </svg>
                                                <span className="btn-text">Instagram</span>
                                                <span className="btn-hover-indicator"></span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <footer style={{ borderTop: 'none', padding: '10px 0 20px 0', zIndex: 5, pointerEvents: 'auto' }}>
                                <div className="footer-content" style={{ padding: 0, minHeight: 'auto', display: 'flex', justifyContent: 'center' }}>
                                    <p style={{ margin: 0 }}>© 2026 KARTHIK G RAJ // AI CREATIVE PRODUCER</p>
                                </div>
                            </footer>
                        </div>
                    </section>
                </div>
            </main>

            {/* Valorant-Style Tactical Transition Overlay */}
            <div className={`valorant-transition-overlay ${swipeState}`}>
                <div className="valorant-swipe-panel secondary-panel"></div>
                <div className="valorant-swipe-panel primary-panel"></div>
                <div className="valorant-swipe-panel accent-bar"></div>
                
                {/* Cinematic camera viewfinder HUD */}
                <div className="viewfinder-hud">
                    <div className="viewfinder-corner top-left"></div>
                    <div className="viewfinder-corner top-right"></div>
                    <div className="viewfinder-corner bottom-left"></div>
                    <div className="viewfinder-corner bottom-right"></div>
                    <div className="viewfinder-status">
                        <span className="rec-dot"></span>
                    </div>
                </div>
            </div>

            {/* Cinematic Film Slate Clapper Overlay */}
            {showClapper && (
                <div className={`clapper-overlay ${isClapping ? 'clapped' : ''} ${isImpact ? 'impacted' : ''}`}>
                    <div className="clapper-board">
                        {/* Top Hinge Bar */}
                        <div className="clapper-top">
                            <div className="clapper-bar"></div>
                        </div>
                        {/* Base Board */}
                        <div className="clapper-bottom">
                            <div className="clapper-bar"></div>
                            <div className="clapper-details">
                                <div className="clapper-field">
                                    <span className="clapper-label">PRODUCTION</span>
                                    <span className="clapper-val">KARTHIK G RAJ</span>
                                </div>
                                <div className="clapper-row">
                                    <div className="clapper-field">
                                        <span className="clapper-label">SCENE</span>
                                        <span className="clapper-val">01</span>
                                    </div>
                                    <div className="clapper-field">
                                        <span className="clapper-label">TAKE</span>
                                        <span className="clapper-val">AI</span>
                                    </div>
                                </div>
                                <div className="clapper-row">
                                    <div className="clapper-field">
                                        <span className="clapper-label">DATE</span>
                                        <span className="clapper-val">{clapperDate}</span>
                                    </div>
                                    <div className="clapper-field">
                                        <span className="clapper-label">TIME</span>
                                        <span className="clapper-val">{clapperTime}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            

            <button 
                className={`floating-work-btn ${isInitialized ? 'visible' : ''}`}
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsRiderOpen(true);
                }}
                aria-label="Work with me"
            >
                <div className="floating-work-btn-glow"></div>
                <div className="floating-work-btn-pulse"></div>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="8.5" cy="7" r="4" />
                    <line x1="20" y1="8" x2="20" y2="14" />
                    <line x1="23" y1="11" x2="17" y2="11" />
                </svg>
                <span className="floating-work-btn-label">Work With Me</span>
            </button>

            <CreativeRider isOpen={isRiderOpen} onClose={() => setIsRiderOpen(false)} theme={theme} />
        </>
    );
}
