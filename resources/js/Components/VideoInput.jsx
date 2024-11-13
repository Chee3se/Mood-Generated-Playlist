import React, { useEffect, useRef, useState } from 'react';

export default function VideoInput() {
    const videoRef = useRef(null);
    const wsRef = useRef(null);
    const [emotion, setEmotion] = useState('');

    useEffect(() => {
        // Open WebSocket connection
        wsRef.current = new WebSocket('ws://localhost:6500');

        wsRef.current.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.emotion) {
                setEmotion(data.emotion);
            }
        };

        // Get access to the user's webcam
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                videoRef.current.srcObject = stream;
                videoRef.current.play();

                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');

                // Send video frames to the WebSocket server
                const sendFrame = () => {
                    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
                    canvas.toBlob(blob => {
                        if (wsRef.current.readyState === WebSocket.OPEN) {
                            wsRef.current.send(blob);
                        }
                    }, 'image/jpeg');
                    requestAnimationFrame(sendFrame);
                };

                sendFrame();
            });

        return () => {
            // Close WebSocket connection
            wsRef.current.close();
        };
    }, []);

    return (
        <div className="video-input">
            <video ref={videoRef} className="w-full h-auto" />
            <p>Detected Emotion: {emotion}</p>
        </div>
    );
}
