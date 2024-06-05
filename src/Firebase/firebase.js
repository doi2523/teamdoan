// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBB-IV7BTRGu5AhGDjMVP51oPkOgjyj0vo",
  authDomain: "project-react-app-52df9.firebaseapp.com",
  databaseURL: "https://project-react-app-52df9-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "project-react-app-52df9",
  storageBucket: "project-react-app-52df9.appspot.com",
  messagingSenderId: "472054608275",
  appId: "1:472054608275:web:24e1b826df6fe88147f866",
  measurementId: "G-4XE1QHC9LC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);