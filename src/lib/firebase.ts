

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBMuOF-TKkpPhS1v-qQouiA8Ek1MXE4RCY",
  authDomain: "games-62edb.firebaseapp.com",
  projectId: "games-62edb",
  storageBucket: "games-62edb.firebasestorage.app",
  messagingSenderId: "431797503416",
  appId: "1:431797503416:web:c4a9547b0ae7de9c2ffb4d"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)