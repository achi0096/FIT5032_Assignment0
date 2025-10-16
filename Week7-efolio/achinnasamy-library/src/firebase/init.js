// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAaM4x_-g1cYDEUa0LGhxvkndZ6FJD_mUo",
  authDomain: "week7-abinaya.firebaseapp.com",
  projectId: "week7-abinaya",
  storageBucket: "week7-abinaya.firebasestorage.app",
  messagingSenderId: "631113033339",
  appId: "1:631113033339:web:c235c921a34704c7af24de"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { auth };
export default db;