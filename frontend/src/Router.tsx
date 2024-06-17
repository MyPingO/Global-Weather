// src/Router.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import LogIn from './components/Login';
import SignUp from './components/SignUp';
import Contact from './components/Contact';
import Favorites from './components/Favorites';

const AppRouter: React.FC = () => (
    <Router>
        <Routes>
            <Route path="/" Component={Home} />
            <Route path="/home" Component={Home} />
            <Route path="/about" Component={About} />
            <Route path="/signup" Component={SignUp} />
            <Route path="/login" Component={LogIn} />
            <Route path="/contact" Component={Contact} />
            <Route path="/favorites" Component={Favorites} />
        </Routes>
    </Router>
);

export default AppRouter;
