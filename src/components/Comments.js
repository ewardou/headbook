import React, { useState, useEffect } from 'react';
import '../styles/comments.css';
import { DateTime } from 'luxon';
import commentsSVG from '../icons/comments.svg';

export default function Comments({ postID }) {
    const [newComment, setNewComment] = useState('');
    const [comments, setComments] = useState(null);
    const [visible, setVisible] = useState(false);
    const [numberOfComments, setNumberOfComments] = useState(0);

    async function getComments() {
        const response = await fetch(
            `https://headbook-7930.onrender.com/posts/${postID}/comments`,
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            }
        );
        const json = await response.json();
        setComments(json.reverse());
        setNumberOfComments(json.length);
    }

    async function createComment() {
        try {
            const response = await fetch(
                `https://headbook-7930.onrender.com/posts/${postID}/comments`,
                {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            'token'
                        )}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ content: newComment }),
                }
            );
            if (response.ok) {
                setNewComment('');
                getComments();
            }
        } catch (e) {
            console.error(e);
        }
    }

    function formatDate(date) {
        return DateTime.fromISO(date).toLocaleString(DateTime.DATE_MED);
    }

    useEffect(() => {
        getComments();
    }, []);

    return (
        <div className="comments">
            <button
                type="button"
                onClick={() => setVisible((prevState) => !prevState)}
            >
                <img src={commentsSVG} alt="comments icon" />{' '}
                <span>{numberOfComments}</span>
            </button>
            <div className={visible ? 'visible' : ''}>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        createComment();
                    }}
                >
                    <textarea
                        type="text"
                        placeholder="Write a comment"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        required
                    />
                    <button type="submit">Post</button>
                </form>
                <div>
                    {comments
                        ? comments.map((comment) => (
                              <div key={comment._id} className="user-comment">
                                  <img
                                      src={comment.author.profilePicture}
                                      alt=""
                                  />
                                  <span>
                                      <div>
                                          <p>
                                              {comment.author.firstName}{' '}
                                              {comment.author.lastName}
                                          </p>
                                          <p>{formatDate(comment.date)}</p>
                                      </div>
                                      <p>{comment.content}</p>
                                  </span>
                              </div>
                          ))
                        : 'No comments yet'}
                </div>
            </div>
        </div>
    );
}
