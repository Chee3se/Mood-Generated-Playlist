import React, { useState, useEffect } from 'react';
import {Link} from "@inertiajs/react";
import Layout from '../Layouts/Layout';


const Home = () => {
    const [currentEmotion, setCurrentEmotion] = useState(0);
    const emotions = [
        { emoji: "😊", text: "HAPPY", color: "text-green-400", music: "Upbeat Pop" },
        { emoji: "😢", text: "SAD", color: "text-green-400", music: "Soul-touching Ballads" },
        { emoji: "🎵", text: "EXCITED", color: "text-green-400", music: "High-energy Dance" },
        { emoji: "❤️", text: "ROMANTIC", color: "text-green-400", music: "Love Songs" }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentEmotion((prev) => (prev + 1) % emotions.length);
        }, 2000);
        return () => clearInterval(timer);
    }, []);

    return (
        <Layout>
            <div className="relative min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
                {/* Hero Section */}
                <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
                    {/* Spotify-style gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-green-900/20 to-black opacity-60" />

                    {/* Main Content */}
                    <div className="mt-20 relative z-9 text-center px-4 max-w-5xl mx-auto">
                        <div className="mb-8">
                            <h1 className="text-lg md:text-7xl font-bold mb-4 tracking-tight">
                                Feel the
                                <span className={`block transition-colors duration-500 ${emotions[currentEmotion].color}`}>
                                    {emotions[currentEmotion].text}
                                </span>
                            </h1>

                            <div className="flex justify-center mb-6">
                                <span className={`text-6xl animate-bounce`}>
                                    {emotions[currentEmotion].emoji}
                                </span>
                            </div>

                            <p className="text-2xl md:text-4xl mb-8 text-green-400">
                                Your face is the key to your perfect playlist
                            </p>
                        </div>

                        {/* Feature Cards - Spotify Style */}
                        <div className="grid md:grid-cols-3 gap-6 mb-12">
                            <div className="bg-gray-900/80 rounded-lg p-6 transition-all duration-300 hover:bg-gray-800/80 hover:scale-105">
                                <div className="text-4xl mb-4">📸</div>
                                <h3 className="text-xl font-bold mb-2 text-green-400">Show Your Face</h3>
                                <p className="text-gray-300">Just one look is all we need</p>
                            </div>

                            <div className="bg-gray-900/80 rounded-lg p-6 transition-all duration-300 hover:bg-gray-800/80 hover:scale-105">
                                <div className="text-4xl mb-4">✨</div>
                                <h3 className="text-xl font-bold mb-2 text-green-400">AI Magic</h3>
                                <p className="text-gray-300">We read your emotions instantly</p>
                            </div>

                            <div className="bg-gray-900/80 rounded-lg p-6 transition-all duration-300 hover:bg-gray-800/80 hover:scale-105">
                                <div className="text-4xl mb-4">🎵</div>
                                <h3 className="text-xl font-bold mb-2 text-green-400">Perfect Music</h3>
                                <p className="text-gray-300">Get your emotional soundtrack</p>
                            </div>
                        </div>

                        {/* CTA Section - Spotify Style */}
                        <div className="space-y-6">
                            <button className="bg-green-500 hover:bg-green-400 text-black text-xl px-12 py-4 rounded-full font-bold transition-all duration-300 hover:scale-105">
                                Start Listening Now
                            </button>

                            <p className="text-sm text-gray-400">
                                Join thousands of users discovering music through emotions
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Home;
