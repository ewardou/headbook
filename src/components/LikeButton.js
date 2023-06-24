import React, { useState } from 'react';
import '../styles/like-button.css';

export default function LikeButton({ postID, likes }) {
    const [liked, setLiked] = useState(false);
    const [numberOfLikes, setNumberOfLikes] = useState(likes);
    async function likePost() {
        const response = await fetch(
            `https://headbook-7930.onrender.com/${
                liked ? 'dislike' : 'like'
            }-post`,
            {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ postID }),
            }
        );
        if (response.ok) {
            if (liked) {
                setNumberOfLikes((prevState) => prevState - 1);
            } else {
                setNumberOfLikes((prevState) => prevState + 1);
            }
            setLiked((prevState) => !prevState);
        }
    }

    return (
        <div className="like-container">
            <button
                className={liked ? 'like-button liked' : 'like-button'}
                onClick={likePost}
                type="button"
            >
                {' '}
            </button>
            <span>{numberOfLikes}</span>
        </div>
    );
}
