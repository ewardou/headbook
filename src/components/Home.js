import React, { useState, useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';
import ReactLoading from 'react-loading';
import homeSVG from '../icons/home.svg';
import groupSVG from '../icons/group.svg';
import ProfileModal from './ProfileModal';

function Home() {
    const [profilePicture, setProfilePicture] = useState(
        'https://i.pinimg.com/originals/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg'
    );
    const [user, setUser] = useState(null);

    async function getMyUserInfo() {
        try {
            const response = await fetch(
                'https://headbook-7930.onrender.com/my-profile',
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            'token'
                        )}`,
                    },
                }
            );
            const json = await response.json();
            setUser(json);
            setProfilePicture(json.profilePicture);
        } catch (e) {
            window.location.assign('/login');
        }
    }

    useEffect(() => {
        getMyUserInfo();
    }, []);

    return (
        <div>
            <header>
                <div className="logo">
                    <p>h</p>
                </div>
                <Link to="/">
                    <img src={homeSVG} alt="Home icon" />
                </Link>
                <Link to="people">
                    <img src={groupSVG} alt="People icon" />
                </Link>
                <ProfileModal user={user} profilePicture={profilePicture} />
            </header>
            {user ? (
                <Outlet context={{ user, getMyUserInfo }} />
            ) : (
                <div>
                    <ReactLoading
                        type="spin"
                        color="#722F37"
                        className="loading"
                    />
                    <p style={{ textAlign: 'center' }}>
                        Waiting for Render to initialize server...
                    </p>
                </div>
            )}
        </div>
    );
}

export default Home;
