import React, { useState } from 'react';

export default function Login() {
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');

    return (
        <div>
            <h1>headbook</h1>
            <p>
                Headbook helps you connect and share with the people in your
                life.
            </p>
            <form>
                <input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={pwd}
                    onChange={(e) => setPwd(e.target.value)}
                />
                <button type="submit">Log in</button>
                <button type="button">Create new account</button>
            </form>
        </div>
    );
}
