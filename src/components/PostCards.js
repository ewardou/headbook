import React from 'react';
import { DateTime } from 'luxon';
import { Link } from 'react-router-dom';
import LikeButton from './LikeButton';
import Comments from './Comments';
import deleteSVG from '../icons/delete.svg';

export default function PostCards({
    posts,
    personalProfile = false,
    getInformation,
}) {
    function formatDate(date) {
        return DateTime.fromISO(date).toLocaleString(DateTime.DATETIME_MED);
    }

    async function deletePost(postID) {
        await fetch(`https://headbook-7930.onrender.com/posts/${postID}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        getInformation();
    }

    return (
        <div>
            {posts.map((post) => (
                <div key={post._id} className="post-card">
                    <div>
                        <img src={post.author.profilePicture} alt="" />
                        <div>
                            <Link to={`/profiles/${post.author._id}`}>
                                {post.author.firstName} {post.author.lastName}
                            </Link>
                            <p>{formatDate(post.date)}</p>
                        </div>
                        {personalProfile ? (
                            <button
                                type="button"
                                onClick={() => deletePost(post._id)}
                            >
                                <img src={deleteSVG} alt="Delete icon" />
                            </button>
                        ) : null}
                    </div>
                    <p style={{ margin: '10px 0px' }}>{post.content}</p>
                    {post.image ? (
                        <img
                            src={post.image}
                            alt=""
                            style={{
                                width: 'auto',
                                maxWidth: '90%',
                                height: 'auto',
                                borderRadius: '0',
                                margin: '0 auto',
                                display: 'block',
                            }}
                        />
                    ) : null}
                    <div className="buttons">
                        <LikeButton likes={post.likes} postID={post._id} />
                        <Comments postID={post._id} />
                    </div>
                </div>
            ))}
        </div>
    );
}
