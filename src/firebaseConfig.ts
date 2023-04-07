

// Import the functions you need from the SDKs you need
import {getDatabase} from "firebase/database"
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBCa94pAFjGUsIPRHcQNIZKQjtOKeQk7zI",
  authDomain: "fitnessmobileapp-fd1da.firebaseapp.com",
  databaseURL: "https://fitnessmobileapp-fd1da-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "fitnessmobileapp-fd1da",
  storageBucket: "fitnessmobileapp-fd1da.appspot.com",
  messagingSenderId: "1061390005850",
  appId: "1:1061390005850:web:ea8a6b5339c7c28dd7ca63",
  measurementId: "G-6SH8YD953V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getDatabase(app)