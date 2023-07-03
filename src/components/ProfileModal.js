import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/profile-modal.css';

export default function ProfileModal({ user, profilePicture }) {
    const [visible, setVisible] = useState(false);

    function showModal() {
        setVisible((prevState) => !prevState);
    }

    function logOut() {
        localStorage.removeItem('token');
        window.location.assign('/login');
    }

    return (
        <div className="profile-modal">
            <button type="button" onClick={showModal}>
                <img src={profilePicture} alt="My profile" />
            </button>
            <div className={visible ? 'visible' : ''}>
                <Link
                    to={user ? `profiles/${user._id}` : null}
                    onClick={showModal}
                >
                    My profile
                </Link>
                <button type="button" onClick={logOut}>
                    Log out
                </button>
            </div>
        </div>
    );
}
