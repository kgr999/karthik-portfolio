import React from 'react';
import './SocialLivePreview.css';

export default function SocialLivePreview() {
    return (
        <div className="minimal-social-section">
            <div className="minimal-social-container">
                
                {/* ─── LinkedIn Minimal Strip ─── */}
                <a 
                    href="https://www.linkedin.com/in/karthikgraj" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="minimal-social-strip linkedin-strip"
                    title="Connect on LinkedIn — Karthik G Raj"
                >
                    <div className="strip-left">
                        <div className="strip-avatar-box linkedin-avatar-box">
                            <img 
                                src="/assets/images/portfolio_profile.webp" 
                                alt="Karthik G Raj" 
                                className="strip-avatar-img"
                                onError={(e) => { e.target.src = "/assets/images/portfolio_profile.PNG"; }}
                            />
                            <span className="strip-badge-dot linkedin-dot">
                                <svg viewBox="0 0 24 24" width="7.5" height="7.5" fill="currentColor">
                                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                                </svg>
                            </span>
                        </div>

                        <div className="strip-meta">
                            <div className="strip-name-row">
                                <span className="strip-name">Karthik G Raj</span>
                            </div>
                            <span className="strip-stat linkedin-stat">500+ connections</span>
                        </div>
                    </div>

                    <div className="strip-action">
                        <span className="strip-action-text">Connect</span>
                        <svg className="strip-arrow" viewBox="0 0 24 24" width="13" height="13" stroke="currentColor" strokeWidth="2.2" fill="none">
                            <line x1="7" y1="17" x2="17" y2="7"></line>
                            <polyline points="7 7 17 7 17 17"></polyline>
                        </svg>
                    </div>
                </a>

                {/* ─── Instagram Minimal Strip ─── */}
                <a 
                    href="https://www.instagram.com/karthik.graj" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="minimal-social-strip instagram-strip"
                    title="Follow on Instagram — @karthik.graj"
                >
                    <div className="strip-left">
                        <div className="strip-avatar-box instagram-avatar-box">
                            <img 
                                src="/assets/images/insta_profile.jpg" 
                                alt="karthik.graj" 
                                className="strip-avatar-img"
                                onError={(e) => { e.target.src = "/assets/images/portfolio_profile.webp"; }}
                            />
                            <span className="strip-badge-dot instagram-dot">
                                <svg viewBox="0 0 24 24" width="7.5" height="7.5" fill="none" stroke="currentColor" strokeWidth="2.4">
                                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                                </svg>
                            </span>
                        </div>

                        <div className="strip-meta">
                            <div className="strip-name-row">
                                <span className="strip-name">@karthik.graj</span>
                            </div>
                            <span className="strip-stat instagram-stat">8000+ followers</span>
                        </div>
                    </div>

                    <div className="strip-action">
                        <span className="strip-action-text">Follow</span>
                        <svg className="strip-arrow" viewBox="0 0 24 24" width="13" height="13" stroke="currentColor" strokeWidth="2.2" fill="none">
                            <line x1="7" y1="17" x2="17" y2="7"></line>
                            <polyline points="7 7 17 7 17 17"></polyline>
                        </svg>
                    </div>
                </a>

            </div>
        </div>
    );
}
