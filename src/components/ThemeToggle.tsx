import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle: React.FC = () => {
    const [dark, setDark] = useState<boolean>(() => {
        const saved = localStorage.getItem('theme');
        if (saved) return saved === 'dark';
        return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    });

    useEffect(() => {
        if (dark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('theme', dark ? 'dark' : 'light');
    }, [dark]);

    return (
        <button
            aria-label="Toggle theme"
            onClick={() => setDark((v) => !v)}
            className="theme-toggle inline-flex items-center p-2 rounded-md bg-transparent border border-transparent hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
            {dark ? <Sun className="w-5 h-5 text-yellow-300" /> : <Moon className="w-5 h-5 text-indigo-500" />}
        </button>
    );
};

export default ThemeToggle;
