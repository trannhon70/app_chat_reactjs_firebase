// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'
import {getStorage} from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCt5GsBHT_SR1iWib56owJ3o1BvUcS6HKY",
  authDomain: "webapp-cc08b.firebaseapp.com",
  projectId: "webapp-cc08b",
  storageBucket: "webapp-cc08b.appspot.com",
  messagingSenderId: "31941819538",
  appId: "1:31941819538:web:3459bddeffe44f47a6ba4b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
export {auth, db, storage};