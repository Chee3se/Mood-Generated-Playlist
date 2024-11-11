import React from 'react';

export default function EmotionInput({ emotion, setEmotion }) {
    return (
        <input
            type="text"
            value={emotion}
            onChange={(e) => setEmotion(e.target.value)}
            placeholder="Enter your emotion"
            className="p-2 border rounded mb-4"
        />
    );
}
