// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAINGd_J09AH1v-Ov2Ep8-2q5Uqjpj6nxk",
    authDomain: "next-5af83.firebaseapp.com",
    projectId: "next-5af83",
    storageBucket: "next-5af83.appspot.com",
    messagingSenderId: "700681696394",
    appId: "1:700681696394:web:4cfd5f9878b6d960dce973"
  };
  // Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export default app;
export { db, storage };