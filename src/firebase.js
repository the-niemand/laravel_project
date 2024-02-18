// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyDvw1F8yBHa2NxlLMEKI8yamCXaZN6lo30",
  authDomain: "laravelproject-c8f3a.firebaseapp.com",
  projectId: "laravelproject-c8f3a",
  storageBucket: "laravelproject-c8f3a.appspot.com",
  messagingSenderId: "485765492058",
  appId: "1:485765492058:web:f1c23d78814c1151d0d763",
  measurementId: "G-47Z1CGTXF1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app)