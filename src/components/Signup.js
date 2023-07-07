import React, { useState } from 'react';
import '../styles/signup.css';

export default function Signup({ visible, closeModal }) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [disabled, setDisabled] = useState(false);

    const registerUser = async () => {
        try {
            const response = await fetch(
                'https://headbook-7930.onrender.com/sign-up',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        firstName,
                        lastName,
                        email,
                        password,
                        passwordConfirm,
                    }),
                }
            );
            const json = await response.json();
            if (!response.ok) {
                throw json.errors;
            }
            localStorage.setItem('token', json.token);
            window.location.assign('/headbook');
        } catch (err) {
            setDisabled(false);
            setMessage(err[0].msg);
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (password !== passwordConfirm) {
            setMessage('Password are not equal');
        } else {
            setMessage('Creating user');
            setDisabled(true);
            registerUser();
        }
    };
    return (
        <div>
            {visible && (
                <div className="overlay">
                    <form onSubmit={onSubmit}>
                        <button type="button" onClick={closeModal}>
                            X
                        </button>
                        <h2>Sign up</h2>
                        <p>It&apos;s quick and easy</p>
                        <div className="name">
                            <input
                                type="text"
                                placeholder="First name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Last name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                            />
                        </div>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="New password"
                            minLength={8}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Confirm password"
                            minLength={8}
                            value={passwordConfirm}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                        <p className="error-msg">{message}</p>
                        <button type="submit" disabled={disabled}>
                            Sign up
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}
