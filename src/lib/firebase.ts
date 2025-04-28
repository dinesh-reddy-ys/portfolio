import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCbAW2pKisI8pooq-DKNK1wI0wn7J0Xyko",
  authDomain: "persona-portfolio-840qh.firebaseapp.com",
  projectId: "persona-portfolio-840qh",
  storageBucket: "persona-portfolio-840qh.firebasestorage.app",
  messagingSenderId: "211614553507",
  appId: "1:211614553507:web:44ffeccbdcc8b015423616",
  measurementId: "G-6HD7MHEK4H"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
