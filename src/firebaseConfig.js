import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDBULXibrHtnrZTrW6vmSZak6NeF4k6Uno",
  authDomain: "evaluacion-4-front-end.firebaseapp.com",
  projectId: "evaluacion-4-front-end",
  storageBucket: "evaluacion-4-front-end.appspot.com",
  messagingSenderId: "836123557859",
  appId: "1:836123557859:web:72e4677ceb518974876ad6",
  measurementId: "G-59SM730E0C"
};


const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);