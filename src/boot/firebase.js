// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAJLh_M5LSgF7Hx62eqSdTyaKyDxS0VCdo",
  authDomain: "gallery-app-a6274.firebaseapp.com",
  projectId: "gallery-app-a6274",
  storageBucket: "gallery-app-a6274.firebasestorage.app",
  messagingSenderId: "188607953037",
  appId: "1:188607953037:web:cb7ce6a01a182b79858ac4",
  measurementId: "G-8FC2HERSEL",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const provider = new GoogleAuthProvider(); // instancia del proveedor de Google

export { auth, db, provider };
