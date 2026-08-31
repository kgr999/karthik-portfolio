import React, { useState, lazy, Suspense } from 'react';
import './ShowreelHub.css';

// Eagerly loaded
import AIMicrodramaShowcase from './AIMicrodramaShowcase';
import TadkaShowcase from './TadkaShowcase';
import VintageCinemaShowcase from './VintageCinemaShowcase';
import PhoneMockupShowcase from './PhoneMockupShowcase';
import CinematicVisuals from './CinematicVisuals';

// Lazy loaded
const CinematicShowreelMap = lazy(() => import('./CinematicShowreelMap'));
const PirateShowreelMap = lazy(() => import('./PirateShowreelMap'));

const tabs = [
    {
        id: 'microdramas',
        label: 'Microdramas',
        accent: 'red',
        icon: (
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="4" width="20" height="16" rx="3" />
                <polygon points="10,9 16,12 10,15" fill="currentColor" stroke="none" />
            </svg>
        )
    },
    {
        id: 'adfilms',
        label: 'Ad Films',
        accent: 'gold',
        icon: (
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 11a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-7z" />
                <path d="M4 6h16v4H4z" />
                <path d="M8 6l2 4M14 6l2 4" />
            </svg>
        )
    },
    {
        id: 'aicinema',
        label: 'AI Cinema',
        accent: 'emerald',
        icon: (
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
            </svg>
        )
    },
    {
        id: 'reels',
        label: 'Reels',
        accent: 'cyan',
        icon: (
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="6" y="3" width="12" height="18" rx="3" />
                <line x1="10" y1="6" x2="14" y2="6" strokeWidth="2" strokeLinecap="round" />
            </svg>
        )
    },
    {
        id: 'theme',
        label: 'Theme',
        accent: 'amber',
        icon: (
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 3l1.9 5.8a2 2 0 0 0 1.3 1.3L21 12l-5.8 1.9a2 2 0 0 0-1.3 1.3L12 21l-1.9-5.8a2 2 0 0 0-1.3-1.3L3 12l5.8-1.9a2 2 0 0 0 1.3-1.3L12 3z" />
            </svg>
        )
    },
    {
        id: 'multigenre',
        label: 'Multi-Genre',
        accent: 'purple',
        icon: (
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7" rx="1.5" />
                <rect x="14" y="3" width="7" height="7" rx="1.5" />
                <rect x="14" y="14" width="7" height="7" rx="1.5" />
                <rect x="3" y="14" width="7" height="7" rx="1.5" />
            </svg>
        )
    },
];

export default function ShowreelHub() {
    const [activeTab, setActiveTab] = useState('microdramas');

    const renderTabContent = () => {
        switch (activeTab) {
            case 'microdramas':
                return <AIMicrodramaShowcase />;
            case 'multigenre':
                return <CinematicVisuals />;
            case 'adfilms':
                return <TadkaShowcase />;
            case 'aicinema':
                return <VintageCinemaShowcase />;
            case 'reels':
                return <PhoneMockupShowcase />;
            case 'theme':
            case 'vfx':
                return (
                    <Suspense fallback={null}>
                        <CinematicShowreelMap />
                        <div style={{ height: '28px' }} />
                        <PirateShowreelMap />
                    </Suspense>
                );
            default:
                return null;
        }
    };

    return (
        <section id="showreel-hub" className="showreel-hub-section">
            <div className="container">
                {/* Section Header */}
                <div className="showreel-hub-header reveal-item">
                    <h2 className="showreel-hub-title">SELECTED WORK</h2>
                </div>

                {/* Cyber-Glass Segmented Selection Bar */}
                <div className="showreel-tab-container reveal-item">
                    <div className="showreel-tab-bar">
                        {tabs.map((tab) => {
                            const isActive = activeTab === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    data-accent={tab.accent}
                                    className={`showreel-tab ${isActive ? 'is-active' : ''}`}
                                    onClick={() => setActiveTab(tab.id)}
                                >
                                    <span className="showreel-tab-icon">{tab.icon}</span>
                                    <span className="showreel-tab-label">{tab.label}</span>
                                    {isActive && <div className="showreel-tab-glow-pill" />}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Tab Content */}
            <div className="showreel-tab-content" key={activeTab}>
                {renderTabContent()}
            </div>
        </section>
    );
}
