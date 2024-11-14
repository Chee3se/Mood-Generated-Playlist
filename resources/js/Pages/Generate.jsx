import React, {useEffect, useState} from 'react';
import Layout from "@/Layouts/Layout.jsx";
import SpotifySearch from "@/Components/SpotifySearch.jsx";
import EmotionInput from "@/Components/EmotionInput.jsx";
import ImageInput from "@/Components/ImageInput.jsx";
import VideoInput from "@/Components/VideoInput.jsx";

export default function Generate({ auth, spotify_access_token }) {
    const [emotion, setEmotion] = useState('');

    useEffect(() => {
        window.Echo.channel('emotion-channel')
            .listen('.emotion.detected', (e) => {
                setEmotion(e.emotion);
            });

        return () => {
            window.Echo.leaveChannel('emotion-channel');
        };
    }, []);

    return (
        <Layout auth={auth}>
            <div className="min-h-screen flex justify-center items-center flex-col space-y-5">
                <VideoInput />
                <ImageInput setEmotion={setEmotion} />
                <EmotionInput emotion={emotion} setEmotion={setEmotion} />
                <SpotifySearch token={spotify_access_token} emotion={emotion} />
            </div>
        </Layout>
    );
}
