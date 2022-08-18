import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAf-2sfqW3ZIUlDWWHXgo8JwAj9f6wa1Zo",
  authDomain: "react-native-exam-projec-f6554.firebaseapp.com",
  databaseURL:
    "https://react-native-exam-projec-f6554-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "react-native-exam-projec-f6554",
  storageBucket: "react-native-exam-projec-f6554.appspot.com",
  messagingSenderId: "605543134524",
  appId: "1:605543134524:web:7ce8978f04dc401c215a39",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
console.log("Firebbase connection established");
