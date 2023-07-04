import React from 'react';
import { useOutletContext, Link } from 'react-router-dom';

export default function Requests() {
    const { user, content, getMyUserInfo } = useOutletContext();
    const array = content.filter((el) => user.requests.includes(el._id));

    async function acceptRequest(id) {
        try {
            const response = await fetch(
                'https://headbook-7930.onrender.com/accept-request',
                {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            'token'
                        )}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id }),
                }
            );
            if (!response.ok) {
                throw response;
            }
            await getMyUserInfo();
        } catch (e) {
            console.error(e);
        }
    }

    async function declineRequest(id) {
        try {
            const response = await fetch(
                'https://headbook-7930.onrender.com/decline-request',
                {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            'token'
                        )}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id }),
                }
            );
            if (!response) {
                throw response;
            }
            await getMyUserInfo();
        } catch (e) {
            console.error(e);
        }
    }

    const requests = array.map((el) => (
        <div key={el._id}>
            <img src={el.profilePicture} alt="" />
            <Link to={`/profiles/${el._id}`}>
                <p>
                    {el.firstName} {el.lastName}
                </p>
            </Link>
            <button type="button" onClick={() => acceptRequest(el._id)}>
                Accept
            </button>
            <button type="button" onClick={() => declineRequest(el._id)}>
                Decline
            </button>
        </div>
    ));
    if (requests.length === 0) {
        return <h1>No pending requests</h1>;
    }
    return <div className="people-cards">{requests}</div>;
}
