import React from 'react';
import { useOutletContext } from 'react-router-dom';
import '../styles/new-post.css';

export default function NewPost() {
    const { user } = useOutletContext();
    return (
        <div className="new-post">
            <div>
                <img src={user.profilePicture} alt="" />
                <p>
                    {user.firstName} {user.lastName}
                </p>
            </div>
            <textarea placeholder="What's on your mind?" />
            <button type="button">Post</button>
        </div>
    );
}
