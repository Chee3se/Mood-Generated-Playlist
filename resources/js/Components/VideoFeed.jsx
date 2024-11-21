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

        const intervalId = setInterval(captureFrame, 500); // Capture a frame every second

        // Clean up when component unmounts
        return () => {
            clearInterval(intervalId);
        };
    }, [onFrameCaptured]);

    return (
        <div className="video-feed">
            <video className="rounded-xl border-2 border-dashed border-gray-600 bg-gray-700" ref={videoRef} width="500" autoPlay></video>
            <canvas className="hidden" ref={canvasRef} width="500"></canvas>
        </div>
    );
}
