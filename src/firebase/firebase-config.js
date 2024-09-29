import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCoYO9K68nrwXoXobpV4d08T8p3Pb3xC3I",
  authDomain: "the-last-sell-45e18.firebaseapp.com",
  projectId: "the-last-sell-45e18",
  storageBucket: "the-last-sell-45e18.appspot.com",
  messagingSenderId: "170171393149",
  appId: "1:170171393149:web:bb9fef1793760004427d14"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app)

export { auth, db, storage };
