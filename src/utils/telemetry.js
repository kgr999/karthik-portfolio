export const getTelemetryLogs = (categoryName, toolName) => {
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
