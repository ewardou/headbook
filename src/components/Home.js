import React from 'react';
import { Outlet, Link } from 'react-router-dom';

function Home() {
    return (
        <div>
            <header>
                <Link to="/">Posts</Link>
                <Link to="people">People</Link>
            </header>
            <Outlet />
        </div>
    );
}

export default Home;
