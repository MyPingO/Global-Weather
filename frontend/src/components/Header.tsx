import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';

const Header: React.FC = () => {

    const [user, setUser] = useState(auth.currentUser);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            console.log(currentUser);
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    return (
        <header className="bg-primary text-white py-3 mb-4 shadow">
            <div className="container">
                <nav className="navbar navbar-expand-lg navbar-dark">
                    <div className="navbar-brand d-flex flex-row">
                        <h1 className="h3 mb-0">
                            Gl
                            <i className="bi bi-globe-americas position-relative" style={{ fontSize: "1rem", bottom: "1.4px", marginLeft: "1px", marginRight: "1px" }}></i>
                            bal Weather
                        </h1>
                    </div>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <a className="nav-link text-white" href="/">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-white" href="/about">About</a>
                            </li>
                            <li className="nav-item">
                                {user ?
                                    <a className="nav-link text-white" href="/favorites">Favorites</a> :
                                    <a className="nav-link text-white" href="/login">Log In</a>
                                }

                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;
