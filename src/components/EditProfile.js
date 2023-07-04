import React, { useState } from 'react';
import ReactLoading from 'react-loading';
import '../styles/edit-profile.css';
import { useOutletContext } from 'react-router-dom';
import ImageInput, { uploadPic } from './ImageInput';

export default function EditProfile({
    curBio,
    editProfileVisible,
    closeModal,
    getInformation,
}) {
    const [bio, setBio] = useState(curBio);
    const [disabled, setDisabled] = useState(false);
    const { getMyUserInfo } = useOutletContext();

    async function updateProfile() {
        setDisabled(true);
        const newProfilePicture = await uploadPic();
        const response = await fetch(
            'https://headbook-7930.onrender.com/update-profile',
            {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ newProfilePicture, newAboutMe: bio }),
            }
        );
        if (response.ok) {
            getInformation();
            getMyUserInfo();
            closeModal();
        } else {
            console.log(response);
        }
        setDisabled(false);
    }

    return (
        <div
            className={
                editProfileVisible ? 'edit-profile visible' : 'edit-profile'
            }
        >
            <form>
                <button type="button" onClick={closeModal}>
                    X
                </button>
                <p>Change profile picture</p>
                <ImageInput />
                <p>Update bio</p>
                <input
                    type="text"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                />
                <button
                    type="button"
                    onClick={updateProfile}
                    disabled={disabled}
                >
                    {disabled ? (
                        <ReactLoading
                            type="spin"
                            color="#722F37"
                            className="loading"
                            height={25}
                            width={25}
                        />
                    ) : (
                        'Update'
                    )}
                </button>
            </form>
        </div>
    );
}
