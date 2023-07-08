// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAmEA-lUyOWApCknhTRJBK77oVVYzi67J4",
  authDomain: "vsi-catalog.firebaseapp.com",
  projectId: "vsi-catalog",
  storageBucket: "vsi-catalog.appspot.com",
  messagingSenderId: "355024279103",
  appId: "1:355024279103:web:f2905793149fb9b6e24a8a"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)
const auth = getAuth(firebaseApp)
const db = getFirestore(firebaseApp)

export { auth, db }