import React from 'react';

export default function Signup() {
    return (
        <div>
            <h2>Sign up</h2>
            <p>It&apos;s quick and easy</p>
            <form>
                <input type="text" placeholder="First name" />
                <input type="text" placeholder="Surname" />
                <input type="email" placeholder="Email" />
                <input type="password" placeholder="New password" />
                <input type="password" placeholder="Confirm password" />
                <button type="button">Sign up</button>
            </form>
        </div>
    );
}
