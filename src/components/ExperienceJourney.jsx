import React, { useState, useEffect } from 'react';
import { mockVideos, mockPosters, locations } from '../data/portfolioData';
import LazyVideo from './LazyVideo';

export default function ExperienceJourney({ locIdx, simTime }) {
    const [creativeType, setCreativeType] = useState('video');
    const [creativeIdx, setCreativeIdx] = useState(0);
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

    return (
        <section id="experience-journey">
            <div className="container">
                <div className="section-header text-center">
                    <h2 className="section-heading reveal-text" style={{ marginBottom: '10px' }}>Experience Journey</h2>
                </div>

                <div className="xp-windows-container">

                    {/* ─── WINDOW 1: AdMitra (Fal.ai Inspired) ─── */}
                    <div className="xp-interface-window xp-window-fal" data-theme="ai">
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
                                                    Directed end-to-end <strong style={{ color: '#3B82F6', fontWeight: '600' }}>multimodal AI content production</strong> for hyperlocal advertising campaigns across video and poster formats at scale. Translated brand strategy into structured storyboards, localized narratives, and <strong style={{ color: '#3B82F6', fontWeight: '600' }}>multi-language AI-generated campaign assets</strong> while developing <strong style={{ color: '#3B82F6', fontWeight: '600' }}>content policies and responsible AI guardrails</strong>.
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
                                                    Managed high-volume creative production workflows delivering <strong style={{ color: '#3B82F6', fontWeight: '600' }}>100+ localized creatives monthly</strong>. Worked closely with <strong style={{ color: '#3B82F6', fontWeight: '600' }}>technical teams to bring more AI capabilities</strong> into multimodal content generation workflows and <strong style={{ color: '#3B82F6', fontWeight: '600' }}>streamline campaign execution</strong>.
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

                                {/* Right Side: High-fidelity Hyperlocal Targeting telemetry */}
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
                                                                            <LazyVideo
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
                                                                                tabIndex={0}
                                                                                role="button"
                                                                                aria-label={isLiked ? "Unlike video" : "Like video"}
                                                                                onKeyDown={(e) => {
                                                                                    if (e.key === 'Enter' || e.key === ' ') {
                                                                                        e.preventDefault();
                                                                                        handleLikeClick(e);
                                                                                    }
                                                                                }}
                                                                            >
                                                                                <div className="sim-action-icon-wrapper heart" style={{ color: isLiked ? '#ff3b30' : 'inherit' }}>
                                                                                    <svg viewBox="0 0 24 24" width="10" height="10" fill={isLiked ? 'currentColor' : 'none'} stroke={isLiked ? '#ff3b30' : 'currentColor'} strokeWidth="2.2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                                                                                </div>
                                                                            </div>
 
                                                                            {/* Share */}
                                                                            <div className="sim-action-btn" tabIndex={0} role="button" aria-label="Share video">
                                                                                <div className="sim-action-icon-wrapper share">
                                                                                    <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"></path></svg>
                                                                                </div>
                                                                            </div>
 
                                                                            {/* Mute/Unmute Audio Toggle */}
                                                                            <div
                                                                                className="sim-action-btn speaker-btn"
                                                                                onClick={(e) => {
                                                                                    e.stopPropagation();
                                                                                    setIsVideoMuted(prev => !prev);
                                                                                }}
                                                                                style={{ cursor: 'pointer', marginTop: '4px' }}
                                                                                title={isVideoMuted ? "Unmute video" : "Mute video"}
                                                                                tabIndex={0}
                                                                                role="button"
                                                                                aria-label={isVideoMuted ? "Unmute video" : "Mute video"}
                                                                                onKeyDown={(e) => {
                                                                                    if (e.key === 'Enter' || e.key === ' ') {
                                                                                        e.preventDefault();
                                                                                        e.stopPropagation();
                                                                                        setIsVideoMuted(prev => !prev);
                                                                                    }
                                                                                }}
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
                                                                                        loading="lazy"
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
                                                                                    tabIndex={0}
                                                                                    role="button"
                                                                                    aria-label={isLiked ? "Unlike photo" : "Like photo"}
                                                                                    onKeyDown={(e) => {
                                                                                        if (e.key === 'Enter' || e.key === ' ') {
                                                                                            e.preventDefault();
                                                                                            handleLikeClick(e);
                                                                                        }
                                                                                    }}
                                                                                >
                                                                                    <svg viewBox="0 0 24 24" width="10" height="10" fill={isLiked ? 'currentColor' : 'none'} stroke={isLiked ? '#ff3b30' : 'currentColor'} strokeWidth="2.2" className="post-heart-svg"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                                                                                </span>
                                                                                <span className="sim-action-btn-post share" style={{ color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center' }} tabIndex={0} role="button" aria-label="Share photo">
                                                                                    <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2.2" className="post-share-svg"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"></path></svg>
                                                                                </span>
                                                                            </div>
                                                                            <span className="sim-action-btn-post bookmark" style={{ color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center' }} tabIndex={0} role="button" aria-label="Bookmark photo">
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
                                                                        }} onClick={() => alert('View all 42 comments!')}
                                                                           tabIndex={0}
                                                                           role="button"
                                                                           onKeyDown={(e) => {
                                                                               if (e.key === 'Enter' || e.key === ' ') {
                                                                                   e.preventDefault();
                                                                                   alert('View all 42 comments!');
                                                                               }
                                                                           }}
                                                                        >
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
                                                                        tabIndex={0}
                                                                        role="button"
                                                                        aria-label={`Switch to slide ${idx + 1}`}
                                                                        onKeyDown={(e) => {
                                                                            if (e.key === 'Enter' || e.key === ' ') {
                                                                                e.preventDefault();
                                                                                setCreativeIdx(idx);
                                                                            }
                                                                        }}
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
                    <div className="xp-interface-window xp-window-davinci" data-theme="video">
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
                    <div className="xp-interface-window xp-window-lens" data-theme="ar">
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
