import React, { useState } from 'react';
import { useForm } from "@inertiajs/react";
import axios from 'axios';
import { Camera } from 'lucide-react';

export default function ImageInput({ setEmotion }) {
    const { data, setData, errors } = useForm({
        image: null,
    });

    const [previewUrl, setPreviewUrl] = useState(null);

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('image', file);
            // Create new preview URL
            const url = URL.createObjectURL(file);
            // Clean up old preview URL if it exists
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
            setPreviewUrl(url);

            // Automatically submit when image is selected
            const formData = new FormData();
            formData.append('image', file);

            try {
                const response = await axios.post(route('analyze.image'), formData);
                const emotion = response.data;
                setEmotion(emotion);
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        }
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <div className="flex flex-col items-center space-y-4">
                <div className="w-full">
                    <label
                        htmlFor="image-upload"
                        className={`flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer
                        ${previewUrl ? 'bg-gray-100' : 'bg-gray-50 hover:bg-gray-100'}
                        dark:hover:bg-gray-800 dark:bg-gray-700 dark:border-gray-600 dark:hover:border-gray-500 relative overflow-hidden`}
                    >
                        {previewUrl ? (
                            <div className="w-full h-full">
                                <img
                                    src={previewUrl}
                                    alt="Preview"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                    <p className="text-white text-sm font-medium">Click to change image</p>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <Camera className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" />
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                    <span className="font-semibold">Click to upload</span> or drag and drop
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                                </p>
                            </div>
                        )}
                        <input
                            id="image-upload"
                            type="file"
                            accept="image/*"
                            capture="camera"
                            onChange={handleImageChange}
                            className="hidden"
                        />
                    </label>
                </div>

                {errors.image && (
                    <div className="text-red-500 text-sm">{errors.image}</div>
                )}
            </div>
        </div>
    );
}
