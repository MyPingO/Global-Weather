import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="bg-primary text-white py-3 mb-4">
            <div className="container d-flex justify-content-between align-items-center">
                <h1 className="h3 mb-0">Global Weather</h1>
                <nav className="d-flex align-items-center">
                    <ul className="nav me-3">
                        <li className="nav-item">
                            <a className="nav-link text-white" href="#home">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-white" href="#about">About</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-white" href="#contact">Contact</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
