import React from 'react';
import { DateTime } from 'luxon';
import LikeButton from './LikeButton';
import Comments from './Comments';

export default function PostCards({ posts }) {
    function formatDate(date) {
        return DateTime.fromISO(date).toLocaleString(DateTime.DATETIME_MED);
    }

    return (
        <div>
            {posts.map((post) => (
                <div key={post._id} className="post-card">
                    <div>
                        <img src={post.author.profilePicture} alt="" />
                        <div>
                            <p>
                                {post.author.firstName} {post.author.lastName}
                            </p>
                            <p>{formatDate(post.date)}</p>
                        </div>
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
