import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyChDH2a-UmDguMPUciqE2OUA33muAsFYdU",
  authDomain: "notes-app-44887.firebaseapp.com",
  databaseURL: "https://notes-app-44887-default-rtdb.firebaseio.com",
  projectId: "notes-app-44887",
  storageBucket: "notes-app-44887.appspot.com",
  messagingSenderId: "664338922097",
  appId: "1:664338922097:web:ffd072e53fcd55ce20f9d0",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
