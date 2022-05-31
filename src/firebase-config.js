import { initializeApp } from "firebase/app";
import "firebase/firestore";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDO-_WFla7g888P5D_yGI1tB7OP6zRnr-A",
  authDomain: "disecto-262c4.firebaseapp.com",
  projectId: "disecto-262c4",
  storageBucket: "disecto-262c4.appspot.com",
  messagingSenderId: "75338142142",
  appId: "1:75338142142:web:71d989d73a0e4213d469ef",
  measurementId: "G-Z49CX2KC88"
};
const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);

export { db };
