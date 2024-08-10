
import { getFirestore } from "firebase/firestore";
// import firebase from 'firebase';
import { initializeApp } from "firebase/app";
import 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyCYb-uQ9PLuW8M6V-rm_kV8h3MdZPr3ujM",
  authDomain: "proyecto-practica-1519b.firebaseapp.com",
  projectId: "proyecto-practica-1519b",
  storageBucket: "proyecto-practica-1519b.appspot.com",
  messagingSenderId: "357536952332",
  appId: "1:357536952332:web:f36136e063370b9d587e29"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// export const db = firebase.firestore(app);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);
export default app;