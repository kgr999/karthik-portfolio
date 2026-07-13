import React from 'react';
import AchievementsGallery from './AchievementsGallery';

export default function CertificationsSection() {
    return (
        <section id="certs">
            <div className="container">
                <div className="section-header text-center">
                    <h2 className="section-heading reveal-text" style={{ marginBottom: '10px' }}>Certifications</h2>
                </div>
                <div className="cert-grid reveal-item">
                    <div className="cert-card">
                        <div className="cert-logo-wrapper">
                            <img src="/assets/logos/google.svg"
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
                            <img src="assets/images/cert-google.webp" alt="Google Certificate Preview" loading="lazy" />
                        </div>
                    </div>

                    <div className="cert-card">
                        <div className="cert-logo-wrapper">
                            <img src="/assets/logos/umich.png"
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
                            <img src="assets/images/cert-michigan.webp" alt="U-Michigan Certificate Preview" loading="lazy" />
                        </div>
                    </div>
                </div>
                <AchievementsGallery />
            </div>
        </section>
    );
}
