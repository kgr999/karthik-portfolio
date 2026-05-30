import { useState, useEffect } from 'react';

export default function useIsMobile() {
    const [isMobile, setIsMobile] = useState(() => {
        if (typeof window !== 'undefined') {
            return window.innerWidth <= 768;
        }
        return false;
    });

    useEffect(() => {
        if (typeof window === 'undefined') return;

        let timeoutId = null;
        const handleResize = () => {
            // Debounce the state setting to avoid lag
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            timeoutId = setTimeout(() => {
                setIsMobile(window.innerWidth <= 768);
            }, 150); // 150ms debounce
        };

        window.addEventListener('resize', handleResize);
        
        // Execute once immediately in case orientation or resolution changed on load
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, []);

    return isMobile;
}
