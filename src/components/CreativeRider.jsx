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
        { id: "ai-films", label: "AI Films & Microdramas", color: "#00f0ff" },
        { id: "ai-ads", label: "AI Ads & Commercials", color: "#ff007f" },
        { id: "short-form", label: "Short-Form Editing", color: "#a855f7" },
        { id: "web-dev", label: "Website Building", color: "#00ff66" },
        { id: "social-mgmt", label: "Social Media", color: "#ffcc00" },
        { id: "previs", label: "Research & Pre-Vis", color: "#ff6600" }
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

        // Perform AJAX request to FormSubmit
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
                _subject: `New Portfolio Collaboration Inquiry from ${name}`
            })
        })
        .then(res => {
            if (!res.ok) throw new Error("Network response error");
            return res.json();
        })
        .then(() => {
            apiResolved = true;
        })
        .catch(err => {
            console.error("FormSubmit Error:", err);
            apiResolved = true;
            apiError = true;
            setError(`Transmission failed (${err.message || "Unknown Error"}). Please copy hello@karthikgraj.in and email me directly.`);
        });

        const interval = setInterval(() => {
            setTransmissionProgress((prev) => {
                // If API hasn't resolved, cap the progress animation at 90%
                if (!apiResolved && prev >= 90) {
                    return 90;
                }

                const next = prev + Math.floor(Math.random() * 12) + 5;
                if (next >= 100) {
                    clearInterval(interval);
                    setTimeout(() => {
                        setIsTransmitting(false);
                        if (!apiError) {
                            setSubmitted(true);
                        }
                    }, 300);
                    return 100;
                }
                return next;
            });
        }, 80);
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
    const isFormValid = name.trim() && email.trim() && selectedServices.length > 0 && brief.trim();

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
                    {/* Close Button */}
                    <button className="rider-close-btn" onClick={onClose} aria-label="Close">
                        <span className="close-text">CLOSE</span>
                        <span className="close-esc">[ESC]</span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>

                    <div className="rider-split">
                        {/* ─── Left Panel: Branding ─── */}
                        <div className="rider-left">
                            <div className="rider-left-content">
                                <div className="rider-brand-block">
                                    <div className="rider-brand-dot"></div>
                                    <span className="rider-brand-tag">Available for projects</span>
                                </div>

                                <h2 className="rider-headline">
                                    Let's create<br />
                                    <span className="rider-headline-accent">something epic.</span>
                                </h2>

                                <p className="rider-philosophy">
                                    I collaborate directly with brands, directors, and creators. No rigid corporate layers — just direct creative partnership to help bring your ideas to life.
                                </p>

                                <div className="rider-left-links">
                                    <button className="rider-copy-btn" onClick={handleCopyEmail}>
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                                        </svg>
                                        <span>{copied ? 'Copied!' : 'hello@karthikgraj.in'}</span>
                                    </button>
                                    <div className="rider-social-row">
                                        <a href="https://www.linkedin.com/in/karthikgraj" target="_blank" rel="noopener noreferrer" className="rider-social-link">LinkedIn ↗</a>
                                        <a href="https://www.instagram.com/karthik.graj" target="_blank" rel="noopener noreferrer" className="rider-social-link">Instagram ↗</a>
                                        <a href={vcardHref} download="Karthik_G_Raj.vcf" className="rider-social-link">Save Contact ↓</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ─── Right Panel: Form ─── */}
                        <div className="rider-right">
                            <div className="rider-right-content">
                                {isTransmitting ? (
                                    <div className="rider-transmit">
                                        <div className="rider-transmit-icon">
                                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="rider-spin-icon">
                                                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                                            </svg>
                                        </div>
                                        <div className="rider-transmit-bar">
                                            <div className="rider-transmit-fill" style={{ width: `${transmissionProgress}%` }}></div>
                                        </div>
                                        <span className="rider-transmit-label">Sending your message… {transmissionProgress}%</span>
                                    </div>
                                ) : submitted ? (
                                    <div className="rider-success">
                                        <div className="rider-success-icon">
                                            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="20 6 9 17 4 12"></polyline>
                                            </svg>
                                        </div>
                                        <h3 className="rider-success-title">Message Sent!</h3>
                                        <p className="rider-success-desc">Thanks {name}, I'll get back to you within 24 hours.</p>
                                        <button className="rider-reset-btn" onClick={resetForm}>Send another</button>
                                    </div>
                                ) : (
                                    <form className="rider-form" onSubmit={handleSubmit}>
                                        <div className="rider-form-header">
                                            <h3>Start a project</h3>
                                            <p>Fill in the details and I'll reach out.</p>
                                        </div>

                                        {/* Services */}
                                        <div className="rider-field">
                                            <label>I need help with</label>
                                            <div className="rider-pills">
                                                {services.map((srv) => {
                                                    const isSelected = selectedServices.includes(srv.label);
                                                    return (
                                                        <button
                                                            key={srv.id}
                                                            type="button"
                                                            className={`rider-pill ${isSelected ? 'active' : ''}`}
                                                            style={{ '--pill-accent': srv.color }}
                                                            onClick={() => toggleService(srv.label)}
                                                        >
                                                            <span className="rider-pill-indicator">{isSelected ? '✓' : '+'}</span>
                                                            {srv.label}
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </div>

                                        {/* Brief */}
                                        <div className="rider-field">
                                            <label htmlFor="rider-brief">Project details</label>
                                            <textarea 
                                                id="rider-brief" 
                                                rows="3" 
                                                placeholder="What's the vision? Share goals, timeline, budget range…" 
                                                value={brief} 
                                                onChange={(e) => setBrief(e.target.value)}
                                                required
                                            ></textarea>
                                        </div>

                                        {/* Name + Email */}
                                        <div className="rider-field-row">
                                            <div className="rider-field">
                                                <label htmlFor="rider-name">Name</label>
                                                <input 
                                                    type="text" 
                                                    id="rider-name" 
                                                    placeholder="Jane Doe" 
                                                    value={name} 
                                                    onChange={(e) => setName(e.target.value)} 
                                                    required 
                                                />
                                            </div>
                                            <div className="rider-field">
                                                <label htmlFor="rider-email">Email</label>
                                                <input 
                                                    type="email" 
                                                    id="rider-email" 
                                                    placeholder="jane@company.com" 
                                                    value={email} 
                                                    onChange={(e) => setEmail(e.target.value)} 
                                                    required 
                                                />
                                            </div>
                                        </div>

                                        {error && (
                                            <div className="rider-error-badge" style={{ color: 'var(--accent-secondary, #ff2e3b)', fontSize: '0.78rem', marginBottom: '15px', textAlign: 'left', background: 'rgba(255, 46, 59, 0.1)', padding: '10px 12px', borderRadius: '6px', border: '1px solid rgba(255, 46, 59, 0.2)' }}>
                                                {error}
                                            </div>
                                        )}

                                        {/* Submit */}
                                        <button 
                                            type="submit" 
                                            className="rider-submit"
                                            disabled={!isFormValid}
                                        >
                                            <span>Send Message</span>
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                                <path d="M22 2L11 13" />
                                                <path d="M22 2L15 22L11 13L2 9L22 2Z" />
                                            </svg>
                                        </button>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
