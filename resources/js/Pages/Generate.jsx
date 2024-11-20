import React, { useEffect, useState } from 'react';
import Layout from "@/Layouts/Layout.jsx";
import SpotifySearch from "@/Components/SpotifySearch.jsx";
import EmotionInput from "@/Components/EmotionInput.jsx";
import ImageInput from "@/Components/ImageInput.jsx";
import VideoInput from "@/Components/VideoInput.jsx";

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
            <div className="min-h-screen flex justify-center items-center flex-col space-y-5">
                <div className="flex space-x-4 mb-4">
                    <button
                        onClick={() => setInputMethod('image')}
                        className={`px-4 py-2 rounded-lg transition-colors ${
                            inputMethod === 'image'
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                    >
                        Image Method
                    </button>
                    <button
                        onClick={() => setInputMethod('video')}
                        className={`px-4 py-2 rounded-lg transition-colors ${
                            inputMethod === 'video'
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                    >
                        Video Method
                    </button>
                </div>
                {renderInputMethod()}
                <VideoInput show={inputMethod === 'video'} setEmotion={setEmotion} />
                <EmotionInput emotion={emotion} setEmotion={setEmotion} />
                <SpotifySearch token={spotify_access_token} emotion={emotion} />
            </div>
        </Layout>
    );
}
