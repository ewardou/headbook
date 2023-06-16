import React, { useState, useEffect } from 'react';

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
        <div>
            {content.map((el) => (
                <p key={el._id}>
                    {el.firstName} {el.lastName}
                </p>
            ))}
        </div>
    ) : (
        <h1>Loading</h1>
    );
}
