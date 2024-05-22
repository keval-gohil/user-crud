// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC3MRexfe9QHqQ4fB48xnpuv4fIV-_nr2k",
  authDomain: "fir-crud-a3d14.firebaseapp.com",
  projectId: "fir-crud-a3d14",
  storageBucket: "fir-crud-a3d14.appspot.com",
  messagingSenderId: "592556152378",
  appId: "1:592556152378:web:2750f5e9000103a3674703",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
