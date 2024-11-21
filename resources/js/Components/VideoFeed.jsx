import React, { useEffect, useRef } from 'react';

export default function VideoFeed({ onFrameCaptured }) {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                videoRef.current.srcObject = stream;
                videoRef.current.play();
            })
            .catch(err => {
                console.error('Error accessing webcam:', err);
            });

        const captureFrame = () => {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');

            // Calculate the correct dimensions to maintain aspect ratio
            const aspectRatio = video.videoWidth / video.videoHeight;
            const width = canvas.width;
            const height = width / aspectRatio;

            // Set canvas height to maintain aspect ratio
            canvas.height = height;

            context.drawImage(video, 0, 0, width, height);
            canvas.toBlob(blob => {
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

        const intervalId = setInterval(captureFrame, 1000);

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
