import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import mygif from "./gif/logo.gif"
import login from "./login-page"
import "./css/login.css"
import "./css/signup-page.css"

const auth = getAuth();
const googleProvider = new GoogleAuthProvider();

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleEmailPasswordSignup = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setSuccess('Account created successfully!');
      // Redirect to dashboard or update UI as needed
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGoogleSignup = async () => {
    setError('');
    setSuccess('');
    try {
      await signInWithPopup(auth, googleProvider);
      setSuccess('Account created successfully with Google!');
      // Redirect to dashboard or update UI as needed
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center position-relative overflow-hidden">
      <div className="container">
        <div className="row align-items-stretch justify-content-center g-0">
          <div className="col-md-6">
            <div className="bg-white bg-opacity-10 p-5 rounded-start backdrop-blur-sm text-light h-100 d-flex flex-column justify-content-center">
              <h2 className="text-center mb-4 fw-bold">Create an account</h2>
              <p className="text-center mb-4">Please enter your details</p>

              {error && <div className="alert alert-danger" role="alert">{error}</div>}
              {success && <div className="alert alert-success" role="alert">{success}</div>}

              <button className="btn btn-light w-100 mb-4 d-flex align-items-center justify-content-center gap-2" onClick={handleGoogleSignup}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-google" viewBox="0 0 16 16">
                  <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"/>
                </svg>
                Sign up with Google
              </button>

              <div className="text-center mb-4">
                <span className="textlightt">or</span>
              </div>

              <form onSubmit={handleEmailPasswordSignup}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label ">Email address</label>
                  <div className="input-group">
                    <span className="input-group-text bg-transparent text-light border-light">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-envelope" viewBox="0 0 16 16">
                        <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"/>
                      </svg>
                    </span>
                    <input
                      type="email"
                      className="form-control  text-lightt border-light"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <div className="input-group">
                    <span className="input-group-text bg-transparent text-light border-">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-lock" viewBox="0 0 16 16">
                        <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z"/>
                      </svg>
                    </span>
                    <input
                      type="password"
                      className="form-control bg-transparent border-light"
                      style={{ color: 'white' }}
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                  <div className="input-group">
                    <span className="input-group-text bg-transparent text-light border-">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-lock" viewBox="0 0 16 16">
                        <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z"/>
                      </svg>
                    </span>
                    <input
                      type="password"
                      className="form-control bg-transparent border-light"
                      style={{ color: 'white' }}
                      id="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm your password"
                      required
                    />
                  </div>
                </div>

                <button type="submit" className="btn btn-primary w-100 mb-3">
                  Sign up
                </button>

                <p className="text-center mb-0">
                  Already have an account?{' '}
                  <a href="/login" className="text-decoration-none text-info">Sign in</a>
                </p>
              </form>
            </div>
          </div>

          <div className="col-md-6 d-none d-md-block p-0">
            <div className="position-relative h-100">
              <img
                src={mygif}
                alt="Health and wellness animation"
                className="img-fluid rounded-end h-100 object-fit-cover"
                style={{ width: '100%' }}
              />
              <div className="position-absolute top-50 start-50 translate-middle text-light text-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" className="bi bi-person mb-3" viewBox="0 0 16 16">
                  <path d=""/>    
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes overlay {
          0% { background-position: 0% 0%; }
          100% { background-position: 100% 100%; }
        }

        .backdrop-blur-sm {
          backdrop-filter: blur(8px);
        }

        .input-group-text {
          border-right: none;
        }

        .form-control {
          border-left: none;
        }

        .form-control:focus {
          box-shadow: none;
          border-color: #ced4da;
        }

        button, a {
          position: relative;
          z-index: 10;
        }
      `}</style>
    </div>
  );
}

