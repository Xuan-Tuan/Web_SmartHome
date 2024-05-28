// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCcZfWBClipIhyN_-0minmGWtCRCzvLpVI",
  authDomain: "smarthomeproject-151ea.firebaseapp.com",
  databaseURL: "https://smarthomeproject-151ea-default-rtdb.firebaseio.com",
  projectId: "smarthomeproject-151ea",
  storageBucket: "smarthomeproject-151ea.appspot.com",
  messagingSenderId: "260402428994",
  appId: "1:260402428994:web:c36e65c8bc3c84246941db",
  measurementId: "G-MH5WBLBNW7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
const db = getFirestore(app);

export { db, app, auth, database };
