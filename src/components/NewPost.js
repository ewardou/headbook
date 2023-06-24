import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import '../styles/new-post.css';

export default function NewPost() {
    const { user } = useOutletContext();
    const [content, setContent] = useState('');

    async function createPost() {
        try {
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
                    body: JSON.stringify({ content }),
                }
            );
            if (!response.ok) {
                throw response;
            }
            setContent('');
        } catch (e) {
            // window.location.assign('/login');
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
                <button type="submit">Post</button>
            </form>
        </div>
    );
}
