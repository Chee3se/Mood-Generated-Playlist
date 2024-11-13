import React from 'react';

export default function EmotionInput({ emotion, setEmotion }) {
    return (
        <div className="relative flex justify-center items-center w-48">
            <input
                type="text"
                value={emotion}
                onChange={(e) => setEmotion(e.target.value)}
                placeholder="Enter your emotion"
                className="w-full bg-gray-900 text-white placeholder-gray-400
                    px-8 py-3 rounded-full border-2 border-gray-700
                    focus:outline-none focus:border-green-500
                    transition-all duration-300
                    text-sm font-medium
                    hover:border-gray-600"
            />
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-500/10 to-blue-500/10 animate-gradient blur-xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </div>
    );
}
