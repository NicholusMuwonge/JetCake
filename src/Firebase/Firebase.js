import firebase from "firebase/app";
import "firebase/storage";

var firebaseConfig = {
  apiKey: "AIzaSyBrwuJIf_5WBCi-KwXXmG30_ZsGx3HL9Zo",
  authDomain: "jetcake-nicksbro.firebaseapp.com",
  databaseURL: "https://jetcake-nicksbro.firebaseio.com",
  projectId: "jetcake-nicksbro",
  storageBucket: "jetcake-nicksbro.appspot.com",
  messagingSenderId: "290923039946",
  appId: "1:290923039946:web:75e64b6eef67516e2a3833",
  measurementId: "G-TS681YC5DD"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
