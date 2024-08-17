import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Import Firestore

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCr73hj7lbCwDljyz_LFK4FoKifftamLZs",
  authDomain: "empthatic-bot.firebaseapp.com",
  projectId: "empthatic-bot",
  storageBucket: "empthatic-bot.appspot.com",
  messagingSenderId: "709606894169",
  appId: "1:709606894169:web:17d2b26f3c4e39d5671f48",
  measurementId: "G-L31YW3R4DZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db };
