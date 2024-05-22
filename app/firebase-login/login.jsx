// Login.js
"use client"
// Login.js
import React, { useState } from "react";
import { auth, signInWithEmailAndPassword } from "./firebase";

const Login = ({ onLoginSuccess, toggleToSignUp }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await signInWithEmailAndPassword(auth, inputs.email, inputs.password);
      onLoginSuccess();
    } catch (error) {
      setError(error.message);
      console.error("Error logging in:", error);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input name="email" value={inputs.email} onChange={handleChange} />
        </div>
        <div>
          <label>Password</label>
          <input name="password" type="password" value={inputs.password} onChange={handleChange} />
        </div>
        <button type="submit">Login</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
      <p>
        Don't have an account? <button onClick={toggleToSignUp}>Sign Up</button>
      </p>
    </div>
  );
};

export default Login;
