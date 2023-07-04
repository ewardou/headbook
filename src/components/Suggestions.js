import React from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import RequestButton from './RequestButton';

export default function Suggestions() {
    const { user, content } = useOutletContext();
    const array = content.filter((el) => !user.friends.includes(el._id));

    return (
        <div className="people-cards">
            <h1>People you might know</h1>
            {array.map((el) => (
                <div key={el._id}>
                    <img src={el.profilePicture} alt="" />
                    <Link to={`/profiles/${el._id}`}>
                        <p>
                            {el.firstName} {el.lastName}
                        </p>
                    </Link>
                    <RequestButton id={el._id} requestsArray={el.requests} />
                </div>
            ))}
        </div>
    );
}
