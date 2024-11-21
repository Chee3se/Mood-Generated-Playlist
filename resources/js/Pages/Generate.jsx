import React, { useEffect, useState } from 'react';
import Layout from "@/Layouts/Layout.jsx";
import SpotifySearch from "@/Components/SpotifySearch.jsx";
import EmotionInput from "@/Components/EmotionInput.jsx";
import ImageInput from "@/Components/ImageInput.jsx";
import VideoInput from "@/Components/VideoInput.jsx";
import {Head} from "@inertiajs/react";

export default function Generate({ auth, spotify_access_token }) {
    const [emotion, setEmotion] = useState('');
    const [inputMethod, setInputMethod] = useState('image');

    useEffect(() => {
        window.Echo.channel('emotion-channel')
            .listen('.emotion.detected', (e) => {
                setEmotion(e.emotion);
            });

        return () => {
            window.Echo.leaveChannel('emotion-channel');
        };
    }, []);

    const renderInputMethod = () => {
        switch (inputMethod) {
            case 'image':
                return <ImageInput setEmotion={setEmotion} />;
            default:
                return null;
        }
    };

    return (
        <Layout auth={auth}>
            <Head title="Generate"/>
            <div className="min-h-screen flex justify-center items-center flex-col space-y-5">
                <div className="flex items-center gap-4 mb-4">
                    <button
                        onClick={() => setInputMethod('image')}
                        className={`px-6 py-3 rounded-full font-semibold text-sm tracking-wide transition-all duration-300 transform hover:scale-105 ${
                            inputMethod === 'image'
                                ? 'bg-green-500 hover:bg-green-400 text-black shadow-lg'
                                : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-700 hover:border-zinc-600'
                        }`}
                    >
                        Image
                    </button>
                    <button
                        onClick={() => setInputMethod('video')}
                        className={`px-6 py-3 rounded-full font-semibold text-sm tracking-wide transition-all duration-300 transform hover:scale-105 ${
                            inputMethod === 'video'
                                ? 'bg-green-500 hover:bg-green-400 text-black shadow-lg'
                                : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-700 hover:border-zinc-600'
                        }`}
                    >
                        Video
                    </button>
                </div>
                {renderInputMethod()}
                <VideoInput show={inputMethod === 'video'} setEmotion={setEmotion}/>
                <EmotionInput emotion={emotion} setEmotion={setEmotion}/>
                <SpotifySearch token={spotify_access_token} emotion={emotion}/>
            </div>
        </Layout>
    );
}
