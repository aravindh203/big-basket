import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDKhWPHOaXVnSnV9f3sRG2Uwq5hjp4lydk",
  authDomain: "react-login-57045.firebaseapp.com",
  databaseURL: "https://react-login-57045-default-rtdb.firebaseio.com",
  projectId: "react-login-57045",
  storageBucket: "react-login-57045.appspot.com",
  messagingSenderId: "235400907764",
  appId: "1:235400907764:web:2a3149c221cfe6f38907a1"
};

const app = initializeApp(firebaseConfig);
export const db=getDatabase(app);