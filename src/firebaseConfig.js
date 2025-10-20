import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAMyfbdg5-c90GQk_ba-oqCZolmxPEVSOI",
  authDomain: "devops-867ca.firebaseapp.com",
  projectId: "devops-867ca",
  storageBucket: "devops-867ca.firebasestorage.app",
  messagingSenderId: "885606492761",
  appId: "1:885606492761:web:c8255d6669bb78f9c75f48",
  measurementId: "G-G1ZLPZJHRQ",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
