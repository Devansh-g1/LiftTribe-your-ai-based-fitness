import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDOitw6Cy9KU2D5_ZMIS5K06--jrCewJsw",
  authDomain: "lifttribe-ai.firebaseapp.com",
  projectId: "lifttribe-ai",
  storageBucket: "lifttribe-ai.appspot.com",
  messagingSenderId: "1091072664845",
  appId: "1:1091072664845:web:4c16c9d242e9d1ddd2764b",
  measurementId: "G-SZRVRKX3T0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;