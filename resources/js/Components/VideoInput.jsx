import React, { useEffect, useState, useCallback, useRef, memo } from 'react';
import VideoFeed from './VideoFeed';
import VideoControl from './VideoControl';

const VideoInput = memo(({ show, setEmotion }) => {
    const [reconnectAttempts, setReconnectAttempts] = useState(0);
    const [socketConnected, setSocketConnected] = useState(false);
    const [recording, setRecording] = useState(false);
    const emotionsRef = useRef([]);
    const intervalIdRef = useRef(null);

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
        if (data.emotion) {
            emotionsRef.current.push(data.emotion);
        } else {
            console.warn('Received undefined emotion:', data);
        }
    }, []);

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
        if (socketConnected && recording) {
            window.Echo.connector.socket.emit('video_frame', arrayBuffer);
        } else {
            console.warn('Socket is not connected or recording is not started. Frame not sent.');
        }
    }, [socketConnected, recording]);

    const startRecording = () => {
        setRecording(true);
        emotionsRef.current = [];
        intervalIdRef.current = setTimeout(() => {
            setRecording(false);
            if (emotionsRef.current.length > 0) {
                const mostFrequentEmotion = emotionsRef.current.sort((a, b) =>
                    emotionsRef.current.filter(emotion => emotion === a).length - emotionsRef.current.filter(emotion => emotion === b).length
                ).pop();
                setEmotion(mostFrequentEmotion);
            } else {
                console.warn('No emotions recorded during the interval.');
            }
        }, 5100);
    };

    useEffect(() => {
        return () => {
            if (intervalIdRef.current) {
                clearTimeout(intervalIdRef.current);
            }
        };
    }, []);

    return (
        <div className="video-input flex justify-center items-center flex-col gap-4">
            {show && <VideoFeed onFrameCaptured={handleFrameCaptured} />}
            {show && <VideoControl onStart={startRecording} />}
        </div>
    );
});

VideoInput.displayName = 'VideoInput';

export default VideoInput;
