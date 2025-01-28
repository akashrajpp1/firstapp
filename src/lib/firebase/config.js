// Import the functions you need from the SDKs you need
import { initializeApp, cert } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration


const firebaseConfig = {
    apiKey: "AIzaSyC1f18fJF4sWj6qRuUky8d_bWZiIzr9pOI",
    authDomain: "loanapp-7275c.firebaseapp.com",
    projectId: "loanapp-7275c",
    storageBucket: "loanapp-7275c.firebasestorage.app",
    messagingSenderId: "830003555540",
    appId: "1:830003555540:web:be786ea69e7031f5e15f41"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);


