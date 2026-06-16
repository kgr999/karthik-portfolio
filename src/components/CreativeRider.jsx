import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CreativeRider({ isOpen, onClose, theme }) {
    const [copied, setCopied] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [selectedServices, setSelectedServices] = useState([]);
    const [brief, setBrief] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [formStep, setFormStep] = useState(1);

    // Interactive Console States
    const [isTransmitting, setIsTransmitting] = useState(false);
    const [transmissionProgress, setTransmissionProgress] = useState(0);
    const [transmissionLog, setTransmissionLog] = useState('');
    const [bookingCode, setBookingCode] = useState('');

    const handleCopyEmail = () => {
        navigator.clipboard.writeText('hello@karthikgraj.in');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const servicesList = [
        {
            id: "ai-films",
            label: "AI Short Films & Microdramas",
            desc: "Cinematic narrative production leveraging state-of-the-art visual generation pipelines.",
            icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect>
                    <line x1="7" y1="2" x2="7" y2="22"></line>
                    <line x1="17" y1="2" x2="17" y2="22"></line>
                    <line x1="2" y1="12" x2="22" y2="12"></line>
                    <line x1="2" y1="7" x2="7" y2="7"></line>
                    <line x1="2" y1="17" x2="7" y2="17"></line>
                    <line x1="17" y1="17" x2="22" y2="17"></line>
                    <line x1="17" y1="7" x2="22" y2="7"></line>
                </svg>
            ),
            color: "#00f0ff" // Cyan
        },
        {
            id: "ai-ads",
            label: "AI Ads & Commercials",
            desc: "High-impact social hooks and visually stunning commercial spots.",
            icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                </svg>
            ),
            color: "#ff007f" // Pink
        },
        {
            id: "short-form",
            label: "Short-Form Video Editing",
            desc: "Dynamic, hyper-engaging edits for TikTok, Reels, and YouTube Shorts.",
            icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="6" cy="6" r="3"></circle>
                    <circle cx="6" cy="18" r="3"></circle>
                    <line x1="20" y1="4" x2="8.12" y2="15.88"></line>
                    <line x1="14.47" y1="14.48" x2="20" y2="20"></line>
                    <line x1="8.12" y1="8.12" x2="12" y2="12"></line>
                </svg>
            ),
            color: "#a855f7" // Purple
        },
        {
            id: "web-dev",
            label: "Website Building for Businesses",
            desc: "Bespoke, high-performance web experiences designed to capture attention.",
            icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="16 18 22 12 16 6"></polyline>
                    <polyline points="8 6 2 12 8 18"></polyline>
                    <line x1="14" y1="4" x2="10" y2="20"></line>
                </svg>
            ),
            color: "#00ff66" // Emerald
        },
        {
            id: "social-mgmt",
            label: "Social Media Management",
            desc: "Growth hacking, consistent narrative delivery, and cross-platform growth.",
            icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                </svg>
            ),
            color: "#ffcc00" // Gold
        },
        {
            id: "previs-research",
            label: "Content Research & Pre-Vis",
            desc: "Storyboard generation, competitive intelligence, and creative blueprinting.",
            icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
            ),
            color: "#ff6600" // Orange
        }
    ];

    const quickPrompts = [
        "Launch a 9:16 viral campaign",
        "Direct a cinematic product reveal video",
        "Build a modern interactive portfolio site",
        "AI-assisted pre-visualization storyboard"
    ];

    const toggleService = (srvLabel) => {
        if (selectedServices.includes(srvLabel)) {
            setSelectedServices(selectedServices.filter(s => s !== srvLabel));
        } else {
            setSelectedServices([...selectedServices, srvLabel]);
        }
    };

    const handleInjectPrompt = (promptText) => {
        if (brief.trim() === '') {
            setBrief(promptText);
        } else {
            setBrief(prev => `${prev}\n\nI want to: ${promptText}`);
        }
    };

    const getTelemetryStatus = () => {
        const len = brief.trim().length;
        if (len === 0) return { label: "AWAITING INQUIRY TELEMETRY", color: "#ff4444", progress: 0 };
        if (len < 15) return { label: "WEAK // EXPAND BRIEF FOR HIGH PRIORITY ROUTING", color: "#ffaa00", progress: 25 };
        if (len < 50) return { label: "NOMINAL // SUFFICIENT PROJECT DETAILS", color: "#00f0ff", progress: 65 };
        return { label: "OPTIMAL // RICH DETAILS READY FOR TRANSMISSION", color: "#00ff66", progress: 100 };
    };

    const telemetry = getTelemetryStatus();

    useEffect(() => {
        if (formStep === 3 && !bookingCode) {
            const randNum = Math.floor(1000 + Math.random() * 9000);
            setBookingCode(`KGR-BOOK-${randNum}`);
        }
    }, [formStep, bookingCode]);

    const triggerTransmission = (e) => {
        e.preventDefault();
        setIsTransmitting(true);
        setTransmissionProgress(0);
        setTransmissionLog('INITIALIZING UPLINK PROCESSOR...');

        const interval = setInterval(() => {
            setTransmissionProgress((prev) => {
                const next = prev + Math.floor(Math.random() * 8) + 3;
                if (next >= 100) {
                    clearInterval(interval);
                    setTimeout(() => {
                        setIsTransmitting(false);
                        setSubmitted(true);
                        console.log("Inquiry submitted successfully:", { name, email, selectedServices, brief, bookingCode });
                    }, 400);
                    return 100;
                }
                
                if (next < 25) {
                    setTransmissionLog('ESTABLISHING SECURE UPLINK NODE...');
                } else if (next < 50) {
                    setTransmissionLog('ENCRYPTING BRIEF TELEMETRY DATA...');
                } else if (next < 75) {
                    setTransmissionLog('TRANSMITTING PACKETS TO KGR CORE...');
                } else {
                    setTransmissionLog('VALIDATING DELEGATION CREDENTIALS...');
                }
                return next;
            });
        }, 120);
    };

    const vcardData = `BEGIN:VCARD
VERSION:3.0
N:Raj;Karthik;G;;
FN:Karthik G Raj
ORG:AdMitra Marketing;
TITLE:AI Creative Producer
EMAIL;type=INTERNET;type=WORK;type=pref:hello@karthikgraj.in
URL;type=pref:https://karthikgraj.in
END:VCARD`;

    const vcardHref = "data:text/vcard;charset=utf-8," + encodeURIComponent(vcardData);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="rider-overlay"
                    data-lenis-prevent
                    initial={{ x: '100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '100%' }}
                    transition={{ type: 'spring', damping: 26, stiffness: 170 }}
                >
                    <div className="rider-container">
                        <header className="rider-header">
                            <div className="rider-header-title">
                                <span className="rider-eyebrow">Collaboration Specifications</span>
                                <h2>Work With Me</h2>
                            </div>
                            <button className="rider-close-btn" onClick={onClose} aria-label="Close details">
                                <span className="close-text">CLOSE</span>
                                <span className="close-esc">[ESC]</span>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>
                        </header>

                        <div className="rider-content centered-layout">
                            <div className="work-form-wrapper">
                                <p className="form-intro-text">
                                    Deploy state-of-the-art visual content pipelines. Configure capabilities, load parameters, and establish your dedicated uplink below.
                                </p>

                                <div className="work-form-card">
                                    {isTransmitting ? (
                                        <div className="transmission-loader">
                                            <div className="transmission-terminal">
                                                <div className="terminal-header">
                                                    <div className="terminal-dots">
                                                        <div className="terminal-dot red"></div>
                                                        <div className="terminal-dot yellow"></div>
                                                        <div className="terminal-dot green"></div>
                                                    </div>
                                                    <span className="terminal-title">SECURE CORE UPLINK TRANSMISSION</span>
                                                </div>
                                                <div className="terminal-body">
                                                    <div className="terminal-log">{transmissionLog}</div>
                                                    <div className="terminal-progress-section">
                                                        <div className="terminal-percentage">{transmissionProgress}%</div>
                                                        <div className="terminal-progress-bar">
                                                            <div className="terminal-progress-fill" style={{ width: `${transmissionProgress}%` }}></div>
                                                        </div>
                                                    </div>
                                                    <div className="terminal-status-grid">
                                                        <div className="grid-item">
                                                            <span className="lbl">PORT:</span>
                                                            <span className="val">UPLINK_NODE_9</span>
                                                        </div>
                                                        <div className="grid-item">
                                                            <span className="lbl">ENCRYPTION:</span>
                                                            <span className="val">SHA-256 / RSA-4096</span>
                                                        </div>
                                                        <div className="grid-item">
                                                            <span className="lbl">PACKETS:</span>
                                                            <span className="val">{transmissionProgress > 30 ? '128KB/128KB SENT' : 'PREPARING...'}</span>
                                                        </div>
                                                        <div className="grid-item">
                                                            <span className="lbl">STATUS:</span>
                                                            <span className="val text-glowing">{transmissionProgress === 100 ? 'COMPLETE' : 'UPLOADING'}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : submitted ? (
                                        <div className="form-success-container">
                                            <div className="success-icon-wrapper">
                                                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                                    <polyline points="20 6 9 17 4 12"></polyline>
                                                </svg>
                                            </div>
                                            <h4 className="success-title">TRANSMISSION VERIFIED // PROPOSAL STAGED!</h4>
                                            
                                            <div className="success-receipt-badge">
                                                <div className="receipt-row">
                                                    <span className="lbl">BOOKING CODE</span>
                                                    <span className="val code-highlight">{bookingCode}</span>
                                                </div>
                                                <div className="receipt-row">
                                                    <span className="lbl">DELEGATED TO</span>
                                                    <span className="val">{name}</span>
                                                </div>
                                                <div className="receipt-row">
                                                    <span className="lbl">TARGET SYSTEM</span>
                                                    <span className="val">{email}</span>
                                                </div>
                                                <div className="receipt-row">
                                                    <span className="lbl">SERVICES RESERVED</span>
                                                    <span className="val">{selectedServices.join(', ')}</span>
                                                </div>
                                                <div className="receipt-row">
                                                    <span className="lbl">TIMESTAMP</span>
                                                    <span className="val">{new Date().toLocaleString()}</span>
                                                </div>
                                            </div>

                                            <p className="success-desc">Thank you! Your parameters have been logged. I will analyze your project coordinates and establish communications within 24 standard cycles.</p>
                                            <button className="reset-form-btn" type="button" onClick={() => { setSubmitted(false); setName(''); setEmail(''); setSelectedServices([]); setBrief(''); setFormStep(1); setBookingCode(''); }}>
                                                ESTABLISH NEW UPLINK
                                            </button>
                                        </div>
                                    ) : (
                                        <form className="inquiry-form" onSubmit={triggerTransmission}>
                                            {/* OTT Step Indicator */}
                                            <div className="ott-progress-indicator">
                                                <div className="ott-progress-steps">
                                                    <div className={`ott-progress-bar-fill ${formStep >= 1 ? 'active' : ''}`}></div>
                                                    <div className={`ott-progress-bar-fill ${formStep >= 2 ? 'active' : ''}`}></div>
                                                    <div className={`ott-progress-bar-fill ${formStep >= 3 ? 'active' : ''}`}></div>
                                                </div>
                                                <div className="ott-step-label">
                                                    STEP {formStep} OF 3: {
                                                        formStep === 1 ? 'Choose Services' :
                                                        formStep === 2 ? 'Project Brief' : 'Contact Details'
                                                    }
                                                </div>
                                            </div>

                                            <AnimatePresence mode="wait">
                                                {formStep === 1 && (
                                                    <motion.div
                                                        key="step-services"
                                                        initial={{ opacity: 0, x: -15 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        exit={{ opacity: 0, x: 15 }}
                                                        transition={{ duration: 0.2 }}
                                                    >
                                                        <div className="form-group">
                                                            <label style={{ marginBottom: '14px', display: 'block' }}>Choose Services</label>
                                                            <p className="section-intro" style={{ marginTop: '-8px', marginBottom: '24px', fontSize: '0.82rem', opacity: 0.7 }}>Select one or more capabilities to deploy for your production</p>
                                                            
                                                            <div className="capabilities-grid">
                                                                {servicesList.map((srv) => {
                                                                    const isSelected = selectedServices.includes(srv.label);
                                                                    return (
                                                                        <button
                                                                            key={srv.id}
                                                                            type="button"
                                                                            className={`capability-card ${isSelected ? 'selected' : ''}`}
                                                                            style={{ '--card-accent': srv.color }}
                                                                            onClick={() => toggleService(srv.label)}
                                                                        >
                                                                            <div className="card-hover-glow"></div>
                                                                            <div className="card-top">
                                                                                <div className="card-icon" style={{ color: srv.color }}>
                                                                                    {srv.icon}
                                                                                </div>
                                                                                <div className="card-indicator">
                                                                                    {isSelected ? (
                                                                                        <span className="ind-check">✓ SELECTED</span>
                                                                                    ) : (
                                                                                        <span className="ind-add">+ SELECT</span>
                                                                                    )}
                                                                                </div>
                                                                            </div>
                                                                            <div className="card-body">
                                                                                <h3 className="card-title">{srv.label}</h3>
                                                                                <p className="card-desc">{srv.desc}</p>
                                                                            </div>
                                                                        </button>
                                                                    );
                                                                })}
                                                            </div>
                                                        </div>
                                                        
                                                        <div className="form-step-actions">
                                                            <button
                                                                type="button"
                                                                className="form-next-btn"
                                                                disabled={selectedServices.length === 0}
                                                                onClick={() => setFormStep(2)}
                                                            >
                                                                <span>NEXT: ENTER BRIEF</span>
                                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginLeft: '6px' }}>
                                                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                                                    <polyline points="12 5 19 12 12 19"></polyline>
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </motion.div>
                                                )}

                                                {formStep === 2 && (
                                                    <motion.div
                                                        key="step-brief"
                                                        initial={{ opacity: 0, x: -15 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        exit={{ opacity: 0, x: 15 }}
                                                        transition={{ duration: 0.2 }}
                                                    >
                                                        <div className="form-group">
                                                            <label htmlFor="inquiry-brief">Project Brief & Details</label>
                                                            <p className="section-intro" style={{ marginTop: '-8px', marginBottom: '16px', fontSize: '0.82rem', opacity: 0.7 }}>Explain your creative ideas, campaign goals, or timeline constraints</p>
                                                            
                                                            <div className="textarea-console-wrapper">
                                                                <textarea 
                                                                    id="inquiry-brief" 
                                                                    rows="6" 
                                                                    placeholder="Share your campaign objectives, timeline constraints, or any details about your brand..." 
                                                                    value={brief} 
                                                                    onChange={(e) => setBrief(e.target.value)}
                                                                    required
                                                                ></textarea>
                                                                
                                                                <div className="telemetry-bar-wrapper">
                                                                    <div className="telemetry-header">
                                                                        <span className="telemetry-label">SYSTEM UPLINK TELEMETRY</span>
                                                                        <span className="telemetry-value" style={{ color: telemetry.color }}>{telemetry.label}</span>
                                                                    </div>
                                                                    <div className="telemetry-progress-track">
                                                                        <div className="telemetry-progress-fill" style={{ width: `${telemetry.progress}%`, backgroundColor: telemetry.color }}></div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="quick-injectors-section">
                                                                <span className="injector-title">QUICK INJECTORS:</span>
                                                                <div className="injector-pills">
                                                                    {quickPrompts.map((prompt, idx) => (
                                                                        <button
                                                                            key={idx}
                                                                            type="button"
                                                                            className="injector-pill-btn"
                                                                            onClick={() => handleInjectPrompt(prompt)}
                                                                        >
                                                                            <span className="pill-arrow">⚡</span> {prompt}
                                                                        </button>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="form-step-actions">
                                                            <button
                                                                type="button"
                                                                className="form-back-btn"
                                                                onClick={() => setFormStep(1)}
                                                            >
                                                                <span>BACK</span>
                                                            </button>
                                                            <button
                                                                type="button"
                                                                className="form-next-btn"
                                                                disabled={brief.trim().length < 5}
                                                                onClick={() => setFormStep(3)}
                                                            >
                                                                <span>NEXT: CONTACT INFO</span>
                                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginLeft: '6px' }}>
                                                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                                                    <polyline points="12 5 19 12 12 19"></polyline>
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </motion.div>
                                                )}

                                                {formStep === 3 && (
                                                    <motion.div
                                                        key="step-contact"
                                                        initial={{ opacity: 0, x: -15 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        exit={{ opacity: 0, x: 15 }}
                                                        transition={{ duration: 0.2 }}
                                                    >
                                                        <div className="step-contact-split">
                                                            <div className="split-form-fields">
                                                                <p className="section-intro" style={{ marginBottom: '20px', fontSize: '0.82rem', opacity: 0.7 }}>Input your target coordinates to finalize the uplink parameters</p>
                                                                
                                                                <div className="form-group">
                                                                    <label htmlFor="inquiry-name">Your Name</label>
                                                                    <input 
                                                                        type="text" 
                                                                        id="inquiry-name" 
                                                                        placeholder="Jane Doe" 
                                                                        value={name} 
                                                                        onChange={(e) => setName(e.target.value)} 
                                                                        required 
                                                                    />
                                                                </div>
                                                                <div className="form-group" style={{ marginTop: '16px' }}>
                                                                    <label htmlFor="inquiry-email">Work Email</label>
                                                                    <input 
                                                                        type="email" 
                                                                        id="inquiry-email" 
                                                                        placeholder="jane@company.com" 
                                                                        value={email} 
                                                                        onChange={(e) => setEmail(e.target.value)} 
                                                                        required 
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div className="split-badge-preview">
                                                                <div className="badge-preview-label">LIVE COLLAB BILL PREVIEW</div>
                                                                <div className="booking-badge">
                                                                    <div className="badge-header">
                                                                        <div className="badge-logo-sec">
                                                                            <div className="logo-dot"></div>
                                                                            <span className="logo-text">KGR NETWORK // COLLAB BILL</span>
                                                                        </div>
                                                                        <div className="badge-status">
                                                                            <span className="status-beacon" style={{ backgroundColor: selectedServices.length > 0 ? '#121214' : '#ffaa00' }}></span>
                                                                            <span className="status-text">{selectedServices.length > 0 ? 'READY' : 'PENDING'}</span>
                                                                        </div>
                                                                    </div>
                                                                    
                                                                    <div className="badge-body">
                                                                        <div className="badge-field">
                                                                            <span className="badge-label">CLIENT TARGET</span>
                                                                            <span className="badge-val">{name || 'AWAITING NAME...'}</span>
                                                                        </div>
                                                                        <div className="badge-field">
                                                                            <span className="badge-label">EMAIL GATEWAY</span>
                                                                            <span className="badge-val">{email || 'AWAITING EMAIL...'}</span>
                                                                        </div>
                                                                        
                                                                        <div className="receipt-items-list">
                                                                            <div className="badge-label" style={{ marginBottom: '4px' }}>DEPLOYMENT SPECIFICATIONS:</div>
                                                                            {selectedServices.length === 0 ? (
                                                                                <div className="receipt-item-row empty-row">
                                                                                    <span className="item-name">[!] AWAITING SELECTIONS</span>
                                                                                    <span className="item-status">PENDING</span>
                                                                                </div>
                                                                            ) : (
                                                                                selectedServices.map((srv, idx) => (
                                                                                    <div key={idx} className="receipt-item-row">
                                                                                        <span className="item-name">* {srv}</span>
                                                                                        <span className="item-status">STAGED</span>
                                                                                    </div>
                                                                                ))
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                    
                                                                    <div className="badge-footer">
                                                                        <div className="badge-code-sec">
                                                                            <span className="badge-label">BILL SERIAL</span>
                                                                            <span className="badge-code">{bookingCode || 'TX-PENDING'}</span>
                                                                        </div>
                                                                        <div className="badge-barcode">
                                                                            <div className="barcode-bars">
                                                                                {[1, 3, 2, 1, 4, 2, 1, 3, 2, 1, 2, 3, 1, 2].map((w, idx) => (
                                                                                    <div 
                                                                                        key={idx} 
                                                                                        className="barcode-bar" 
                                                                                        style={{ width: `${w}px` }}
                                                                                    />
                                                                                ))}
                                                                            </div>
                                                                            <span className="barcode-text">KGR.SECURE.TX</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="form-step-actions">
                                                            <button
                                                                type="button"
                                                                className="form-back-btn"
                                                                onClick={() => setFormStep(2)}
                                                            >
                                                                <span>BACK</span>
                                                            </button>
                                                            <button 
                                                                type="submit" 
                                                                className="form-submit-btn"
                                                                disabled={!name.trim() || !email.trim()}
                                                            >
                                                                <span>INITIATE SECURE TRANSMISSION</span>
                                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginLeft: '6px' }}>
                                                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                                                    <polyline points="12 5 19 12 12 19"></polyline>
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </form>
                                    )}
                                </div>

                                <div className="direct-contact-row">
                                    <span className="contact-label">Or reach out directly:</span>
                                    <div className="contact-buttons-group">
                                        <button className="contact-action-btn copy-btn" onClick={handleCopyEmail}>
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginRight: '6px' }}>
                                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                                            </svg>
                                            <span>{copied ? 'COPIED!' : 'COPY EMAIL'}</span>
                                        </button>
                                        <a className="contact-action-btn download-btn" href={vcardHref} download="Karthik_G_Raj_AI_Creative_Producer.vcf">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginRight: '6px' }}>
                                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
                                            </svg>
                                            <span>DOWNLOAD VCARD</span>
                                        </a>
                                        <a href="https://www.linkedin.com/in/karthikgraj" target="_blank" rel="noopener noreferrer" className="contact-social-btn">
                                            <span>LINKEDIN ↗</span>
                                        </a>
                                        <a href="https://www.instagram.com/karthik.graj" target="_blank" rel="noopener noreferrer" className="contact-social-btn">
                                            <span>INSTAGRAM ↗</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
