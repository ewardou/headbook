import React, { useState, useEffect } from 'react';
import ReactLoading from 'react-loading';
import PostCards from './PostCards';
import NewPost from './NewPost';
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

    useEffect(() => {
        getPosts();
    }, []);

    if (posts) {
        return (
            <div className="posts">
                <NewPost />
                <PostCards posts={posts} />
            </div>
        );
    }

    return <ReactLoading type="spin" color="#722F37" className="loading" />;
}
