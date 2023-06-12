import React, { useState, useEffect } from 'react';

function Home() {
    const [permission, setPermission] = useState(false);
    async function getPermission() {
        try {
            const response = await fetch(
                'https://headbook-7930.onrender.com/protected',
                {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            'token'
                        )}`,
                    },
                }
            );
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

    return permission ? <h1>Protected route</h1> : <h1>Loading</h1>;
}

export default Home;
