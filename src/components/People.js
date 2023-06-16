import React, { useState, useEffect } from 'react';
import '../styles/people.css';

export default function People() {
    const [permission, setPermission] = useState(false);
    const [content, setContent] = useState([]);
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
            window.location.assign('/login');
        }
    }

    useEffect(() => {
        getPermission();
    }, []);

    return permission ? (
        <div className="people">
            {content.map((el) => (
                <div key={el._id}>
                    <img src={el.profilePicture} alt="" />
                    <p>
                        {el.firstName} {el.lastName}
                    </p>
                    <button type="button">Add friend</button>
                </div>
            ))}
        </div>
    ) : (
        <h1>Loading</h1>
    );
}
