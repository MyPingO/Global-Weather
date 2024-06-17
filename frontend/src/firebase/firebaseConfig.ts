// Import the functions you need from the SDKs you need
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCSsxlVE8O_MRG_sYUO6ItAyXHI9z66kng",
  authDomain: "global-weather-b5274.firebaseapp.com",
  projectId: "global-weather-b5274",
  storageBucket: "global-weather-b5274.appspot.com",
  messagingSenderId: "833308227209",
  appId: "1:833308227209:web:7e43f7398df085034d3858",
  measurementId: "G-K87VQNWMRV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };