import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Home from './Home';
import People from './People';
import Posts from './Posts';
import Requests from './Requests';
import Friends from './Friends';
import Suggestions from './Suggestions';
import Profile from './Profile';

function RouteSwitch() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />}>
                    <Route path="" element={<Posts />} />
                    <Route path="people" element={<People />}>
                        <Route path="" element={<Suggestions />} />
                        <Route path="requests" element={<Requests />} />
                        <Route path="friends" element={<Friends />} />
                    </Route>
                    <Route path="profiles/:userID" element={<Profile />} />
                </Route>
                <Route path="/login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
}

export default RouteSwitch;
