import React, { useRef } from 'react';
import './ProfileCard.css';

export default function ProfileCard({ 
    imgSrc = '/assets/images/portfolio_profile.webp?v=1.1',
    cloneStatus = 'active'
}) {
    const cardRef = useRef(null);

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        
        // Calculate relative coordinates for a subtle and elegant 3D parallax hover effect
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * -8;
        cardRef.current.style.transform = `perspective(800px) rotateY(${x}deg) rotateX(${y}deg)`;
    };

    const handleMouseLeave = () => {
        if (!cardRef.current) return;
        cardRef.current.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg)';
    };

    return (
        <div 
            className="avatar-card-outer" 
            ref={cardRef}
            onMouseMove={handleMouseMove} 
            onMouseLeave={handleMouseLeave}
        >
            <div className="avatar-card">
                {/* Elegant overlay gradient to ensure high text contrast and visual depth */}
                <div className="avatar-overlay" />
                
                {/* Clean Profile Portrait */}
                <img 
                    className="avatar-image" 
                    src={imgSrc} 
                    alt="Karthik G Raj"
                    width="280"
                    height="280"
                />

                {/* Minimalist & Premium Info Panel */}
                <div className="avatar-info-panel">
                    <p className="avatar-name">Karthik G Raj</p>
                    <p className="avatar-location">
                        <svg className="location-pin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                            <circle cx="12" cy="10" r="3" />
                        </svg>
                        bengaluru
                    </p>
                </div>
            </div>
        </div>
    );
}
