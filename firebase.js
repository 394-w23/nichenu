// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref, update, set } from 'firebase/database';
import {getStorage} from 'firebase/storage';
import { useEffect, useState, useCallback } from 'react';
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
const storage = getStorage(app);
export const temp_ref = ref(storage,"gs://nichenu.appspot.com/hobby_images/fishing_rod.png");

export const useDbData = (path) => {
  const [data, setData] = useState();
  const [error, setError] = useState(null);

  useEffect(() => (
    onValue(ref(database, path), (snapshot) => {
      setData(snapshot.val());
    }, (error) => {
      setError(error);
    })
  ), [path]);

  return [data, error];
};

export const useDbUpdate = (path) => {
  const [result, setResult] = useState();
  const updateData = useCallback((value) => {
    update(ref(database, path), value)
      .then(() => setResult(makeResult()))
      .catch((error) => setResult(makeResult(error)))
  }, [database, path]);

  return [updateData, result];
}