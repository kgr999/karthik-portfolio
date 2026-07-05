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
                                <span style={{ 
                                    display: 'inline-block',
                                    fontSize: '0.72rem', 
                                    fontWeight: '700',
                                    letterSpacing: '3px', 
                                    textTransform: 'uppercase',
                                    color: '#2E8B57',
                                    fontFamily: 'monospace',
                                    marginBottom: '8px',
                                    textShadow: '0 0 12px rgba(46, 139, 87, 0.25)'
                                }}>
                                    Nandini Masala Majjige
                                </span>
                                <h3 className="visual-title" style={{ 
                                    fontSize: 'clamp(2.5rem, 5vw, 3.8rem)', 
                                    fontWeight: '900', 
                                    margin: '0 0 16px 0', 
                                    color: '#FFF',
                                    letterSpacing: '-2px',
                                    lineHeight: '0.95',
                                    whiteSpace: 'nowrap'
                                }}>
                                    BEAT THE HEAT
                                </h3>
                                <p className="visual-description" style={{ fontSize: '0.95rem', lineHeight: '1.65', color: 'rgba(255, 255, 255, 0.5)', marginBottom: '18px' }}>
                                    I wanted to give Karnataka's favorite spiced buttermilk its own cinematic moment. Picture this: Bengaluru in peak summer, and the city's bus drivers, traffic cops, and construction workers all finding a second of cool relief with one cold sip. I designed the can, built out the campaign visuals, and brought the whole concept to life from scratch.
                                </p>
                                <span style={{
                                    fontSize: '0.7rem',
                                    fontFamily: 'monospace',
                                    color: 'rgba(255, 255, 255, 0.3)',
                                    letterSpacing: '0.5px'
                                }}>
                                    <span style={{ color: '#D4C478' }}>▸</span>{' '}
                                    Image Model:{' '}
                                    <span style={{ color: '#D4C478', fontWeight: '700' }}>NanoBanana 2</span>
                                </span>
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
