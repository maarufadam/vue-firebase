// Import the functions you need from the SDKs you need
// v9 compat packages are API compatible with v8 code
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBrZNNwbTyoLsavtRpwR4VcVt_4ywRkNUU",
  authDomain: "ninja-vue-f84b7.firebaseapp.com",
  projectId: "ninja-vue-f84b7",
  storageBucket: "ninja-vue-f84b7.appspot.com",
  messagingSenderId: "260731544041",
  appId: "1:260731544041:web:de115d24921cbb06646b78",
  measurementId: "G-DCJPE34EHW"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

export default db;

// Get a list of smoothies from your database
async function getSmoothies(db) {
  const smoothiesCol = collection(db, 'smoothies');
  const smoothieSnapshot = await getDocs(smoothiesCol);
  const smoothieList = smoothieSnapshot.docs.map(doc => doc.data());
  return smoothieList;
}