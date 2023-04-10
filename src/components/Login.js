import React, { useRef, useState, useEffect, Fragment } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from '../api/axios';
import useAuth from '../hooks/useAuth';

const LOGIN_URL="/auth";

function Login() {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ user, pwd }),
        {
          headers: { 'Content-Type': 'application/json'},
          withCredentials: true
        }
      );
      console.log(JSON.stringify(response?.data));
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      setAuth({ user, pwd, roles, accessToken });
      setUser('');
      setPwd('');

      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No server response');
      } else if (err.response?.status === 400) {
        setErrMsg('Missing username or password');
      } else if (err.response?.status === 401) {
        setErrMsg('Unauthorized');
      } else {
        setErrMsg('Login failed');
      }
      errRef.current.focus();
    }

  };

  return (
    <Fragment>
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
    </Fragment> 
  )
}

export default Login