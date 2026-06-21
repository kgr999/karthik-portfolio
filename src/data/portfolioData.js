export const mockVideos = [
    { id: 1, title: "Montra e-SCV Campaign", subtitle: "Best e-SCV", bg: "#000", videoSrc: "/assets/videos/montrascvmob.mp4" },
    { id: 2, title: "Ampere Nexus", subtitle: "Product Showdown", bg: "#000", videoSrc: "/assets/videos/amperemob.mp4" },
    { id: 3, title: "Super Auto", subtitle: "Emotive Storytelling", bg: "#000", videoSrc: "/assets/videos/montraelectricmob.mp4" },
    { id: 4, title: "Diesel Drama", subtitle: "Lincoln Pharma", bg: "#000", videoSrc: "/assets/videos/dieseldrama_comp.mp4" },
    { id: 5, title: "Eko Girl", subtitle: "Prismara Campaign", bg: "#000", videoSrc: "/assets/videos/empower.mp4" },
    { id: 6, title: "Sky Man", subtitle: "AR Campaign", bg: "#000", videoSrc: "/assets/videos/aerialworkplatform.mp4" },
    { id: 7, title: "Trusted By Many", subtitle: "Brand Trust Campaign", bg: "#000", videoSrc: "/assets/videos/trustedbymany_comp.mp4" }
];

export const mockPosters = [
    { id: 1, title: "Montra e-SCV Poster", desc: "Hyperlocal campaign creative", bg: "#09090b", posterSrc: "/assets/images/montrascvposter.webp" },
    { id: 2, title: "RCB x SuperAuto", desc: "Hyperlocal campaign creative", bg: "#09090b", posterSrc: "/assets/images/rcb_superauto.webp" },
    { id: 3, title: "May Day", desc: "Hyperlocal campaign creative", bg: "#09090b", posterSrc: "/assets/images/mayday.webp" }
];

export const locations = [
    { city: "Bengaluru", lang: "ಕನ್ನಡ" },
    { city: "Delhi", lang: "हिंदी" },
    { city: "Mumbai", lang: "मराठी" },
    { city: "Chennai", lang: "தமிழ்" },
    { city: "Assam", lang: "অসমীয়া" },
    { city: "Kerala", lang: "മലയാളം" },
    { city: "Telangana", lang: "తెలుగు" },
    { city: "West Bengal", lang: "বাংলা" }
];

export const techStackCategories = [
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
            { name: "DaVinci Resolve", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/DaVinci_Resolve_Studio.png/250px-DaVinci_Resolve_Studio.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail", glow: "#05FF99", level: "90%", learning: true }
        ]
    }
];
