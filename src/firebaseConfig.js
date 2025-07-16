// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDBULXibrHtnrZTrW6vmSZak6NeF4k6Uno",
  authDomain: "evaluacion-4-front-end.firebaseapp.com",
  projectId: "evaluacion-4-front-end",
  storageBucket: "evaluacion-4-front-end.firebasestorage.app",
  messagingSenderId: "836123557859",
  appId: "1:836123557859:web:72e4677ceb518974876ad6",
  measurementId: "G-59SM730E0C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);