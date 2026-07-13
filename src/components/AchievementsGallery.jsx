import React from 'react';
import './AchievementsGallery.css';

export default function AchievementsGallery() {
    const achievements = [
        {
            id: 1,
            title: "Google AI Summit Invite",
            date: "Summit Attendee // 2026",
            image: "/assets/images/aisummit.webp",
            rotateClass: "rotate-left-heavy"
        },
        {
            id: 2,
            title: "Smart India Hackathon Finalist",
            date: "Hackathon Team // 2025",
            image: "/assets/images/sih.webp",
            rotateClass: "rotate-right-light"
        },
        {
            id: 3,
            title: "1.59 Billion+ Snapchat Impressions",
            date: "Lens Creator // Stats",
            image: "/assets/images/snapins.webp",
            rotateClass: "rotate-left-light"
        }
    ];

    return (
        <div className="ach-grid" style={{ marginTop: '70px' }}>
            {achievements.map((ach) => (
                <div key={ach.id} className={`ach-polaroid-card ${ach.rotateClass} reveal-item`}>
                    <div className="ach-img-frame">
                        <img 
                            src={ach.image} 
                            alt={ach.title} 
                            className="ach-img" 
                            width="250" 
                            height="250" 
                            loading="lazy"
                        />
                        <div className="ach-img-glare"></div>
                    </div>
                    <div className="ach-caption-box">
                        <p className="ach-caption">{ach.title}</p>
                        <span className="ach-date">{ach.date}</span>
                    </div>
                </div>
            ))}
        </div>
    );
}
