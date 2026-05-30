import React from 'react';

export default function PosterShowcase() {
    return (
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
                            <img src="assets/images/n1.webp" alt="Neural Frontiers - Shot 1" className="visual-image" loading="lazy" />
                        </div>

                        {/* Bottom: Details on the left and n2.png smaller on the right */}
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
                                <img src="assets/images/n2.webp" alt="Neural Frontiers - Shot 2" className="visual-image" style={{ width: '100%', height: 'auto', display: 'block' }} loading="lazy" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
