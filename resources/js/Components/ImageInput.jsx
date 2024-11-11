import React from 'react';
import { useForm } from "@inertiajs/react";
import axios from 'axios';

export default function ImageInput({ setEmotion }) {
    const { data, setData, errors } = useForm({
        image: null,
    });

    const handleImageChange = (e) => {
        setData('image', e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!data.image) return;

        const formData = new FormData();
        formData.append('image', data.image);

        try {
            const response = await axios.post(route('analyze.image'), formData);
            const emotion = response.data;
            setEmotion(emotion);
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="image-input">
            <input
                type="file"
                accept="image/*"
                capture="camera"
                onChange={handleImageChange}
                className="p-2 border rounded mb-4"
            />
            {errors.image && <div className="text-red-500">{errors.image}</div>}
            <button type="submit" className="p-2 bg-blue-500 text-white rounded">
                Upload Image
            </button>
        </form>
    );
}
