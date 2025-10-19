import React from 'react';
import './loader.css';

const Loader: React.FC = () => {
    return (
        <div className="ldrs-wrapper" role="status" aria-label="Loading">
            <svg className="ldrs-svg" viewBox="0 0 100 100" width="120" height="120" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="g" x1="0%" x2="100%" y1="0%" y2="100%">
                        <stop offset="0%" stopColor="#06b6d4" />
                        <stop offset="50%" stopColor="#7c3aed" />
                        <stop offset="100%" stopColor="#ec4899" />
                    </linearGradient>
                </defs>
                <g fill="none" stroke="url(#g)" strokeWidth="6" strokeLinecap="round">
                    <path className="ldrs-path ldrs-p1" d="M20 50 A30 30 0 1 1 80 50" />
                    <path className="ldrs-path ldrs-p2" d="M80 50 A30 30 0 1 1 20 50" />
                </g>
            </svg>
        </div>
    );
};

export default Loader;
