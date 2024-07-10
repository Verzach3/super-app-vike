// Import the functions you need from the SDKs you need
import {
	deleteApp,
	getApp,
	getApps,
	initializeApp,
	type FirebaseApp,
} from "firebase/app";
import { getAuth, inMemoryPersistence } from "firebase/auth";

// TODO: Fill your web app's Firebase configuration
// See https://firebase.google.com/docs/web/learn-more?hl=fr#config-object
const firebaseConfig = {
  apiKey: "AIzaSyDuLGRI8L8xxRXg9p4aFgWjrujJs93M-2o",
  authDomain: "wellfit-clinics.firebaseapp.com",
  projectId: "wellfit-clinics",
  storageBucket: "wellfit-clinics.appspot.com",
  messagingSenderId: "410668993550",
  appId: "1:410668993550:web:00b6b778b55c5a8494405f",
  measurementId: "G-F1KGE179C4"
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
