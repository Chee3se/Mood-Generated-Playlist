import React from 'react';

export default function VideoControl({ onStart }) {
    return (
        <div className="video-control">
            <button
                onClick={onStart}
                className="px-4 py-2 bg-green-500 hover:bg-green-400 text-white rounded-full font-semibold transition-colors duration-200 focus:outline-none"
            >
                Start Detecting
            </button>
        </div>
    );
}
