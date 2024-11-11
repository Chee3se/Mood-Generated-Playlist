import React, { useState } from 'react';
import SpotifyWebApi from 'spotify-web-api-node';

export default function SpotifySearch({ token, emotion }) {
    const [playlists, setPlaylists] = useState([]);

    const handleSearch = async () => {
        try {
            const spotifyApi = new SpotifyWebApi();
            spotifyApi.setAccessToken(token);
            const response = await spotifyApi.searchPlaylists(emotion, { limit: 3 });
            setPlaylists(response.body.playlists.items);
        } catch (error) {
            console.error('Error fetching playlists: ', error);
        }
    };

    return (
        <div className="spotify-search">
            <button onClick={handleSearch} className="p-2 bg-green-500 text-white rounded">
                Find Playlist
            </button>
            <div className="mt-4">
                {playlists.map((playlist) => (
                    <div key={playlist.id} className="mb-2">
                        <a href={`spotify:playlist:${playlist.id}`} target="_blank" rel="noopener noreferrer">
                            {playlist.name}
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}
