import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBfjk9lXiSE4wcgmam7WwDA3o8Mq2KoT-4",
  authDomain: "stock-control-development.firebaseapp.com",
  projectId: "stock-control-development",
  storageBucket: "stock-control-development.appspot.com",
  messagingSenderId: "334910385313",
  appId: "1:334910385313:web:2c28854268984637a754e0"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);