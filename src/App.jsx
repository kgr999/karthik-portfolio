import React, { useEffect, useState } from 'react';
import LightRays from './LightRays';
import ScrollStack, { ScrollStackItem } from './ScrollStack';
import { initPortfolio } from './portfolio-logic';
import ProfileCard from './ProfileCard';


const mockVideos = [
    { id: 1, title: "Fresh Groceries", subtitle: "Delivered in 10 mins", bg: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)", icon: "📦" },
    { id: 2, title: "Hot Biryani", subtitle: "Free delivery today", bg: "linear-gradient(135deg, #d31027 0%, #ea720c 100%)", icon: "🍛" },
    { id: 3, title: "Cab Booking", subtitle: "Lowest fare guaranteed", bg: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)", icon: "🚗" }
];

const mockPosters = [
    { id: 1, title: "Summer Sale", desc: "Up to 50% Off on everything", bg: "linear-gradient(135deg, #fc466b 0%, #3f5efb 100%)", badge: "HOT" },
    { id: 2, title: "Weekend Feast", desc: "Buy 1 Get 1 Free on all orders", bg: "linear-gradient(135deg, #f12711 0%, #f5af19 100%)", badge: "50% OFF" },
    { id: 3, title: "Eco Mobility", desc: "Zero emissions, zero stress rides", bg: "linear-gradient(135deg, #00b4db 0%, #0083b0 100%)", badge: "NEW" }
];

const techStackCategories = [
    {
        num: "01",
        name: "CREATIVE INTELLIGENCE",
        tools: [
            { name: "ChatGPT", logo: "https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/openai.svg", glow: "#10a37f" },
            { name: "Claude", logo: "https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/claude-color.svg", glow: "#d97757" },
            { name: "Gemini", logo: "https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/gemini-color.svg", glow: "#4285f4" }
        ]
    },
    {
        num: "02",
        name: "CREATIVE DIRECTION",
        tools: [
            { name: "Storyboarding", svg: "storyboard", glow: "#faff00" },
            { name: "Narrative Design", svg: "narrative", glow: "#faff00" },
            { name: "Visual Storytelling", svg: "visual", glow: "#faff00" },
            { name: "Concept Development", svg: "concept", glow: "#faff00" }
        ]
    },
    {
        num: "03",
        name: "PLATFORMS & WORKFLOWS",
        tools: [
            { name: "Fal AI", logo: "https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/fal-color.svg", glow: "#ff4154" },
            { name: "OpenArt", logo: "https://www.google.com/s2/favicons?domain=openart.ai&sz=128", glow: "#4f46e5" },
            { name: "ComfyUI", logo: "https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/comfyui-color.svg", glow: "#4ade80" },
            { name: "Higgsfield AI", logo: "https://www.google.com/s2/favicons?domain=higgsfield.ai&sz=128", glow: "#a855f7" },
            { name: "Runway", logo: "https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/runway.svg", glow: "#c084fc" }
        ]
    },
    {
        num: "04",
        name: "VIDEO GENERATION",
        tools: [
            { name: "Kling", logo: "https://www.google.com/s2/favicons?domain=klingai.com&sz=128", glow: "#3b82f6" },
            { name: "Veo", logo: "https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/google-color.svg", glow: "#4285f4" },
            { name: "Seedance", logo: "https://www.google.com/s2/favicons?domain=seedance.com&sz=128", glow: "#06b6d4" }
        ]
    },
    {
        num: "05",
        name: "IMAGE GENERATION",
        tools: [
            { name: "GPT Image", logo: "https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/openai.svg", glow: "#10a37f" },
            { name: "Flux", logo: "https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/flux.svg", glow: "#a855f7" },
            { name: "NanoBanana", svg: "nanobanana", glow: "#eab308" },
            { name: "Midjourney", logo: "https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/midjourney.svg", glow: "#ffffff" }
        ]
    },
    {
        num: "06",
        name: "AI AVATARS",
        tools: [
            { name: "HeyGen", logo: "https://www.google.com/s2/favicons?domain=heygen.com&sz=128", glow: "#06b6d4" },
            { name: "Kling AI Avatar", logo: "https://www.google.com/s2/favicons?domain=klingai.com&sz=128", glow: "#3b82f6" }
        ]
    },
    {
        num: "07",
        name: "AUDIO GENERATION",
        tools: [
            { name: "ElevenLabs", logo: "https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/elevenlabs.svg", glow: "#fbbf24" },
            { name: "Suno", logo: "https://www.google.com/s2/favicons?domain=suno.com&sz=128", glow: "#eab308" }
        ]
    },
    {
        num: "08",
        name: "POST PRODUCTION",
        tools: [
            { name: "Premiere Pro", customBadge: "Pr", color: "#14e4ff", bg: "#00005c", glow: "#14e4ff" },
            { name: "DaVinci Resolve", logo: "https://www.google.com/s2/favicons?domain=blackmagicdesign.com&sz=128", glow: "#ff6f3c" },
            { name: "VN", customBadge: "VN", color: "#ffffff", bg: "#000000", glow: "#ffffff" }
        ]
    }
];

const getTelemetryLogs = (categoryName, toolName) => {
    if (toolName) {
        switch (toolName) {
            case "ChatGPT":
                return [
                    "⚡ COGNITIVE SYNAPSE: BOUND",
                    "• model: GPT-4o-cinematic-agent",
                    "• prompt latency: 12ms",
                    "• mode: Creative Intelligence Orchestrator",
                    "• status: Active narrative drafting..."
                ];
            case "Claude":
                return [
                    "⚡ ANTHROPIC CORE: ENGAGED",
                    "• model: Claude 3.5 Sonnet",
                    "• context depth: 200k tokens active",
                    "• focus: High-retention cinematic scripting",
                    "• status: Structure analyzer online"
                ];
            case "Gemini":
                return [
                    "⚡ GOOGLE DEEPMIND NODE: ACTIVE",
                    "• model: Gemini 1.5 Pro Ultra",
                    "• multimodal pipeline: Enabled",
                    "• input: Spatial-video storyboard analysis",
                    "• status: Multilingual processing..."
                ];
            case "Storyboarding":
                return [
                    "👁️ DIRECTION MATRIX: LIVE",
                    "• canvas: 21:9 Anamorphic aspect ratio",
                    "• frames: 124 generated scenes / sequence",
                    "• precision: 99.8% flow match",
                    "• status: Layout composition calibrated"
                ];
            case "Narrative Design":
                return [
                    "👁️ NARRATIVE ENGINE: COMPILED",
                    "• sub-structure: Hyper-retention pacing",
                    "• emotional tone: Blade Runner ambient style",
                    "• vocabulary density: Monospace optimal",
                    "• status: Pacing sync active"
                ];
            case "Visual Storytelling":
                return [
                    "👁️ COMPOSITION GRID: ENGAGED",
                    "• rule-of-thirds: Auto-rectified",
                    "• color gamut: DCI-P3 cinematic wide-color",
                    "• perspective: Spatial volumetric tracking",
                    "• status: Aesthetic mapping complete"
                ];
            case "Concept Development":
                return [
                    "👁️ WORLD CONTEXT: STABILIZED",
                    "• moodboard compilation: Fal-comfy pipeline",
                    "• style reference: Retro-sci-fi minimalism",
                    "• complexity factor: Grade 9 scale",
                    "• status: Ready for seed generation"
                ];
            case "Fal AI":
                return [
                    "📡 API ROUTER: ROUTING [FAL_AI]",
                    "• model: fal-realtime-latent-diffusion",
                    "• sampling: 12 steps LCM-turbo",
                    "• bandwidth: 120MB/s stream active",
                    "• status: Frame rendering in 85ms"
                ];
            case "OpenArt":
                return [
                    "📡 LATENT COMPILER: ON",
                    "• workspace: OpenArt Creative Canvas",
                    "• noise injection: 0.12 scale custom",
                    "• canvas output: 4096x2304 high-res upscale",
                    "• status: Latent upscale active"
                ];
            case "ComfyUI":
                return [
                    "📡 NODE GRID: COMPILING WORKFLOW",
                    "• controlnet: openpose & depth maps active",
                    "• models: FLUX.1 [dev] fp8 weights",
                    "• iterations: 20 sampling steps",
                    "• status: Executing latent pipeline..."
                ];
            case "Higgsfield AI":
                return [
                    "📡 SPATIAL RENDERER: HIGGSFIELD",
                    "• dynamic motion vectoring: Active",
                    "• camera paths: Orbiting-drone dolly-zoom",
                    "• frame consistency: 94.2% stability index",
                    "• status: Simulating physical motion..."
                ];
            case "Runway":
                return [
                    "📡 GEN-3 ALPHA COMPILER: RUNNING",
                    "• generation: 10s video generation output",
                    "• upscale factor: Ultra-high-fidelity resolution",
                    "• temporal coherence: Grade A optimal",
                    "• status: Video frame synthesis complete"
                ];
            case "Kling":
                return [
                    "🎬 VIDEO GEN CORE: KLING_V1.5",
                    "• prompt: High-fidelity cinematic motion tracking",
                    "• aspect ratio: 21:9 anamorphic wider",
                    "• frame rate: 60fps high-FPS active",
                    "• status: Motion vector simulation..."
                ];
            case "Veo":
                return [
                    "🎬 VIDEO GEN CORE: VEO_3.1",
                    "• prompt: Volumetric lighting cinematic shadows",
                    "• realism depth: DCI-P3 4K resolution master",
                    "• temporal persistence: Max coherence mode",
                    "• status: Deep-generative synthesis..."
                ];
            case "Seedance":
                return [
                    "🎬 VIDEO GEN CORE: SEEDANCE_2.0",
                    "• focus: Latent character consistency tracking",
                    "• motion scale: 1.25 over-boost factor",
                    "• render pass: Sub-pixel path tracking",
                    "• status: Rendering final pixels..."
                ];
            case "GPT Image":
                return [
                    "🎨 IMAGE GEN CORE: DALL-E-3",
                    "• layout: Landscape visual concept poster",
                    "• prompt expansion: Active creative script",
                    "• clarity index: 1.0 (crisp high-contrast)",
                    "• status: Dynamic compilation complete"
                ];
            case "Flux":
                return [
                    "🎨 IMAGE GEN CORE: FLUX.1 SCHNELL",
                    "• structure: Distilled guidance sampling",
                    "• resolution: 1024x1024 raw rendering",
                    "• rendering speed: 1.4 seconds generation",
                    "• status: Output array populated"
                ];
            case "NanoBanana":
                return [
                    "🎨 IMAGE GEN CORE: NANOBANANA",
                    "• model: custom-finetuned creative checkpoint",
                    "• weights: Banana-yellow volumetric shader",
                    "• saturation scale: 1.15 bright hue",
                    "• status: Rendering abstract visuals..."
                ];
            case "Midjourney":
                return [
                    "🎨 IMAGE GEN CORE: MIDJOURNEY_V6",
                    "• parameter: --v 6.0 --style raw --ar 21:9",
                    "• aesthetic weight: --s 750 (highly art-directed)",
                    "• color profile: Cool blue-white ambient shadows",
                    "• status: Image array compiled"
                ];
            case "HeyGen":
                return [
                    "👥 AVATAR ENGINE: HEYGEN_STUDIO",
                    "• model: Karthik AI Clone V3.2",
                    "• audio lipsync: Real-time neural match",
                    "• frame coherence: 99.9% seamless face mesh",
                    "• status: Spatial video projection active"
                ];
            case "Kling AI Avatar":
                return [
                    "👥 AVATAR ENGINE: KLING_PORTRAIT",
                    "• mesh tracking: 120 key facial nodes",
                    "• depth translation: 3D head rotation matrix",
                    "• volumetric hair rendering: Active",
                    "• status: Portrait animation compiler..."
                ];
            case "ElevenLabs":
                return [
                    "🎵 AUDIO SYNTH: ELEVEN_LABS_V2",
                    "• voice model: Karthik Custom Voice Clone",
                    "• voice warmth: 1.15 over-boosted bass",
                    "• clarity ratio: 98.6% clean voice track",
                    "• status: Streaming audio frames..."
                ];
            case "Suno":
                return [
                    "🎵 AUDIO SYNTH: SUNO_V4",
                    "• style: Cinematic ambient sci-fi soundscapes",
                    "• instruments: Analog synthesizers & volumetric sub-bass",
                    "• generation: 2-minute stereo wav master",
                    "• status: Audio wav buffer compiled"
                ];
            case "Premiere Pro":
                return [
                    "🖥️ NLE ORCHESTRATION: PREMIERE_PRO",
                    "• project: Karthik_Creative_Narrative_Timeline.prproj",
                    "• target: YouTube & Instagram Reels distribution",
                    "• color profile: Rec.709 cinematic color grading",
                    "• status: Media sync optimal"
                ];
            case "DaVinci Resolve":
                return [
                    "🖥️ NLE ORCHESTRATION: RESOLVE_V19",
                    "• project: Freelance_Cinematic_Edits.drp",
                    "• color engine: DaVinci YRGB Color Managed",
                    "• grading nodes: Custom ambient blue highlight LUTs",
                    "• status: Real-time rendering active..."
                ];
            case "VN":
                return [
                    "🖥️ NLE ORCHESTRATION: VN_EDITOR",
                    "• template: Mobile vertical reels (9:16 layout)",
                    "• keyframes: Sub-second algorithm sync edits",
                    "• transition: Dynamic kinetic split screen",
                    "• status: Rendered and packaged"
                ];
            default:
                break;
        }
    }
    
    switch (categoryName) {
        case "CREATIVE INTELLIGENCE":
            return [
                "🧠 COGNITIVE SYSTEM BINDING...",
                "• system status: Online & receptive",
                "• modules: ChatGPT, Claude, Gemini",
                "• operational depth: Large Language Models",
                "• status: Hover over a tool to initialize details"
            ];
        case "CREATIVE DIRECTION":
            return [
                "🎬 PRODUCTION STRATEGY ENGAGED...",
                "• modules: Narrative, Storyboard, Visuals",
                "• role: Cinematic Human Storytelling Director",
                "• style: Volumetric Blade Runner minimalism",
                "• status: Hover over a tool to view parameters"
            ];
        case "PLATFORMS & WORKFLOWS":
            return [
                "📡 GENERATIVE COMPILED ENVIRONMENT...",
                "• nodes: Fal, OpenArt, ComfyUI, Higgsfield, Runway",
                "• bandwidth: Real-time multi-latent pipelines",
                "• framework: Unified Generative Orchestrator",
                "• status: Hover over a tool to scan active weights"
            ];
        case "VIDEO GENERATION":
            return [
                "🎥 VIDEO SYNTHESIS ARRAY ACTIVE...",
                "• engine: Kling, Veo, Seedance",
                "• rendering: Anamorphic temporal consistency",
                "• capability: High-FPS cinematic motion frames",
                "• status: Hover over a tool to inspect viewport"
            ];
        case "IMAGE GENERATION":
            return [
                "🎨 IMAGE COMPILATION PIPELINE...",
                "• modules: DALL-E, Flux, NanoBanana, Midjourney",
                "• canvas aspect ratio: 21:9 / 4:5 / 1:1 wide",
                "• resolution capability: Ultra HD latent upscaled",
                "• status: Hover over a tool to inspect seeds"
            ];
        case "AI AVATARS":
            return [
                "👥 IDENTITY SYNTHESIS PIPELINES...",
                "• models: HeyGen, Kling Portrait Mesh",
                "• mesh parameters: 3D dynamic mesh tracking",
                "• capability: Dynamic digital identity clone",
                "• status: Hover over a tool to inspect nodes"
            ];
        case "AUDIO GENERATION":
            return [
                "🔊 VOLUMETRIC ACOUSTICS MODULE...",
                "• synthesis: Voice clones & cinematic scores",
                "• fidelity: High-def stereo audio masters",
                "• capability: Deep narrative voice synthesizer",
                "• status: Hover over a tool to inspect acoustics"
            ];
        case "POST PRODUCTION":
            return [
                "🎞️ NLE ORCHESTRATION CONVERGENCE...",
                "• engines: Premiere Pro, DaVinci Resolve, VN",
                "• master resolution: 4K UHD cinematic widescreen",
                "• color profiling: Professional LUT color grades",
                "• status: Hover over a tool to inspect cuts"
            ];
        default:
            return [
                "📟 CREATIVE CORE OPERATING SYSTEM",
                "• CPU temperature: 42°C [STABLE]",
                "• neural saturation: [190%] OVER-BOOST",
                "• dynamic diagnostic telemetry: Ready",
                "• action: Hover over any tool or system card to scan"
            ];
    }
};

const renderToolIcon = (tool) => {
    if (tool.customBadge) {
        return (
            <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '16px',
                height: '16px',
                borderRadius: '3px',
                fontSize: '8px',
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

    if (tool.logo) {
        return (
            <img 
                src={tool.logo} 
                alt={tool.name} 
                className={`tool-logo-img ${tool.name === 'Midjourney' || tool.name === 'Flux' || tool.name === 'ChatGPT' || tool.name === 'GPT Image' || tool.name === 'Runway' || tool.name === 'ElevenLabs' || tool.name === 'Suno' ? 'eco-logo-invert' : ''}`} 
            />
        );
    }
    
    switch (tool.svg) {
        case 'storyboard':
            return (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="tool-logo-svg">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <path d="M3 9h18M3 15h18M9 3v18M15 3v18" />
                </svg>
            );
        case 'narrative':
            return (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="tool-logo-svg">
                    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
                    <path d="M6 6h10M6 10h10" />
                </svg>
            );
        case 'visual':
            return (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="tool-logo-svg">
                    <circle cx="12" cy="12" r="10" />
                    <path d="m22 12-4-4v8l4-4ZM2 12h16" />
                </svg>
            );
        case 'concept':
            return (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="tool-logo-svg">
                    <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .6 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
                    <path d="M9 18h6M10 22h4" />
                </svg>
            );
        case 'nanobanana':
            return (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#eab308" style={{ flexShrink: 0 }}>
                    <path d="M21.97 3.74a1 1 0 0 0-1-.22c-2.73.84-5.36 2.1-7.75 3.73A19.46 19.46 0 0 0 7.9 11.8c-1.37 1.77-2.6 3.7-3.6 5.8a1 1 0 0 0 .54 1.34c1.93.88 3.96 1.48 6.03 1.78a16.66 16.66 0 0 0 8-1.54c2.14-1.12 4.07-2.6 5.75-4.4a1 1 0 0 0-.25-1.55c-1.95-1.07-3.64-2.5-5-4.22a15.86 15.86 0 0 1-2.53-5.38 1 1 0 0 0-.87-.89Z"/>
                </svg>
            );
        default:
            return <span className="tool-logo-icon">🛠️</span>;
    }
};

export default function App() {
    const [locIdx, setLocIdx] = useState(0);
    const [creativeType, setCreativeType] = useState('video');
    const [creativeIdx, setCreativeIdx] = useState(0);
    const [hoveredTool, setHoveredTool] = useState(null);
    const [hoveredCategory, setHoveredCategory] = useState(null);

    // OS Initialization States
    const [isInitialized, setIsInitialized] = useState(false);
    const [isInitializing, setIsInitializing] = useState(false);
    const [initProgress, setInitProgress] = useState(0);
    const [diagnosticLines, setDiagnosticLines] = useState([]);



    const locations = [
        { city: "Bengaluru", lang: "Kannada" },
        { city: "Delhi", lang: "Hindi" },
        { city: "Mumbai", lang: "Marathi" },
        { city: "Chennai", lang: "Tamil" },
        { city: "Assam", lang: "Assamese" },
        { city: "Kerala", lang: "Malayalam" },
        { city: "AP/Telangana", lang: "Telugu" },
        { city: "West Bengal", lang: "Bengali" }
    ];

    // Native Web Audio Synthesizer for Immersive Sci-Fi Startup Sounds
    const playStartupSound = () => {
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (!AudioContext) return;
            
            const ctx = new AudioContext();
            
            // 1. Cinematic Core Warming Hum (Sub-bass powering up)
            const oscHum = ctx.createOscillator();
            const humGain = ctx.createGain();
            const lowpass = ctx.createBiquadFilter();
            
            oscHum.type = 'triangle';
            oscHum.frequency.setValueAtTime(45, ctx.currentTime);
            oscHum.frequency.exponentialRampToValueAtTime(75, ctx.currentTime + 2.5);
            
            lowpass.type = 'lowpass';
            lowpass.frequency.setValueAtTime(120, ctx.currentTime);
            lowpass.frequency.exponentialRampToValueAtTime(350, ctx.currentTime + 2.5);
            
            humGain.gain.setValueAtTime(0, ctx.currentTime);
            humGain.gain.linearRampToValueAtTime(0.4, ctx.currentTime + 0.5);
            humGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 2.5);
            
            oscHum.connect(humGain);
            humGain.connect(lowpass);
            lowpass.connect(ctx.destination);
            
            oscHum.start(ctx.currentTime);
            oscHum.stop(ctx.currentTime + 2.7);
            
            // 2. High-Tech Typewriter/Digital Clicking
            const playDigitalClick = (time, pitch = 800) => {
                const oscClick = ctx.createOscillator();
                const clickGain = ctx.createGain();
                
                oscClick.type = 'sine';
                oscClick.frequency.setValueAtTime(pitch, time);
                
                clickGain.gain.setValueAtTime(0.04, time);
                clickGain.gain.exponentialRampToValueAtTime(0.001, time + 0.04);
                
                oscClick.connect(clickGain);
                clickGain.connect(ctx.destination);
                
                oscClick.start(time);
                oscClick.stop(time + 0.05);
            };
            
            playDigitalClick(ctx.currentTime + 0.2, 1000);
            playDigitalClick(ctx.currentTime + 0.6, 900);
            playDigitalClick(ctx.currentTime + 1.1, 1100);
            playDigitalClick(ctx.currentTime + 1.6, 950);
            playDigitalClick(ctx.currentTime + 2.2, 1050);
            
            // 3. Apple/visionOS-style Resolution Chime (Warm Major 7th chord arpeggio)
            const chimeTime = ctx.currentTime + 2.5;
            const chord = [220.00, 277.18, 329.63, 415.30];
            
            const delay = ctx.createDelay();
            delay.delayTime.value = 0.25;
            const delayGain = ctx.createGain();
            delayGain.gain.value = 0.25;
            
            delay.connect(delayGain);
            delayGain.connect(ctx.destination);
            delayGain.connect(delay);
            
            chord.forEach((freq, index) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                
                osc.type = index % 2 === 0 ? 'sine' : 'triangle';
                osc.frequency.setValueAtTime(freq, chimeTime);
                
                const filter = ctx.createBiquadFilter();
                filter.type = 'lowpass';
                filter.frequency.value = 800;
                
                gain.gain.setValueAtTime(0, chimeTime);
                const noteOnTime = chimeTime + (index * 0.08);
                gain.gain.linearRampToValueAtTime(0.12, noteOnTime + 0.05);
                gain.gain.exponentialRampToValueAtTime(0.001, noteOnTime + 4.0);
                
                osc.connect(filter);
                filter.connect(gain);
                
                gain.connect(ctx.destination);
                gain.connect(delay);
                
                osc.start(noteOnTime);
                osc.stop(noteOnTime + 4.5);
            });
            
        } catch (e) {
            console.error("Web Audio API synth failed to initialize", e);
        }
    };

    const handleInitialize = () => {
        if (isInitializing || isInitialized) return;
        setIsInitializing(true);
        setInitProgress(0);
        setDiagnosticLines([]);

        // Fire native synth startup sound
        playStartupSound();

        const logs = [
            { threshold: 0, text: "▲ SYSTEM STATUS: ONLINE" },
            { threshold: 8, text: "▶ BINDING STORYTELLING NEURAL TERMINAL..." },
            { threshold: 22, text: "✔ CONNECTING TO GENERATIVE COGNITIVE NETWORK... SUCCESS" },
            { threshold: 38, text: "✔ INITIALIZING CINEMATIC SHADER COMPILER... OK" },
            { threshold: 54, text: "▶ SYNAPSE CORE SATURATION AT [190%] OVER-BOOST" },
            { threshold: 70, text: "▶ DEPLOYING INTERACTIVE FRONTEND BLUEPRINT..." },
            { threshold: 85, text: "✔ AMBIENT VOLUMETRIC ACOUSTICS SYNTHESIZED" },
            { threshold: 98, text: "✔ OS LOADED. LAUNCHING CINEMATIC STORY EXPERIENCE." }
        ];

        let currentProgress = 0;
        const totalDuration = 2800; // 2.8 seconds
        const stepTime = 30; // ms
        const steps = totalDuration / stepTime;
        const increment = 100 / steps;

        const interval = setInterval(() => {
            currentProgress += increment;
            if (currentProgress >= 100) {
                currentProgress = 100;
                clearInterval(interval);
                
                logs.forEach(log => {
                    setDiagnosticLines(prev => prev.includes(log.text) ? prev : [...prev, log.text]);
                });
                
                setInitProgress(100);
                
                setTimeout(() => {
                    setIsInitialized(true);
                    setIsInitializing(false);
                    // Scroll to Creative Systems after boot-up completes
                    setTimeout(() => {
                        const capSection = document.getElementById('capabilities');
                        if (capSection) {
                            capSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                        if (window.ScrollTrigger) {
                            window.ScrollTrigger.refresh();
                        }
                    }, 400);
                }, 800);
            } else {
                setInitProgress(Math.floor(currentProgress));
                logs.forEach(log => {
                    if (currentProgress >= log.threshold) {
                        setDiagnosticLines(prev => prev.includes(log.text) ? prev : [...prev, log.text]);
                    }
                });
            }
        }, stepTime);
    };

    useEffect(() => {
        initPortfolio();
        const interval = setInterval(() => {
            setLocIdx((prev) => (prev + 1) % locations.length);
        }, 1500);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        // Prevent scroll until system is fully initialized
        if (!isInitialized) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }, [isInitialized]);

    return (
        <>
            <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', pointerEvents: 'none', zIndex: -1, opacity: 0.45 }}>
                <LightRays
                    raysOrigin="top-center"
                    raysColor="#0084ff"
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





            <nav className={isInitialized ? '' : 'nav-standby'}>
                <div className="nav-inner">
                    <div className="logo-wrapper">
                        <a href="#" className="logo-text">KARTHIK G RAJ</a>
                    </div>
                    <div className="nav-links">
                        <a href="#capabilities">Capabilities</a>
                        <a href="#visuals">Visuals</a>
                        <a href="#contact">Contact</a>
                    </div>
                    <div className="nav-actions">
                        <a href="#" className="resume-btn" download>Resume</a>
                        <button className="menu-toggle" aria-label="Toggle Menu">
                            <span></span>
                            <span></span>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div className={`mobile-menu ${isInitialized ? '' : 'mobile-menu-standby'}`}>
                <div className="mobile-menu-inner">
                    <a href="#capabilities">Capabilities</a>
                    <a href="#visuals">Visuals</a>
                    <a href="#contact">Contact</a>
                    <a href="#" className="resume-btn" download style={{ marginTop: '20px' }}>Resume</a>
                </div>
            </div>

            <main>
                {/* 1. Hero Section — only shown before initialization */}
                {!isInitialized && (
                <section id="hero" style={{ position: 'relative', overflow: 'hidden' }}>
                    <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                        <div className="hero-grid">
                            <div className="hero-content">
                                <p className="hero-label reveal-text">Gen AI Visual Director</p>
                                <h1 className="reveal-text">Architecting<br /><span>Human Attention.</span></h1>
                                <p className="hero-sub reveal-text">I treat AI not as a tool, but as a medium for cinematic human storytelling</p>
                                <div className="hero-cta reveal-item">
                                    <button className="init-btn" onClick={handleInitialize}>
                                        <span className="init-btn-glow"></span>
                                        <span className="init-btn-sweep"></span>
                                        <span className="init-btn-loading-bar"></span>
                                        <span className="init-btn-status-node"></span>
                                        <span className="init-btn-text">INITIALIZE PORTFOLIO</span>
                                    </button>
                                </div>
                            </div>
                            <div className="hero-avatar-wrapper">
                                <ProfileCard videoSrc="assets/videos/video1.mp4" />
                            </div>
                        </div>
                    </div>
                </section>
                )}

                <div className={`portfolio-sections-wrapper ${isInitialized ? 'revealed' : 'veiled'}`}>
                    {/* 4. Creative Capabilities */}
                <section id="capabilities" className="capabilities-section">
                    <div className="container">
                        <div className="section-header text-center">
                            <h2 className="section-heading reveal-text" style={{ marginBottom: '10px' }}>Creative Capabilities</h2>
                        </div>
                        <div className="capabilities-grid-v2 reveal-item">
                            {/* 1. Hero Card: AI Creative Direction */}
                            <div className="cap-card-v2 hero-cap-card">
                                <div className="cap-card-header">
                                    <div className="cap-status-group">
                                        <span className="cap-dot-indicator pulse-blue"></span>
                                        <span className="cap-num">01</span>
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="card-arrow-icon">
                                            <line x1="7" y1="17" x2="17" y2="7"></line>
                                            <polyline points="7 7 17 7 17 17"></polyline>
                                        </svg>
                                    </div>
                                    <span className="cap-label">PRIMARY SPECIALIZATION</span>
                                </div>
                                <div className="cap-card-body">
                                    <h3 className="cap-title">AI Creative Direction</h3>
                                    <p className="cap-desc">
                                        Leading next-generation brand narratives by combining advanced generative AI tools with high-fidelity creative direction to produce premium cinematic worlds.
                                    </p>
                                    <div className="cap-focus-tags">
                                        <span className="cap-focus-tag">Multimodal AI</span>
                                        <span className="cap-focus-tag">Cinematic Worldbuilding</span>
                                        <span className="cap-focus-tag">Directing</span>
                                    </div>
                                </div>
                                <div className="cap-meta">
                                    <div className="meta-item">
                                        <span className="meta-key">Focus Area</span>
                                        <span className="meta-val">AI Production & Branding</span>
                                    </div>
                                    <div className="meta-item">
                                        <span className="meta-key">Key Deliverable</span>
                                        <span className="meta-val">Cinematic Worldbuilding</span>
                                    </div>
                                    <div className="meta-item">
                                        <span className="meta-key">Technology</span>
                                        <span className="meta-val">Multimodal AI Pipelines</span>
                                    </div>
                                </div>
                            </div>

                            {/* 2. Cinematic Video Editing */}
                            <div className="cap-card-v2">
                                <div className="cap-card-header">
                                    <div className="cap-status-group">
                                        <span className="cap-dot-indicator"></span>
                                        <span className="cap-num">02</span>
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="card-arrow-icon">
                                            <line x1="7" y1="17" x2="17" y2="7"></line>
                                            <polyline points="7 7 17 7 17 17"></polyline>
                                        </svg>
                                    </div>
                                    <span className="cap-label">VIDEO PRODUCTION</span>
                                </div>
                                <div className="cap-card-body">
                                    <h3 className="cap-title">Cinematic Video Editing</h3>
                                    <p className="cap-desc">
                                        High-end video editing for long-form content, documentaries, and commercials, focusing on pacing, structure, and emotional engagement.
                                    </p>
                                    <div className="cap-focus-tags">
                                        <span className="cap-focus-tag">Pacing & Rhythm</span>
                                        <span className="cap-focus-tag">Narrative Flow</span>
                                        <span className="cap-focus-tag">Color Grading</span>
                                    </div>
                                </div>
                            </div>

                            {/* 3. Short-Form Video Editing */}
                            <div className="cap-card-v2">
                                <div className="cap-card-header">
                                    <div className="cap-status-group">
                                        <span className="cap-dot-indicator"></span>
                                        <span className="cap-num">03</span>
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="card-arrow-icon">
                                            <line x1="7" y1="17" x2="17" y2="7"></line>
                                            <polyline points="7 7 17 7 17 17"></polyline>
                                        </svg>
                                    </div>
                                    <span className="cap-label">SOCIAL MEDIA</span>
                                </div>
                                <div className="cap-card-body">
                                    <h3 className="cap-title">Short-Form Video Editing</h3>
                                    <p className="cap-desc">
                                        Dynamic, high-impact vertical videos, reels, and TikToks engineered with strong visual hooks for maximum audience retention.
                                    </p>
                                    <div className="cap-focus-tags">
                                        <span className="cap-focus-tag">Retention Hooks</span>
                                        <span className="cap-focus-tag">Dynamic Captions</span>
                                        <span className="cap-focus-tag">Sound FX</span>
                                    </div>
                                </div>
                            </div>

                            {/* 4. Content Research & Strategy */}
                            <div className="cap-card-v2">
                                <div className="cap-card-header">
                                    <div className="cap-status-group">
                                        <span className="cap-dot-indicator"></span>
                                        <span className="cap-num">04</span>
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="card-arrow-icon">
                                            <line x1="7" y1="17" x2="17" y2="7"></line>
                                            <polyline points="7 7 17 7 17 17"></polyline>
                                        </svg>
                                    </div>
                                    <span className="cap-label">IDEATION</span>
                                </div>
                                <div className="cap-card-body">
                                    <h3 className="cap-title">Content Research & Strategy</h3>
                                    <p className="cap-desc">
                                        In-depth topic research and data-backed content mapping to design stories that command human attention from the first second.
                                    </p>
                                    <div className="cap-focus-tags">
                                        <span className="cap-focus-tag">Audience Insights</span>
                                        <span className="cap-focus-tag">Virality Mapping</span>
                                        <span className="cap-focus-tag">Data Analytics</span>
                                    </div>
                                </div>
                            </div>

                            {/* 5. Visual Storytelling */}
                            <div className="cap-card-v2">
                                <div className="cap-card-header">
                                    <div className="cap-status-group">
                                        <span className="cap-dot-indicator"></span>
                                        <span className="cap-num">05</span>
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="card-arrow-icon">
                                            <line x1="7" y1="17" x2="17" y2="7"></line>
                                            <polyline points="7 7 17 7 17 17"></polyline>
                                        </svg>
                                    </div>
                                    <span className="cap-label">CREATIVE TECHNIQUE</span>
                                </div>
                                <div className="cap-card-body">
                                    <h3 className="cap-title">Visual Storytelling</h3>
                                    <p className="cap-desc">
                                        Blending moving pixels, composition, lighting, and immersive sound design to elevate narrative depth and drive conversion.
                                    </p>
                                    <div className="cap-focus-tags">
                                        <span className="cap-focus-tag">Composition</span>
                                        <span className="cap-focus-tag">Dramatic Lighting</span>
                                        <span className="cap-focus-tag">Soundscapes</span>
                                    </div>
                                </div>
                            </div>

                            {/* 6. AI Concept Art & Workflows */}
                            <div className="cap-card-v2">
                                <div className="cap-card-header">
                                    <div className="cap-status-group">
                                        <span className="cap-dot-indicator"></span>
                                        <span className="cap-num">06</span>
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="card-arrow-icon">
                                            <line x1="7" y1="17" x2="17" y2="7"></line>
                                            <polyline points="7 7 17 7 17 17"></polyline>
                                        </svg>
                                    </div>
                                    <span className="cap-label">PRE-PRODUCTION</span>
                                </div>
                                <div className="cap-card-body">
                                    <h3 className="cap-title">AI Concept Art & Workflows</h3>
                                    <p className="cap-desc">
                                        Bespoke conceptual artwork, visual mood boards, and customized image generation utilizing state-of-the-art AI systems.
                                    </p>
                                    <div className="cap-focus-tags">
                                        <span className="cap-focus-tag">Prompt Crafting</span>
                                        <span className="cap-focus-tag">ControlNet</span>
                                        <span className="cap-focus-tag">Style Transfer</span>
                                    </div>
                                </div>
                            </div>

                            {/* 7. Storyboarding & Pre-Visuals */}
                            <div className="cap-card-v2">
                                <div className="cap-card-header">
                                    <div className="cap-status-group">
                                        <span className="cap-dot-indicator"></span>
                                        <span className="cap-num">07</span>
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="card-arrow-icon">
                                            <line x1="7" y1="17" x2="17" y2="7"></line>
                                            <polyline points="7 7 17 7 17 17"></polyline>
                                        </svg>
                                    </div>
                                    <span className="cap-label">PLANNING</span>
                                </div>
                                <div className="cap-card-body">
                                    <h3 className="cap-title">Storyboarding & Pre-Visuals</h3>
                                    <p className="cap-desc">
                                        Visual narrative mapping, shot design, and sequence layout to plan and optimize complex post-production cycles.
                                    </p>
                                    <div className="cap-focus-tags">
                                        <span className="cap-focus-tag">Sequenced Layouts</span>
                                        <span className="cap-focus-tag">Midjourney Panels</span>
                                        <span className="cap-focus-tag">Shot Design</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 10. Creative Ecosystem — Cinematic Connected Neural Dashboard */}
                <section id="tech-stack" className="workflow-router-section">
                    <div className="container">
                        <div className="section-header text-center">
                            <h2 className="section-heading reveal-text" style={{ marginBottom: '10px' }}>My Creative Tech Stack</h2>
                        </div>

                        <div className="tech-stack-dashboard reveal-item">
                            {/* SVG Neural Nodes Overlay */}
                            <div className="tech-stack-svg-overlay">
                                <svg width="100%" height="100%" viewBox="0 0 1000 650" preserveAspectRatio="none">
                                    {/* Start nodes for Column 1 */}
                                    <circle cx="280" cy="180" r="5" fill="#4da3ff" className="neural-node" style={{ color: '#4da3ff' }} />
                                    <circle cx="280" cy="450" r="5" fill="#a855f7" className="neural-node" style={{ color: '#a855f7' }} />

                                    {/* Start nodes for Column 2 */}
                                    <circle cx="680" cy="180" r="5" fill="#eab308" className="neural-node" style={{ color: '#eab308' }} />
                                    <circle cx="680" cy="260" r="5" fill="#06b6d4" className="neural-node" style={{ color: '#06b6d4' }} />
                                    <circle cx="680" cy="360" r="5" fill="#4da3ff" className="neural-node" style={{ color: '#4da3ff' }} />
                                    <circle cx="680" cy="450" r="5" fill="#ff6f3c" className="neural-node" style={{ color: '#ff6f3c' }} />
                                    <circle cx="680" cy="560" r="5" fill="#a855f7" className="neural-node" style={{ color: '#a855f7' }} />

                                    {/* Convergence Hub nodes (end terminals) */}
                                    <circle cx="380" cy="180" r="6" fill="#4da3ff" className="neural-node-hub" />
                                    <circle cx="780" cy="360" r="6" fill="#4da3ff" className="neural-node-hub" />
                                </svg>
                            </div>

                            {/* Dashboard Columns Grid */}
                            <div className="tech-stack-columns">
                                
                                {/* COLUMN 1: COGNITIVE INPUT */}
                                <div className="tech-stack-column cognitive-column">
                                    <div className="column-label">PHASE 01 // COGNITIVE CORE</div>
                                    
                                    {techStackCategories.filter(c => c.num === "01" || c.num === "02").map((category) => (
                                        <div 
                                            key={category.name} 
                                            className={`tech-stack-card ${hoveredCategory === category.name ? 'active-card' : ''}`}
                                            onMouseEnter={() => setHoveredCategory(category.name)}
                                            onMouseLeave={() => setHoveredCategory(null)}
                                        >
                                            <div className="tech-stack-card-header">
                                                <span className="tech-stack-index">{category.num}</span>
                                                <h3 className="tech-stack-title">{category.name}</h3>
                                            </div>
                                            <div className="tech-stack-divider"></div>
                                            <div className="tech-stack-badges">
                                                {category.tools.map((tool) => (
                                                    <div 
                                                        key={tool.name} 
                                                        className={`tech-stack-badge ${hoveredTool === tool.name ? 'active-badge' : ''}`}
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
                                                        <div className="tech-stack-badge-icon">
                                                            {renderToolIcon(tool)}
                                                        </div>
                                                        <span className="tech-stack-badge-name">{tool.name}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* COLUMN 2: GENERATIVE MATRIX */}
                                <div className="tech-stack-column synthesis-column">
                                    <div className="column-label">PHASE 02 // SYNTHESIS PIPELINES</div>
                                    
                                    {techStackCategories.filter(c => ["03", "04", "05", "06", "07"].includes(c.num)).map((category) => (
                                        <div 
                                            key={category.name} 
                                            className={`tech-stack-card ${hoveredCategory === category.name ? 'active-card' : ''}`}
                                            onMouseEnter={() => setHoveredCategory(category.name)}
                                            onMouseLeave={() => setHoveredCategory(null)}
                                        >
                                            <div className="tech-stack-card-header">
                                                <span className="tech-stack-index">{category.num}</span>
                                                <h3 className="tech-stack-title">{category.name}</h3>
                                            </div>
                                            <div className="tech-stack-divider"></div>
                                            <div className="tech-stack-badges">
                                                {category.tools.map((tool) => (
                                                    <div 
                                                        key={tool.name} 
                                                        className={`tech-stack-badge ${hoveredTool === tool.name ? 'active-badge' : ''}`}
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
                                                        <div className="tech-stack-badge-icon">
                                                            {renderToolIcon(tool)}
                                                        </div>
                                                        <span className="tech-stack-badge-name">{tool.name}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* COLUMN 3: CINEMATIC MASTERING */}
                                <div className="tech-stack-column mastering-column">
                                    <div className="column-label">PHASE 03 // MASTERING CONVERGENCE</div>
                                    
                                    {techStackCategories.filter(c => c.num === "08").map((category) => (
                                        <div 
                                            key={category.name} 
                                            className={`tech-stack-card ${hoveredCategory === category.name ? 'active-card' : ''}`}
                                            onMouseEnter={() => setHoveredCategory(category.name)}
                                            onMouseLeave={() => setHoveredCategory(null)}
                                        >
                                            <div className="tech-stack-card-header">
                                                <span className="tech-stack-index">{category.num}</span>
                                                <h3 className="tech-stack-title">{category.name}</h3>
                                            </div>
                                            <div className="tech-stack-divider"></div>
                                            <div className="tech-stack-badges">
                                                {category.tools.map((tool) => (
                                                    <div 
                                                        key={tool.name} 
                                                        className={`tech-stack-badge ${hoveredTool === tool.name ? 'active-badge' : ''}`}
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
                                                        <div className="tech-stack-badge-icon">
                                                            {renderToolIcon(tool)}
                                                        </div>
                                                        <span className="tech-stack-badge-name">{tool.name}</span>
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

                {/* 4.5. Cinematic Self-Visuals Section */}
                <section id="self-visuals">
                    <div className="container">
                        <div className="section-header text-center">
                            <h2 className="section-heading reveal-text" style={{ marginBottom: '10px' }}>Cinematic Self-Visuals</h2>
                        </div>
                        <div className="cinema-grid reveal-item">
                            {/* Top Ultrawide Video */}
                            <div className="cinema-card ultrawide" data-glow="#A78BFA">
                                <div className="cinema-video-wrapper">
                                    <video className="cinema-video" src="assets/videos/helicopter.mp4" loop muted playsInline
                                        autoPlay></video>
                                    <div className="cinema-overlay">
                                        <span className="cinema-badge">Gen-4 Turbo</span>
                                    </div>
                                </div>
                                <div className="cinema-content">
                                    <span className="cinema-index">01 / WIDESCREEN FRONTIER</span>
                                    <h3 className="cinema-title">Ultrawide Horizon</h3>
                                    <p className="cinema-description">An expansive 21:9 cinematic exploration generated with
                                        state-of-the-art AI video models. Blending scale, atmosphere, and high-fidelity
                                        storytelling into a unified visual experience.</p>
                                </div>
                            </div>

                            {/* Existing 16:9 Videos */}
                            <div className="cinema-card" data-glow="#4DA3FF">
                                <div className="cinema-video-wrapper">
                                    <video className="cinema-video" src="assets/videos/isro.mov" loop muted playsInline
                                        autoPlay></video>
                                    <div className="cinema-overlay">
                                        <span className="cinema-badge">Kling V3 Pro</span>
                                    </div>
                                </div>
                                <div className="cinema-content">
                                    <span className="cinema-index">02 / CINEMATIC ENVIRONMENTS</span>
                                    <h3 className="cinema-title">Inside the Mission</h3>
                                    <p className="cinema-description">A cinematic AI-generated visual featuring myself inside an
                                        ISRO-inspired mission control environment, focused on futuristic space operations and
                                        immersive storytelling.</p>
                                </div>
                            </div>
                            <div className="cinema-card" data-glow="#93C5FD">
                                <div className="cinema-video-wrapper">
                                    <video className="cinema-video" src="assets/videos/underwater.mp4" loop muted playsInline
                                        autoPlay></video>
                                    <div className="cinema-overlay">
                                        <span className="cinema-badge">Seedance 2.0</span>
                                    </div>
                                </div>
                                <div className="cinema-content">
                                    <span className="cinema-index">03 / IMMERSIVE VISUALS</span>
                                    <h3 className="cinema-title">Lost in Blue</h3>
                                    <p className="cinema-description">An atmospheric underwater self-visual exploring emotion,
                                        silence, and cinematic worldbuilding through AI-generated environments</p>
                                </div>
                            </div>

                            {/* Bottom Ultrawide Video */}
                            <div className="cinema-card ultrawide" data-glow="#F87171">
                                <div className="cinema-video-wrapper">
                                    <video className="cinema-video" src="assets/videos/supra.mp4" loop muted playsInline
                                        autoPlay></video>
                                    <div className="cinema-overlay">
                                        <span className="cinema-badge">Gen-4 Turbo</span>
                                    </div>
                                </div>
                                <div className="cinema-content">
                                    <span className="cinema-index">04 / EXPANSIVE VISIONS</span>
                                    <h3 className="cinema-title">The Anamorphic Frame</h3>
                                    <p className="cinema-description">A deep-dive into ultra-widescreen aspect ratios, bringing the
                                        immersive feel of traditional cinema lenses into AI-generated motion design.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 5. Visual Systems Gallery */}
                <section id="visuals">
                    <div className="container">
                        <div className="section-header text-center">
                            <h2 className="section-heading reveal-text" style={{ marginBottom: '10px' }}>Concept Poster Showcase</h2>
                        </div>
                        <div className="visual-gallery">
                            {/* Project 1 */}
                            <div className="visual-item reveal-item">
                                {/* Top: Large Ultrawide Shot 1 */}
                                <div className="visual-media" style={{ marginBottom: '24px' }}>
                                    <img src="assets/images/n1.png" alt="Neural Frontiers - Shot 1" className="visual-image" />
                                </div>

                                {/* Bottom: Redesigned row with details on the left and n2.png smaller on the right */}
                                <div className="visual-details-layout" style={{
                                    display: 'flex',
                                    flexWrap: 'wrap-reverse',
                                    gap: '40px',
                                    alignItems: 'center',
                                    marginTop: '16px'
                                }}>
                                    {/* Parallel Left: Campaign Details */}
                                    <div className="visual-info" style={{ flex: '1.2', minWidth: '320px' }}>
                                        <span className="visual-tag" style={{ fontSize: '0.85rem', color: 'var(--accent)', letterSpacing: '2px', textTransform: 'uppercase' }}>
                                            CAMPAIGN 01 / Concept Product - Nandini Masala Majjige
                                        </span>
                                        <h3 className="visual-title" style={{ fontSize: '2.25rem', fontWeight: '800', margin: '12px 0', color: '#FFF' }}>
                                            BEAT THE HEAT
                                        </h3>
                                        <p className="visual-description" style={{ fontSize: '1.05rem', lineHeight: '1.7', color: 'var(--text-muted)' }}>
                                            A localized commercial concept modernizing a regional favorite: Spiced Buttermilk. The visuals feature Bengaluru's transit and civic workers sharing moments of genuine relief in the peak of a Bengaluru summer.
                                        </p>
                                    </div>

                                    {/* Parallel Right: n2.png (smaller in size) */}
                                    <div className="visual-media" style={{
                                        flex: '0.8',
                                        minWidth: '280px',
                                        maxWidth: '440px',
                                        aspectRatio: '1152 / 928',
                                        margin: 0,
                                        boxShadow: '0 20px 45px rgba(0, 0, 0, 0.5)'
                                    }}>
                                        <img src="assets/images/n2.png" alt="Neural Frontiers - Shot 2" className="visual-image" style={{ objectFit: 'cover' }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* ═══════════════════════════════════════════════════════ */}
                {/* EXPERIENCE JOURNEY — Retro-Futuristic Creative OS        */}
                {/* ═══════════════════════════════════════════════════════ */}
                <section id="experience-journey">
                    <div className="container">
                        <div className="section-header text-center">
                            <h2 className="section-heading reveal-text" style={{ marginBottom: '10px' }}>Experience Journey</h2>
                        </div>

                        <div className="xp-windows-container">

                            {/* ─── WINDOW 1: AdMitra (Fal.ai Inspired) ─── */}
                            <div className="xp-interface-window xp-window-fal reveal-item" data-theme="ai">
                                <div className="xp-window-header">
                                    <div className="xp-window-controls">
                                        <span></span><span></span><span></span>
                                    </div>
                                    <div className="xp-window-title">
                                        <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                                        www.admitra.in
                                    </div>
                                </div>
                                <div className="xp-window-body">
                                    {/* AdMitra Navigation Sidebar */}
                                    <div className="xp-window-sidebar" style={{ width: '240px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '20px', background: 'rgba(6, 6, 8, 0.85)' }}>
                                        <div className="xp-sidebar-brand" style={{ paddingBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" style={{ display: 'block' }}>
                                                    <path d="M12 2L3 20H8.5L12 11.5L15.5 20H21L12 2Z" fill="#3B82F6" />
                                                    <path d="M12 11.5L9.5 16.5H14.5L12 11.5Z" fill="#1D4ED8" opacity="0.6" />
                                                </svg>
                                                <span style={{ fontSize: '16px', fontWeight: '800', letterSpacing: '1px', color: '#FFF', fontFamily: "'Space Grotesk', sans-serif" }}>
                                                    ADMITRA
                                                </span>
                                            </div>
                                        </div>
                                        <div className="xp-sidebar-nav" style={{ overflowY: 'auto', flex: '1', display: 'flex', flexDirection: 'column', gap: '4px', paddingRight: '4px' }}>

                                            {/* 1. Storyboard to Videos */}
                                            <div className="xp-nav-item active" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 12px', borderRadius: '6px', fontSize: '0.82rem', color: '#3B82F6', background: 'rgba(59, 130, 246, 0.12)', fontWeight: '600', cursor: 'pointer' }}>
                                                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" style={{ color: 'inherit' }}><path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" /></svg>
                                                Storyboard to Videos
                                            </div>

                                            {/* 2. Storyboard to Posters */}
                                            <div className="xp-nav-item" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 12px', borderRadius: '6px', fontSize: '0.82rem', color: 'rgba(255,255,255,0.7)', cursor: 'pointer' }}>
                                                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" style={{ color: 'inherit' }}><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 16H6c-.55 0-1-.45-1-1V6c0-.55.45-1 1-1h12c.55 0 1 .45 1 1v12c0 .55-.45 1-1 1zm-4.44-6.19l-2.28 2.72-1.62-1.95L6.5 17h11l-3.94-4.19z" /></svg>
                                                Storyboard to Posters
                                            </div>

                                            {/* 3. Partner Marketing (Expanded Header) */}
                                            <div className="xp-nav-item" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 12px 4px 12px', borderRadius: '6px', fontSize: '0.82rem', color: 'rgba(255,255,255,0.85)', fontWeight: '600', cursor: 'pointer' }}>
                                                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
                                                Partner Marketing
                                                <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" strokeWidth="2.5" fill="none" style={{ marginLeft: 'auto', opacity: 0.6 }}><polyline points="18 15 12 9 6 15"></polyline></svg>
                                            </div>

                                            {/* Submenu Group for Partner Marketing */}
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', paddingLeft: '24px', marginBottom: '4px' }}>
                                                {/* Campaigns */}
                                                <div className="xp-nav-item" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '6px 10px', borderRadius: '5px', fontSize: '0.78rem', color: 'rgba(255,255,255,0.6)', cursor: 'pointer' }}>
                                                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 5L6 9H2v6h4l5 4V5z" /><path d="M15.54 8.46a5 5 0 0 1 0 7.07" /><path d="M19.07 4.93a10 10 0 0 1 0 14.14" /></svg>
                                                    Campaigns
                                                </div>
                                                {/* Analytics */}
                                                <div className="xp-nav-item" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '6px 10px', borderRadius: '5px', fontSize: '0.78rem', color: 'rgba(255,255,255,0.6)', cursor: 'pointer' }}>
                                                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg>
                                                    Analytics
                                                </div>
                                            </div>

                                            {/* 4. Meta Marketing */}
                                            <div className="xp-nav-item" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 12px', borderRadius: '6px', fontSize: '0.82rem', color: 'rgba(255,255,255,0.7)', cursor: 'pointer' }}>
                                                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" style={{ color: 'inherit' }}><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" /></svg>
                                                Meta Marketing
                                            </div>

                                            {/* 5. Projects */}
                                            <div className="xp-nav-item" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 12px', borderRadius: '6px', fontSize: '0.82rem', color: 'rgba(255,255,255,0.7)', cursor: 'pointer' }}>
                                                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="13" height="13" rx="2" ry="2" /><rect x="8" y="8" width="13" height="13" rx="2" ry="2" opacity="0.6" /></svg>
                                                Projects
                                            </div>

                                            {/* 6. Your Brand (Header) */}
                                            <div className="xp-nav-item" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 12px 4px 12px', borderRadius: '6px', fontSize: '0.82rem', color: 'rgba(255,255,255,0.85)', fontWeight: '600', marginTop: '8px' }}>
                                                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="2" width="16" height="20" rx="2" ry="2" /><line x1="9" y1="22" x2="9" y2="16" /><line x1="15" y1="22" x2="15" y2="16" /><line x1="9" y1="16" x2="15" y2="16" /><path d="M8 6h2v2H8V6zm4 0h2v2h-2V6zm-4 4h2v2H8v-2zm4 0h2v2h-2v-2z" /></svg>
                                                Your Brand
                                                <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" strokeWidth="2.5" fill="none" style={{ marginLeft: 'auto', opacity: 0.6 }}><polyline points="18 15 12 9 6 15"></polyline></svg>
                                            </div>

                                            {/* Submenu Group for Your Brand */}
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', paddingLeft: '24px' }}>
                                                {/* Products */}
                                                <div className="xp-nav-item" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '6px 10px', borderRadius: '5px', fontSize: '0.78rem', color: 'rgba(255,255,255,0.6)', cursor: 'pointer' }}>
                                                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="16" rx="2" ry="2" /><line x1="3" y1="10" x2="21" y2="10" /><line x1="3" y1="14" x2="21" y2="14" /><rect x="9" y="6" width="6" height="2" rx="0.5" /></svg>
                                                    Products
                                                </div>
                                                {/* Target Audience */}
                                                <div className="xp-nav-item" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '6px 10px', borderRadius: '5px', fontSize: '0.78rem', color: 'rgba(255,255,255,0.6)', cursor: 'pointer' }}>
                                                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                                                    Target Audience
                                                </div>
                                                {/* Brand Kits */}
                                                <div className="xp-nav-item" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '6px 10px', borderRadius: '5px', fontSize: '0.78rem', color: 'rgba(255,255,255,0.6)', cursor: 'pointer' }}>
                                                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="21" x2="9" y2="9" /></svg>
                                                    Brand Kits
                                                </div>
                                                {/* Environments */}
                                                <div className="xp-nav-item" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '6px 10px', borderRadius: '5px', fontSize: '0.78rem', color: 'rgba(255,255,255,0.6)', cursor: 'pointer' }}>
                                                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="3 20 9 10 13 16 16 11 21 20 3 20" /></svg>
                                                    Environments
                                                </div>
                                                {/* Avatars */}
                                                <div className="xp-nav-item" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '6px 10px', borderRadius: '5px', fontSize: '0.78rem', color: 'rgba(255,255,255,0.6)', cursor: 'pointer' }}>
                                                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><line x1="9" y1="9" x2="9.01" y2="9" /><line x1="15" y1="9" x2="15.01" y2="9" /></svg>
                                                    Avatars
                                                </div>
                                                {/* Voices */}
                                                <div className="xp-nav-item" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '6px 10px', borderRadius: '5px', fontSize: '0.78rem', color: 'rgba(255,255,255,0.6)', cursor: 'pointer' }}>
                                                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" /><path d="M19 10v1a7 7 0 0 1-14 0v-1" /><line x1="12" y1="18" x2="12" y2="22" /></svg>
                                                    Voices
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* AdMitra Workspace Main Dashboard */}
                                    <div className="xp-window-main">
                                        {/* Left Side: Professional Experience Details & Clients */}
                                        <div className="xp-left-pane">
                                            <div>
                                                <div className="xp-main-header" style={{ marginBottom: '16px' }}>
                                                    <h3 style={{ fontSize: '1.75rem', fontWeight: '800', color: '#fff', marginBottom: '6px' }}>Generative AI Intern</h3>
                                                    <p style={{ fontSize: '0.85rem', color: '#3B82F6', fontFamily: 'monospace', fontWeight: '600' }}>
                                                        Bengaluru · AdMitra Pvt. Ltd. &nbsp;|&nbsp; <span style={{ color: 'rgba(255,255,255,0.5)' }}>February 2026 – May 2026</span>
                                                    </p>
                                                </div>
                                                <div className="xp-main-desc" style={{ fontSize: '0.9rem', lineHeight: '1.6', color: 'rgba(255,255,255,0.75)' }}>
                                                    <p style={{ marginBottom: '14px' }}>Led end-to-end AI-powered creative operations for hyperlocal advertising campaigns across video and poster formats at scale. Translated brand strategy into structured storyboards, localized narratives, and multi-language AI-generated campaign assets.</p>
                                                    <p>Managed high-volume creative production workflows delivering 100+ localized creatives monthly. Collaborated directly with founders and brand stakeholders to streamline campaign execution.</p>
                                                </div>
                                            </div>

                                            {/* Key Clients logos bar embedded in details */}
                                            <div className="xp-client-brands" style={{ marginTop: '20px', paddingTop: '15px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                                                <p className="xp-brands-title" style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '1.5px', marginBottom: '10px' }}>
                                                    KEY CAMPAIGN CLIENTS
                                                </p>
                                                <div className="xp-brands-logos" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                                                    <div className="xp-brand-logo-btn" style={{ borderColor: 'rgba(59, 130, 246, 0.2)', background: 'rgba(59, 130, 246, 0.05)' }}>
                                                        <img src="https://logo.clearbit.com/montraelectric.com" onError={(e) => { e.target.style.display = 'none'; }} className="xp-brand-logo-btn-icon" alt="Montra Electric" />
                                                        <span style={{ color: '#FFF' }}>Montra Electric</span>
                                                    </div>
                                                    <div className="xp-brand-logo-btn" style={{ borderColor: 'rgba(59, 130, 246, 0.2)', background: 'rgba(59, 130, 246, 0.05)' }}>
                                                        <img src="https://logo.clearbit.com/amperevehicles.com" onError={(e) => { e.target.style.display = 'none'; }} className="xp-brand-logo-btn-icon" alt="Ampere Electric" />
                                                        <span style={{ color: '#FFF' }}>Ampere Electric</span>
                                                    </div>
                                                    <div className="xp-brand-logo-btn" style={{ borderColor: 'rgba(59, 130, 246, 0.2)', background: 'rgba(59, 130, 246, 0.05)' }}>
                                                        <img src="https://logo.clearbit.com/lincolnpharma.com" onError={(e) => { e.target.style.display = 'none'; }} className="xp-brand-logo-btn-icon" alt="Lincoln Pharma" />
                                                        <span style={{ color: '#FFF' }}>Lincoln Pharma</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Right Side: High-fidelity Hyperlocal Targeting telemetry (demographic indicator) */}
                                        <div style={{ flex: '1', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', padding: '20px' }}>
                                            <div className="xp-floating-panel" style={{
                                                width: '100%',
                                                maxWidth: '340px',
                                                background: 'rgba(6, 6, 8, 0.65)',
                                                backdropFilter: 'blur(20px)',
                                                border: '1px solid rgba(59, 130, 246, 0.25)',
                                                borderRadius: '12px',
                                                padding: '24px',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: '20px',
                                                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)',
                                                position: 'relative',
                                                overflow: 'hidden'
                                            }}>
                                                {/* Header / Telemetry scanner active status */}
                                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                    <div style={{ color: '#3B82F6', fontWeight: '800', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '8px', letterSpacing: '1px', textTransform: 'uppercase' }}>
                                                        <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: '#3B82F6', boxShadow: '0 0 10px #3B82F6', animation: 'pulse 1.5s infinite' }}></span>
                                                        Hyperlocal Engine
                                                    </div>
                                                    <span style={{ fontSize: '0.65rem', color: 'rgba(255, 255, 255, 0.4)', fontFamily: 'monospace' }}>SYS_ACTIVE</span>
                                                </div>

                                                 {/* Toggle buttons for Videos / Posters */}
                                                 <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '12px' }}>
                                                     <button 
                                                         onClick={() => { setCreativeType('video'); setCreativeIdx(0); }} 
                                                         style={{ 
                                                             flex: 1, 
                                                             background: creativeType === 'video' ? 'rgba(59, 130, 246, 0.2)' : 'transparent', 
                                                             border: creativeType === 'video' ? '1px solid #3B82F6' : '1px solid rgba(255,255,255,0.1)', 
                                                             borderRadius: '6px', 
                                                             padding: '6px 12px', 
                                                             color: '#fff', 
                                                             fontSize: '0.7rem', 
                                                             fontWeight: '600', 
                                                             cursor: 'pointer',
                                                             transition: 'all 0.3s ease',
                                                             boxShadow: creativeType === 'video' ? '0 0 10px rgba(59, 130, 246, 0.3)' : 'none'
                                                         }}
                                                     >
                                                         Video Ads (9:16)
                                                     </button>
                                                     <button 
                                                         onClick={() => { setCreativeType('poster'); setCreativeIdx(0); }} 
                                                         style={{ 
                                                             flex: 1, 
                                                             background: creativeType === 'poster' ? 'rgba(59, 130, 246, 0.2)' : 'transparent', 
                                                             border: creativeType === 'poster' ? '1px solid #3B82F6' : '1px solid rgba(255,255,255,0.1)', 
                                                             borderRadius: '6px', 
                                                             padding: '6px 12px', 
                                                             color: '#fff', 
                                                             fontSize: '0.7rem', 
                                                             fontWeight: '600', 
                                                             cursor: 'pointer',
                                                             transition: 'all 0.3s ease',
                                                             boxShadow: creativeType === 'poster' ? '0 0 10px rgba(59, 130, 246, 0.3)' : 'none'
                                                         }}
                                                     >
                                                         Poster Ads (4:5)
                                                     </button>
                                                 </div>

                                                 {/* Interactive Creative Previewer Viewport */}
                                                 <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                                                     {(() => {
                                                         const currentCreative = creativeType === 'video' ? mockVideos[creativeIdx] : mockPosters[creativeIdx];
                                                         return (
                                                             <>
                                                                 <div style={{
                                                                     width: creativeType === 'video' ? '125px' : '150px',
                                                                     aspectRatio: creativeType === 'video' ? '9/16' : '4/5',
                                                                     background: currentCreative.bg,
                                                                     borderRadius: '12px',
                                                                     border: '2px solid rgba(255, 255, 255, 0.15)',
                                                                     boxShadow: '0 8px 24px rgba(0,0,0,0.6), inset 0 0 15px rgba(255,255,255,0.15)',
                                                                     position: 'relative',
                                                                     overflow: 'hidden',
                                                                     display: 'flex',
                                                                     flexDirection: 'column',
                                                                     justifyContent: 'center',
                                                                     alignItems: 'center',
                                                                     padding: '16px',
                                                                     transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                                                                 }}>
                                                                     {/* Creative Icon & Content */}
                                                                     <div style={{ textAlign: 'center' }}>
                                                                         <div style={{ fontSize: creativeType === 'video' ? '2rem' : '1.8rem', marginBottom: '8px', filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.3))' }}>
                                                                             {creativeType === 'video' ? currentCreative.icon : '✨'}
                                                                         </div>
                                                                         <h5 style={{ color: '#fff', fontSize: '0.8rem', fontWeight: '800', margin: '0 0 4px 0', textShadow: '0 2px 4px rgba(0,0,0,0.6)' }}>
                                                                             {currentCreative.title}
                                                                         </h5>
                                                                         <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.6rem', margin: 0, lineHeight: '1.3', textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>
                                                                             {creativeType === 'video' ? currentCreative.subtitle : currentCreative.desc}
                                                                         </p>
                                                                     </div>
                                                                 </div>

                                                                 {/* Creative arrow selector controls */}
                                                                 <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '4px' }}>
                                                                     <button 
                                                                         onClick={() => setCreativeIdx((prev) => (prev - 1 + 3) % 3)}
                                                                         style={{
                                                                             background: 'rgba(255,255,255,0.05)',
                                                                             border: '1px solid rgba(255,255,255,0.1)',
                                                                             borderRadius: '50%',
                                                                             width: '26px',
                                                                             height: '26px',
                                                                             display: 'flex',
                                                                             alignItems: 'center',
                                                                             justifyContent: 'center',
                                                                             color: '#fff',
                                                                             cursor: 'pointer',
                                                                             transition: 'all 0.2s',
                                                                         }}
                                                                         onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(59, 130, 246, 0.2)'; e.currentTarget.style.borderColor = '#3B82F6'; }}
                                                                         onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
                                                                     >
                                                                         <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" strokeWidth="2.5" fill="none"><polyline points="15 18 9 12 15 6"></polyline></svg>
                                                                     </button>

                                                                     <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.5)', fontFamily: 'monospace', fontWeight: 'bold', minWidth: '85px', textAlign: 'center' }}>
                                                                         CREATIVE {creativeIdx + 1}
                                                                     </span>

                                                                     <button 
                                                                         onClick={() => setCreativeIdx((prev) => (prev + 1) % 3)}
                                                                         style={{
                                                                             background: 'rgba(255,255,255,0.05)',
                                                                             border: '1px solid rgba(255,255,255,0.1)',
                                                                             borderRadius: '50%',
                                                                             width: '26px',
                                                                             height: '26px',
                                                                             display: 'flex',
                                                                             alignItems: 'center',
                                                                             justifyContent: 'center',
                                                                             color: '#fff',
                                                                             cursor: 'pointer',
                                                                             transition: 'all 0.2s',
                                                                         }}
                                                                         onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(59, 130, 246, 0.2)'; e.currentTarget.style.borderColor = '#3B82F6'; }}
                                                                         onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
                                                                     >
                                                                         <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" strokeWidth="2.5" fill="none"><polyline points="9 18 15 12 9 6"></polyline></svg>
                                                                     </button>
                                                                 </div>
                                                             </>
                                                         );
                                                     })()}
                                                 </div>

                                                {/* Location & Language Grid */}
                                                <div style={{
                                                    display: 'grid',
                                                    gridTemplateColumns: '1.2fr 0.8fr',
                                                    gap: '16px',
                                                    borderTop: '1px solid rgba(255,255,255,0.08)',
                                                    paddingTop: '16px'
                                                }}>
                                                    <div>
                                                        <span style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', display: 'block', letterSpacing: '0.8px', marginBottom: '4px' }}>Target Location</span>
                                                        <span style={{ fontSize: '1rem', color: '#FFF', fontWeight: '700', display: 'block' }}>{locations[locIdx].city}</span>
                                                    </div>
                                                    <div style={{ borderLeft: '1px solid rgba(255,255,255,0.1)', paddingLeft: '16px' }}>
                                                        <span style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', display: 'block', letterSpacing: '0.8px', marginBottom: '4px' }}>Local Dialect</span>
                                                        <span style={{ fontSize: '1rem', color: '#3B82F6', fontWeight: '800', display: 'block' }}>{locations[locIdx].lang}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* ─── WINDOW 2: Freelance (DaVinci Resolve Inspired) ─── */}
                            <div className="xp-interface-window xp-window-davinci reveal-item" data-theme="video">
                                <div className="xp-window-header">
                                    <div className="xp-window-controls"><span></span><span></span><span></span></div>
                                    <div className="xp-window-title">
                                        <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>
                                        Freelance_Edits.drp
                                    </div>
                                </div>
                                <div className="xp-window-body">
                                    <div className="xp-window-top">
                                        <div className="xp-media-pool">
                                            <h4><svg viewBox="0 0 24 24" width="13" height="13" stroke="currentColor" strokeWidth="2" fill="none" style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }}><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect><line x1="7" y1="2" x2="7" y2="22"></line><line x1="17" y1="2" x2="17" y2="22"></line><line x1="2" y1="12" x2="22" y2="12"></line></svg> Media Pool</h4>
                                            <div className="xp-pool-grid">
                                                <div className="xp-pool-item xp-pool-placeholder"><span>Drop media</span></div>
                                                <div className="xp-pool-item xp-pool-placeholder"><span>Drop media</span></div>
                                                <div className="xp-pool-item xp-pool-placeholder"><span>Drop media</span></div>
                                                <div className="xp-pool-item xp-pool-placeholder"><span>Drop media</span></div>
                                                <div className="xp-pool-item xp-pool-placeholder"><span>Drop media</span></div>
                                                <div className="xp-pool-item xp-pool-placeholder"><span>Drop media</span></div>
                                            </div>
                                        </div>
                                        <div className="xp-preview-monitor">
                                            <div className="xp-monitor-inner">
                                                <h3>Freelance Video Editor</h3>
                                                <p>Independent · Remote</p>
                                                <div className="xp-monitor-desc">
                                                    <p>Crafted cinematic edits, short-form storytelling, and motion-heavy social content for diverse digital platforms. Engineered customized workflows focusing on audience retention and high-fidelity output.</p>
                                                </div>
                                            </div>
                                            <div className="xp-monitor-controls">
                                                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none"><polygon points="11 19 2 12 11 5 11 19"></polygon><polygon points="22 19 13 12 22 5 22 19"></polygon></svg>
                                                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                                                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none"><polygon points="13 19 22 12 13 5 13 19"></polygon><polygon points="2 19 11 12 2 5 2 19"></polygon></svg>
                                            </div>
                                        </div>
                                        <div className="xp-inspector">
                                            <h4>
                                                <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none" style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }}><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                                                Inspector
                                            </h4>
                                            <div className="xp-slider-group">
                                                <label>Retention</label><div className="xp-slider"><div className="xp-slider-fill" style={{ width: '90%' }}></div></div>
                                            </div>
                                            <div className="xp-slider-group">
                                                <label>Cinematic</label><div className="xp-slider"><div className="xp-slider-fill" style={{ width: '85%' }}></div></div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* DaVinci-style multi-track timeline */}
                                    <div className="xp-window-timeline xp-dvr-timeline">
                                        <div className="xp-timeline-header">
                                            <span className="xp-tc">01:00:39:02</span>
                                            <div className="xp-dvr-tabs">
                                                <span>Media</span><span className="active">Edit</span><span>Color</span><span>Fairlight</span><span>Deliver</span>
                                            </div>
                                        </div>
                                        <div className="xp-dvr-tracks">
                                            <div className="xp-dvr-labels">
                                                <span>V4</span><span>V3</span><span>V2</span><span>V1</span><span>A1</span><span>A2</span><span>A3</span>
                                            </div>
                                            <div className="xp-dvr-track-area">
                                                <div className="xp-dvr-row"><div className="xp-clip xp-clip-gray" style={{ left: '8%', width: '4%' }}></div><div className="xp-clip xp-clip-gray" style={{ left: '14%', width: '3%' }}></div></div>
                                                <div className="xp-dvr-row"><div className="xp-clip xp-clip-purple" style={{ left: '30%', width: '12%' }}>TRI...</div><div className="xp-clip xp-clip-purple" style={{ left: '44%', width: '8%' }}>ap...</div><div className="xp-clip xp-clip-purple" style={{ left: '54%', width: '8%' }}>TRI-8</div></div>
                                                <div className="xp-dvr-row"><div className="xp-clip xp-clip-teal" style={{ left: '24%', width: '10%' }}>Tra...</div><div className="xp-clip xp-clip-teal" style={{ left: '36%', width: '8%' }}>Tex...</div><div className="xp-clip xp-clip-teal" style={{ left: '46%', width: '6%' }}>Inst</div><div className="xp-clip xp-clip-teal" style={{ left: '54%', width: '6%' }}>TRI-8</div></div>
                                                <div className="xp-dvr-row"><div className="xp-clip xp-clip-blue" style={{ left: '2%', width: '18%' }}>P100...</div><div className="xp-clip xp-clip-blue" style={{ left: '22%', width: '6%' }}>P1...</div><div className="xp-clip xp-clip-blue" style={{ left: '30%', width: '6%' }}>P100</div><div className="xp-clip xp-clip-blue" style={{ left: '38%', width: '6%' }}>P...</div><div className="xp-clip xp-clip-lblue" style={{ left: '46%', width: '18%' }}>Gradient BG</div><div className="xp-clip xp-clip-blue" style={{ left: '66%', width: '8%' }}>P1000141</div><div className="xp-clip xp-clip-blue" style={{ left: '76%', width: '20%' }}>P1000159</div></div>
                                                <div className="xp-dvr-row xp-dvr-audio"><div className="xp-clip xp-clip-agreen" style={{ left: '2%', width: '12%' }}></div><div className="xp-clip xp-clip-agreen" style={{ left: '76%', width: '20%' }}></div></div>
                                                <div className="xp-dvr-row xp-dvr-audio"><div className="xp-clip xp-clip-agreen" style={{ left: '16%', width: '8%' }}></div><div className="xp-clip xp-clip-agreen" style={{ left: '26%', width: '6%' }}></div><div className="xp-clip xp-clip-agreen" style={{ left: '34%', width: '4%' }}></div><div className="xp-clip xp-clip-agreen" style={{ left: '40%', width: '4%' }}></div><div className="xp-clip xp-clip-agreen" style={{ left: '46%', width: '4%' }}></div><div className="xp-clip xp-clip-agreen" style={{ left: '52%', width: '4%' }}></div><div className="xp-clip xp-clip-agreen" style={{ left: '58%', width: '6%' }}></div><div className="xp-clip xp-clip-agreen" style={{ left: '66%', width: '8%' }}></div></div>
                                                <div className="xp-dvr-row xp-dvr-audio"><div className="xp-clip xp-clip-dgreen" style={{ left: '2%', width: '12%' }}>Tri-8 Open</div><div className="xp-clip xp-clip-dgreen" style={{ left: '16%', width: '16%' }}>Gazing Out</div><div className="xp-clip xp-clip-dgreen" style={{ left: '34%', width: '30%' }}>All That Was</div><div className="xp-clip xp-clip-dgreen" style={{ left: '66%', width: '30%' }}>Fooled Again V2</div></div>
                                                <div className="xp-dvr-scrubber"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* ─── WINDOW 3: Snap AR (Lens Studio Inspired) ─── */}
                            <div className="xp-interface-window xp-window-lens reveal-item" data-theme="ar">
                                <div className="xp-window-header">
                                    <div className="xp-window-controls">
                                        <span></span><span></span><span></span>
                                    </div>
                                    <div className="xp-window-title">
                                        <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"></path><circle cx="12" cy="10" r="3"></circle><path d="M7 20.662V19c0-2.21 2.239-4 5-4s5 1.79 5 4v1.662"></path></svg>
                                        Snap_AR_Creator.lsproj
                                    </div>
                                </div>
                                <div className="xp-window-body">
                                    <div className="xp-window-sidebar xp-hierarchy">
                                        <div className="xp-snap-brand">
                                            <img src="https://upload.wikimedia.org/wikipedia/en/c/c4/Snapchat_logo.svg" alt="Snapchat" width="22" height="22" style={{ filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.5))' }} />
                                            <span className="xp-snap-brand-text">LENS STUDIO</span>
                                        </div>
                                        <h4>Objects</h4>
                                        <ul>
                                            <li>
                                                <div className="xp-hierarchy-item">
                                                    <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" strokeWidth="2" fill="none"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
                                                    <span>Camera</span>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="xp-hierarchy-item">
                                                    <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" strokeWidth="2" fill="none"><circle cx="12" cy="12" r="4"></circle><path d="M2 12h3M19 12h3M12 2v3M12 19v3"></path></svg>
                                                    <span>Face Mesh</span>
                                                </div>
                                                <span className="xp-yellow-dot"></span>
                                            </li>
                                            <li>
                                                <div className="xp-hierarchy-item">
                                                    <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" strokeWidth="2" fill="none"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline></svg>
                                                    <span>Holographic</span>
                                                </div>
                                                <span className="xp-yellow-dot"></span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="xp-window-main xp-3d-viewport">
                                        <div className="xp-snap-camera-frame">
                                            <div className="xp-snap-camera-inner">
                                                <svg viewBox="0 0 24 24" width="32" height="32" stroke="rgba(255,234,77,0.3)" strokeWidth="1.5" fill="none"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
                                                <span className="xp-snap-label">Lens Preview</span>
                                            </div>
                                            <div className="xp-snap-corner tl"></div>
                                            <div className="xp-snap-corner tr"></div>
                                            <div className="xp-snap-corner bl"></div>
                                            <div className="xp-snap-corner br"></div>
                                        </div>
                                        <div className="xp-viewport-overlay">
                                            <h3>Snap AR Lens Creator</h3>
                                            <p>Snap Inc. · Creator Program</p>
                                            <div className="xp-viewport-desc">
                                                <p>Pioneered interactive AR experiences through Snap's Lens Studio. Leveraged spatial computing and face-tracking to design immersive lenses.</p>
                                            </div>
                                        </div>
                                        <canvas className="xp-node-canvas" data-theme="ar-holographic"></canvas>
                                    </div>
                                    <div className="xp-window-sidebar xp-inspector">
                                        <h4>Components</h4>
                                        <div className="xp-comp-box">
                                            <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" strokeWidth="2" fill="none"><circle cx="12" cy="12" r="4"></circle><path d="M2 12h3M19 12h3"></path></svg>
                                            <span>Face Tracker</span>
                                        </div>
                                        <div className="xp-comp-box">
                                            <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" strokeWidth="2" fill="none"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline></svg>
                                            <span>GenAI Material</span>
                                        </div>
                                        <div className="xp-comp-box">
                                            <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" strokeWidth="2" fill="none"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
                                            <span>Script</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>
                {/* 8. Certifications */}
                <section id="certs">
                    <div className="container">
                        <div className="section-header text-center">
                            <h2 className="section-heading reveal-text" style={{ marginBottom: '10px' }}>Certifications</h2>
                        </div>
                        <div className="cert-grid reveal-item">
                            <div className="cert-card">
                                <div className="cert-logo-wrapper">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
                                        alt="Google Logo" className="cert-provider-logo"
                                        onError={(e) => { e.target.style.display = 'none'; e.target.nextElementSibling.style.display = 'flex'; }} />
                                    <div className="logo-fallback" style={{ display: 'none' }}>G</div>
                                </div>
                                <div className="cert-content">
                                    <div className="cert-main">
                                        <span>Google</span>
                                        <h4>AI Essentials</h4>
                                        <p>Specialized in generative AI workflows, prompt engineering, and ethical
                                            implementation.</p>
                                    </div>
                                    <div className="cert-footer">
                                        <a href="https://coursera.org/verify/professional-cert/FYMT0W2FGSDM" target="_blank"
                                            className="cert-btn">View Credential ↗</a>
                                    </div>
                                </div>
                                <div className="cert-bg-preview">
                                    <img src="assets/images/cert-google.png" alt="Google Certificate Preview" />
                                </div>
                            </div>

                            <div className="cert-card">
                                <div className="cert-logo-wrapper">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/e/ed/University_of_Michigan_Logo.png"
                                        alt="U-Michigan Logo" className="cert-provider-logo"
                                        onError={(e) => { e.target.style.display = 'none'; e.target.nextElementSibling.style.display = 'flex'; }} />
                                    <div className="logo-fallback" style={{ display: 'none' }}>M</div>
                                </div>
                                <div className="cert-content">
                                    <div className="cert-main">
                                        <span>University of Michigan</span>
                                        <h4>AI Basics and Tools for Creativity</h4>
                                        <p>Exploration of latent diffusion models and the intersection of creative research and
                                            AI.</p>
                                    </div>
                                    <div className="cert-footer">
                                        <a href="https://coursera.org/verify/O0S4GJF3H4BS" target="_blank" className="cert-btn">View
                                            Credential ↗</a>
                                    </div>
                                </div>
                                <div className="cert-bg-preview">
                                    <img src="assets/images/cert-michigan.png" alt="U-Michigan Certificate Preview" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>



                {/* 11. Contact Section */}
                <section id="contact">
                    <div className="container">
                        <div className="status-badge-container reveal-text">
                            <div className="status-badge">
                                <span className="status-dot"></span>
                                <span className="status-text">Open for Creative Opportunities</span>
                            </div>
                        </div>
                        <a href="mailto:hello@karthikgraj.in" className="contact-mail reveal-text">hello@karthikgraj.in</a>
                    </div>
                </section>

                <footer>
                    <div className="container">
                        <p>© 2026 KARTHIK G RAJ // GEN AI VISUAL DIRECTOR</p>
                    </div>
                </footer>
            </div>

        </main>

            {/* Immersive Sci-Fi Operating System Initialization Overlay */}
            {isInitializing && (
                <div className={`system-init-overlay ${initProgress === 100 ? 'fade-out' : ''}`}>
                    <div className="crt-flicker-overlay"></div>
                    <div className="init-grid"></div>
                    <div className="init-console">
                        <div className="console-header">
                            <span className="console-dot red"></span>
                            <span className="console-dot yellow"></span>
                            <span className="console-dot green"></span>
                            <span className="console-title">CREATIVE OS v4.10.0 // INITIALIZATION DIAGNOSTICS</span>
                        </div>
                        <div className="console-body">
                            <div className="diagnostics-logs">
                                {diagnosticLines.map((line, idx) => (
                                    <div key={idx} className="console-log-line reveal-line">
                                        {line}
                                    </div>
                                ))}
                            </div>
                            <div className="console-progress-section">
                                <div className="progress-label">SYSTEM LOADER: {initProgress}%</div>
                                <div className="progress-bar-track">
                                    <div className="progress-bar-fill" style={{ width: `${initProgress}%` }}>
                                        <div className="progress-bar-glow"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
