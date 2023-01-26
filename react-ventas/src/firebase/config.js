
import { getFirestore } from "firebase/firestore";
// import firebase from 'firebase';
import { initializeApp } from "firebase/app";
import 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyAoDybAC6JQzx2AlVVCP01gtjFiU2Meq74",
  authDomain: "somti-ventas.firebaseapp.com",
  projectId: "somti-ventas",
  storageBucket: "somti-ventas.appspot.com",
  messagingSenderId: "921784227942",
  appId: "1:921784227942:web:3622fab2df1ffd0b7d75a7",
  measurementId: "G-WWBLVR7Q1T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// export const db = firebase.firestore(app);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);
export default app;