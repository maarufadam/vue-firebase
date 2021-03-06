// Import the functions you need from the SDKs you need
// v9 compat packages are API compatible with v8 code
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAp2oWL30nxv68PruBBnrjhmLLjii5JifA",
  authDomain: "ninja-vue-smoothie-121d9.firebaseapp.com",
  projectId: "ninja-vue-smoothie-121d9",
  storageBucket: "ninja-vue-smoothie-121d9.appspot.com",
  messagingSenderId: "869365158524",
  appId: "1:869365158524:web:7f5db839495d638432aff9"
};


// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

export default db;