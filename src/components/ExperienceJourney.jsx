import React, { useState, useEffect } from 'react';
import { mockVideos, mockPosters, locations } from '../data/portfolioData';
import LazyVideo from './LazyVideo';

export default function ExperienceJourney({ locIdx, simTime }) {
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

    return (
        <section id="experience-journey">
            <div className="container">
                <div className="section-header text-center">
                    <h2 className="section-heading reveal-text" style={{ marginBottom: '10px' }}>Experience Journey</h2>
                </div>

                <div className="xp-windows-container">

                    {/* ─── WINDOW 0: Kuku TV (Streaming Interface Inspired) ─── */}
                    <div className="xp-interface-window xp-window-kuku" data-theme="kuku">
                        {/* Kuku TV Mockup Layout */}
                        <div className="xp-window-body" style={{ flexDirection: 'column', background: '#050506', position: 'relative', overflow: 'hidden' }}>
                            {/* Background Video — covers entire section */}
                            <LazyVideo
                                src="/assets/videos/storyboardingoutput.mp4"
                                autoPlay
                                loop
                                muted
                                playsInline
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    objectPosition: 'center 20%',
                                    zIndex: 0
                                }}
                            />
                            {/* Gradient Overlay */}
                            <div style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                background: 'linear-gradient(to right, #050506 35%, rgba(5, 5, 6, 0.6) 60%, rgba(5, 5, 6, 0) 100%)',
                                zIndex: 1
                            }}></div>

                            {/* Kuku TV Nav Bar */}
                            <div className="kuku-tv-nav" style={{ position: 'relative', zIndex: 2 }}>
                                <div className="kuku-tv-nav-left">
                                    {/* Kuku TV Logos */}
                                    <img
                                        src="/assets/images/kukutv-logo.png"
                                        alt="Kuku TV Logo"
                                        style={{ height: '39px', width: 'auto', objectFit: 'contain', flexShrink: 0 }}
                                    />
                                    <img
                                        src="/assets/images/kukutv-icon.png"
                                        alt="Wow TV Logo"
                                        style={{ height: '70px', width: 'auto', objectFit: 'contain', flexShrink: 0 }}
                                    />
                                </div>
                                <div className="kuku-tv-nav-right">
                                    {/* Language drop */}
                                    <div className="kuku-tv-lang" style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(255,255,255,0.08)', padding: '4px 8px', borderRadius: '15px', fontSize: '0.7rem', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer' }}>
                                        <span>हिंदी</span>
                                        <svg viewBox="0 0 24 24" width="10" height="10" stroke="currentColor" strokeWidth="2.5" fill="none"><polyline points="6 9 12 15 18 9"></polyline></svg>
                                    </div>

                                    {/* Log In btn */}
                                    <button className="kuku-tv-login-btn" style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', fontSize: '0.72rem', fontWeight: '600', padding: '5px 12px', borderRadius: '15px', cursor: 'pointer' }}>
                                        Log In
                                    </button>
                                </div>
                            </div>

                            {/* Hero Section */}
                            <div className="kuku-tv-hero" style={{ position: 'relative', zIndex: 2 }}>
                                <div className="kuku-tv-hero-content">
                                    <h2 className="kuku-tv-show-title">AI Video Producer</h2>
                                    <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', fontFamily: 'monospace', marginTop: '-8px', display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'flex-start' }}>
                                        <span>Bengaluru · kuku</span>
                                        <span className="xp-date-shimmer kuku-date-accent" style={{ marginTop: '2px' }}>June 2026 – Present</span>
                                    </p>

                                    {/* Custom Job Tags */}
                                    <div className="kuku-tv-tags">
                                        <span className="kuku-tv-tag">AI Microdrama Production</span>
                                    </div>

                                    {/* Description cards */}
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.78rem', color: 'rgba(255, 255, 255, 0.9)', lineHeight: '1.45', maxWidth: '520px' }}>
                                        <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', background: 'rgba(229, 9, 20, 0.06)', borderLeft: '3px solid #E50914', borderRadius: '0 8px 8px 0', padding: '12px 14px', backdropFilter: 'blur(4px)' }}>
                                            <div style={{
                                                background: 'rgba(229, 9, 20, 0.15)',
                                                border: '1px solid rgba(229, 9, 20, 0.3)',
                                                borderRadius: '50%',
                                                width: '20px',
                                                height: '20px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                flexShrink: 0,
                                                marginTop: '1px',
                                                boxShadow: '0 0 10px rgba(229, 9, 20, 0.15)'
                                            }}>
                                                <span style={{ color: '#E50914', fontSize: '0.75rem', fontWeight: 'bold' }}>✦</span>
                                            </div>
                                            <p style={{ margin: 0 }}>Own the full script-to-screen pipeline. Read a script, break it into shots and scenes, then use AI tools to generate video content for Kuku's microdrama format.</p>
                                        </div>
                                        <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', background: 'rgba(229, 9, 20, 0.06)', borderLeft: '3px solid #E50914', borderRadius: '0 8px 8px 0', padding: '12px 14px', backdropFilter: 'blur(4px)' }}>
                                            <div style={{
                                                background: 'rgba(229, 9, 20, 0.15)',
                                                border: '1px solid rgba(229, 9, 20, 0.3)',
                                                borderRadius: '50%',
                                                width: '20px',
                                                height: '20px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                flexShrink: 0,
                                                marginTop: '1px',
                                                boxShadow: '0 0 10px rgba(229, 9, 20, 0.15)'
                                            }}>
                                                <span style={{ color: '#E50914', fontSize: '0.75rem', fontWeight: 'bold' }}>✦</span>
                                            </div>
                                            <p style={{ margin: 0 }}>Obsess over continuity. Make sure characters, wardrobe, and settings stay consistent shot-to-shot through careful prompting and reference-driven workflows.</p>
                                        </div>
                                        <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', background: 'rgba(229, 9, 20, 0.06)', borderLeft: '3px solid #E50914', borderRadius: '0 8px 8px 0', padding: '12px 14px', backdropFilter: 'blur(4px)' }}>
                                            <div style={{
                                                background: 'rgba(229, 9, 20, 0.15)',
                                                border: '1px solid rgba(229, 9, 20, 0.3)',
                                                borderRadius: '50%',
                                                width: '20px',
                                                height: '20px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                flexShrink: 0,
                                                marginTop: '1px',
                                                boxShadow: '0 0 10px rgba(229, 9, 20, 0.15)'
                                            }}>
                                                <span style={{ color: '#E50914', fontSize: '0.75rem', fontWeight: 'bold' }}>✦</span>
                                            </div>
                                            <p style={{ margin: 0 }}>Helped build the AI production playbook from day one. Stitching together Higgsfield and ElevenLabs into a repeatable process, with post-production on Premiere Pro.</p>
                                        </div>
                                        <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', background: 'rgba(229, 9, 20, 0.06)', borderLeft: '3px solid #E50914', borderRadius: '0 8px 8px 0', padding: '12px 14px', backdropFilter: 'blur(4px)' }}>
                                            <div style={{
                                                background: 'rgba(229, 9, 20, 0.15)',
                                                border: '1px solid rgba(229, 9, 20, 0.3)',
                                                borderRadius: '50%',
                                                width: '20px',
                                                height: '20px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                flexShrink: 0,
                                                marginTop: '1px',
                                                boxShadow: '0 0 10px rgba(229, 9, 20, 0.15)'
                                            }}>
                                                <span style={{ color: '#E50914', fontSize: '0.75rem', fontWeight: 'bold' }}>✦</span>
                                            </div>
                                            <p style={{ margin: 0 }}>Work closely with editors and the creative team to shape the final output, iterating fast in a 0→1 startup environment building for Indian audiences at scale.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ─── WINDOW 1: AdMitra (Fal.ai Inspired) ─── */}
                    <div className="xp-interface-window xp-window-fal" data-theme="ai">
                        <div className="xp-window-body">
                            {/* AdMitra Workspace Main Dashboard */}
                            <div className="xp-window-main">
                                {/* Left Side: Professional Experience Details & Clients */}
                                <div className="xp-left-pane">
                                    <div>
                                        <div className="xp-main-header" style={{ marginBottom: '16px' }}>
                                            {/* Inline logo */}
                                            <div className="xp-admitra-logo" style={{ marginBottom: '12px' }}>
                                                <div style={{ width: '120px', height: '32px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    <img
                                                        src="/assets/images/admitra.png"
                                                        alt="AdMitra Logo"
                                                        style={{ width: '120px', height: '120px', objectFit: 'contain', display: 'block', opacity: 0.95 }}
                                                    />
                                                </div>
                                            </div>
                                            <h3 style={{ fontSize: '1.75rem', fontWeight: '800', color: '#fff', marginBottom: '6px' }}>Creative Head</h3>
                                            <p style={{ fontSize: '0.85rem', color: '#3B82F6', fontFamily: 'monospace', fontWeight: '600' }}>
                                                Bengaluru · AdMitra Pvt. Ltd. &nbsp;&nbsp; <span className="xp-date-shimmer">February 2026 – May 2026</span>
                                            </p>
                                        </div>
                                        <div className="xp-main-desc" style={{ fontSize: '0.82rem', lineHeight: '1.45', color: 'rgba(255,255,255,0.75)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
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
                                                <p style={{ margin: 0, color: 'rgba(255, 255, 255, 0.85)', fontSize: '0.8rem', lineHeight: '1.4' }}>
                                                    Led end-to-end <strong style={{ color: '#3B82F6', fontWeight: '600' }}>AI-powered creative operations</strong> for hyperlocal advertising campaigns across video and poster formats at scale, translating brand strategy into structured storyboards and localized narratives.
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
                                                <p style={{ margin: 0, color: 'rgba(255, 255, 255, 0.85)', fontSize: '0.8rem', lineHeight: '1.4' }}>
                                                    Managed high-volume creative production workflows delivering <strong style={{ color: '#3B82F6', fontWeight: '600' }}>100+ localized creatives monthly</strong>, collaborating directly with founders and brand stakeholders to streamline campaign execution.
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
                                                <p style={{ margin: 0, color: 'rgba(255, 255, 255, 0.85)', fontSize: '0.8rem', lineHeight: '1.4' }}>
                                                    Collaborated closely with <strong style={{ color: '#3B82F6', fontWeight: '600' }}>technical and engineering team</strong> to integrate advanced AI creation tools, streamlining workflows and accelerating project delivery times.
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
                                                <div className="xp-brand-logo-btn xp-brand-prismara">
                                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '24px', height: '24px', background: 'rgba(255,255,255,0.05)', borderRadius: '6px', padding: '4px', overflow: 'hidden', position: 'relative' }}>
                                                        <img
                                                            src="https://media.licdn.com/dms/image/v2/D560BAQERAGOWIeST7A/company-logo_200_200/B56ZyZEB9vGwAI-/0/1772094497178/prismarajewels_logo?e=2147483647&v=beta&t=mLLSJn1qN6PzFsOhFcQ9XNZumI49NYMv_sVxLhOOZ0A"
                                                            onError={(e) => {
                                                                if (!e.target.dataset.triedFallback) {
                                                                    e.target.dataset.triedFallback = 'true';
                                                                    e.target.src = "https://www.google.com/s2/favicons?domain=prismara.com&sz=128";
                                                                } else {
                                                                    e.target.style.display = 'none';
                                                                    if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
                                                                }
                                                            }}
                                                            className="xp-brand-logo-btn-icon"
                                                            alt="Prismara"
                                                            style={{ width: '100%', height: '100%', objectFit: 'contain', zIndex: 2 }}
                                                        />
                                                        <div className="xp-logo-fallback-text" style={{ display: 'none', position: 'absolute', inset: 0, alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: '800', color: '#FFB6C1', zIndex: 1 }}>
                                                            P
                                                        </div>
                                                    </div>
                                                    <span style={{ fontSize: '0.85rem', fontWeight: '600' }}>Prismara</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                {/* Right Side: Auto-scrolling Hyperlocal Creative Marquee */}
                                <div className="hyperlocal-marquee-wrapper">
                                    {/* Header */}
                                    <div className="hyperlocal-marquee-header">
                                        <span className="hyperlocal-marquee-dot"></span>
                                        <span className="hyperlocal-marquee-title">Hyperlocal Engine</span>
                                    </div>

                                    {/* Subtitle */}
                                    <p className="hyperlocal-marquee-subtitle">
                                        AI-generated video ads & posters, localized for {locations.length} regional markets
                                    </p>

                                    {/* Auto-scrolling Marquee Track 1 (Videos - Right to Left) */}
                                    <div className="hyperlocal-marquee-viewport">
                                        <div className="hyperlocal-marquee-track">
                                            {/* First set of items */}
                                            {mockVideos.map((video, idx) => (
                                                <div className="hyperlocal-marquee-card video-card" key={`v-${video.id}`}>
                                                    <div className="marquee-card-bezel">
                                                        <LazyVideo
                                                            src={video.videoSrc}
                                                            autoPlay
                                                            loop
                                                            muted
                                                            playsInline
                                                            style={{
                                                                width: '100%',
                                                                height: '100%',
                                                                objectFit: 'cover',
                                                                borderRadius: '10px'
                                                            }}
                                                        />
                                                    </div>
                                                    <span className="marquee-card-label">{video.title}</span>
                                                </div>
                                            ))}
                                            {/* Duplicate set for seamless loop */}
                                            {mockVideos.map((video, idx) => (
                                                <div className="hyperlocal-marquee-card video-card" key={`v2-${video.id}`}>
                                                    <div className="marquee-card-bezel">
                                                        <LazyVideo
                                                            src={video.videoSrc}
                                                            autoPlay
                                                            loop
                                                            muted
                                                            playsInline
                                                            style={{
                                                                width: '100%',
                                                                height: '100%',
                                                                objectFit: 'cover',
                                                                borderRadius: '10px'
                                                            }}
                                                        />
                                                    </div>
                                                    <span className="marquee-card-label">{video.title}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Auto-scrolling Marquee Track 2 (Posters - Left to Right) */}
                                    <div className="hyperlocal-marquee-viewport" style={{ marginTop: '10px' }}>
                                        <div className="hyperlocal-marquee-track track-reverse">
                                            {/* First set of items */}
                                            {mockPosters.map((poster, idx) => (
                                                <div className="hyperlocal-marquee-card poster-card" key={`p-${poster.id}`}>
                                                    <div className="marquee-card-bezel poster-bezel">
                                                        <img
                                                            src={poster.posterSrc}
                                                            alt={poster.title}
                                                            loading="lazy"
                                                            style={{
                                                                width: '100%',
                                                                height: '100%',
                                                                objectFit: 'cover',
                                                                borderRadius: '8px'
                                                            }}
                                                        />
                                                    </div>
                                                    <span className="marquee-card-label">{poster.title}</span>
                                                </div>
                                            ))}
                                            {/* Duplicate set for seamless loop */}
                                            {mockPosters.map((poster, idx) => (
                                                <div className="hyperlocal-marquee-card poster-card" key={`p2-${poster.id}`}>
                                                    <div className="marquee-card-bezel poster-bezel">
                                                        <img
                                                            src={poster.posterSrc}
                                                            alt={poster.title}
                                                            loading="lazy"
                                                            style={{
                                                                width: '100%',
                                                                height: '100%',
                                                                objectFit: 'cover',
                                                                borderRadius: '8px'
                                                            }}
                                                        />
                                                    </div>
                                                    <span className="marquee-card-label">{poster.title}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Location & Language Grid */}
                                    <div className="hyperlocal-marquee-locations">
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

                    {/* ─── WINDOW 2: Freelance (DaVinci Resolve Inspired) ─── */}
                    <div className="xp-interface-window xp-window-davinci" data-theme="video">
                        <div className="xp-window-body">
                            <div className="xp-window-top">
                                <div className="xp-media-pool">
                                    <h4><svg viewBox="0 0 24 24" width="13" height="13" stroke="currentColor" strokeWidth="2" fill="none" style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }}><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect><line x1="7" y1="2" x2="7" y2="22"></line><line x1="17" y1="2" x2="17" y2="22"></line><line x1="2" y1="12" x2="22" y2="12"></line></svg> Media Pool</h4>
                                    <div className="xp-pool-grid" style={{ marginBottom: '16px' }}>
                                        <div className="xp-pool-item"><img src="/assets/images/da.avif" alt="DaVinci Resolve - Cinematic Video Editing Project" style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" /></div>
                                        <div className="xp-pool-item"><img src="/assets/images/da1.png" alt="DaVinci Resolve - Post Production Audio Timeline" style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" /></div>
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
                                                    e.currentTarget.style.borderColor = '#ffffff';
                                                    e.currentTarget.style.color = '#fff';
                                                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
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
                                    <div className="xp-pool-buttons" style={{ display: 'flex', flexDirection: 'column', gap: '6px', borderTop: '1px solid rgba(255, 255, 255, 0.05)', paddingTop: '16px', alignItems: 'stretch' }}>
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
                                                    background: 'rgba(255, 255, 255, 0.08)',
                                                    border: '1px solid rgba(255, 255, 255, 0.2)',
                                                    borderRadius: '50%',
                                                    width: '22px',
                                                    height: '22px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    flexShrink: 0,
                                                    marginTop: '2px',
                                                    boxShadow: '0 0 10px rgba(255, 255, 255, 0.05)'
                                                }}>
                                                    <span style={{ color: '#FFFFFF', fontSize: '0.75rem', fontWeight: 'bold' }}>✦</span>
                                                </div>
                                                <p style={{ margin: 0, color: 'rgba(255, 255, 255, 0.85)', fontSize: '0.85rem', lineHeight: '1.5' }}>
                                                    Collaborated with <strong style={{ color: '#FFFFFF', fontWeight: '600' }}>regional tech creators</strong> to produce <strong style={{ color: '#FFFFFF', fontWeight: '600' }}>high-retention content</strong>.
                                                </p>
                                            </div>

                                            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                                                <div style={{
                                                    background: 'rgba(255, 255, 255, 0.08)',
                                                    border: '1px solid rgba(255, 255, 255, 0.2)',
                                                    borderRadius: '50%',
                                                    width: '22px',
                                                    height: '22px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    flexShrink: 0,
                                                    marginTop: '2px',
                                                    boxShadow: '0 0 10px rgba(255, 255, 255, 0.05)'
                                                }}>
                                                    <span style={{ color: '#FFFFFF', fontSize: '0.75rem', fontWeight: 'bold' }}>✦</span>
                                                </div>
                                                <p style={{ margin: 0, color: 'rgba(255, 255, 255, 0.85)', fontSize: '0.85rem', lineHeight: '1.5' }}>
                                                    Delivered <strong style={{ color: '#FFFFFF', fontWeight: '600' }}>strategy and editing</strong> that boosted <strong style={{ color: '#FFFFFF', fontWeight: '600' }}>engagement and localized reach</strong>.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="xp-inspector" style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '12px 10px', background: '#121215', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                                    <h4 style={{ fontSize: '0.72rem', fontWeight: '700', color: '#FFF', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '6px', marginBottom: '2px', letterSpacing: '1.2px', display: 'flex', alignItems: 'center' }}>
                                        <svg viewBox="0 0 24 24" width="12" height="12" stroke="#FFFFFF" strokeWidth="2.5" fill="none" style={{ display: 'inline', marginRight: '8px', verticalAlign: 'middle' }}><line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line><line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line><line x1="17" y1="16" x2="23" y2="16"></line></svg>
                                        Skills
                                    </h4>

                                    {/* Skill 1 */}
                                    <div className="xp-slider-group" style={{ background: 'rgba(255,255,255,0.015)', border: '1px solid rgba(255,255,255,0.03)', borderRadius: '6px', padding: '8px', gap: '6px', display: 'flex', flexDirection: 'column', transition: 'all 0.25s' }} onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; }} onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.015)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.03)'; }}>
                                        <div className="xp-slider-label-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                <span style={{ width: '6px', height: '6px', borderRadius: '1px', background: '#FFFFFF', boxShadow: '0 0 6px #FFFFFF', display: 'inline-block' }}></span>
                                                <span style={{ fontSize: '0.66rem', color: '#FFF', fontWeight: '600', letterSpacing: '0.2px' }}>Personalized AI B-Rolls</span>
                                            </div>
                                            <div className="xp-slider-reset" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', color: 'rgba(255,255,255,0.4)', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#FFFFFF'} onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}>
                                                <svg viewBox="0 0 24 24" width="8" height="8" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M23 4v6h-6"></path><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path></svg>
                                            </div>
                                        </div>
                                        <div className="xp-slider" style={{ height: '4px', background: 'rgba(0,0,0,0.4)', borderRadius: '2px', position: 'relative', overflow: 'visible', cursor: 'pointer', margin: '4px 0' }}>
                                            <div className="xp-slider-fill" style={{ width: '80%', height: '100%', borderRadius: '2px', background: 'linear-gradient(90deg, #FFFFFF 0%, #E4E4E7 100%)', boxShadow: '0 0 8px rgba(255, 255, 255, 0.15)', transition: 'width 0.8s cubic-bezier(0.16, 1, 0.3, 1)' }}>
                                                <div className="xp-slider-thumb" style={{ position: 'absolute', right: '-4px', top: '50%', transform: 'translateY(-50%)', width: '8px', height: '8px', borderRadius: '50%', background: '#FFF', border: '1.5px solid #FFFFFF', boxShadow: '0 0 4px rgba(255, 255, 255, 0.6)', transition: 'transform 0.2s' }}></div>
                                            </div>
                                        </div>
                                    </div>


                                    {/* Skill 4 */}
                                    <div className="xp-slider-group" style={{ background: 'rgba(255,255,255,0.015)', border: '1px solid rgba(255,255,255,0.03)', borderRadius: '6px', padding: '8px', gap: '6px', display: 'flex', flexDirection: 'column', transition: 'all 0.25s' }} onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; }} onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.015)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.03)'; }}>
                                        <div className="xp-slider-label-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                <span style={{ width: '6px', height: '6px', borderRadius: '1px', background: '#FFFFFF', boxShadow: '0 0 6px #FFFFFF', display: 'inline-block' }}></span>
                                                <span style={{ fontSize: '0.66rem', color: '#FFF', fontWeight: '600', letterSpacing: '0.2px' }}>Video Pacing & Sound Design</span>
                                            </div>
                                            <div className="xp-slider-reset" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', color: 'rgba(255,255,255,0.4)', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#FFFFFF'} onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}>
                                                <svg viewBox="0 0 24 24" width="8" height="8" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M23 4v6h-6"></path><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path></svg>
                                            </div>
                                        </div>
                                        <div className="xp-slider" style={{ height: '4px', background: 'rgba(0,0,0,0.4)', borderRadius: '2px', position: 'relative', overflow: 'visible', cursor: 'pointer', margin: '4px 0' }}>
                                            <div className="xp-slider-fill" style={{ width: '70%', height: '100%', borderRadius: '2px', background: 'linear-gradient(90deg, #FFFFFF 0%, #E4E4E7 100%)', boxShadow: '0 0 8px rgba(255, 255, 255, 0.15)', transition: 'width 0.8s cubic-bezier(0.16, 1, 0.3, 1)' }}>
                                                <div className="xp-slider-thumb" style={{ position: 'absolute', right: '-4px', top: '50%', transform: 'translateY(-50%)', width: '8px', height: '8px', borderRadius: '50%', background: '#FFF', border: '1.5px solid #FFFFFF', boxShadow: '0 0 4px rgba(255, 255, 255, 0.6)', transition: 'transform 0.2s' }}></div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Skill 5 */}
                                    <div className="xp-slider-group" style={{ background: 'rgba(255,255,255,0.015)', border: '1px solid rgba(255,255,255,0.03)', borderRadius: '6px', padding: '8px', gap: '6px', display: 'flex', flexDirection: 'column', transition: 'all 0.25s' }} onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; }} onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.015)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.03)'; }}>
                                        <div className="xp-slider-label-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                <span style={{ width: '6px', height: '6px', borderRadius: '1px', background: '#FFFFFF', boxShadow: '0 0 6px #FFFFFF', display: 'inline-block' }}></span>
                                                <span style={{ fontSize: '0.66rem', color: '#FFF', fontWeight: '600', letterSpacing: '0.2px' }}>Content Research & Strategy</span>
                                            </div>
                                            <div className="xp-slider-reset" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', color: 'rgba(255,255,255,0.4)', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#FFFFFF'} onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}>
                                                <svg viewBox="0 0 24 24" width="8" height="8" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M23 4v6h-6"></path><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path></svg>
                                            </div>
                                        </div>
                                        <div className="xp-slider" style={{ height: '4px', background: 'rgba(0,0,0,0.4)', borderRadius: '2px', position: 'relative', overflow: 'visible', cursor: 'pointer', margin: '4px 0' }}>
                                            <div className="xp-slider-fill" style={{ width: '75%', height: '100%', borderRadius: '2px', background: 'linear-gradient(90deg, #FFFFFF 0%, #E4E4E7 100%)', boxShadow: '0 0 8px rgba(255, 255, 255, 0.15)', transition: 'width 0.8s cubic-bezier(0.16, 1, 0.3, 1)' }}>
                                                <div className="xp-slider-thumb" style={{ position: 'absolute', right: '-4px', top: '50%', transform: 'translateY(-50%)', width: '8px', height: '8px', borderRadius: '50%', background: '#FFF', border: '1.5px solid #FFFFFF', boxShadow: '0 0 4px rgba(255, 255, 255, 0.6)', transition: 'transform 0.2s' }}></div>
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
                                            onMouseEnter={(e) => { e.currentTarget.style.color = '#ffffff'; e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'; }}
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
                                                color: '#ffffff',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                padding: '4px',
                                                borderRadius: '4px',
                                                transition: 'all 0.2s ease',
                                                outline: 'none'
                                            }}
                                            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'; }}
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
                                            onMouseEnter={(e) => { e.currentTarget.style.color = '#ffffff'; e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'; }}
                                            onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255, 255, 255, 0.45)'; e.currentTarget.style.background = 'transparent'; }}
                                            title="Skip to End"
                                        >
                                            <svg viewBox="0 0 24 24" width="11" height="11" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 19 22 12 13 5 13 19"></polygon><polygon points="2 19 11 12 2 5 2 19"></polygon></svg>
                                        </button>
                                    </div>

                                    <div className="xp-dvr-tabs">
                                        <span>Media</span><span className="active">Edit</span><span>Color</span>
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

                                {/* Mobile-optimized transport controls */}
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
                                        style={{ color: '#FFFFFF' }}
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
                    <div className="xp-interface-window xp-window-lens" data-theme="ar">
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
                                            <LazyVideo
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

                                    {/* Bulleted points */}
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
    );
}
