// Import the functions you need from the SDKs you need
import { deleteApp, getApp, getApps, initializeApp, type FirebaseApp } from "firebase/app";
import { getAuth, inMemoryPersistence } from "firebase/auth";

// TODO: Fill your web app's Firebase configuration
// See https://firebase.google.com/docs/web/learn-more?hl=fr#config-object
const firebaseConfig = {
  apiKey: "AIzaSyCQCvDEGeJBpQrbPsWdlePOX3SJD9y0IAI",
  authDomain: "wellfit-397a5.firebaseapp.com",
  projectId: "wellfit-397a5",
  storageBucket: "wellfit-397a5.appspot.com",
  messagingSenderId: "68157762551",
  appId: "1:68157762551:web:9648bdf7bde71263da5cf2",
  measurementId: "G-4CLHL0PXH0"
};

let firebaseApp: FirebaseApp | undefined;
// create a singleton client side firebaseApp
if (!getApps().length) {
  firebaseApp = initializeApp(firebaseConfig);
} else {
  firebaseApp = getApp();
  deleteApp(firebaseApp);
  firebaseApp = initializeApp(firebaseConfig);
}

const auth = getAuth(firebaseApp);

// As httpOnly cookies are to be used, do not persist any state client side.
// `inMemoryPersistence` is an implementation of Persistence of type 'NONE'.
auth.setPersistence(inMemoryPersistence);

// export the firebaseApp
export default firebaseApp;
