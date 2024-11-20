import React, { useEffect, useState, useCallback, memo } from 'react';
import VideoFeed from './VideoFeed';

const VideoInput = memo(({ show, setEmotion }) => {
    const [reconnectAttempts, setReconnectAttempts] = useState(0);
    const [socketConnected, setSocketConnected] = useState(false);

    const attemptReconnect = useCallback(() => {
        if (reconnectAttempts < 5) {
            setTimeout(() => {
                console.log(`Reconnection attempt ${reconnectAttempts + 1}`);
                try {
                    window.Echo.connector.socket.connect();
                    setReconnectAttempts(prev => prev + 1);
                } catch (error) {
                    console.error('Socket reconnection error:', error);
                }
            }, Math.pow(2, reconnectAttempts) * 1000);
        } else {
            console.error('Max reconnection attempts reached');
        }
    }, [reconnectAttempts]);

    const handleEmotionResult = useCallback((data) => {
        console.log('Emotion detected:', data.emotion);
        setEmotion(prev => {
            if (prev !== data.emotion) {
                return data.emotion;
            }
            return prev;
        });
    }, [setEmotion]);

    const handleSocketConnect = useCallback(() => {
        console.log('Socket connected');
        setSocketConnected(true);
        setReconnectAttempts(0);
    }, []);

    const handleSocketDisconnect = useCallback(() => {
        console.log('Socket disconnected');
        setSocketConnected(false);
    }, []);

    const handleSocketError = useCallback((error) => {
        console.error('Socket connection error:', error);
        setSocketConnected(false);
        attemptReconnect();
    }, [attemptReconnect]);

    useEffect(() => {
        try {
            const socket = window.Echo.connector.socket;

            // Set up event listeners
            socket.on('emotion_result', handleEmotionResult);
            socket.on('connect', handleSocketConnect);
            socket.on('disconnect', handleSocketDisconnect);
            socket.on('connect_error', handleSocketError);

            // Clean up
            return () => {
                socket.off('emotion_result', handleEmotionResult);
                socket.off('connect', handleSocketConnect);
                socket.off('disconnect', handleSocketDisconnect);
                socket.off('connect_error', handleSocketError);
            };
        } catch (error) {
            console.error('Socket initialization error:', error);
        }
    }, [handleEmotionResult, handleSocketConnect, handleSocketDisconnect, handleSocketError]);

    const handleFrameCaptured = useCallback((arrayBuffer) => {
        if (socketConnected) {
            window.Echo.connector.socket.emit('video_frame', arrayBuffer);
        } else {
            console.warn('Socket is not connected. Frame not sent.');
        }
    }, [socketConnected]);

    return (
        <div className="video-input">
            {show && <VideoFeed onFrameCaptured={handleFrameCaptured} />}
        </div>
    );
});

VideoInput.displayName = 'VideoInput';

export default VideoInput;
