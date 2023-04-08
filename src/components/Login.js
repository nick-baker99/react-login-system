import React, { useRef, useState, useEffect, Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthProvider';
import axios from '../api/axios';

const LOGIN_URL="/auth";

function Login() {
  const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setUser('');
      setPwd('');
      setSuccess(true);
    } catch (err) {

    }

  };

  return (
    <Fragment>
      {success ? (
        <section>
          <h1>You're logged in!</h1>
          <br />
          <p>
            <Link to="/">Go to home</Link>
          </p>
        </section>
      ) : (
        <section>
          <p ref={errRef} className={errMsg ? 'errmsg': 'offscreen'} aria-live="assertive">{errMsg}</p>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">
              Username:
              <input 
                type="text"
                id="username"
                value={user}
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setUser(e.target.value)}
                required
              />
            </label>
            <label htmlFor="username">
              <input 
                type="password"
                id="password"
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
                required
              />
            </label>
            <button>Sign In</button>
            <p>
              Need an account?<br />
              <Link to="/register">Sign Up</Link>
            </p>
          </form>
        </section>
      )}
    </Fragment>
    
  )
}

export default Login