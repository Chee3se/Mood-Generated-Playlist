import React, { useState } from 'react';
import Layout from "@/Layouts/Layout.jsx";
import SpotifySearch from "@/Components/SpotifySearch.jsx";
import EmotionInput from "@/Components/EmotionInput.jsx";
import ImageInput from "@/Components/ImageInput.jsx";

export default function Generate({ auth, spotify_access_token }) {
    const [emotion, setEmotion] = useState('');

    return (
        <Layout auth={auth}>
            <div className="min-h-screen flex justify-center items-center flex-col">
                <ImageInput setEmotion={setEmotion} />
                <EmotionInput emotion={emotion} setEmotion={setEmotion} />
                <SpotifySearch token={spotify_access_token} emotion={emotion} />
            </div>
        </Layout>
    );
}