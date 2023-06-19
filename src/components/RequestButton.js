import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

export default function RequestButton({ id, requestsArray }) {
    const [requestSent, setRequestSent] = useState(false);
    const user = useOutletContext();

    function checkRequestState() {
        if (requestsArray.includes(user._id)) {
            setRequestSent(true);
        }
    }

    async function sendRequest() {
        const response = await fetch(
            'https://headbook-7930.onrender.com/request',
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }),
            }
        );
        if (response.ok) {
            setRequestSent((prevState) => !prevState);
        }
    }

    useEffect(() => {
        checkRequestState();
    }, []);

    return (
        <button type="button" onClick={() => sendRequest()}>
            {requestSent ? 'Request sent' : 'Add friend'}
        </button>
    );
}
