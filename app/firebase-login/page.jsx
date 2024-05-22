// index.js
"use client"
import React, { useState, useEffect } from "react";
import { auth, onAuthStateChanged, getDoc, doc, db } from "./firebase";
import SignUp from "./SignUp";
import Login from "./Login";
import Dashboard from "./Dashboard";

const App = () => {
  const [user, setUser] = useState(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const userDoc = doc(db, "users", currentUser.uid);
        const userSnapshot = await getDoc(userDoc);
        if (userSnapshot.exists()) {
          setUser(userSnapshot.data());
        }
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await auth.signOut();
    setUser(null);
  };

  const handleLoginSuccess = () => {
    setIsLoggingIn(false);
  };

  if (user) {
    return <Dashboard user={user} handleLogout={handleLogout} />;
  }

  return (
    <div>
      {isLoggingIn ? (
        <Login onLoginSuccess={handleLoginSuccess} toggleToSignUp={() => setIsLoggingIn(false)} />
      ) : (
        <SignUp toggleToLogin={() => setIsLoggingIn(true)} />
      )}
    </div>
  );
};

export default App;
