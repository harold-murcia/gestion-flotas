import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDNd2ZjRTNujnhW79bpww79bXNS74ysyB0",
  authDomain: "gestion-flotas-621ca.firebaseapp.com",
  projectId: "gestion-flotas-621ca",
  storageBucket: "gestion-flotas-621ca.appspot.com",
  messagingSenderId: "712368818745",
  appId: "1:712368818745:web:a8634d9554355460881be8",
  measurementId: "G-SXVWT474ND"
};

const app = initializeApp(firebaseConfig);

export default getFirestore(app)