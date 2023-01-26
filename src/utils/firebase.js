// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref, update, set } from 'firebase/database';
import {getStorage, getDownloadURL} from 'firebase/storage';
import {ref as strgRef} from 'firebase/storage' ;
import { useEffect, useState, useCallback } from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";

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
// export const temp_ref = strgRef(storage,"gs://nichenu.appspot.com/hobby_images/fishing_rod.png");
// export const getImgURL = (img_ref) => (getDownloadURL(img_ref).then( (url) => ))
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

const makeResult = (error) => {
  const timestamp = Date.now();
  const message = error?.message || `Updated: ${new Date(timestamp).toLocaleString()}`;
  return { timestamp, error, message };
};




// TODO: Make this into a class

const auth = getAuth();
const provider = new GoogleAuthProvider();

export const FirebaseSignIn = async()=> {
  signInWithPopup(auth,provider)
      .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          console.log(user)
          // ...
      }).catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.customData.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
          // ...
          console.log(error)
      });
}

export const FirebaseLogout = async() => {
  signOut(auth).then(() => {
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
  });
}





export const useAuth = () => {
  const [user, setUser] = useState();

  useEffect(() => {
      auth.onAuthStateChanged(user => {
          if (user) {
              setUser(user)
          } else {
            setUser()
          }
      });
  }, []);

  return user
}




// export const useAuth = () => {
//     const [currUser, setCurrUser] = useState(null);

//     useEffect(()=>{
//     const auth = getAuth();
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         const uid = user.uid;
//         setCurrUser(uid)
//         console.log(currUser);
//       } else {
//         setCurrUser(null);
//       }
//     });
//     return () => unsubscribe();
//   }, []);

//     return currUser;
// }
