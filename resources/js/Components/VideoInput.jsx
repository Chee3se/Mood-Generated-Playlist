import React, { useEffect, useState } from 'react';
import VideoFeed from './VideoFeed';

export default function VideoInput() {
    const [emotion, setEmotion] = useState('');
    const [reconnectAttempts, setReconnectAttempts] = useState(0);
    const [socketConnected, setSocketConnected] = useState(false);

    useEffect(() => {
        const attemptReconnect = () => {
            if (reconnectAttempts < 5) {
                setTimeout(() => {
                    console.log(`Reconnection attempt ${reconnectAttempts + 1}`);
                    try {
                        window.Echo.connector.socket.connect();
                        setReconnectAttempts(reconnectAttempts + 1);
                    } catch (error) {
                        console.error('Socket reconnection error:', error);
                    }
                }, Math.pow(2, reconnectAttempts) * 1000); // Exponential backoff
            } else {
                console.error('Max reconnection attempts reached');
            }
        };

        // Listen for emotion results
        try {
            window.Echo.connector.socket.on('emotion_result', (data) => {
                console.log('Emotion detected:', data.emotion);
                setEmotion(data.emotion);
            });

            // Handle socket connection events
            window.Echo.connector.socket.on('connect', () => {
                console.log('Socket connected');
                setSocketConnected(true);
                setReconnectAttempts(0); // Reset reconnection attempts on successful connection
            });

            window.Echo.connector.socket.on('disconnect', () => {
                console.log('Socket disconnected');
                setSocketConnected(false);
            });

            window.Echo.connector.socket.on('connect_error', (error) => {
                console.error('Socket connection error:', error);
                setSocketConnected(false);
                attemptReconnect();
            });
        } catch (error) {
            console.error('Socket initialization error:', error);
        }

        // Clean up when component unmounts
        return () => {
            window.Echo.connector.socket.off('emotion_result');
            window.Echo.connector.socket.off('connect');
            window.Echo.connector.socket.off('disconnect');
            window.Echo.connector.socket.off('connect_error');
        };
    }, [reconnectAttempts]);

    const handleFrameCaptured = (arrayBuffer) => {
        if (socketConnected) {
            window.Echo.connector.socket.emit('video_frame', arrayBuffer);
        } else {
            console.warn('Socket is not connected. Frame not sent.');
        }
    };

    return (
        <div className="video-input">
            <VideoFeed onFrameCaptured={handleFrameCaptured} />
            <p>Detected Emotion: {emotion}</p>
        </div>
    );
}
