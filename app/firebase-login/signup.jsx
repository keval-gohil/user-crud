"use client"
// SignUp.js
import React, { useState } from "react";
import bcrypt from "bcryptjs";
import { auth, db, createUserWithEmailAndPassword, doc, setDoc } from "./firebase";

const SignUp = ({ toggleToLogin }) => {
  const [inputs, setInputs] = useState({
    name: "",
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
      const userCredential = await createUserWithEmailAndPassword(auth, inputs.email, inputs.password);
      const user = userCredential.user;

      const hashedPassword = bcrypt.hashSync(inputs.password, 10);

      await setDoc(doc(db, "users", user.uid), {
        name: inputs.name,
        email: inputs.email,
        password: hashedPassword,
      });

      setInputs({
        name: "",
        email: "",
        password: "",
      });
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setError("Email address is already in use. Please use a different email.");
      } else {
        setError(error.message);
      }
      console.error("Error signing up:", error);
    }
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input name="name" value={inputs.name} onChange={handleChange} />
        </div>
        <div>
          <label>Email</label>
          <input name="email" value={inputs.email} onChange={handleChange} />
        </div>
        <div>
          <label>Password</label>
          <input name="password" type="password" value={inputs.password} onChange={handleChange} />
        </div>
        <button type="submit">Sign Up</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
      <p>
        Already have an account? <button onClick={toggleToLogin}>Login</button>
      </p>
    </div>
  );
};

export default SignUp;
