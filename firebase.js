// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDLkbW82yvxLiJt2Y1zKDwOIPLAfLrF6mo",
  authDomain: "nichenu.firebaseapp.com",
  databaseURL: "https://nichenu-default-rtdb.firebaseio.com",
  projectId: "nichenu",
  storageBucket: "nichenu.appspot.com",
  messagingSenderId: "925606908543",
  appId: "1:925606908543:web:ce09c97a243859d48fa54a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);