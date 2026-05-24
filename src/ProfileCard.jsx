import React, { useRef, useState } from 'react';
import './ProfileCard.css';

export default function ProfileCard({ videoSrc, cloneStatus = 'active' }) {
    const videoRef = useRef(null);
    const cardRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(true);

    const togglePlay = () => {
        if (!videoRef.current) return;
        if (isPlaying) { 
            videoRef.current.pause(); 
        } else { 
            videoRef.current.play(); 
        }
        setIsPlaying(!isPlaying);
    };

    const handleCardClick = (e) => {
        if (!videoRef.current) return;
        togglePlay();
    };

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * -12;
        cardRef.current.style.transform = `perspective(800px) rotateY(${x}deg) rotateX(${y}deg)`;
    };

    const handleMouseLeave = () => {
        if (!cardRef.current) return;
        cardRef.current.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg)';
    };

    return (
        <div className="avatar-card-outer" ref={cardRef}
            onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
            <div className="avatar-card" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
                {/* Holographic grid and scanline effect */}
                <div className="avatar-hologram" />
                
                {/* HUD Framing Corner Brackets */}
                <div className="avatar-corner avatar-corner-tl" />
                <div className="avatar-corner avatar-corner-tr" />
                <div className="avatar-corner avatar-corner-bl" />
                <div className="avatar-corner avatar-corner-br" />

                <video ref={videoRef} className="avatar-video" src={videoSrc}
                    autoPlay loop muted playsInline />

                {/* Minimal HUD overlay */}
                <div className="avatar-hud-top">
                    <span className="avatar-status-dot status-loading" />
                    <span className="avatar-status-text">
                        LOADING AVATAR..
                    </span>
                </div>
            </div>
        </div>
    );
}
