// Import the functions you need from the SDKs you need
// v9 compat packages are API compatible with v8 code
import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAEL-L81I0gWzuLIwuK0Ourd9ulLH7O4sY",
  authDomain: "geo-vue-ninjas-fb289.firebaseapp.com",
  projectId: "geo-vue-ninjas-fb289",
  storageBucket: "geo-vue-ninjas-fb289.appspot.com",
  messagingSenderId: "109441873304",
  appId: "1:109441873304:web:70638c93483332078fe7ed"
};


// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

export default db;