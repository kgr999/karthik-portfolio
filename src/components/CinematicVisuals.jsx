import React from 'react';
import LazyVideo from './LazyVideo';

export default function CinematicVisuals({
    midjourneyExpanded,
    setMidjourneyExpanded,
    seedanceExpanded,
    setSeedanceExpanded
}) {
    return (
        <>
            {/* Cinematic Self-Visuals Section */}
            <section id="self-visuals">
                <div className="container">
                    <div className="section-header text-center">
                        <h2 className="section-heading reveal-text" style={{ marginBottom: '10px' }}>Multi-Genre Showreel</h2>
                    </div>
                    <div className="cinema-grid reveal-item" style={{ gap: '20px', marginTop: '40px' }}>
                        {/* pfv1: Fighter Jet */}
                        <div className="cinema-card" data-glow="#A78BFA">
                            <div className="cinema-video-wrapper">
                                <LazyVideo className="cinema-video" src="assets/videos/pfv1.mp4" loop muted playsInline autoPlay />
                            </div>
                        </div>

                        {/* pfv7 */}
                        <div className="cinema-card" data-glow="#00f0ff">
                            <div className="cinema-video-wrapper">
                                <LazyVideo className="cinema-video" src="assets/videos/pfv7.mp4" loop muted playsInline autoPlay />
                            </div>
                        </div>

                        {/* pfv6: Soldier / Battlefield */}
                        <div className="cinema-card" data-glow="#34D399">
                            <div className="cinema-video-wrapper">
                                <LazyVideo className="cinema-video" src="assets/videos/pfv6.mp4" loop muted playsInline autoPlay />
                            </div>
                        </div>

                        {/* pfv2: Orc Warlord */}
                        <div className="cinema-card" data-glow="#F87171">
                            <div className="cinema-video-wrapper">
                                <LazyVideo className="cinema-video" src="assets/videos/pfv2.mp4" loop muted playsInline autoPlay />
                            </div>
                        </div>

                        {/* pfv8 */}
                        <div className="cinema-card" data-glow="#93C5FD">
                            <div className="cinema-video-wrapper">
                                <LazyVideo className="cinema-video" src="assets/videos/pfv8.mp4" loop muted playsInline autoPlay />
                            </div>
                        </div>

                        {/* pfv5: Formula 1 */}
                        <div className="cinema-card" data-glow="#FBBF24">
                            <div className="cinema-video-wrapper">
                                <LazyVideo className="cinema-video" src="assets/videos/pfv5.mp4" loop muted playsInline autoPlay />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
