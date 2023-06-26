import React, { useState, useEffect } from 'react';
import ReactLoading from 'react-loading';
import { DateTime } from 'luxon';
import NewPost from './NewPost';
import LikeButton from './LikeButton';
import Comments from './Comments';
import '../styles/post.css';

export default function Posts() {
    const [posts, setPosts] = useState(null);

    async function getPosts() {
        try {
            const response = await fetch(
                'https://headbook-7930.onrender.com/posts',
                {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            'token'
                        )}`,
                    },
                }
            );
            const json = await response.json();
            setPosts(json.reverse());
        } catch (e) {
            window.location.assign('/login');
        }
    }

    function formatDate(date) {
        return DateTime.fromISO(date).toLocaleString(DateTime.DATETIME_MED);
    }

    useEffect(() => {
        getPosts();
    }, []);

    if (posts) {
        return (
            <div className="posts">
                <NewPost />
                <div>
                    {posts.map((post) => (
                        <div key={post._id} className="post-card">
                            <div>
                                <img src={post.author.profilePicture} alt="" />
                                <div>
                                    <p>
                                        {post.author.firstName}{' '}
                                        {post.author.lastName}
                                    </p>
                                    <p>{formatDate(post.date)}</p>
                                </div>
                            </div>
                            <p style={{ margin: '10px 0px' }}>{post.content}</p>
                            <div className="buttons">
                                <LikeButton
                                    likes={post.likes}
                                    postID={post._id}
                                />
                                <Comments postID={post._id} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return <ReactLoading type="spin" color="#722F37" className="loading" />;
}
