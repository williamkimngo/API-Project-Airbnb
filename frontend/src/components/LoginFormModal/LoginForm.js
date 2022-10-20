import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import {Redirect} from 'react-router-dom'
import './LoginForm.css'

function LoginForm() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user)
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);


  if(sessionUser) return (
    <Redirect to="/" />
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  return (
    <div className="login-modal">
      <h1 id='Log-In'>Log In</h1>
      <h2 id="login-welcome"> Welcome to Ballbnb</h2>
    <form className="login-form-container" onClick={e => e.stopPropagation()} onSubmit={handleSubmit}>

      <ul className="error-list">
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
      <label>
        <input
          className="login-input"
          placeholder="Username or Email"
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}

        />
      </label>
      <label>
        <input
          className="login-input"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}

        />
      </label>
      <button className="log-in-button" type="submit">Log In</button>
      <button className="Demo-user-button"
      onClick={() => dispatch(sessionActions.login({
        credential: "Demo-lition",
        password: "password"
      }))}
    >
      Demo User
      </button>
    </form>
    </div>
  );
}

export default LoginForm;
