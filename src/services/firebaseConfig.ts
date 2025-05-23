import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBjYtM4R-gmJ7qXZ96eUYCCTeAu08eU9gc",
  authDomain: "odontoprev-8c124.firebaseapp.com",
  projectId: "odontoprev-8c124",
  storageBucket: "odontoprev-8c124.firebasestorage.app",
  messagingSenderId: "332014693804",
  appId: "1:332014693804:web:d7cf87fc77707a466d5e09",
  measurementId: "G-RBRV22NK4S"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
