import { initializeApp } from "firebase/app";
import { getDatabase  } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDvd5mkbgCs-oiJ5HxWmsuMW0Y5SXq-rFk",
  authDomain: "sanris-24.firebaseapp.com",
  databaseURL: "https://sanris-24-default-rtdb.firebaseio.com",
  projectId: "sanris-24",
  storageBucket: "sanris-24.appspot.com",
  messagingSenderId: "399837793912",
  appId: "1:399837793912:web:901bf9bc196897a2d2a78d"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db };