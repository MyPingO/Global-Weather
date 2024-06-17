import React, { useState, FormEvent } from 'react';
import { logIn, signInWithGoogle } from '../firebase/authServices';
import { Link } from 'react-router-dom';

const LogIn: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleLogIn = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await logIn(email, password);
      setError(null);
    } catch (error) {
      setError((error as Error).message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Log In</h2>
              <form onSubmit={handleLogIn}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    id="email"
                    className="form-control"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    id="password"
                    className="form-control"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">Log In</button>
                <button type="button" className="btn btn-secondary w-100 mt-2" onClick={handleGoogleSignIn}>
                  Log In with Google
                </button>
              </form>
              {error && <p className="mt-3 text-danger text-center">{error}</p>}
              <p className="mt-3 text-center">
                Don't have an account? <Link to="/signup">Sign Up</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
