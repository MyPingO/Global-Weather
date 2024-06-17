// src/components/WeatherSkeleton.tsx
import React from 'react';

const WeatherSkeleton: React.FC = () => {
    return (
        <div className="row fade-in" style={{animationDuration: "0.25s"}}>
            {[...Array(8)].map((_, index) => (
                <div className="col-md-3 mb-3" key={index}>
                    <div className="card">
                        <div className="card-img-top placeholder-glow">
                            <span className="placeholder col-12" style={{ height: '200px', display: 'block' }}></span>
                        </div>
                        <div className="card-body">
                            <h5 className="card-title placeholder-glow">
                                <span className="placeholder col-6"></span>
                            </h5>
                            <p className="card-text placeholder-glow">
                                <span className="placeholder col-7"></span>
                                <span className="placeholder col-4"></span>
                                <span className="placeholder col-4"></span>
                                <span className="placeholder col-6"></span>
                                <span className="placeholder col-8"></span>
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default WeatherSkeleton;
    