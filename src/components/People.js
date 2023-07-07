import React, { useState, useEffect } from 'react';
import '../styles/people.css';
import ReactLoading from 'react-loading';
import { useOutletContext, Link, Outlet } from 'react-router-dom';
import friendsIcon from '../icons/friends.svg';
import requestIcon from '../icons/request.svg';
import suggestionsIcon from '../icons/suggestion.svg';

export default function People() {
    const [permission, setPermission] = useState(false);
    const [content, setContent] = useState([]);
    const { user, getMyUserInfo } = useOutletContext();
    async function getPermission() {
        try {
            const response = await fetch(
                'https://headbook-7930.onrender.com/people',
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
            setContent(json);
            if (response.ok) {
                setPermission(true);
            } else {
                throw new Error('Log in to access this route');
            }
        } catch (e) {
            window.location.assign('/headbook/#/login');
        }
    }

    useEffect(() => {
        getPermission();
    }, []);

    return permission ? (
        <div className="people">
            <nav>
                <Link to="/people">
                    <img src={suggestionsIcon} alt="" /> Suggestions
                </Link>
                <Link to="friends">
                    <img src={friendsIcon} alt="" /> Friends
                </Link>
                <Link to="requests">
                    <img src={requestIcon} alt="" /> Friend requests
                </Link>
            </nav>
            <Outlet context={{ user, content, getMyUserInfo }} />
        </div>
    ) : (
        <ReactLoading type="spin" color="#722F37" className="loading" />
    );
}
