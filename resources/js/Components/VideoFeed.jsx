import React, { useEffect, useRef, useState } from 'react';
import { Camera, AlertCircle } from 'lucide-react';

export default function VideoFeed({ onFrameCaptured }) {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [cameraError, setCameraError] = useState(false);

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                videoRef.current.srcObject = stream;
                videoRef.current.play();
                setCameraError(false);
            })
            .catch(err => {
                console.error('Error accessing webcam:', err);
                setCameraError(true);
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

    if (cameraError) {
        return (
            <div className="video-feed">
                <div className="rounded-xl border-2 border-dashed border-orange-500 bg-gray-700 w-full sm:w-[500px] h-[375px] flex flex-col items-center justify-center text-center p-6">
                    <AlertCircle className="w-12 h-12 text-orange-500 mb-4" />
                    <h3 className="text-lg font-medium text-white mb-2">
                        Camera Access Required
                    </h3>
                    <p className="text-gray-300 mb-4 max-w-sm sm:p-0">
                        Please enable your camera to use this feature. Check your browser settings and make sure your camera is connected.
                    </p>
                    <div className="space-y-2 text-sm text-gray-400">
                        <p>To enable your camera:</p>
                        <ol className="list-decimal text-left pl-6 space-y-1 ">
                            <li>Click the camera icon in your browser's address bar</li>
                            <li>Select "Allow" for camera access</li>
                            <li>Refresh the page</li>
                        </ol>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="video-feed">
            <video className="rounded-xl border-2 border-dashed border-gray-600 bg-gray-700" ref={videoRef} width="500" autoPlay></video>
            <canvas className="hidden" ref={canvasRef} width="500"></canvas>
        </div>
    );
}
