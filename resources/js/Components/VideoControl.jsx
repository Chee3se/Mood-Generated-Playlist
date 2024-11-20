import React from 'react';

export default function VideoControl({ onStart }) {
    return (
        <div className="video-control">
            <button onClick={onStart} className="px-4 py-2 bg-blue-500 text-white rounded-lg">
                Start Detecting
            </button>
        </div>
    );
}
