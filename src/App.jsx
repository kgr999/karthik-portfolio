import React, { useEffect, useState } from 'react';
import LightRays from './LightRays';
import ScrollStack, { ScrollStackItem } from './ScrollStack';
import { initPortfolio } from './portfolio-logic';
import ProfileCard from './ProfileCard';
import ContactPhysicsArena from './ContactPhysicsArena';


const mockVideos = [
    { id: 1, title: "Montra e-SCV Campaign", subtitle: "Best e-SCV", bg: "#000", videoSrc: "/assets/videos/montrascvmob.mp4" },
    { id: 2, title: "Ampere Nexus", subtitle: "Product Showdown", bg: "#000", videoSrc: "/assets/videos/amperemob.mp4" },
    { id: 3, title: "Super Auto", subtitle: "Emotive Storytelling", bg: "#000", videoSrc: "/assets/videos/montraelectricmob.mp4" }
];

const mockPosters = [
    { id: 1, title: "Montra e-SCV Poster", desc: "Hyperlocal campaign creative", bg: "#09090b", posterSrc: "/assets/images/montrascvposter.webp" },
    { id: 2, title: "Ampere Scooter Poster", desc: "Hyperlocal campaign creative", bg: "#09090b", posterSrc: "/assets/images/ampereposter.webp" },
    { id: 3, title: "Montra Electric Poster", desc: "Hyperlocal campaign creative", bg: "#09090b", posterSrc: "/assets/images/montraelectricposter.webp" }
];

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
        name: "CREATIVE DIRECTION",
        tools: [
            { name: "Storyboarding", svg: "storyboard", glow: "#faff00", level: "92%" },
            { name: "Narrative Design", svg: "narrative", glow: "#faff00", level: "95%" },
            { name: "Visual Storytelling", svg: "visual", glow: "#faff00", level: "94%" },
            { name: "Concept Development", svg: "concept", glow: "#faff00", level: "90%" }
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
            { name: "DaVinci Resolve", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/DaVinci_Resolve_Studio.png/250px-DaVinci_Resolve_Studio.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail", glow: "#ff6f3c", level: "90%", learning: true }
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
            case "Canva":
                return [
                    "🎨 DESIGN SUITE: CANVA_PRO",
                    "• vector layout: Dynamic grid system",
                    "• template: High-conversion social marketing layout",
                    "• brand kit: Karthik Portfolio guidelines active",
                    "• status: Creative layout render online"
                ];
            case "Adobe Express":
                return [
                    "🎨 DESIGN SUITE: ADOBE_EXPRESS",
                    "• cloud assets: Adobe Stock integrations bound",
                    "• quick actions: Background removal completed",
                    "• visual effects: Glassmorphic layers applied",
                    "• status: Frame rendering complete"
                ];
            case "ElevenLabs":
                return [
                    "🎵 AUDIO SYNTH: ELEVEN_LABS_V2",
                    "• voice model: Karthik Custom Voice Clone",
                    "• voice warmth: 1.15 over-boosted bass",
                    "• clarity ratio: 98.6% clean voice track",
                    "• status: Streaming audio frames..."
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
            case "Gen-4 Turbo":
                return [
                    "🎬 VIDEO GEN CORE: RUNWAY_GEN_4_TURBO",
                    "• speed: Instant latent video synthesis",
                    "• aspect ratio: 21:9 anamorphic master",
                    "• fidelity index: 98.4% temporal coherence",
                    "• status: Latent frame diffusion completed"
                ];
            case "Topaz":
                return [
                    "🖥️ POST ENGINE: TOPAZ_VIDEO_AI",
                    "• algorithm: Iris / Artemis AI Enhancer",
                    "• resolution upscale: 1080p to 4K cinematic",
                    "• frame interpolation: Apollo 60fps fluid motion",
                    "• status: Frame restoration processing..."
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
                "• role: Cinematic Human Storytelling Associate",
                "• style: Volumetric Blade Runner minimalism",
                "• status: Hover over a tool to view parameters"
            ];
        case "PLATFORMS & WORKFLOWS":
            return [
                "📡 GENERATIVE COMPILED ENVIRONMENT...",
                "• nodes: Fal, ComfyUI, Higgsfield, Runway",
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

export default function App() {
    const [locIdx, setLocIdx] = useState(0);
    const [creativeType, setCreativeType] = useState('video');
    const [creativeIdx, setCreativeIdx] = useState(0);
    const [hoveredTool, setHoveredTool] = useState(null);
    const [hoveredCategory, setHoveredCategory] = useState(null);
    const [likedCreatives, setLikedCreatives] = useState({});
    const [heartPulse, setHeartPulse] = useState(false);
    const [isVideoMuted, setIsVideoMuted] = useState(true);

    // DaVinci Timeline Scrubber controls
    const [dvrPlaying, setDvrPlaying] = useState(true);
    const [scrubberKey, setScrubberKey] = useState(0);
    const [dvrTime, setDvrTime] = useState({ hours: 1, minutes: 0, seconds: 39, frames: 2 });

    useEffect(() => {
        if (!dvrPlaying) return;

        const interval = setInterval(() => {
            setDvrTime(prev => {
                let nextFrames = prev.frames + 1;
                let nextSeconds = prev.seconds;
                let nextMinutes = prev.minutes;
                let nextHours = prev.hours;

                if (nextFrames >= 24) {
                    nextFrames = 0;
                    nextSeconds++;
                }
                if (nextSeconds >= 60) {
                    nextSeconds = 0;
                    nextMinutes++;
                }
                if (nextMinutes >= 60) {
                    nextMinutes = 0;
                    nextHours++;
                }
                return { hours: nextHours, minutes: nextMinutes, seconds: nextSeconds, frames: nextFrames };
            });
        }, 1000 / 24);

        return () => clearInterval(interval);
    }, [dvrPlaying]);

    // OS Initialization States
    const [isInitialized, setIsInitialized] = useState(false);
    const [isInitializing, setIsInitializing] = useState(false);
    const [initProgress, setInitProgress] = useState(0);

    // Hero AI Assistant Robot (Aero) states
    const [robotState, setRobotState] = useState('stage-spawn'); // 'stage-spawn', 'stage-wave', 'stage-blink', 'stage-point-look', 'stage-move', 'stage-idle'
    const [cloneStatus, setCloneStatus] = useState('loading'); // 'loading', 'active'
    const [midjourneyExpanded, setMidjourneyExpanded] = useState(false);
    const [seedanceExpanded, setSeedanceExpanded] = useState(false);

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



    const locations = [
        { city: "Bengaluru", lang: "Kannada" },
        { city: "Delhi", lang: "Hindi" },
        { city: "Mumbai", lang: "Marathi" },
        { city: "Chennai", lang: "Tamil" },
        { city: "Assam", lang: "Assamese" },
        { city: "Kerala", lang: "Malayalam" },
        { city: "Telangana", lang: "Telugu" },
        { city: "West Bengal", lang: "Bengali" }
    ];

    // Dynamic Audio Synthesizer: Cinematic power rise sound when loading starts
    const playLoadSound = () => {
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (!AudioContext) return;

            const ctx = new AudioContext();

            // Sub-bass warming sweep
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            const lowpass = ctx.createBiquadFilter();

            osc.type = 'triangle';
            osc.frequency.setValueAtTime(55, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(105, ctx.currentTime + 1.8);

            lowpass.type = 'lowpass';
            lowpass.frequency.setValueAtTime(110, ctx.currentTime);
            lowpass.frequency.exponentialRampToValueAtTime(450, ctx.currentTime + 1.8);

            gain.gain.setValueAtTime(0, ctx.currentTime);
            gain.gain.linearRampToValueAtTime(0.35, ctx.currentTime + 0.3);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.8);

            osc.connect(gain);
            gain.connect(lowpass);
            lowpass.connect(ctx.destination);

            osc.start(ctx.currentTime);
            osc.stop(ctx.currentTime + 1.9);
        } catch (e) {
            console.error("Web Audio API failed to play load sound", e);
        }
    };

    // Premium chord chime with delay feedback when loading completes
    const playFinishSound = () => {
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (!AudioContext) return;

            const ctx = new AudioContext();
            const now = ctx.currentTime;

            // Warm major 9th chord (F# Maj 9: F#, A#, C#, F, G#) -> extremely premium cinematic vibe
            const chord = [185.00, 233.08, 277.18, 349.23, 415.30];

            // Delay feedback node for holographic depth
            const delay = ctx.createDelay();
            delay.delayTime.value = 0.28;
            const delayGain = ctx.createGain();
            delayGain.gain.value = 0.32;

            delay.connect(delayGain);
            delayGain.connect(ctx.destination);
            delayGain.connect(delay);

            chord.forEach((freq, index) => {
                const osc = ctx.createOscillator();
                const oscHarmonic = ctx.createOscillator();
                const gain = ctx.createGain();
                const filter = ctx.createBiquadFilter();

                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq, now);

                oscHarmonic.type = 'triangle';
                oscHarmonic.frequency.setValueAtTime(freq * 2, now); // soft octave overtone

                filter.type = 'lowpass';
                filter.frequency.value = 1100;

                gain.gain.setValueAtTime(0, now);
                const noteTime = now + (index * 0.05); // staggered arpeggio sweep
                gain.gain.linearRampToValueAtTime(0.1, noteTime + 0.04);
                gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 2.2);

                osc.connect(filter);
                oscHarmonic.connect(filter);
                filter.connect(gain);

                gain.connect(ctx.destination);
                gain.connect(delay);

                osc.start(noteTime);
                osc.stop(noteTime + 2.5);
                oscHarmonic.start(noteTime);
                oscHarmonic.stop(noteTime + 2.5);
            });
        } catch (e) {
            console.error("Web Audio API failed to play finish sound", e);
        }
    };

    const handleInitialize = () => {
        if (isInitializing || isInitialized) return;
        setIsInitializing(true);
        setInitProgress(0);

        // Trigger cinematic power rise loading sound
        // playLoadSound();

        let currentProgress = 0;
        const totalDuration = 2200; // Fast, clean, sleek 2.2 seconds loading
        const stepTime = 30; // ms
        const steps = totalDuration / stepTime;
        const increment = 100 / steps;

        const interval = setInterval(() => {
            currentProgress += increment;
            if (currentProgress >= 100) {
                currentProgress = 100;
                clearInterval(interval);

                setInitProgress(100);

                // Trigger major 9th arpeggio resolution chime
                // playFinishSound();

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
            }
        }, stepTime);
    };

    const handleSkipIntro = () => {
        setIsInitialized(true);
        setIsInitializing(false);
        // Enable scroll
        document.body.style.overflow = '';
        if (window.lenis) {
            window.lenis.start();
            setTimeout(() => {
                window.lenis.resize();
            }, 150);
        }
        // Scroll to Creative Systems after boot-up completes
        setTimeout(() => {
            const capSection = document.getElementById('capabilities');
            if (capSection) {
                capSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            if (window.ScrollTrigger) {
                window.ScrollTrigger.refresh();
            }
        }, 100);
    };

    useEffect(() => {
        initPortfolio();
        const interval = setInterval(() => {
            setLocIdx((prev) => (prev + 1) % locations.length);
        }, 1500);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        // Prevent scroll until system is fully initialized on desktop, but allow mobile scroll fallback
        const isMobile = window.innerWidth <= 768;
        if (!isInitialized) {
            if (isMobile) {
                document.body.style.overflow = 'auto';
            } else {
                document.body.style.overflow = 'hidden';
            }
            if (window.lenis) {
                window.lenis.stop();
            }
        } else {
            document.body.style.overflow = '';
            if (window.lenis) {
                window.lenis.start();
                // Push recalculation to next render frame to allow height shifts to commit
                setTimeout(() => {
                    window.lenis.resize();
                }, 150);
            }
        }
    }, [isInitialized]);

    useEffect(() => {
        if (isInitialized) {
            const playAllVideos = () => {
                const videos = document.querySelectorAll('.cinema-video');
                videos.forEach(v => {
                    if (v.paused) {
                        v.play().catch(err => console.log("Autoplay check:", err));
                    }
                });
            };

            // Initial play check
            setTimeout(playAllVideos, 600);

            // Double check on scroll and touch actions to bypass mobile browser restrictions
            window.addEventListener('touchstart', playAllVideos, { once: true });
            window.addEventListener('scroll', playAllVideos);

            return () => {
                window.removeEventListener('touchstart', playAllVideos);
                window.removeEventListener('scroll', playAllVideos);
            };
        }
    }, [isInitialized]);

    return (
        <>
            <div className={isInitializing ? 'bg-grayscale' : ''} style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', pointerEvents: 'none', zIndex: -1, opacity: 0.45 }}>
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





            <nav className={`${isInitialized ? '' : 'nav-standby'} ${isInitializing ? 'bg-grayscale' : ''}`}>
                <div className="nav-inner">
                    <div className="logo-wrapper">
                        <a href="#" className="logo-text">KARTHIK G RAJ</a>
                    </div>
                    <div className="nav-links">
                        <a href="#self-visuals">Visuals</a>
                        <a href="#experience-journey">Experience</a>
                        <a href="#tech-stack">Skills</a>
                        <a href="#contact">Contact</a>
                    </div>
                    <div className="nav-actions">
                        <a href="/Karthik_G_Raj_Resume.pdf" className="resume-btn" target="_blank" rel="noopener noreferrer">Resume</a>
                        <button className="menu-toggle" aria-label="Toggle Menu">
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div className={`mobile-menu ${isInitialized ? '' : 'mobile-menu-standby'}`}>
                <div className="mobile-menu-inner">
                    <a href="#self-visuals" className="mobile-menu-link">Visuals</a>
                    <a href="#experience-journey" className="mobile-menu-link">Experience</a>
                    <a href="#tech-stack" className="mobile-menu-link">Skills</a>
                    <a href="#contact" className="mobile-menu-link">Contact</a>
                </div>
            </div>

            <main className={isInitializing ? 'bg-grayscale' : ''}>
                {/* 1. Hero Section — only shown before initialization */}
                {!isInitialized && (
                    <section id="hero" style={{ position: 'relative', overflow: 'hidden' }}>
                        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                             <div className="hero-grid">
                                <div className="hero-content">
                                    <p className="hero-label hero-reveal-text">Gen AI Creative Associate</p>
                                    <h1 className="hero-reveal-text">
                                        <span className="hero-word">Engineering</span><br />
                                        <span className="hero-word">Human</span> <span className="hero-word"><span>Attention.</span></span>
                                    </h1>
                                    <p className="hero-sub hero-reveal-text">
                                        AI, directed with human intent.
                                    </p>
                                    <div className="hero-cta hero-reveal-item desktop-only-cta" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: '32px' }}>
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', width: 'max-content' }}>
                                            <button className={`init-btn ${robotState === 'stage-idle' && !isInitializing && !isInitialized ? 'shimmering' : ''}`} onClick={handleInitialize}>
                                                <span className="init-btn-glow"></span>
                                                <span className="init-btn-sweep"></span>
                                                <span className="init-btn-loading-bar"></span>
                                                <span className="init-btn-status-node"></span>
                                                <span className="init-btn-text">ACCESS PORTFOLIO</span>
                                            </button>
                                            <button 
                                                onClick={handleSkipIntro}
                                                style={{
                                                    background: 'none',
                                                    border: 'none',
                                                    color: 'rgba(255, 255, 255, 0.45)',
                                                    fontSize: '0.78rem',
                                                    fontWeight: '600',
                                                    letterSpacing: '1.2px',
                                                    textTransform: 'uppercase',
                                                    cursor: 'pointer',
                                                    transition: 'color 0.2s, transform 0.2s',
                                                    textDecoration: 'underline',
                                                    textUnderlineOffset: '4px'
                                                }}
                                                onMouseEnter={(e) => { e.currentTarget.style.color = '#3B82F6'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                                                onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255, 255, 255, 0.45)'; e.currentTarget.style.transform = 'none'; }}
                                            >
                                                Skip Intro
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="hero-avatar-wrapper">
                                    <ProfileCard videoSrc="/assets/videos/0kar-avatar.mov" cloneStatus={cloneStatus} />
                                </div>
                                <div className="hero-cta hero-reveal-item mobile-only-cta" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px' }}>
                                    <button className={`init-btn ${robotState === 'stage-idle' && !isInitializing && !isInitialized ? 'shimmering' : ''}`} onClick={handleInitialize}>
                                        <span className="init-btn-glow"></span>
                                        <span className="init-btn-sweep"></span>
                                        <span className="init-btn-loading-bar"></span>
                                        <span className="init-btn-status-node"></span>
                                        <span className="init-btn-text">ACCESS PORTFOLIO</span>
                                    </button>
                                    <button 
                                        onClick={handleSkipIntro}
                                        style={{
                                            background: 'none',
                                            border: 'none',
                                            color: 'rgba(255, 255, 255, 0.45)',
                                            fontSize: '0.78rem',
                                            fontWeight: '600',
                                            letterSpacing: '1.2px',
                                            textTransform: 'uppercase',
                                            cursor: 'pointer',
                                            textDecoration: 'underline',
                                            textUnderlineOffset: '4px'
                                        }}
                                    >
                                        Skip Intro
                                    </button>
                                </div>
                            </div>

                            {/* Hero AI Assistant Robot Aero */}
                            <div className={`aero-hero-robot ${robotState}`}>
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
                                            <div className="aero-eye left"></div>
                                            <div className="aero-eye right"></div>
                                        </div>
                                        <div className="aero-ears">
                                            <div className="aero-ear left"></div>
                                            <div className="aero-ear right"></div>
                                        </div>
                                    </div>

                                    {/* Left Arm */}
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
                                    <div className="cap-image-wrapper aspect-16-9">
                                        {/* Floating Numbering Badge */}
                                        <div className="cap-media-badge-left">
                                            <span className="cap-dot-indicator pulse-blue"></span>
                                            <span className="cap-num">01</span>
                                        </div>
                                        <img className="cap-color-image" src="assets/images/capdirector.webp" alt="AI Creative Direction" />
                                    </div>

                                    <div className="cap-card-body">
                                        <h3 className="cap-title">AI Creative Direction</h3>
                                        <div className="cap-focus-tags">
                                            <span className="cap-focus-tag">Multimodal AI</span>
                                            <span className="cap-focus-tag">Cinematic Worldbuilding</span>
                                        </div>
                                    </div>
                                </div>

                                {/* 2. Content Research & Strategy */}
                                <div className="cap-card-v2">
                                    <div className="cap-image-wrapper aspect-16-9">
                                        {/* Floating Numbering Badge */}
                                        <div className="cap-media-badge-left">
                                            <span className="cap-dot-indicator"></span>
                                            <span className="cap-num">02</span>
                                        </div>
                                        <img className="cap-color-image" src="assets/images/capstoryboarding.webp" alt="Content Research & Styling" />
                                    </div>

                                    <div className="cap-card-body">
                                        <h3 className="cap-title">Content Research & Styling</h3>
                                        <div className="cap-focus-tags">
                                            <span className="cap-focus-tag">Audience Insights</span>
                                            <span className="cap-focus-tag">Data Analytics</span>
                                        </div>
                                    </div>
                                </div>

                                {/* 3. Character Building */}
                                <div className="cap-card-v2">
                                    <div className="cap-image-wrapper aspect-16-9">
                                        {/* Floating Numbering Badge */}
                                        <div className="cap-media-badge-left">
                                            <span className="cap-dot-indicator"></span>
                                            <span className="cap-num">03</span>
                                        </div>
                                        <img className="cap-color-image" src="assets/images/capcharbuilding.webp" alt="Character Building" />
                                    </div>

                                    <div className="cap-card-body">
                                        <h3 className="cap-title">Character Building</h3>
                                        <div className="cap-focus-tags">
                                            <span className="cap-focus-tag">Multi-Shot Continuity</span>
                                            <span className="cap-focus-tag">Asset Locking</span>
                                        </div>
                                    </div>
                                </div>

                                {/* 4. Storyboarding & Pre-Visuals */}
                                <div className="cap-card-v2">
                                    <div className="cap-image-wrapper natural-fit">
                                        {/* Floating Numbering Badge */}
                                        <div className="cap-media-badge-left">
                                            <span className="cap-dot-indicator"></span>
                                            <span className="cap-num">04</span>
                                        </div>
                                        <img className="cap-color-image" src="assets/images/storyboarding.webp" alt="Storyboarding & Pre-Visuals" />
                                    </div>

                                    <div className="cap-card-body">
                                        <h3 className="cap-title">Storyboarding & Pre-Visuals</h3>
                                        <div className="cap-focus-tags">
                                            <span className="cap-focus-tag">Sequenced Layouts</span>
                                            <span className="cap-focus-tag">Shot Design</span>
                                        </div>
                                    </div>
                                </div>

                                {/* 5. Visual Storytelling */}
                                <div className="cap-card-v2">
                                    <div className="cap-image-wrapper aspect-16-9">
                                        {/* Floating Numbering Badge */}
                                        <div className="cap-media-badge-left">
                                            <span className="cap-dot-indicator"></span>
                                            <span className="cap-num">05</span>
                                        </div>
                                        <video className="cap-color-image" src="assets/videos/storyboardingoutput.mp4" loop muted playsInline autoPlay></video>
                                    </div>

                                    <div className="cap-card-body">
                                        <h3 className="cap-title">Visual Storytelling</h3>
                                        <div className="cap-focus-tags">
                                            <span className="cap-focus-tag">Composition</span>
                                            <span className="cap-focus-tag">Dramatic lighting and pacing</span>
                                        </div>
                                    </div>
                                </div>

                                {/* 6. AI Audio & Narration Design */}
                                <div className="cap-card-v2">
                                    <div className="cap-image-wrapper aspect-16-9">
                                        {/* Floating Numbering Badge */}
                                        <div className="cap-media-badge-left">
                                            <span className="cap-dot-indicator"></span>
                                            <span className="cap-num">06</span>
                                        </div>
                                        <img className="cap-color-image" src="assets/images/capaudio.webp" alt="AI Audio & Narration Design" />
                                    </div>

                                    <div className="cap-card-body">
                                        <h3 className="cap-title">AI Audio & Narration Design</h3>
                                        <div className="cap-focus-tags">
                                            <span className="cap-focus-tag">Voice Cloning</span>
                                            <span className="cap-focus-tag">Sound FX Layer</span>
                                        </div>
                                    </div>
                                </div>

                                {/* 7. Cinematic Video Editing */}
                                <div className="cap-card-v2">
                                    <div className="cap-image-wrapper aspect-16-9">
                                        {/* Floating Numbering Badge */}
                                        <div className="cap-media-badge-left">
                                            <span className="cap-dot-indicator"></span>
                                            <span className="cap-num">07</span>
                                        </div>
                                        <img className="cap-color-image" src="assets/images/capvideo.webp" alt="Cinematic Video Editing" />
                                    </div>

                                    <div className="cap-card-body">
                                        <h3 className="cap-title">Video Editing (Intermediate)</h3>
                                        <div className="cap-focus-tags">
                                            <span className="cap-focus-tag">Pacing & Rhythm</span>
                                            <span className="cap-focus-tag">Narrative Flow</span>
                                        </div>
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
                            <div className="cinema-grid reveal-item" style={{ gap: '20px', marginTop: '40px' }}>
                                {/* Top Ultrawide Video */}
                                <div className="cinema-card ultrawide" data-glow="#A78BFA">
                                    <div className="cinema-video-wrapper">
                                        <video className="cinema-video" src="assets/videos/helicopter.mp4" loop muted playsInline
                                            autoPlay></video>
                                        <div className="cinema-overlay">
                                            <span className="cinema-badge">
                                                <span className="badge-dot" style={{ background: '#A78BFA', boxShadow: '0 0 8px #A78BFA' }}></span>
                                                Gen-4 Turbo
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Existing 16:9 Videos */}
                                <div className="cinema-card" data-glow="#4DA3FF">
                                    <div className="cinema-video-wrapper">
                                        <video className="cinema-video" src="assets/videos/isro.mov" loop muted playsInline
                                            autoPlay></video>
                                        <div className="cinema-overlay">
                                            <span className="cinema-badge">
                                                <span className="badge-dot" style={{ background: '#00f0ff', boxShadow: '0 0 8px #00f0ff' }}></span>
                                                Kling V3 Pro
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="cinema-card" data-glow="#93C5FD">
                                    <div className="cinema-video-wrapper">
                                        <video className="cinema-video" src="assets/videos/underwater.mp4" loop muted playsInline
                                            autoPlay></video>
                                        <div className="cinema-overlay">
                                            <span className="cinema-badge">
                                                <span className="badge-dot" style={{ background: '#93C5FD', boxShadow: '0 0 8px #93C5FD' }}></span>
                                                Seedance 2.0
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Bottom Ultrawide Video */}
                                <div className="cinema-card ultrawide" data-glow="#F87171">
                                    <div className="cinema-video-wrapper">
                                        <video className="cinema-video" src="assets/videos/supra.mp4" loop muted playsInline
                                            autoPlay></video>
                                        <div className="cinema-overlay">
                                            <span className="cinema-badge">
                                                <span className="badge-dot" style={{ background: '#F87171', boxShadow: '0 0 8px #F87171' }}></span>
                                                Gen-4 Turbo
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>


                    {/* 4.6. Cinematic Prompting Section */}
                    <section id="cinematic-prompting">
                        <div className="container">
                            <div className="section-header text-center">
                                <h2 className="section-heading reveal-text" style={{ marginBottom: '10px' }}>Cinematic Prompting</h2>
                            </div>

                            <div className="prompting-grid reveal-item">
                                {/* Midjourney Image Column */}
                                <div className="prompting-card-wrapper">
                                    <div className="cinema-card" data-glow="#8B5CF6" style={{ width: '100%' }}>
                                        <div className="cinema-video-wrapper">
                                            <img className="cinema-video" src="assets/images/midjouneycinematic.webp" alt="Midjourney Cinematic Prompting" style={{ objectPosition: 'center' }} />
                                            <div className="cinema-overlay">
                                                <span className="cinema-badge">
                                                    <span className="badge-dot" style={{ background: '#8B5CF6', boxShadow: '0 0 8px #8B5CF6' }}></span>
                                                    Midjourney v6
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="prompt-details-box">
                                        <h3 className="prompt-tool-title">2010s Cyberpunk Film</h3>
                                        <div className={`prompt-code-panel ${midjourneyExpanded ? 'expanded' : 'collapsed'}`} style={{ '--prompt-accent': '#8B5CF6' }}>
                                            <div className="prompt-code-header">
                                                <span>PROMPT COMMAND</span>
                                                <div className="prompt-actions">
                                                    <span className="prompt-toggle-btn" onClick={() => setMidjourneyExpanded(!midjourneyExpanded)}>
                                                        {midjourneyExpanded ? 'Show Less' : 'Show More'}
                                                    </span>
                                                    <span className="prompt-action-divider">|</span>
                                                    <span className="prompt-copy-btn" onClick={(e) => {
                                                        navigator.clipboard.writeText('Grounded 2010s cyberpunk film. Inside a moving futuristic train, daytime. A teenage boy and girl sit together in front of a large window, static medium shot, eye level, 50mm anamorphic lens. The girl stares blankly toward camera with a distant expression; the boy sits quietly beside her, looking slightly downward. Short dark hair loosely frames her face in soft daylight. Both wear layered casual streetwear worn jackets, muted urban colors. Posture is quiet and emotionally detached. Behind them, the window reveals a dense futuristic city rushing past: packed skyscrapers, stacked apartments, holographic ads, elevated transit lines, reflective glass, distant flying vehicles slightly out of focus with motion blur and atmospheric haze. Interior features metallic panels, overhead strip lights, fabric seats, reflective handrails. ARRI Alexa Mini LF, soft digital grain, shallow depth of field, restrained contrast, cool gray shadows. --ar 16:9 --raw --profile karthikgraj --v 6');
                                                        const orig = e.target.textContent;
                                                        e.target.textContent = 'COPIED!';
                                                        setTimeout(() => { e.target.textContent = orig; }, 2000);
                                                    }}>Copy</span>
                                                </div>
                                            </div>
                                            <div className="prompt-code-body">
                                                <code className="prompt-code-text">
                                                    Grounded 2010s cyberpunk film. Inside a moving futuristic train, daytime. A teenage boy and girl sit together in front of a large window, static medium shot, eye level, 50mm anamorphic lens. The girl stares blankly toward camera with a distant expression; the boy sits quietly beside her, looking slightly downward. Short dark hair loosely frames her face in soft daylight. Both wear layered casual streetwear worn jackets, muted urban colors. Posture is quiet and emotionally detached. Behind them, the window reveals a dense futuristic city rushing past: packed skyscrapers, stacked apartments, holographic ads, elevated transit lines, reflective glass, distant flying vehicles slightly out of focus with motion blur and atmospheric haze. Interior features metallic panels, overhead strip lights, fabric seats, reflective handrails. ARRI Alexa Mini LF, soft digital grain, shallow depth of field, restrained contrast, cool gray shadows. --ar 16:9 --raw --profile karthikgraj --v 6
                                                </code>
                                                {!midjourneyExpanded && <div className="prompt-code-fade"></div>}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Seedance Video Column */}
                                <div className="prompting-card-wrapper">
                                    <div className="cinema-card" data-glow="#00F0FF" style={{ width: '100%' }}>
                                        <div className="cinema-video-wrapper">
                                            <video className="cinema-video" src="assets/videos/midseedance.mp4" loop muted playsInline autoPlay></video>
                                            <div className="cinema-overlay">
                                                <span className="cinema-badge">
                                                    <span className="badge-dot" style={{ background: '#00F0FF', boxShadow: '0 0 8px #00F0FF' }}></span>
                                                    Seedance 2.0
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="prompt-details-box">
                                        <h3 className="prompt-tool-title">Rain Chase</h3>
                                        <div className={`prompt-code-panel ${seedanceExpanded ? 'expanded' : 'collapsed'}`} style={{ '--prompt-accent': '#00F0FF' }}>
                                            <div className="prompt-code-header">
                                                <span>MOTION DIRECTIVE</span>
                                                <div className="prompt-actions">
                                                    <span className="prompt-toggle-btn" onClick={() => setSeedanceExpanded(!seedanceExpanded)}>
                                                        {seedanceExpanded ? 'Show Less' : 'Show More'}
                                                    </span>
                                                    <span className="prompt-action-divider">|</span>
                                                    <span className="prompt-copy-btn" onClick={(e) => {
                                                        navigator.clipboard.writeText('A high-speed car chase on a rain-drenched highway at night. Two muscle cars weave through heavy traffic at 140mph, headlights slicing through the downpour. One car clips a semi-truck sending sparks showering across six lanes. The camera is mounted on the hood of the lead car, rain hammering the lens. Neon highway signs blur overhead. The pursuing car fishtails through a gap between two buses. Tires hydroplane on standing water. Hyper-realistic, motion blur, reflections on wet asphalt, 8k, Michael Mann cinematography.');
                                                        const orig = e.target.textContent;
                                                        e.target.textContent = 'COPIED!';
                                                        setTimeout(() => { e.target.textContent = orig; }, 2000);
                                                    }}>Copy</span>
                                                </div>
                                            </div>
                                            <div className="prompt-code-body">
                                                <code className="prompt-code-text">
                                                    A high-speed car chase on a rain-drenched highway at night. Two muscle cars weave through heavy traffic at 140mph, headlights slicing through the downpour. One car clips a semi-truck sending sparks showering across six lanes. The camera is mounted on the hood of the lead car, rain hammering the lens. Neon highway signs blur overhead. The pursuing car fishtails through a gap between two buses. Tires hydroplane on standing water. Hyper-realistic, motion blur, reflections on wet asphalt, 8k, Michael Mann cinematography.
                                                </code>
                                                {!seedanceExpanded && <div className="prompt-code-fade"></div>}
                                            </div>
                                        </div>
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
                                        <img src="assets/images/n1.webp" alt="Neural Frontiers - Shot 1" className="visual-image" />
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
                                            margin: 0,
                                            boxShadow: '0 20px 45px rgba(0, 0, 0, 0.5)'
                                        }}>
                                            <img src="assets/images/n2.webp" alt="Neural Frontiers - Shot 2" className="visual-image" style={{ width: '100%', height: 'auto', display: 'block' }} />
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
                                            <div className="xp-sidebar-brand" style={{ paddingBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <div style={{ width: '130px', height: '34px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    <img
                                                        src="/assets/images/admitra.png"
                                                        alt="AdMitra Logo"
                                                        style={{ width: '130px', height: '130px', objectFit: 'contain', display: 'block', opacity: 0.95 }}
                                                    />
                                                </div>
                                                <svg viewBox="0 0 24 24" width="16" height="16" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="2.5" fill="none" style={{ cursor: 'pointer', marginRight: '4px', transition: 'stroke 0.2s' }} onMouseEnter={(e) => e.currentTarget.setAttribute('stroke', '#fff')} onMouseLeave={(e) => e.currentTarget.setAttribute('stroke', 'rgba(255, 255, 255, 0.4)')}>
                                                    <polyline points="15 18 9 12 15 6"></polyline>
                                                </svg>
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
                                                        {/* Mobile-only inline logo (visible when sidebar hidden) */}
                                                        <div className="xp-mobile-logo" style={{ display: 'none', justifyContent: 'center', marginBottom: '12px' }}>
                                                            <div style={{ width: '120px', height: '32px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                                <img
                                                                    src="/assets/images/admitra.png"
                                                                    alt="AdMitra Logo"
                                                                    style={{ width: '120px', height: '120px', objectFit: 'contain', display: 'block', opacity: 0.95 }}
                                                                />
                                                            </div>
                                                        </div>
                                                        <h3 style={{ fontSize: '1.75rem', fontWeight: '800', color: '#fff', marginBottom: '6px' }}>Generative AI Intern</h3>
                                                        <p style={{ fontSize: '0.85rem', color: '#3B82F6', fontFamily: 'monospace', fontWeight: '600' }}>
                                                            Bengaluru · AdMitra Pvt. Ltd. &nbsp;&nbsp; <span className="xp-date-shimmer">February 2026 – May 2026</span>
                                                        </p>
                                                    </div>
                                                    <div className="xp-main-desc" style={{ fontSize: '0.9rem', lineHeight: '1.6', color: 'rgba(255,255,255,0.75)', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                                                        <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                                                            <div style={{
                                                                background: 'rgba(59, 130, 246, 0.1)',
                                                                border: '1px solid rgba(59, 130, 246, 0.3)',
                                                                borderRadius: '50%',
                                                                width: '22px',
                                                                height: '22px',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                flexShrink: 0,
                                                                marginTop: '2px',
                                                                boxShadow: '0 0 10px rgba(59, 130, 246, 0.15)'
                                                            }}>
                                                                <span style={{ color: '#3B82F6', fontSize: '0.75rem', fontWeight: 'bold' }}>✦</span>
                                                            </div>
                                                            <p style={{ margin: 0, color: 'rgba(255, 255, 255, 0.85)', fontSize: '0.9rem', lineHeight: '1.5' }}>
                                                                Led end-to-end <strong style={{ color: '#3B82F6', fontWeight: '600' }}>AI-powered creative operations</strong> for hyperlocal advertising campaigns across video and poster formats at scale. Translated brand strategy into structured storyboards, localized narratives, and <strong style={{ color: '#3B82F6', fontWeight: '600' }}>multi-language AI-generated campaign assets</strong>.
                                                            </p>
                                                        </div>

                                                        <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                                                            <div style={{
                                                                background: 'rgba(59, 130, 246, 0.1)',
                                                                border: '1px solid rgba(59, 130, 246, 0.3)',
                                                                borderRadius: '50%',
                                                                width: '22px',
                                                                height: '22px',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                flexShrink: 0,
                                                                marginTop: '2px',
                                                                boxShadow: '0 0 10px rgba(59, 130, 246, 0.15)'
                                                            }}>
                                                                <span style={{ color: '#3B82F6', fontSize: '0.75rem', fontWeight: 'bold' }}>✦</span>
                                                            </div>
                                                            <p style={{ margin: 0, color: 'rgba(255, 255, 255, 0.85)', fontSize: '0.9rem', lineHeight: '1.5' }}>
                                                                Managed high-volume creative production workflows delivering <strong style={{ color: '#3B82F6', fontWeight: '600' }}>100+ localized creatives monthly</strong>. Collaborated directly with founders and brand stakeholders to <strong style={{ color: '#3B82F6', fontWeight: '600' }}>streamline campaign execution</strong>.
                                                            </p>
                                                        </div>
                                                    </div>

                                                    {/* Key Campaign Clients block for desktop */}
                                                    <div className="xp-client-brands xp-clients-desktop" style={{ width: '100%', maxWidth: '340px', marginTop: '25px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                                                        <p className="xp-brands-title" style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '1.5px', marginBottom: '10px' }}>
                                                            KEY CAMPAIGN CLIENTS
                                                        </p>
                                                        <div className="xp-brands-logos">
                                                            <div className="xp-brand-logo-btn xp-brand-montra">
                                                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '24px', height: '24px', background: 'rgba(255,255,255,0.05)', borderRadius: '6px', padding: '4px', overflow: 'hidden', position: 'relative' }}>
                                                                    <img
                                                                        src="/assets/images/montra_logo.png"
                                                                        onError={(e) => {
                                                                            if (!e.target.dataset.triedFallback) {
                                                                                e.target.dataset.triedFallback = 'true';
                                                                                e.target.src = "https://www.google.com/s2/favicons?domain=montraelectric.com&sz=128";
                                                                            } else {
                                                                                e.target.style.display = 'none';
                                                                                if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
                                                                            }
                                                                        }}
                                                                        className="xp-brand-logo-btn-icon"
                                                                        alt="Montra Electric"
                                                                        style={{ width: '100%', height: '100%', objectFit: 'contain', zIndex: 2 }}
                                                                    />
                                                                    <div className="xp-logo-fallback-text" style={{ display: 'none', position: 'absolute', inset: 0, alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: '800', color: '#FF334B', zIndex: 1 }}>
                                                                        M
                                                                    </div>
                                                                </div>
                                                                <span style={{ fontSize: '0.85rem', fontWeight: '600' }}>Montra Electric</span>
                                                            </div>
                                                            <div className="xp-brand-logo-btn xp-brand-ampere">
                                                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '24px', height: '24px', background: 'rgba(255,255,255,0.05)', borderRadius: '6px', padding: '4px', overflow: 'hidden', position: 'relative' }}>
                                                                    <img
                                                                        src="/assets/images/ampere_logo.png"
                                                                        onError={(e) => {
                                                                            if (!e.target.dataset.triedFallback) {
                                                                                e.target.dataset.triedFallback = 'true';
                                                                                e.target.src = "https://www.google.com/s2/favicons?domain=amperevehicles.com&sz=128";
                                                                            } else {
                                                                                e.target.style.display = 'none';
                                                                                if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
                                                                            }
                                                                        }}
                                                                        className="xp-brand-logo-btn-icon"
                                                                        alt="Ampere"
                                                                        style={{ width: '100%', height: '100%', objectFit: 'contain', zIndex: 2 }}
                                                                    />
                                                                    <div className="xp-logo-fallback-text" style={{ display: 'none', position: 'absolute', inset: 0, alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: '800', color: '#00FFF0', zIndex: 1 }}>
                                                                        A
                                                                    </div>
                                                                </div>
                                                                <span style={{ fontSize: '0.85rem', fontWeight: '600' }}>Ampere</span>
                                                            </div>
                                                            <div className="xp-brand-logo-btn xp-brand-lincoln-pharma">
                                                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '24px', height: '24px', background: 'rgba(255,255,255,0.05)', borderRadius: '6px', padding: '4px', overflow: 'hidden', position: 'relative' }}>
                                                                    <img
                                                                        src="/assets/images/lincoln_logo.png"
                                                                        onError={(e) => {
                                                                            if (!e.target.dataset.triedFallback) {
                                                                                e.target.dataset.triedFallback = 'true';
                                                                                e.target.src = "https://www.google.com/s2/favicons?domain=lincolnpharma.com&sz=128";
                                                                            } else {
                                                                                e.target.style.display = 'none';
                                                                                if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
                                                                            }
                                                                        }}
                                                                        className="xp-brand-logo-btn-icon"
                                                                        alt="Lincoln Pharma"
                                                                        style={{ width: '100%', height: '100%', objectFit: 'contain', zIndex: 2 }}
                                                                    />
                                                                    <div className="xp-logo-fallback-text" style={{ display: 'none', position: 'absolute', inset: 0, alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: '800', color: '#4ade80', zIndex: 1 }}>
                                                                        L
                                                                    </div>
                                                                </div>
                                                                <span style={{ fontSize: '0.85rem', fontWeight: '600' }}>Lincoln Pharma</span>
                                                            </div>
                                                            <div className="xp-brand-logo-btn xp-brand-ekotejas">
                                                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '24px', height: '24px', background: 'rgba(255,255,255,0.05)', borderRadius: '6px', padding: '4px', overflow: 'hidden', position: 'relative' }}>
                                                                    <img
                                                                        src="https://ekotejas.in/wp-content/uploads/2023/06/Group-1941.png"
                                                                        onError={(e) => {
                                                                            if (!e.target.dataset.triedFallback) {
                                                                                e.target.dataset.triedFallback = 'true';
                                                                                e.target.src = "https://www.google.com/s2/favicons?domain=ekotejas.com&sz=128";
                                                                            } else {
                                                                                e.target.style.display = 'none';
                                                                                if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
                                                                            }
                                                                        }}
                                                                        className="xp-brand-logo-btn-icon"
                                                                        alt="EkoTejas"
                                                                        style={{ width: '100%', height: '100%', objectFit: 'contain', zIndex: 2 }}
                                                                    />
                                                                    <div className="xp-logo-fallback-text" style={{ display: 'none', position: 'absolute', inset: 0, alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: '800', color: '#3B82F6', zIndex: 1 }}>
                                                                        E
                                                                    </div>
                                                                </div>
                                                                <span style={{ fontSize: '0.85rem', fontWeight: '600' }}>EkoTejas</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>

                                            {/* Right Side: High-fidelity Hyperlocal Targeting telemetry (demographic indicator) */}
                                            <div style={{ flex: '1', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '20px', padding: '20px' }}>
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
                                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <div style={{ color: '#3B82F6', fontWeight: '800', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '8px', letterSpacing: '1px', textTransform: 'uppercase' }}>
                                                            <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: '#10B981', boxShadow: '0 0 10px #10B981', animation: 'pulse 1.5s infinite' }}></span>
                                                            Hyperlocal Engine
                                                        </div>
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
                                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', width: '100%' }}>
                                                        {(() => {
                                                            const currentCreative = creativeType === 'video' ? mockVideos[creativeIdx] : mockPosters[creativeIdx];
                                                            const key = `${creativeType}-${creativeIdx}`;
                                                            const isLiked = !!likedCreatives[key];
                                                            const handleDoubleTap = () => {
                                                                setLikedCreatives(prev => ({
                                                                    ...prev,
                                                                    [key]: true
                                                                }));
                                                                setHeartPulse(true);
                                                                setTimeout(() => {
                                                                    setHeartPulse(false);
                                                                }, 700);
                                                            };
                                                            const handleLikeClick = (e) => {
                                                                e.stopPropagation();
                                                                setLikedCreatives(prev => ({
                                                                    ...prev,
                                                                    [key]: !prev[key]
                                                                }));
                                                            };
                                                            return (
                                                                <>
                                                                    {/* Horizontal layout: Prev Button | Viewport | Next Button */}
                                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', justifyContent: 'center', width: '100%' }}>
                                                                        {/* Previous Button */}
                                                                        <button
                                                                            onClick={() => setCreativeIdx((prev) => (prev - 1 + 3) % 3)}
                                                                            aria-label="Previous Creative"
                                                                            className="xp-arrow-nav-btn prev-btn"
                                                                        >
                                                                            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2.5" fill="none"><polyline points="15 18 9 12 15 6"></polyline></svg>
                                                                        </button>

                                                                        {/* High-Fidelity Device Simulator Viewport */}
                                                                        <div
                                                                            className="sim-device-viewport"
                                                                            onDoubleClick={handleDoubleTap}
                                                                            style={{
                                                                                width: '185px',
                                                                                aspectRatio: '9/16',
                                                                                background: '#09090b',
                                                                                borderRadius: '24px',
                                                                                border: '3px solid #222228',
                                                                                boxShadow: '0 20px 45px rgba(0,0,0,0.8), inset 0 0 20px rgba(255,255,255,0.05)',
                                                                                position: 'relative',
                                                                                overflow: 'hidden',
                                                                                display: 'flex',
                                                                                flexDirection: 'column',
                                                                                justifyContent: 'flex-start',
                                                                                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                                                                                flexShrink: 0
                                                                            }}
                                                                        >
                                                                            {/* Anti-bleed internal background gradient layer */}
                                                                            <div
                                                                                style={{
                                                                                    position: 'absolute',
                                                                                    inset: '0px',
                                                                                    background: creativeType === 'video' ? currentCreative.bg : '#09090b',
                                                                                    borderRadius: '21px',
                                                                                    zIndex: 0,
                                                                                    pointerEvents: 'none'
                                                                                }}
                                                                            />
                                                                            {/* Status Bar */}
                                                                            <div className="sim-device-header">
                                                                                <div className="sim-status-bar-left">{simTime}</div>
                                                                                <div className="sim-device-notch"></div>
                                                                                <div className="sim-status-bar-right">
                                                                                    {/* Telemetry Status Bar Icons */}
                                                                                    <svg width="11" height="8" viewBox="0 0 17 11" fill="currentColor" className="sim-status-icon">
                                                                                        <rect x="0" y="8" width="2" height="3" rx="0.5" />
                                                                                        <rect x="4" y="6" width="2" height="5" rx="0.5" />
                                                                                        <rect x="8" y="4" width="2" height="7" rx="0.5" />
                                                                                        <rect x="12" y="2" width="2" height="9" rx="0.5" />
                                                                                        <rect x="16" y="0" width="2" height="11" rx="0.5" />
                                                                                    </svg>
                                                                                    <svg width="15" height="8" viewBox="0 0 24 12" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ marginLeft: '1px' }}>
                                                                                        <rect x="1" y="1" width="18" height="10" rx="3" ry="3" />
                                                                                        <line x1="21" y1="4" x2="21" y2="8" strokeLinecap="round" />
                                                                                        <rect x="3" y="3" width="12" height="6" rx="1" fill="currentColor" />
                                                                                    </svg>
                                                                                </div>
                                                                            </div>

                                                                            {/* Heart overlay pulse */}
                                                                            {heartPulse && (
                                                                                <div
                                                                                    style={{
                                                                                        position: 'absolute',
                                                                                        inset: 0,
                                                                                        display: 'flex',
                                                                                        alignItems: 'center',
                                                                                        justifyContent: 'center',
                                                                                        zIndex: 10,
                                                                                        pointerEvents: 'none',
                                                                                        animation: 'simHeartPulse 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards'
                                                                                    }}
                                                                                >
                                                                                    <svg viewBox="0 0 24 24" width="60" height="60" fill="#ff3b30" stroke="#ff3b30" strokeWidth="1" style={{ filter: 'drop-shadow(0 0 15px rgba(255,59,48,0.85))' }}>
                                                                                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                                                                                    </svg>
                                                                                </div>
                                                                            )}

                                                                            {creativeType === 'video' ? (
                                                                                <>
                                                                                    {/* Video elements or background previews */}
                                                                                    {mockVideos.map((video, idx) => (
                                                                                        <video
                                                                                            key={video.id}
                                                                                            src={video.videoSrc}
                                                                                            autoPlay
                                                                                            loop
                                                                                            muted={isVideoMuted || creativeIdx !== idx}
                                                                                            playsInline
                                                                                            style={{
                                                                                                position: 'absolute',
                                                                                                inset: 0,
                                                                                                width: '100%',
                                                                                                height: '100%',
                                                                                                objectFit: 'cover',
                                                                                                zIndex: 1,
                                                                                                opacity: creativeIdx === idx ? 1 : 0,
                                                                                                pointerEvents: creativeIdx === idx ? 'auto' : 'none',
                                                                                                transition: 'opacity 0.3s ease'
                                                                                            }}
                                                                                        />
                                                                                    ))}

                                                                                    {/* Instagram-Inspired Floating Action Drawer */}
                                                                                    <div className="sim-social-actions" style={{ zIndex: 5 }}>
                                                                                        {/* Heart / Like */}
                                                                                        <div
                                                                                            className={`sim-action-btn ${isLiked ? 'liked' : ''}`}
                                                                                            onClick={handleLikeClick}
                                                                                            style={{ cursor: 'pointer' }}
                                                                                        >
                                                                                            <div className="sim-action-icon-wrapper heart" style={{ color: isLiked ? '#ff3b30' : 'inherit' }}>
                                                                                                <svg viewBox="0 0 24 24" width="10" height="10" fill={isLiked ? 'currentColor' : 'none'} stroke={isLiked ? '#ff3b30' : 'currentColor'} strokeWidth="2.2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                                                                                            </div>
                                                                                        </div>

                                                                                        {/* Share */}
                                                                                        <div className="sim-action-btn">
                                                                                            <div className="sim-action-icon-wrapper share">
                                                                                                <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"></path></svg>
                                                                                            </div>
                                                                                        </div>

                                                                                        {/* Mute/Unmute Audio Toggle (Speaker Icon) */}
                                                                                        <div
                                                                                            className="sim-action-btn speaker-btn"
                                                                                            onClick={(e) => {
                                                                                                e.stopPropagation();
                                                                                                setIsVideoMuted(prev => !prev);
                                                                                            }}
                                                                                            style={{ cursor: 'pointer', marginTop: '4px' }}
                                                                                            title={isVideoMuted ? "Unmute video" : "Mute video"}
                                                                                        >
                                                                                            <div className="sim-action-icon-wrapper speaker" style={{
                                                                                                background: isVideoMuted ? 'rgba(255,255,255,0.15)' : 'rgba(16, 185, 129, 0.25)',
                                                                                                borderColor: isVideoMuted ? 'rgba(255,255,255,0.45)' : 'rgba(16, 185, 129, 0.6)'
                                                                                            }}>
                                                                                                {isVideoMuted ? (
                                                                                                    <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2.5">
                                                                                                        <path d="M11 5L6 9H2v6h4l5 4V5z"></path>
                                                                                                        <line x1="23" y1="9" x2="17" y2="15"></line>
                                                                                                        <line x1="17" y1="9" x2="23" y2="15"></line>
                                                                                                    </svg>
                                                                                                ) : (
                                                                                                    <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="#10B981" strokeWidth="2.5">
                                                                                                        <path d="M11 5L6 9H2v6h4l5 4V5z"></path>
                                                                                                        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                                                                                                    </svg>
                                                                                                )}
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>

                                                                                    {/* Video metadata and details */}
                                                                                    <div className="sim-reels-details" style={{ paddingBottom: '12px', zIndex: 4 }}>
                                                                                        <h5 style={{ color: '#fff', fontSize: '0.65rem', fontWeight: '800', margin: '0 0 2px 0', textShadow: '0 2px 4px rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', gap: '3px' }}>
                                                                                            @{creativeIdx === 0 ? 'montra_escv' : creativeIdx === 1 ? 'ampere_ev' : 'montra_electric'}
                                                                                            <svg viewBox="0 0 24 24" width="9" height="9" fill="#3897f0" style={{ flexShrink: 0 }}><path d="M12.002 2.005c-5.522 0-10 4.477-10 10s4.478 10 10 10 10-4.477 10-10-4.478-10-10-10zm-1.25 13.75l-3.5-3.5 1.41-1.41 2.09 2.08 4.59-4.58 1.41 1.41-6 6z" /></svg>
                                                                                        </h5>
                                                                                        <p className="sim-hide-mobile" style={{ color: 'rgba(255,255,255,0.95)', fontSize: '0.58rem', fontWeight: '700', margin: '0 0 2px 0', textShadow: '0 1px 3px rgba(0,0,0,0.8)', lineHeight: '1.2' }}>
                                                                                            {currentCreative.title}
                                                                                        </p>
                                                                                        <p className="sim-hide-mobile" style={{ color: 'rgba(255,255,255,0.72)', fontSize: '0.5rem', margin: '0 0 6px 0', textShadow: '0 1px 2px rgba(0,0,0,0.8)', lineHeight: '1.2' }}>
                                                                                            {currentCreative.subtitle}
                                                                                        </p>

                                                                                        {/* Audio line */}
                                                                                        <div className="sim-hide-mobile" style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'rgba(255,255,255,0.9)', fontSize: '0.48rem', margin: 0, textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}>
                                                                                            <svg viewBox="0 0 24 24" width="8" height="8" fill="currentColor"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" /></svg>
                                                                                            <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '100px' }}>original audio - admitra.in</span>
                                                                                        </div>
                                                                                        {/* Timeline scrubber track removed per user request */}
                                                                                    </div>
                                                                                </>
                                                                            ) : (
                                                                                <>
                                                                                    {/* Instagram Post sponsored header */}
                                                                                    <div className="sim-sponsored-header" style={{ top: '32px' }}>
                                                                                        <div className="sim-sponsored-user">
                                                                                            <div className="sim-sponsored-info" style={{ marginLeft: 0 }}>
                                                                                                <span className="sim-sponsored-name">
                                                                                                    {creativeIdx === 0 ? 'Montra e-SCV' : creativeIdx === 1 ? 'Ampere' : 'Montra Electric'}
                                                                                                    <svg viewBox="0 0 24 24" width="9" height="9" fill="#3897f0" style={{ marginLeft: '3px', display: 'inline-block', verticalAlign: 'middle', flexShrink: 0 }}><path d="M12.002 2.005c-5.522 0-10 4.477-10 10s4.478 10 10 10 10-4.477 10-10-4.478-10-10-10zm-1.25 13.75l-3.5-3.5 1.41-1.41 2.09 2.08 4.59-4.58 1.41 1.41-6 6z" /></svg>
                                                                                                </span>
                                                                                            </div>
                                                                                        </div>
                                                                                        <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2.5"><circle cx="12" cy="5" r="1.5" fill="currentColor" /><circle cx="12" cy="12" r="1.5" fill="currentColor" /><circle cx="12" cy="19" r="1.5" fill="currentColor" /></svg>
                                                                                    </div>

                                                                                    {/* 4:5 Poster Media card */}
                                                                                    <div
                                                                                        className="sim-poster-media"
                                                                                        style={{
                                                                                            width: '100%',
                                                                                            height: '175px',
                                                                                            background: currentCreative.bg,
                                                                                            marginTop: '66px',
                                                                                            display: 'flex',
                                                                                            flexDirection: 'column',
                                                                                            justifyContent: 'center',
                                                                                            alignItems: 'center',
                                                                                            padding: 0,
                                                                                            position: 'relative',
                                                                                            boxShadow: 'inset 0 0 20px rgba(0,0,0,0.2)'
                                                                                        }}
                                                                                    >
                                                                                        {mockPosters.map((poster, idx) => (
                                                                                            poster.posterSrc ? (
                                                                                                <img
                                                                                                    key={poster.id}
                                                                                                    src={poster.posterSrc}
                                                                                                    alt={poster.title}
                                                                                                    style={{
                                                                                                        position: 'absolute',
                                                                                                        inset: 0,
                                                                                                        width: '100%',
                                                                                                        height: '100%',
                                                                                                        objectFit: 'contain',
                                                                                                        zIndex: 1,
                                                                                                        opacity: creativeIdx === idx ? 1 : 0,
                                                                                                        pointerEvents: creativeIdx === idx ? 'auto' : 'none',
                                                                                                        transition: 'opacity 0.3s ease'
                                                                                                    }}
                                                                                                />
                                                                                            ) : null
                                                                                        ))}
                                                                                    </div>

                                                                                    {/* Instagram Post Action Bar */}
                                                                                    <div className="sim-poster-actions" style={{
                                                                                        width: '100%',
                                                                                        padding: '6px 10px',
                                                                                        display: 'flex',
                                                                                        alignItems: 'center',
                                                                                        justifyContent: 'space-between',
                                                                                        background: 'transparent'
                                                                                    }}>
                                                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                                                            <span
                                                                                                className="sim-action-btn-post heart"
                                                                                                onClick={handleLikeClick}
                                                                                                style={{ color: isLiked ? '#ff3b30' : '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                                                                                            >
                                                                                                <svg viewBox="0 0 24 24" width="10" height="10" fill={isLiked ? 'currentColor' : 'none'} stroke={isLiked ? '#ff3b30' : 'currentColor'} strokeWidth="2.2" className="post-heart-svg"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                                                                                            </span>
                                                                                            <span className="sim-action-btn-post share" style={{ color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                                                                                                <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2.2" className="post-share-svg"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"></path></svg>
                                                                                            </span>
                                                                                        </div>
                                                                                        <span className="sim-action-btn-post bookmark" style={{ color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                                                                                            <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2.2" className="post-bookmark-svg"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
                                                                                        </span>
                                                                                    </div>

                                                                                    {/* Instagram Likes line */}
                                                                                    <div className="sim-hide-mobile" style={{
                                                                                        padding: '0 10px',
                                                                                        textAlign: 'left',
                                                                                        fontSize: '0.52rem',
                                                                                        fontWeight: 'bold',
                                                                                        color: '#fff',
                                                                                        marginBottom: '2px',
                                                                                        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif'
                                                                                    }}>
                                                                                        Liked by <span style={{ color: '#fff', fontWeight: '800' }}>under25</span> and {isLiked ? '1,843' : '1,842'} others
                                                                                    </div>

                                                                                    {/* Instagram Caption */}
                                                                                    <div className="sim-hide-mobile" style={{
                                                                                        padding: '0 10px',
                                                                                        textAlign: 'left',
                                                                                        fontSize: '0.52rem',
                                                                                        lineHeight: '1.25',
                                                                                        color: 'rgba(255,255,255,0.9)',
                                                                                        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
                                                                                        maxHeight: '38px',
                                                                                        overflow: 'hidden',
                                                                                        textOverflow: 'ellipsis',
                                                                                        display: '-webkit-box',
                                                                                        WebkitLineClamp: 2,
                                                                                        WebkitBoxOrient: 'vertical'
                                                                                    }}>
                                                                                        <strong style={{ color: '#fff', fontWeight: '800', marginRight: '5px' }}>
                                                                                            {creativeIdx === 0 ? 'montraelectric' : creativeIdx === 1 ? 'ampere_ev' : 'lincolnpharma'}
                                                                                        </strong>
                                                                                        {currentCreative.desc}
                                                                                    </div>

                                                                                    {/* View comments & quick comment input */}
                                                                                    <div className="sim-hide-mobile" style={{
                                                                                        padding: '0 10px',
                                                                                        textAlign: 'left',
                                                                                        fontSize: '0.46rem',
                                                                                        color: 'rgba(255,255,255,0.4)',
                                                                                        marginTop: '2px',
                                                                                        cursor: 'pointer',
                                                                                        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif'
                                                                                    }} onClick={() => alert('View all 42 comments!')}>
                                                                                        View all 42 comments
                                                                                    </div>

                                                                                </>
                                                                            )}
                                                                        </div>

                                                                        {/* Next Button */}
                                                                        <button
                                                                            onClick={() => setCreativeIdx((prev) => (prev + 1) % 3)}
                                                                            aria-label="Next Creative"
                                                                            className="xp-arrow-nav-btn next-btn"
                                                                        >
                                                                            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2.5" fill="none"><polyline points="9 18 15 12 9 6"></polyline></svg>
                                                                        </button>
                                                                    </div>

                                                                    {/* Glowing Pagination Dots */}
                                                                    <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', alignItems: 'center', marginTop: '6px' }}>
                                                                        {[0, 1, 2].map((idx) => {
                                                                            const isActive = creativeIdx === idx;
                                                                            return (
                                                                                <div
                                                                                    key={idx}
                                                                                    onClick={() => setCreativeIdx(idx)}
                                                                                    style={{
                                                                                        width: isActive ? '18px' : '6px',
                                                                                        height: '6px',
                                                                                        borderRadius: '3px',
                                                                                        background: isActive ? '#3B82F6' : 'rgba(255, 255, 255, 0.2)',
                                                                                        boxShadow: isActive ? '0 0 8px #3B82F6' : 'none',
                                                                                        cursor: 'pointer',
                                                                                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                                                                                    }}
                                                                                />
                                                                            );
                                                                        })}
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

                                                {/* Key Campaign Clients block relocated after viewport */}
                                                <div className="xp-client-brands xp-clients-mobile" style={{ width: '100%', maxWidth: '340px', marginTop: '0px', paddingTop: '15px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                                                    <p className="xp-brands-title" style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '1.5px', marginBottom: '10px' }}>
                                                        KEY CAMPAIGN CLIENTS
                                                    </p>
                                                    <div className="xp-brands-logos">
                                                        <div className="xp-brand-logo-btn xp-brand-montra">
                                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '24px', height: '24px', background: 'rgba(255,255,255,0.05)', borderRadius: '6px', padding: '4px', overflow: 'hidden', position: 'relative' }}>
                                                                <img
                                                                    src="/assets/images/montra_logo.png"
                                                                    onError={(e) => {
                                                                        if (!e.target.dataset.triedFallback) {
                                                                            e.target.dataset.triedFallback = 'true';
                                                                            e.target.src = "https://www.google.com/s2/favicons?domain=montraelectric.com&sz=128";
                                                                        } else {
                                                                            e.target.style.display = 'none';
                                                                            if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
                                                                        }
                                                                    }}
                                                                    className="xp-brand-logo-btn-icon"
                                                                    alt="Montra Electric"
                                                                    style={{ width: '100%', height: '100%', objectFit: 'contain', zIndex: 2 }}
                                                                />
                                                                <div className="xp-logo-fallback-text" style={{ display: 'none', position: 'absolute', inset: 0, alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: '800', color: '#FF334B', zIndex: 1 }}>
                                                                    M
                                                                </div>
                                                            </div>
                                                            <span style={{ fontSize: '0.85rem', fontWeight: '600' }}>Montra Electric</span>
                                                        </div>
                                                        <div className="xp-brand-logo-btn xp-brand-ampere">
                                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '24px', height: '24px', background: 'rgba(255,255,255,0.05)', borderRadius: '6px', padding: '4px', overflow: 'hidden', position: 'relative' }}>
                                                                <img
                                                                    src="/assets/images/ampere_logo.png"
                                                                    onError={(e) => {
                                                                        if (!e.target.dataset.triedFallback) {
                                                                            e.target.dataset.triedFallback = 'true';
                                                                            e.target.src = "https://www.google.com/s2/favicons?domain=amperevehicles.com&sz=128";
                                                                        } else {
                                                                            e.target.style.display = 'none';
                                                                            if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
                                                                        }
                                                                    }}
                                                                    className="xp-brand-logo-btn-icon"
                                                                    alt="Ampere"
                                                                    style={{ width: '100%', height: '100%', objectFit: 'contain', zIndex: 2 }}
                                                                />
                                                                <div className="xp-logo-fallback-text" style={{ display: 'none', position: 'absolute', inset: 0, alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: '800', color: '#00FFF0', zIndex: 1 }}>
                                                                    A
                                                                </div>
                                                            </div>
                                                            <span style={{ fontSize: '0.85rem', fontWeight: '600' }}>Ampere</span>
                                                        </div>
                                                        <div className="xp-brand-logo-btn xp-brand-lincoln-pharma">
                                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '24px', height: '24px', background: 'rgba(255,255,255,0.05)', borderRadius: '6px', padding: '4px', overflow: 'hidden', position: 'relative' }}>
                                                                <img
                                                                    src="/assets/images/lincoln_logo.png"
                                                                    onError={(e) => {
                                                                        if (!e.target.dataset.triedFallback) {
                                                                            e.target.dataset.triedFallback = 'true';
                                                                            e.target.src = "https://www.google.com/s2/favicons?domain=lincolnpharma.com&sz=128";
                                                                        } else {
                                                                            e.target.style.display = 'none';
                                                                            if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
                                                                        }
                                                                    }}
                                                                    className="xp-brand-logo-btn-icon"
                                                                    alt="Lincoln Pharma"
                                                                    style={{ width: '100%', height: '100%', objectFit: 'contain', zIndex: 2 }}
                                                                />
                                                                <div className="xp-logo-fallback-text" style={{ display: 'none', position: 'absolute', inset: 0, alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: '800', color: '#4ade80', zIndex: 1 }}>
                                                                    L
                                                                </div>
                                                            </div>
                                                            <span style={{ fontSize: '0.85rem', fontWeight: '600' }}>Lincoln Pharma</span>
                                                        </div>
                                                        <div className="xp-brand-logo-btn xp-brand-ekotejas">
                                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '24px', height: '24px', background: 'rgba(255,255,255,0.05)', borderRadius: '6px', padding: '4px', overflow: 'hidden', position: 'relative' }}>
                                                                <img
                                                                    src="https://ekotejas.in/wp-content/uploads/2023/06/Group-1941.png"
                                                                    onError={(e) => {
                                                                        if (!e.target.dataset.triedFallback) {
                                                                            e.target.dataset.triedFallback = 'true';
                                                                            e.target.src = "https://www.google.com/s2/favicons?domain=ekotejas.com&sz=128";
                                                                        } else {
                                                                            e.target.style.display = 'none';
                                                                            if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
                                                                        }
                                                                    }}
                                                                    className="xp-brand-logo-btn-icon"
                                                                    alt="EkoTejas"
                                                                    style={{ width: '100%', height: '100%', objectFit: 'contain', zIndex: 2 }}
                                                                />
                                                                <div className="xp-logo-fallback-text" style={{ display: 'none', position: 'absolute', inset: 0, alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: '800', color: '#3B82F6', zIndex: 1 }}>
                                                                    E
                                                                </div>
                                                            </div>
                                                            <span style={{ fontSize: '0.85rem', fontWeight: '600' }}>EkoTejas</span>
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
                                                <div className="xp-pool-grid" style={{ marginBottom: '16px' }}>
                                                    <div className="xp-pool-item"><img src="/assets/images/da.avif" alt="DaVinci Resolve - Cinematic Video Editing Project" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>
                                                    <div className="xp-pool-item"><img src="/assets/images/da1.png" alt="DaVinci Resolve - Post Production Audio Timeline" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>
                                                    <div style={{
                                                        gridColumn: 'span 2',
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        padding: '4px 0'
                                                    }}>
                                                        <button
                                                            className="xp-pool-more-clients-btn"
                                                            style={{
                                                                background: 'rgba(255, 255, 255, 0.04)',
                                                                border: '1.5px solid rgba(255, 255, 255, 0.1)',
                                                                borderRadius: '20px',
                                                                padding: '5px 12px',
                                                                color: 'rgba(255, 255, 255, 0.55)',
                                                                fontSize: '0.62rem',
                                                                fontWeight: 'bold',
                                                                letterSpacing: '0.6px',
                                                                textTransform: 'uppercase',
                                                                cursor: 'pointer',
                                                                transition: 'all 0.2s ease',
                                                                outline: 'none'
                                                            }}
                                                            onMouseEnter={(e) => {
                                                                e.currentTarget.style.borderColor = '#FF8F3D';
                                                                e.currentTarget.style.color = '#fff';
                                                                e.currentTarget.style.background = 'rgba(255, 143, 61, 0.1)';
                                                            }}
                                                            onMouseLeave={(e) => {
                                                                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                                                                e.currentTarget.style.color = 'rgba(255, 255, 255, 0.55)';
                                                                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
                                                            }}

                                                        >
                                                            +6 other clients...
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* Platform Nav Buttons */}
                                                <div className="xp-pool-buttons" style={{ display: 'flex', flexDirection: 'column', gap: '6px', borderTop: '1px solid rgba(255, 255, 255, 0.05)', paddingTop: '16px', alignItems: 'center' }}>
                                                    <p style={{ fontSize: '0.62rem', color: 'rgba(255, 255, 255, 0.35)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px', fontWeight: '600', textAlign: 'center' }}>Platform Deliverables</p>

                                                    <div className="xp-platform-btn xp-btn-youtube">
                                                        <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor" className="xp-btn-icon"><path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
                                                        <span>YouTube Videos</span>
                                                    </div>

                                                    <div className="xp-platform-btn xp-btn-instagram">
                                                        <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="xp-btn-icon"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                                                        <span>Instagram Reels</span>
                                                    </div>

                                                    <div className="xp-platform-btn xp-btn-shorts">
                                                        <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor" className="xp-btn-icon"><path d="M17.771 9.771l-1.771-1.011 1.771-1.011c1.474-.842 1.979-2.726 1.137-4.2-.842-1.474-2.726-1.979-4.2-1.137l-9.143 5.223C4.246 8.358 3.5 9.777 3.5 11.314c0 1.537.746 2.956 2.065 3.679l1.771 1.011-1.771 1.011c-1.474.842-1.979 2.726-1.137 4.2.842 1.474 2.726 1.979 4.2 1.137l9.143-5.223c1.319-.723 2.065-2.142 2.065-3.679.001-1.537-.745-2.956-2.064-3.679zM9.5 15.5v-7l6 3.5-6 3.5z" /></svg>
                                                        <span>YouTube Shorts</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="xp-preview-monitor">
                                                <div className="xp-monitor-inner">
                                                    <h3>Freelance Video Editor</h3>
                                                    <div style={{ marginBottom: '16px' }}>
                                                        <span className="xp-remote-shimmer-badge">Independent · Remote</span>
                                                    </div>
                                                    <div className="xp-monitor-desc" style={{ display: 'flex', flexDirection: 'column', gap: '14px', textAlign: 'left', marginTop: '16px' }}>
                                                        <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                                                            <div style={{
                                                                background: 'rgba(255, 180, 100, 0.1)',
                                                                border: '1px solid rgba(255, 180, 100, 0.3)',
                                                                borderRadius: '50%',
                                                                width: '22px',
                                                                height: '22px',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                flexShrink: 0,
                                                                marginTop: '2px',
                                                                boxShadow: '0 0 10px rgba(255, 180, 100, 0.15)'
                                                            }}>
                                                                <span style={{ color: '#FFB464', fontSize: '0.75rem', fontWeight: 'bold' }}>✦</span>
                                                            </div>
                                                            <p style={{ margin: 0, color: 'rgba(255, 255, 255, 0.85)', fontSize: '0.85rem', lineHeight: '1.5' }}>
                                                                Collaborated with <strong style={{ color: '#FFB464', fontWeight: '600' }}>regional tech creators</strong> to produce <strong style={{ color: '#FFB464', fontWeight: '600' }}>high-retention content</strong>.
                                                            </p>
                                                        </div>

                                                        <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                                                            <div style={{
                                                                background: 'rgba(255, 180, 100, 0.1)',
                                                                border: '1px solid rgba(255, 180, 100, 0.3)',
                                                                borderRadius: '50%',
                                                                width: '22px',
                                                                height: '22px',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                flexShrink: 0,
                                                                marginTop: '2px',
                                                                boxShadow: '0 0 10px rgba(255, 180, 100, 0.15)'
                                                            }}>
                                                                <span style={{ color: '#FFB464', fontSize: '0.75rem', fontWeight: 'bold' }}>✦</span>
                                                            </div>
                                                            <p style={{ margin: 0, color: 'rgba(255, 255, 255, 0.85)', fontSize: '0.85rem', lineHeight: '1.5' }}>
                                                                Delivered <strong style={{ color: '#FFB464', fontWeight: '600' }}>strategy and editing</strong> that boosted <strong style={{ color: '#FFB464', fontWeight: '600' }}>engagement and localized reach</strong>.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="xp-inspector" style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '12px 10px', background: '#121215', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                                                <h4 style={{ fontSize: '0.72rem', fontWeight: '700', color: '#FFF', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '6px', marginBottom: '2px', letterSpacing: '1.2px', display: 'flex', alignItems: 'center' }}>
                                                    <svg viewBox="0 0 24 24" width="12" height="12" stroke="#FF8F3D" strokeWidth="2.5" fill="none" style={{ display: 'inline', marginRight: '8px', verticalAlign: 'middle' }}><line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line><line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line><line x1="17" y1="16" x2="23" y2="16"></line></svg>
                                                    Skills
                                                </h4>

                                                {/* Skill 1 */}
                                                <div className="xp-slider-group" style={{ background: 'rgba(255,255,255,0.015)', border: '1px solid rgba(255,255,255,0.03)', borderRadius: '6px', padding: '8px', gap: '6px', display: 'flex', flexDirection: 'column', transition: 'all 0.25s' }} onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.borderColor = 'rgba(255,143,61,0.2)'; }} onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.015)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.03)'; }}>
                                                    <div className="xp-slider-label-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                            <span style={{ width: '6px', height: '6px', borderRadius: '1px', background: '#FF8F3D', boxShadow: '0 0 6px #FF8F3D', display: 'inline-block' }}></span>
                                                            <span style={{ fontSize: '0.66rem', color: '#FFF', fontWeight: '600', letterSpacing: '0.2px' }}>Personalized AI B-Rolls</span>
                                                        </div>
                                                        <div className="xp-slider-reset" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', color: 'rgba(255,255,255,0.4)', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#FF8F3D'} onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}>
                                                            <svg viewBox="0 0 24 24" width="8" height="8" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M23 4v6h-6"></path><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path></svg>
                                                        </div>
                                                    </div>
                                                    <div className="xp-slider" style={{ height: '4px', background: 'rgba(0,0,0,0.4)', borderRadius: '2px', position: 'relative', overflow: 'visible', cursor: 'pointer', margin: '4px 0' }}>
                                                        <div className="xp-slider-fill" style={{ width: '80%', height: '100%', borderRadius: '2px', background: 'linear-gradient(90deg, #FFB464 0%, #FF8F3D 100%)', boxShadow: '0 0 8px rgba(255, 143, 61, 0.2)', transition: 'width 0.8s cubic-bezier(0.16, 1, 0.3, 1)' }}>
                                                            <div className="xp-slider-thumb" style={{ position: 'absolute', right: '-4px', top: '50%', transform: 'translateY(-50%)', width: '8px', height: '8px', borderRadius: '50%', background: '#FFF', border: '1.5px solid #FF8F3D', boxShadow: '0 0 4px rgba(255, 143, 61, 0.8)', transition: 'transform 0.2s' }}></div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Skill 3 */}
                                                <div className="xp-slider-group" style={{ background: 'rgba(255,255,255,0.015)', border: '1px solid rgba(255,255,255,0.03)', borderRadius: '6px', padding: '8px', gap: '6px', display: 'flex', flexDirection: 'column', transition: 'all 0.25s' }} onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.borderColor = 'rgba(255,143,61,0.2)'; }} onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.015)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.03)'; }}>
                                                    <div className="xp-slider-label-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                            <span style={{ width: '6px', height: '6px', borderRadius: '1px', background: '#FF8F3D', boxShadow: '0 0 6px #FF8F3D', display: 'inline-block' }}></span>
                                                            <span style={{ fontSize: '0.66rem', color: '#FFF', fontWeight: '600', letterSpacing: '0.2px' }}>Motion Graphics (Basic)</span>
                                                        </div>
                                                        <div className="xp-slider-reset" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', color: 'rgba(255,255,255,0.4)', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#FF8F3D'} onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}>
                                                            <svg viewBox="0 0 24 24" width="8" height="8" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M23 4v6h-6"></path><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path></svg>
                                                        </div>
                                                    </div>
                                                    <div className="xp-slider" style={{ height: '4px', background: 'rgba(0,0,0,0.4)', borderRadius: '2px', position: 'relative', overflow: 'visible', cursor: 'pointer', margin: '4px 0' }}>
                                                        <div className="xp-slider-fill" style={{ width: '55%', height: '100%', borderRadius: '2px', background: 'linear-gradient(90deg, #FFB464 0%, #FF8F3D 100%)', boxShadow: '0 0 8px rgba(255, 143, 61, 0.2)', transition: 'width 0.8s cubic-bezier(0.16, 1, 0.3, 1)' }}>
                                                            <div className="xp-slider-thumb" style={{ position: 'absolute', right: '-4px', top: '50%', transform: 'translateY(-50%)', width: '8px', height: '8px', borderRadius: '50%', background: '#FFF', border: '1.5px solid #FF8F3D', boxShadow: '0 0 4px rgba(255, 143, 61, 0.8)', transition: 'transform 0.2s' }}></div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Skill 4 */}
                                                <div className="xp-slider-group" style={{ background: 'rgba(255,255,255,0.015)', border: '1px solid rgba(255,255,255,0.03)', borderRadius: '6px', padding: '8px', gap: '6px', display: 'flex', flexDirection: 'column', transition: 'all 0.25s' }} onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.borderColor = 'rgba(255,143,61,0.2)'; }} onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.015)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.03)'; }}>
                                                    <div className="xp-slider-label-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                            <span style={{ width: '6px', height: '6px', borderRadius: '1px', background: '#FF8F3D', boxShadow: '0 0 6px #FF8F3D', display: 'inline-block' }}></span>
                                                            <span style={{ fontSize: '0.66rem', color: '#FFF', fontWeight: '600', letterSpacing: '0.2px' }}>Video Pacing & Sound Design</span>
                                                        </div>
                                                        <div className="xp-slider-reset" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', color: 'rgba(255,255,255,0.4)', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#FF8F3D'} onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}>
                                                            <svg viewBox="0 0 24 24" width="8" height="8" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M23 4v6h-6"></path><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path></svg>
                                                        </div>
                                                    </div>
                                                    <div className="xp-slider" style={{ height: '4px', background: 'rgba(0,0,0,0.4)', borderRadius: '2px', position: 'relative', overflow: 'visible', cursor: 'pointer', margin: '4px 0' }}>
                                                        <div className="xp-slider-fill" style={{ width: '70%', height: '100%', borderRadius: '2px', background: 'linear-gradient(90deg, #FFB464 0%, #FF8F3D 100%)', boxShadow: '0 0 8px rgba(255, 143, 61, 0.2)', transition: 'width 0.8s cubic-bezier(0.16, 1, 0.3, 1)' }}>
                                                            <div className="xp-slider-thumb" style={{ position: 'absolute', right: '-4px', top: '50%', transform: 'translateY(-50%)', width: '8px', height: '8px', borderRadius: '50%', background: '#FFF', border: '1.5px solid #FF8F3D', boxShadow: '0 0 4px rgba(255, 143, 61, 0.8)', transition: 'transform 0.2s' }}></div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Skill 5 */}
                                                <div className="xp-slider-group" style={{ background: 'rgba(255,255,255,0.015)', border: '1px solid rgba(255,255,255,0.03)', borderRadius: '6px', padding: '8px', gap: '6px', display: 'flex', flexDirection: 'column', transition: 'all 0.25s' }} onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.borderColor = 'rgba(255,143,61,0.2)'; }} onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.015)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.03)'; }}>
                                                    <div className="xp-slider-label-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                            <span style={{ width: '6px', height: '6px', borderRadius: '1px', background: '#FF8F3D', boxShadow: '0 0 6px #FF8F3D', display: 'inline-block' }}></span>
                                                            <span style={{ fontSize: '0.66rem', color: '#FFF', fontWeight: '600', letterSpacing: '0.2px' }}>Content Research & Strategy</span>
                                                        </div>
                                                        <div className="xp-slider-reset" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', color: 'rgba(255,255,255,0.4)', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#FF8F3D'} onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}>
                                                            <svg viewBox="0 0 24 24" width="8" height="8" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M23 4v6h-6"></path><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path></svg>
                                                        </div>
                                                    </div>
                                                    <div className="xp-slider" style={{ height: '4px', background: 'rgba(0,0,0,0.4)', borderRadius: '2px', position: 'relative', overflow: 'visible', cursor: 'pointer', margin: '4px 0' }}>
                                                        <div className="xp-slider-fill" style={{ width: '75%', height: '100%', borderRadius: '2px', background: 'linear-gradient(90deg, #FFB464 0%, #FF8F3D 100%)', boxShadow: '0 0 8px rgba(255, 143, 61, 0.2)', transition: 'width 0.8s cubic-bezier(0.16, 1, 0.3, 1)' }}>
                                                            <div className="xp-slider-thumb" style={{ position: 'absolute', right: '-4px', top: '50%', transform: 'translateY(-50%)', width: '8px', height: '8px', borderRadius: '50%', background: '#FFF', border: '1.5px solid #FF8F3D', boxShadow: '0 0 4px rgba(255, 143, 61, 0.8)', transition: 'transform 0.2s' }}></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* DaVinci-style multi-track timeline (Desktop View) */}
                                        <div className="xp-window-timeline xp-dvr-timeline xp-timeline-desktop">
                                            <div className="xp-timeline-header" style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                <span className="xp-tc">
                                                    {`${dvrTime.hours.toString().padStart(2, '0')}:${dvrTime.minutes.toString().padStart(2, '0')}:${dvrTime.seconds.toString().padStart(2, '0')}:${dvrTime.frames.toString().padStart(2, '0')}`}
                                                </span>

                                                {/* Perfectly Centered Compact Transport Controls */}
                                                <div className="xp-timeline-transport" style={{
                                                    position: 'absolute',
                                                    left: '50%',
                                                    transform: 'translateX(-50%)',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '8px'
                                                }}>
                                                    {/* Return to Start (Rewind) Button */}
                                                    <button
                                                        onClick={() => {
                                                            setScrubberKey(prev => prev + 1);
                                                            setDvrTime({ hours: 1, minutes: 0, seconds: 0, frames: 0 });
                                                        }}
                                                        style={{
                                                            background: 'transparent',
                                                            border: 'none',
                                                            color: 'rgba(255, 255, 255, 0.45)',
                                                            cursor: 'pointer',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            padding: '4px',
                                                            borderRadius: '4px',
                                                            transition: 'all 0.2s ease',
                                                            outline: 'none'
                                                        }}
                                                        onMouseEnter={(e) => { e.currentTarget.style.color = '#FF8F3D'; e.currentTarget.style.background = 'rgba(255, 143, 61, 0.1)'; }}
                                                        onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255, 255, 255, 0.45)'; e.currentTarget.style.background = 'transparent'; }}
                                                        title="Return to Start"
                                                    >
                                                        <svg viewBox="0 0 24 24" width="11" height="11" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 19 2 12 11 5 11 19"></polygon><polygon points="22 19 13 12 22 5 22 19"></polygon></svg>
                                                    </button>

                                                    {/* Play / Pause Toggle Button */}
                                                    <button
                                                        onClick={() => setDvrPlaying(!dvrPlaying)}
                                                        style={{
                                                            background: 'transparent',
                                                            border: 'none',
                                                            color: '#FF8F3D',
                                                            cursor: 'pointer',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            padding: '4px',
                                                            borderRadius: '4px',
                                                            transition: 'all 0.2s ease',
                                                            outline: 'none'
                                                        }}
                                                        onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255, 143, 61, 0.1)'; }}
                                                        onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                                                        title={dvrPlaying ? "Pause Timeline" : "Play Timeline"}
                                                    >
                                                        {dvrPlaying ? (
                                                            <svg viewBox="0 0 24 24" width="11" height="11" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
                                                        ) : (
                                                            <svg viewBox="0 0 24 24" width="11" height="11" stroke="currentColor" strokeWidth="2.5" fill="currentColor" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                                                        )}
                                                    </button>

                                                    {/* Forward / Skip to End Button */}
                                                    <button
                                                        onClick={() => {
                                                            setScrubberKey(prev => prev + 1);
                                                            setDvrTime({ hours: 1, minutes: 1, seconds: 30, frames: 0 });
                                                        }}
                                                        style={{
                                                            background: 'transparent',
                                                            border: 'none',
                                                            color: 'rgba(255, 255, 255, 0.45)',
                                                            cursor: 'pointer',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            padding: '4px',
                                                            borderRadius: '4px',
                                                            transition: 'all 0.2s ease',
                                                            outline: 'none'
                                                        }}
                                                        onMouseEnter={(e) => { e.currentTarget.style.color = '#FF8F3D'; e.currentTarget.style.background = 'rgba(255, 143, 61, 0.1)'; }}
                                                        onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255, 255, 255, 0.45)'; e.currentTarget.style.background = 'transparent'; }}
                                                        title="Skip to End"
                                                    >
                                                        <svg viewBox="0 0 24 24" width="11" height="11" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 19 22 12 13 5 13 19"></polygon><polygon points="2 19 11 12 2 5 2 19"></polygon></svg>
                                                    </button>
                                                </div>

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
                                                    <div
                                                        key={scrubberKey}
                                                        className="xp-dvr-scrubber"
                                                        style={{
                                                            animationPlayState: dvrPlaying ? 'running' : 'paused'
                                                        }}
                                                    ></div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* DaVinci-style multi-track timeline (Mobile/Phone View) */}
                                        <div className="xp-window-timeline xp-dvr-timeline xp-timeline-mobile">
                                            <div className="xp-timeline-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 12px' }}>
                                                <span className="xp-tc">
                                                    {`${dvrTime.hours.toString().padStart(2, '0')}:${dvrTime.minutes.toString().padStart(2, '0')}:${dvrTime.seconds.toString().padStart(2, '0')}:${dvrTime.frames.toString().padStart(2, '0')}`}
                                                </span>
                                                <div className="xp-dvr-tabs">
                                                    <span className="active" style={{ fontSize: '0.6rem', padding: '2px 6px' }}>Edit Mode</span>
                                                </div>
                                            </div>

                                            {/* Mobile-optimized transport controls (positioned above track area) */}
                                            <div className="xp-mobile-transport-bar" style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                gap: '24px',
                                                padding: '6px 0',
                                                background: 'rgba(12, 12, 14, 0.95)',
                                                borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
                                            }}>
                                                {/* Return to Start (Rewind) */}
                                                <button
                                                    onClick={() => {
                                                        setScrubberKey(prev => prev + 1);
                                                        setDvrTime({ hours: 1, minutes: 0, seconds: 0, frames: 0 });
                                                    }}
                                                    className="xp-mob-transport-btn"
                                                    aria-label="Return to Start"
                                                >
                                                    <svg viewBox="0 0 24 24" width="13" height="13" stroke="currentColor" strokeWidth="2.5" fill="none"><polygon points="11 19 2 12 11 5 11 19"></polygon><polygon points="22 19 13 12 22 5 22 19"></polygon></svg>
                                                </button>
                                                {/* Play/Pause */}
                                                <button
                                                    onClick={() => setDvrPlaying(!dvrPlaying)}
                                                    className="xp-mob-transport-btn play-btn"
                                                    style={{ color: '#FF8F3D' }}
                                                    aria-label="Play or Pause"
                                                >
                                                    {dvrPlaying ? (
                                                        <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2.5" fill="none"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
                                                    ) : (
                                                        <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2.5" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                                                    )}
                                                </button>
                                                {/* Skip to End */}
                                                <button
                                                    onClick={() => {
                                                        setScrubberKey(prev => prev + 1);
                                                        setDvrTime({ hours: 1, minutes: 1, seconds: 30, frames: 0 });
                                                    }}
                                                    className="xp-mob-transport-btn"
                                                    aria-label="Skip to End"
                                                >
                                                    <svg viewBox="0 0 24 24" width="13" height="13" stroke="currentColor" strokeWidth="2.5" fill="none"><polygon points="13 19 22 12 13 5 13 19"></polygon><polygon points="2 19 11 12 2 5 2 19"></polygon></svg>
                                                </button>
                                            </div>

                                            <div className="xp-dvr-tracks" style={{ height: '90px' }}>
                                                <div className="xp-dvr-labels" style={{ width: '25px', fontSize: '0.6rem' }}>
                                                    <span>V2</span><span>V1</span><span>A1</span>
                                                </div>
                                                <div className="xp-dvr-track-area">
                                                    {/* Track V2 - Text overlays */}
                                                    <div className="xp-dvr-row" style={{ height: '24px' }}>
                                                        <div className="xp-clip xp-clip-purple" style={{ left: '18%', width: '30%', fontSize: '0.52rem', padding: '2px 4px' }}>Titles</div>
                                                        <div className="xp-clip xp-clip-purple" style={{ left: '55%', width: '25%', fontSize: '0.52rem', padding: '2px 4px' }}>Text</div>
                                                    </div>
                                                    {/* Track V1 - Main Video */}
                                                    <div className="xp-dvr-row" style={{ height: '24px' }}>
                                                        <div className="xp-clip xp-clip-blue" style={{ left: '2%', width: '45%', fontSize: '0.52rem', padding: '2px 4px' }}>Cinematic Clip</div>
                                                        <div className="xp-clip xp-clip-lblue" style={{ left: '50%', width: '45%', fontSize: '0.52rem', padding: '2px 4px' }}>B-Roll</div>
                                                    </div>
                                                    {/* Track A1 - Soundtrack */}
                                                    <div className="xp-dvr-row xp-dvr-audio" style={{ height: '24px' }}>
                                                        <div className="xp-clip xp-clip-dgreen" style={{ left: '2%', width: '90%', fontSize: '0.52rem', padding: '2px 4px' }}>Audio Master.wav</div>
                                                    </div>
                                                    {/* Scrubber */}
                                                    <div
                                                        key={`mob-${scrubberKey}`}
                                                        className="xp-dvr-scrubber"
                                                        style={{
                                                            animationPlayState: dvrPlaying ? 'running' : 'paused'
                                                        }}
                                                    />
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
                                            <div className="xp-snap-brand" style={{ marginBottom: '16px' }}>
                                                <img src="https://upload.wikimedia.org/wikipedia/en/c/c4/Snapchat_logo.svg" alt="Snapchat" width="22" height="22" style={{ filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.5))' }} />
                                                <span className="xp-snap-brand-text">LENS STUDIO</span>
                                            </div>

                                            {/* Premium Visual Insights Panel */}
                                            <div className="xp-insights-container">
                                                <div className="xp-insights-header">
                                                    <h4 className="xp-insights-title">Insights</h4>
                                                    <div className="xp-insights-dropdown">
                                                        <span>Lifetime</span>
                                                        <svg viewBox="0 0 24 24" width="10" height="10" stroke="currentColor" strokeWidth="2.5" fill="none"><polyline points="6 9 12 15 18 9"></polyline></svg>
                                                    </div>
                                                </div>

                                                <div className="xp-insights-list">
                                                    <div className="xp-insights-card">
                                                        <span className="xp-insights-label">Views</span>
                                                        <div className="xp-insights-value">1,56,77,70,215</div>
                                                    </div>
                                                    <div className="xp-insights-card">
                                                        <span className="xp-insights-label">Shares</span>
                                                        <div className="xp-insights-value">3,03,70,979</div>
                                                    </div>
                                                    <div className="xp-insights-card">
                                                        <span className="xp-insights-label">Plays</span>
                                                        <div className="xp-insights-value">92,08,77,446</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="xp-window-main xp-3d-viewport">
                                            <div className="xp-snap-preview-container">
                                                <div className="xp-snap-camera-frame">
                                                    <div className="xp-snap-camera-inner" style={{ position: 'relative' }}>
                                                        <video
                                                            src="/assets/videos/snaps.MP4"
                                                            autoPlay
                                                            loop
                                                            muted
                                                            playsInline
                                                            style={{
                                                                width: '100%',
                                                                height: '100%',
                                                                objectFit: 'cover',
                                                                position: 'absolute',
                                                                top: 0,
                                                                left: 0,
                                                                zIndex: 1
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="xp-snap-corner tl"></div>
                                                    <div className="xp-snap-corner tr"></div>
                                                    <div className="xp-snap-corner bl"></div>
                                                    <div className="xp-snap-corner br"></div>
                                                </div>

                                                {/* Tiny Snapchat logo and @karthik.graj tag below snaps preview */}
                                                <div style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    gap: '6px',
                                                    background: 'rgba(0, 0, 0, 0.65)',
                                                    padding: '5px 12px',
                                                    borderRadius: '20px',
                                                    border: '1px solid rgba(255, 234, 77, 0.2)',
                                                    backdropFilter: 'blur(10px)',
                                                    boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
                                                    width: '100%',
                                                    boxSizing: 'border-box'
                                                }}>
                                                    <img
                                                        src="https://upload.wikimedia.org/wikipedia/en/c/c4/Snapchat_logo.svg"
                                                        alt="Snapchat Logo"
                                                        style={{ width: '12px', height: '12px' }}
                                                    />
                                                    <span style={{
                                                        color: '#FFEA4D',
                                                        fontSize: '0.65rem',
                                                        fontWeight: '700',
                                                        fontFamily: "'Space Grotesk', sans-serif",
                                                        letterSpacing: '0.5px'
                                                    }}>
                                                        @karthik.graj
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="xp-viewport-overlay" style={{
                                                top: '30px',
                                                bottom: '30px',
                                                left: '30px',
                                                right: '220px',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'space-between',
                                                padding: '24px',
                                                background: 'rgba(10, 10, 12, 0.85)',
                                                backdropFilter: 'blur(20px)',
                                                border: '1px solid rgba(255, 234, 77, 0.2)',
                                                borderRadius: '12px',
                                                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6)'
                                            }}>
                                                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
                                                    <div>
                                                        <h3 style={{ margin: 0, fontSize: '1.35rem', color: '#fff', fontWeight: '800' }}>Snap AR Lens Creator</h3>
                                                        <p style={{ margin: '4px 0 0 0', color: '#FFEA4D', fontSize: '0.85rem', fontWeight: '600' }}>Snap Inc. · Creator Program</p>
                                                    </div>
                                                    <span className="xp-shimmer-badge" style={{
                                                        fontSize: '0.65rem',
                                                        padding: '4px 10px',
                                                        borderRadius: '12px',
                                                        fontWeight: '700',
                                                        letterSpacing: '0.8px',
                                                        textTransform: 'uppercase'
                                                    }}>
                                                        featured by Snapchat India
                                                    </span>
                                                </div>

                                                {/* Beautiful custom bulleted points */}
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', flex: 1, justifyContent: 'center', margin: '20px 0' }}>
                                                    <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                                                        <div style={{
                                                            background: 'rgba(255, 234, 77, 0.1)',
                                                            border: '1px solid rgba(255, 234, 77, 0.3)',
                                                            borderRadius: '50%',
                                                            width: '22px',
                                                            height: '22px',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            flexShrink: 0,
                                                            marginTop: '2px',
                                                            boxShadow: '0 0 10px rgba(255, 234, 77, 0.15)'
                                                        }}>
                                                            <span style={{ color: '#FFEA4D', fontSize: '0.75rem', fontWeight: 'bold' }}>✦</span>
                                                        </div>
                                                        <p style={{ margin: 0, color: 'rgba(255, 255, 255, 0.85)', fontSize: '0.85rem', lineHeight: '1.5' }}>
                                                            Designed and published viral AR experiences that qualified for the <strong style={{ color: '#FFEA4D', fontWeight: '600' }}>Snap Lens Creator Rewards</strong> program by driving massive community engagement and user-generated content.
                                                        </p>
                                                    </div>

                                                    <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                                                        <div style={{
                                                            background: 'rgba(255, 234, 77, 0.1)',
                                                            border: '1px solid rgba(255, 234, 77, 0.3)',
                                                            borderRadius: '50%',
                                                            width: '22px',
                                                            height: '22px',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            flexShrink: 0,
                                                            marginTop: '2px',
                                                            boxShadow: '0 0 10px rgba(255, 234, 77, 0.15)'
                                                        }}>
                                                            <span style={{ color: '#FFEA4D', fontSize: '0.75rem', fontWeight: 'bold' }}>✦</span>
                                                        </div>
                                                        <p style={{ margin: 0, color: 'rgba(255, 255, 255, 0.85)', fontSize: '0.85rem', lineHeight: '1.5' }}>
                                                            Hosted a <strong style={{ color: '#FFEA4D', fontWeight: '600' }}>Hyperlocal community workshop</strong> to share my knowledge of Augmented Reality and Basics of Lens Studio.
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Collaboration Info Container */}
                                                <div style={{
                                                    display: 'flex',
                                                    gap: '10px',
                                                    alignItems: 'center',
                                                    background: 'rgba(255, 255, 255, 0.03)',
                                                    padding: '8px 12px',
                                                    borderRadius: '6px',
                                                    border: '1px solid rgba(255, 255, 255, 0.05)',
                                                    backdropFilter: 'blur(5px)',
                                                    width: 'fit-content'
                                                }}>
                                                    <img
                                                        src="https://media.licdn.com/dms/image/v2/C560BAQGixHOmwquQXQ/company-logo_200_200/company-logo_200_200/0/1668519541906?e=2147483647&v=beta&t=6NYXwZcOGv4H2SgLnu_e36Wt8aBZMJ6U0ILowKguQoU"
                                                        alt="Under25 Logo"
                                                        style={{
                                                            width: '20px',
                                                            height: '20px',
                                                            borderRadius: '4px',
                                                            border: '1px solid rgba(255,255,255,0.1)',
                                                            objectFit: 'cover'
                                                        }}
                                                    />
                                                    <span style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.75)', fontWeight: '500' }}>
                                                        In collaboration with <strong style={{ color: '#fff', fontWeight: '700' }}>Under25</strong>
                                                    </span>
                                                </div>
                                            </div>
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
                                        </div>
                                        <div className="cert-footer">
                                            <a href="https://coursera.org/verify/professional-cert/FYMT0W2FGSDM" target="_blank" rel="noopener noreferrer"
                                                className="cert-btn">View Credential ↗</a>
                                        </div>
                                    </div>
                                    <div className="cert-bg-preview">
                                        <img src="assets/images/cert-google.webp" alt="Google Certificate Preview" />
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
                                        </div>
                                        <div className="cert-footer">
                                            <a href="https://coursera.org/verify/O0S4GJF3H4BS" target="_blank" rel="noopener noreferrer" className="cert-btn">View Credential ↗</a>
                                        </div>
                                    </div>
                                    <div className="cert-bg-preview">
                                        <img src="assets/images/cert-michigan.webp" alt="U-Michigan Certificate Preview" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>



                    {/* 11. Contact Section */}
                    <section id="contact" style={{ position: 'relative', overflow: 'hidden' }}>
                        {/* Open background interactive physics playground */}
                        <ContactPhysicsArena />

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
                                    <p style={{ margin: 0 }}>© 2026 KARTHIK G RAJ // GEN AI CREATIVE ASSOCIATE</p>
                                </div>
                            </footer>
                        </div>
                    </section>
                </div>

            </main>

            {/* Immersive Cinematic Storytelling Neural Initializer Overlay */}
            {isInitializing && (
                <div className={`system-init-overlay ${initProgress === 100 ? 'fade-out' : ''}`}>
                    <div className="init-grid"></div>
                    <div className="init-hud-card">
                        <div className="hud-body">
                            {/* Counter-Rotating Concentric Scanner Ring Loader */}
                            <div className="hud-scanner-section">
                                <div className="hud-concentric-scanner">
                                    <div className="hud-ring ring-1"></div>
                                    <div className="hud-ring ring-2"></div>
                                    <div className="hud-ring ring-3"></div>
                                    <div className="hud-scanner-glow"></div>
                                </div>
                            </div>

                            <div className="console-progress-section">
                                <div className="progress-label">LOADING... {initProgress}%</div>
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
