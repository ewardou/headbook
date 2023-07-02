import React, { useEffect, useState } from 'react';
import { useParams, Link, useOutletContext } from 'react-router-dom';
import ReactLoading from 'react-loading';
import PostCards from './PostCards';
import editSVG from '../icons/edit.svg';
import '../styles/profile.css';
import EditProfile from './EditProfile';

export default function Profile() {
    const [userProfile, setUserProfile] = useState(null);
    const [userPosts, setUserPosts] = useState(null);
    const [editProfileVisible, setEditProfileVisible] = useState(false);
    const { userID } = useParams();
    const { user } = useOutletContext();

    const openModal = () => {
        setEditProfileVisible(true);
    };

    const closeModal = () => {
        setEditProfileVisible(false);
    };

    async function getInformation() {
        const response = await fetch(
            `https://headbook-7930.onrender.com/profiles/${userID}`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            }
        );
        const json = await response.json();
        setUserProfile(json.user);
        setUserPosts(json.userPosts.reverse());
        if (!response.ok) {
            console.error(response);
        }
    }

    useEffect(() => {
        getInformation();
    }, [userID]);

    if (userProfile) {
        return (
            <div className="profile">
                <div>
                    <div>
                        <img src={userProfile.profilePicture} alt="" />
                        {userID === user._id ? (
                            <button type="button" onClick={openModal}>
                                <img src={editSVG} alt="edit icon" />
                            </button>
                        ) : null}
                    </div>
                    <p>
                        {userProfile.firstName} {userProfile.lastName}
                    </p>
                </div>
                <div>
                    <h1>About me</h1>
                    <p>{userProfile.aboutMe}</p>
                </div>
                <div>
                    <h1>Friends</h1>
                    <div>
                        {userProfile.friends.map((friend) => (
                            <Link
                                to={`/profiles/${friend._id}`}
                                key={friend._id}
                            >
                                <img src={friend.profilePicture} alt="" />
                                <p>
                                    {friend.firstName} {friend.lastName}
                                </p>
                            </Link>
                        ))}
                    </div>
                </div>
                <div>
                    <h1>Posts</h1>
                    {userPosts.length > 0 ? (
                        <PostCards posts={userPosts} />
                    ) : (
                        <p style={{ textAlign: 'center' }}>No posts yet</p>
                    )}
                </div>
                <EditProfile
                    curBio={userProfile.aboutMe}
                    editProfileVisible={editProfileVisible}
                    closeModal={closeModal}
                    getInformation={getInformation}
                />
            </div>
        );
    }
    return <ReactLoading type="spin" color="#722F37" className="loading" />;
}
