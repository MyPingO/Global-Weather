import React, { FormEventHandler, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { Link } from 'react-router-dom';
import { signInWithGoogle } from '../firebase/authServices';

const SignUp: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSignUp: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('User created successfully:', userCredential.user);
      setError('');
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        setError('The email address is already in use by another account.');
      } else {
        setError(error.message);
      }
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
              <h2 className="card-title text-center mb-4">Sign Up</h2>
              <form onSubmit={handleSignUp}>
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
                <button type="submit" className="btn btn-primary w-100">Sign Up</button>
                <button type="button" className="btn btn-secondary w-100 mt-2" onClick={handleGoogleSignIn}>
                  Sign Up with Google
                </button>
              </form>
              {error && <p className="mt-3 text-danger text-center">{error}</p>}
              <p className="mt-3 text-center">
                Already have an account? <Link to="/login">Log In</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
