import React, { useState } from 'react';
import ImageKit from 'imagekit-javascript';
import '../styles/image-input.css';

const imagekit = new ImageKit({
    publicKey: process.env.REACT_APP_IMAGEKIT_PUBLIC_KEY,
    urlEndpoint: process.env.REACT_APP_IMAGEKIT_URL_ENDPOINT,
    authenticationEndpoint: 'https://headbook-7930.onrender.com/upload-auth',
});

export default function ImageInput() {
    const [imageInputMsg, setImageInputMsg] = useState('No file selected');

    function checkInput() {
        const file = document.querySelector("input[type='file'");
        if (file.files.length === 0)
            return setImageInputMsg('No files selected');
        if (file.files[0].size < 1677721) {
            return setImageInputMsg(file.files[0].name);
        }
        return setImageInputMsg('File size is bigger than 1.5MB');
    }
    return (
        <div
            style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'baseline',
                justifyContent: 'center',
            }}
        >
            <label htmlFor="image-input">
                {'Upload an image (< 1.5MB)'}
                <input
                    type="file"
                    id="image-input"
                    accept=".jpg, .jpeg, .png, .webp"
                    onChange={checkInput}
                />
            </label>
            <p
                style={{
                    textAlign: 'center',
                    marginTop: '10px',
                    fontSize: '1rem',
                }}
            >
                {imageInputMsg}
            </p>
        </div>
    );
}

function checkFileSizeLimit() {
    const file = document.querySelector("input[type='file'");
    return file.files[0].size < 1677721;
}

export async function uploadPic() {
    const file = document.querySelector("input[type='file']");
    if (file.files.length === 0 || !checkFileSizeLimit()) return null;
    const response = await imagekit.upload({
        file: file.files[0],
        fileName: file.files[0].name,
    });
    file.value = '';
    return response.url;
}
