// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAfXO-L_RhQBxd0Je5k-pgw3qDPSY4N_KQ",
  authDomain: "mern-chat-1b1c0.firebaseapp.com",
  projectId: "mern-chat-1b1c0",
  storageBucket: "mern-chat-1b1c0.appspot.com",
  messagingSenderId: "31896921901",
  appId: "1:31896921901:web:c54bf712a053d68da495a4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);