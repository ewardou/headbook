import React from 'react';
import { useOutletContext } from 'react-router-dom';

export default function Friends() {
    const { user, content } = useOutletContext();
    const array = content.filter((el) => user.friends.includes(el._id));
    const friends = array.map((el) => (
        <div key={el._id}>
            <img src={el.profilePicture} alt="" />
            <p>
                {el.firstName} {el.lastName}
            </p>
        </div>
    ));
    if (friends.length === 0) return <h1>No friends added yet</h1>;
    return <div className="people-cards">{friends}</div>;
}
