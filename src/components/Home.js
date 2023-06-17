import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import homeSVG from '../icons/home.svg';
import groupSVG from '../icons/group.svg';

function Home() {
    return (
        <div>
            <header>
                <div className="logo">
                    <p>h</p>
                </div>
                <Link to="/">
                    <img src={homeSVG} alt="Home icon" />
                </Link>
                <Link to="people">
                    <img src={groupSVG} alt="People icon" />
                </Link>
                <Link to="my-profile">
                    <img
                        src="https://i.pinimg.com/originals/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg"
                        alt="My profile"
                    />
                </Link>
            </header>
            <Outlet />
        </div>
    );
}

export default Home;
