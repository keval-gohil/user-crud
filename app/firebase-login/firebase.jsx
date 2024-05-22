// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyADkpKZcLHZ-c8fBdSd8f1XwinMMAci4IE",
    authDomain: "next-login-1b4c7.firebaseapp.com",
    projectId: "next-login-1b4c7",
    storageBucket: "next-login-1b4c7.appspot.com",
    messagingSenderId: "1026336568114",
    appId: "1:1026336568114:web:d5e46343dbc5b488855d2b",
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, doc, setDoc, getDoc };
