// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "todoapp-18fcd.firebaseapp.com",
  projectId: "todoapp-18fcd",
  storageBucket: "todoapp-18fcd.appspot.com",
  messagingSenderId: "297177928837",
  appId: "1:297177928837:web:4c08a7a684724c339005ec",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
