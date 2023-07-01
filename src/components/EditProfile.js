import React, { useState } from 'react';
import '../styles/edit-profile.css';

export default function EditProfile({
    curBio,
    editProfileVisible,
    closeModal,
}) {
    const [bio, setBio] = useState(curBio);

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
                <input type="file" />
                <p>Update bio</p>
                <input
                    type="text"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                />
                <button type="button">Update</button>
            </form>
        </div>
    );
}
