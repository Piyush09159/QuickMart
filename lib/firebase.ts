// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyCVUSd_H66HcKiJD7i62T2P4R8e1P6sH6o",
  authDomain: "gobuyitmgs.firebaseapp.com",
  projectId: "gobuyitmgs",
  storageBucket: "gobuyitmgs.firebasestorage.app",
  messagingSenderId: "91281189088",
  appId: "1:91281189088:web:7b743219a82d1f61308885",
  measurementId: "G-ECTECKR0J6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);