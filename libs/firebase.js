// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY_GOOGLE,
  authDomain: "ecommerce-app-c7c7c.firebaseapp.com",
  projectId: "ecommerce-app-c7c7c",
  storageBucket: "ecommerce-app-c7c7c.appspot.com",
  messagingSenderId: "752696918449",
  appId: "1:752696918449:web:fea0a58ff41a9231207d90",
};

// Initialize Firebase
export let app = initializeApp(firebaseConfig);
