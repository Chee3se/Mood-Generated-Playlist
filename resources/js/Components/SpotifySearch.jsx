import React, { useState } from 'react';
import SpotifyWebApi from 'spotify-web-api-node';
import { Music, ExternalLink } from 'lucide-react';
import axios from 'axios';

export default function SpotifySearch({ token, emotion }) {
    const [playlists, setPlaylists] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleSearch = async () => {
        setIsLoading(true);
        try {
            const spotifyApi = new SpotifyWebApi();
            spotifyApi.setAccessToken(token);
            const response = await spotifyApi.searchPlaylists(emotion, { limit: 15 });
            setPlaylists(response.body.playlists.items);
        } catch (error) {
            console.error('Error fetching playlists: ', error);
        } finally {
            setIsLoading(false);
        }
    };

    const saveToHistory = async (playlistUrl, playlistName, playlistImage) => {
        try {
            await axios.post('/history', {
                emotion: emotion,
                album_link: playlistUrl,
                album_name: playlistName,
                img: playlistImage
            });
        } catch (error) {
            console.error('Error saving to history:', error);
        }
    };

    const handlePlaylistClick = (playlist) => {
        const playlistUrl = `spotify:playlist:${playlist.id}`;
        const imageUrl = playlist.images && playlist.images[0] ? playlist.images[0].url : '';
        saveToHistory(playlistUrl, playlist.name, imageUrl);
    };

    // Split playlists into columns
    const columns = [
        playlists.slice(0, 5),    // First column
        playlists.slice(5, 10),   // Second column
        playlists.slice(10, 15)   // Third column
    ];

    return (
        <div className="w-full max-w-6xl mx-auto p-4">
            <div className="flex justify-center mb-8">
                <button
                    onClick={handleSearch}
                    disabled={isLoading}
                    className="bg-green-500 hover:bg-green-400 text-white font-bold py-3 px-6 rounded-full flex items-center justify-center space-x-2 transition-all transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
                >
                    <Music className="w-5 h-5" />
                    <span>Find Matching Playlists</span>
                </button>
            </div>

            {playlists.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {columns.map((column, columnIndex) => (
                        <div key={columnIndex} className="space-y-4">
                            {column.map((playlist) => (
                                <a
                                    key={playlist.id}
                                    href={`spotify:playlist:${playlist.id}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => handlePlaylistClick(playlist)}
                                    className="block p-4 bg-gray-900 hover:bg-gray-800 rounded-lg transition-all transform hover:scale-102 group"
                                >
                                    <div className="flex items-start space-x-4">
                                        {playlist.images?.[0]?.url ? (
                                            <img
                                                src={playlist.images[0].url}
                                                alt={playlist.name}
                                                className="w-16 h-16 object-cover rounded shadow-lg"
                                            />
                                        ) : (
                                            <div className="w-16 h-16 bg-gray-800 rounded flex items-center justify-center">
                                                <Music className="w-8 h-8 text-gray-600" />
                                            </div>
                                        )}
                                        <div className="flex-1 min-w-0 h-20">
                                            <div className="flex items-center justify-between">
                                                <h3 className="font-bold text-white group-hover:text-green-500 transition-colors truncate pr-2">
                                                    {playlist.name}
                                                </h3>
                                                <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-green-500 flex-shrink-0" />
                                            </div>
                                            <p className="text-sm text-gray-400 mt-1 line-clamp-2">
                                                {playlist.description?.replace(/<[^>]*>?/gm, '') || "No description"}
                                            </p>
                                            <div className="text-xs text-gray-500 mt-2">
                                                {playlist.tracks.total} tracks • By {playlist.owner.display_name}
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            ))}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
