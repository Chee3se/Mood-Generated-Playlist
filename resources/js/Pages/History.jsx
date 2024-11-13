import React from 'react';
import { Head } from "@inertiajs/react";
import Layout from '../Layouts/Layout';
import { Music, Clock, Heart } from 'lucide-react';

export default function History({ auth, histories }) {
    const isLoading = histories === undefined;

    return (
        <Layout auth={auth}>
            <Head title="History" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-2xl font-bold text-white">Your Listening History</h1>
                    <div className="text-gray-400">
                        <Clock className="inline-block w-5 h-5 mr-2" />
                        Recent Activities
                    </div>
                </div>

                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {histories.map((history) => (
                            <div
                                key={history.id}
                                className="bg-gray-900 hover:bg-gray-800 p-4 rounded-lg transition-all"
                            >
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Music className="w-6 h-6 text-green-500" />
                                    </div>
                                    <div className="flex-grow">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <a
                                                    href={history.album_link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-white hover:text-green-500 font-medium"
                                                >
                                                    {history.album_name || 'Unknown Album'}
                                                </a>
                                                <div className="flex items-center mt-1 space-x-2">
                                                    <span className="text-sm px-2 py-1 bg-gray-800 rounded-full text-green-500">
                                                        {history.emotion}
                                                    </span>
                                                    <span className="text-sm text-gray-400">
                                                        {new Date(history.created_at).toLocaleDateString('en-US', {
                                                            year: 'numeric',
                                                            month: 'short',
                                                            day: 'numeric',
                                                            hour: '2-digit',
                                                            minute: '2-digit'
                                                        })}
                                                    </span>
                                                </div>
                                            </div>
                                            <a
                                                href={history.album_link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-gray-400 hover:text-green-500 transition-colors"
                                            >
                                                <Heart className="w-5 h-5" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {histories.length === 0 && (
                            <div className="text-center py-12">
                                <Music className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                                <h3 className="text-xl font-medium text-white mb-2">No History Yet</h3>
                                <p className="text-gray-400">
                                    Start listening to some playlists to see your history here
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </Layout>
    );
}
