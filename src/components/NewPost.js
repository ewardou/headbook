import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import ImageInput, { uploadPic } from './ImageInput';
import '../styles/new-post.css';

export default function NewPost({ getPosts }) {
    const { user } = useOutletContext();
    const [content, setContent] = useState('');

    async function createPost() {
        try {
            const image = await uploadPic();
            const response = await fetch(
                'https://headbook-7930.onrender.com/new-post',
                {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            'token'
                        )}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ content, image }),
                }
            );
            if (!response.ok) {
                throw response;
            }
            setContent('');
            getPosts();
        } catch (e) {
            console.error(e);
        }
    }

    async function onSubmit(e) {
        e.preventDefault();
        await createPost();
    }

    return (
        <div className="new-post">
            <div>
                <img src={user.profilePicture} alt="" />
                <p>
                    {user.firstName} {user.lastName}
                </p>
            </div>
            <form onSubmit={onSubmit}>
                <textarea
                    placeholder="What's on your mind?"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />
                <div
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                    <ImageInput />
                    <button type="submit">Post</button>
                </div>
            </form>
        </div>
    );
}
