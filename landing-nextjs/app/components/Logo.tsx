import React from 'react';

const Logo = () => {
    return (
        <div className="group relative flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-fuchsia-600 to-fuchsia-900 shadow-lg shadow-fuchsia-500/30 transition-all duration-300 active:scale-95 cursor-pointer">
            {/* Subtle Inner Border Overlay */}
            <div className="absolute inset-0 rounded-2xl border border-white/10 pointer-events-none"></div>

            {/* Main SVG Icon */}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-10 h-10 text-white drop-shadow-md"
            >
                {/* Chat Bubble Base */}
                <path d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75a9.75 9.75 0 001.015 4.353l-1.015 3.382a.75.75 0 00.942.942l3.382-1.015A9.75 9.75 0 0012 21.75c5.385 0 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25z" />

                {/* Accent Plus/Star Icon */}
                <path
                    transform="translate(15, 15) scale(1.2) translate(-15, -15)"
                    fillRule="evenodd"
                    d="M14.615 8.25a.75.75 0 01.75.75v.75h.75a.75.75 0 010 1.5h-.75v.75a.75.75 0 01-1.5 0v-.75h-.75a.75.75 0 010-1.5h.75V9a.75.75 0 01.75-.75z"
                    clipRule="evenodd"
                    className="fill-yellow-400"
                />
            </svg>
        </div>
    );
};

export default Logo;