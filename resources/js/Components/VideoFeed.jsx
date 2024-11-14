import React, { useEffect, useRef } from 'react';

export default function VideoFeed({ onFrameCaptured }) {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    useEffect(() => {
        // Access the user's webcam
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                videoRef.current.srcObject = stream;
                videoRef.current.play();
            })
            .catch(err => {
                console.error('Error accessing webcam:', err);
            });

        // Capture frames and send to parent component
        const captureFrame = () => {
            const context = canvasRef.current.getContext('2d');
            context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
            canvasRef.current.toBlob(blob => {
                if (blob) {
                    const reader = new FileReader();
                    reader.onload = () => {
                        const arrayBuffer = reader.result;
                        onFrameCaptured(arrayBuffer);
                    };
                    reader.readAsArrayBuffer(blob);
                }
            });
        };

        const intervalId = setInterval(captureFrame, 1000); // Capture a frame every second

        // Clean up when component unmounts
        return () => {
            clearInterval(intervalId);
        };
    }, [onFrameCaptured]);

    return (
        <div className="video-feed">
            <video ref={videoRef} width="640" height="480" autoPlay></video>
            <canvas ref={canvasRef} width="640" height="480" style={{ display: 'none' }}></canvas>
        </div>
    );
}
