import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBGlmc-ELFCwl4-SzXa2POPkyPCuuZnT1M",
  authDomain: "news-fab3a.firebaseapp.com",
  projectId: "news-fab3a",
  storageBucket: "news-fab3a.appspot.com",
  messagingSenderId: "532352840559",
  appId: "1:532352840559:web:8c93c73430e34e8f08ae9a",
  measurementId: "G-CG473HW27S",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const auth = getAuth(app);

export { storage, app, auth };
