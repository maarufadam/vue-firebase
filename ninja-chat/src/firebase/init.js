// Import the functions you need from the SDKs you need
// v9 compat packages are API compatible with v8 code
import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAZPT_ZvPCarCQDC66tHg599D0UmQCwAOI",
  authDomain: "ninja-vue-chat-8b3bf.firebaseapp.com",
  projectId: "ninja-vue-chat-8b3bf",
  storageBucket: "ninja-vue-chat-8b3bf.appspot.com",
  messagingSenderId: "423605862613",
  appId: "1:423605862613:web:940196774cce517267e25c"
};


// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

export default db;