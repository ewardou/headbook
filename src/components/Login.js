import React, { useState } from 'react';
import '../styles/login.css';
import Signup from './Signup';

export default function Login() {
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('');

    const openModal = (e) => {
        e.preventDefault();
        setVisible(true);
    };
    const closeModal = (e) => {
        e.preventDefault();
        setVisible(false);
    };
    const logUser = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(
                'https://headbook-7930.onrender.com/login',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email,
                        password: pwd,
                    }),
                }
            );
            const json = await response.json();
            if (!response.ok) {
                throw json.msg;
            }
            localStorage.setItem('token', json.token);
            window.location.assign('/');
        } catch (err) {
            setMessage(err);
        }
    };

    return (
        <div className="login">
            <div>
                <h1>headbook</h1>
                <p>
                    Headbook helps you connect and share with the people in your
                    life.
                </p>
            </div>
            <form onSubmit={logUser}>
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
                <p style={{ fontSize: '1rem' }}>{message}</p>
                <button type="submit">Log in</button>
                <button type="button" onClick={openModal}>
                    Create new account
                </button>
                <button type="button">Continue as guest</button>
            </form>
            <Signup visible={visible} closeModal={closeModal} />
        </div>
    );
}
