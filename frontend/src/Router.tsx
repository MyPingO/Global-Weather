// src/Router.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';

const AppRouter: React.FC = () => (
    <Router>
        <Routes>
            <Route path="/" Component={Home} />
            <Route path="/home" Component={Home} />
            <Route path="/about" Component={About} />
            <Route path="/contact" Component={Contact} />
        </Routes>
    </Router>
);

export default AppRouter;
