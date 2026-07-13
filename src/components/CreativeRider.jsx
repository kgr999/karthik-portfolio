import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CreativeRider({ isOpen, onClose, theme }) {
    const [copied, setCopied] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [selectedServices, setSelectedServices] = useState([]);
    const [brief, setBrief] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [isTransmitting, setIsTransmitting] = useState(false);
    const [transmissionProgress, setTransmissionProgress] = useState(0);
    const [error, setError] = useState(null);

    const handleCopyEmail = () => {
        navigator.clipboard.writeText('hello@karthikgraj.in');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const services = [
        { id: "ai-films", label: "AI Films & Microdramas" },
        { id: "ai-ads", label: "AI Ads & Commercials" },
        { id: "video-edit", label: "Video Editing" },
        { id: "website-design", label: "Website Design" }
    ];

    const toggleService = (label) => {
        if (selectedServices.includes(label)) {
            setSelectedServices(selectedServices.filter(s => s !== label));
        } else {
            setSelectedServices([...selectedServices, label]);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsTransmitting(true);
        setTransmissionProgress(0);
        setError(null);

        let apiResolved = false;
        let apiError = false;

        fetch("https://formsubmit.co/ajax/hello@karthikgraj.in", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                name,
                email,
                services: selectedServices.join(", "),
                brief,
                _subject: `New Collaboration Inquiry from ${name}`
            })
        })
        .then(res => {
            if (!res.ok) throw new Error("Network error");
            return res.json();
        })
        .then(() => {
            apiResolved = true;
        })
        .catch(err => {
            console.error("FormSubmit Error:", err);
            apiResolved = true;
            apiError = true;
            setError(`Transmission failed. Please email me directly at hello@karthikgraj.in`);
        });

        const interval = setInterval(() => {
            setTransmissionProgress((prev) => {
                if (!apiResolved && prev >= 90) return 90;
                const next = prev + Math.floor(Math.random() * 14) + 6;
                if (next >= 100) {
                    clearInterval(interval);
                    setTimeout(() => {
                        setIsTransmitting(false);
                        if (!apiError) setSubmitted(true);
                    }, 300);
                    return 100;
                }
                return next;
            });
        }, 70);
    };

    const resetForm = () => {
        setSubmitted(false);
        setName('');
        setEmail('');
        setSelectedServices([]);
        setBrief('');
        setTransmissionProgress(0);
        setError(null);
    };

    const isFormValid = name.trim() && email.trim() && selectedServices.length > 0 && brief.trim();

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div 
                    className="rider-backdrop" 
                    onClick={onClose}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                >
                    <motion.div
                        className="rider-drawer"
                        data-lenis-prevent
                        onClick={(e) => e.stopPropagation()}
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    >
                        {/* Header Bar */}
                        <div className="rider-drawer-header">
                            <div className="rider-status-tag">
                                <span className="rider-status-pulse"></span>
                                <span>AVAILABLE FOR COLLABORATION</span>
                            </div>

                            <button className="rider-close-icon" onClick={onClose} aria-label="Close modal">
                                <span>ESC</span>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>
                        </div>

                        {/* Drawer Content */}
                        <div className="rider-drawer-body">
                            <div className="rider-hero-section">
                                <h2 className="rider-hero-title">
                                    Let's build <span className="rider-text-gradient">something epic.</span>
                                </h2>
                                <p className="rider-hero-desc">
                                    Direct creative direction & model workflows for AI films, ads, and interactive experiences. Fast iterations, zero corporate friction.
                                </p>
                            </div>

                            {isTransmitting ? (
                                <div className="rider-transmitting-state">
                                    <div className="rider-spinner-ring"></div>
                                    <div className="rider-progress-bar">
                                        <div className="rider-progress-fill" style={{ width: `${transmissionProgress}%` }}></div>
                                    </div>
                                    <span className="rider-transmitting-text">Transmitting Brief… {transmissionProgress}%</span>
                                </div>
                            ) : submitted ? (
                                <div className="rider-success-state">
                                    <div className="rider-success-badge">
                                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00ff66" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="20 6 9 17 4 12"></polyline>
                                        </svg>
                                    </div>
                                    <h3>Message Received!</h3>
                                    <p>Thanks {name}. I'll respond within 24 hours.</p>
                                    <button className="rider-action-btn secondary" onClick={resetForm}>Send Another Inquiry</button>
                                </div>
                            ) : (
                                <form className="rider-clean-form" onSubmit={handleSubmit}>
                                    {/* Services Pills */}
                                    <div className="rider-form-group">
                                        <label className="rider-form-label">Selected Services</label>
                                        <div className="rider-chip-grid">
                                            {services.map((srv) => {
                                                const isSelected = selectedServices.includes(srv.label);
                                                return (
                                                    <button
                                                        key={srv.id}
                                                        type="button"
                                                        className={`rider-chip ${isSelected ? 'active' : ''}`}
                                                        onClick={() => toggleService(srv.label)}
                                                    >
                                                        <span className="rider-chip-icon">{isSelected ? '✓' : '+'}</span>
                                                        <span>{srv.label}</span>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    {/* Vision / Brief */}
                                    <div className="rider-form-group">
                                        <label htmlFor="rider-brief" className="rider-form-label">Project Details</label>
                                        <textarea
                                            id="rider-brief"
                                            rows="3"
                                            placeholder="Tell me about your project goals, timeline, or scope…"
                                            value={brief}
                                            onChange={(e) => setBrief(e.target.value)}
                                            required
                                        />
                                    </div>

                                    {/* Name & Email Row */}
                                    <div className="rider-input-row">
                                        <div className="rider-form-group">
                                            <label htmlFor="rider-name" className="rider-form-label">Name</label>
                                            <input
                                                type="text"
                                                id="rider-name"
                                                placeholder="Your name"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="rider-form-group">
                                            <label htmlFor="rider-email" className="rider-form-label">Email</label>
                                            <input
                                                type="email"
                                                id="rider-email"
                                                placeholder="your@email.com"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>

                                    {error && <div className="rider-error-msg">{error}</div>}

                                    {/* Submit CTA */}
                                    <button
                                        type="submit"
                                        className="rider-action-btn primary"
                                        disabled={!isFormValid}
                                    >
                                        <span>Send Inquiry</span>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <line x1="5" y1="12" x2="19" y2="12"></line>
                                            <polyline points="12 5 19 12 12 19"></polyline>
                                        </svg>
                                    </button>
                                </form>
                            )}

                            {/* Direct Contact Bar */}
                            <div className="rider-footer-bar">
                                <div className="rider-direct-email">
                                    <span className="rider-direct-label">Or reach out directly:</span>
                                    <button className="rider-copy-email-chip" onClick={handleCopyEmail}>
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                                        </svg>
                                        <span>{copied ? 'Copied to Clipboard!' : 'hello@karthikgraj.in'}</span>
                                    </button>
                                </div>

                                <div className="rider-quick-socials">
                                    <a href="https://www.linkedin.com/in/karthikgraj" target="_blank" rel="noopener noreferrer" className="rider-social-card linkedin">
                                        <svg className="rider-social-icon" viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                                            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                                        </svg>
                                        <div className="rider-social-info">
                                            <span className="rider-social-name">LinkedIn</span>
                                            <span className="rider-social-handle">@karthikgraj</span>
                                        </div>
                                        <span className="rider-social-arrow">↗</span>
                                    </a>

                                    <a href="https://www.instagram.com/karthik.graj" target="_blank" rel="noopener noreferrer" className="rider-social-card instagram">
                                        <svg className="rider-social-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                                        </svg>
                                        <div className="rider-social-info">
                                            <span className="rider-social-name">Instagram</span>
                                            <span className="rider-social-handle">@karthik.graj</span>
                                        </div>
                                        <span className="rider-social-arrow">↗</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

