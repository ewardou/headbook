import React from 'react';
import '../styles/signup.css';

export default function Signup({ visible, closeModal }) {
    return (
        <div>
            {visible && (
                <div className="overlay">
                    <form>
                        <button type="button" onClick={closeModal}>
                            X
                        </button>
                        <h2>Sign up</h2>
                        <p>It&apos;s quick and easy</p>
                        <div className="name">
                            <input type="text" placeholder="First name" />
                            <input type="text" placeholder="Surname" />
                        </div>
                        <input type="email" placeholder="Email" />
                        <input type="password" placeholder="New password" />
                        <input type="password" placeholder="Confirm password" />
                        <button type="button">Sign up</button>
                    </form>
                </div>
            )}
        </div>
    );
}
