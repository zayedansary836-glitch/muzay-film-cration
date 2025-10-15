// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBH3UcpeD-a-ZEHhghi6bTkGnO9vKeu22c",
  authDomain: "muzaya-film-creation.firebaseapp.com",
  projectId: "muzaya-film-creation",
  storageBucket: "muzaya-film-creation.firebasestorage.app",
  messagingSenderId: "466440504989",
  appId: "1:466440504989:web:ee937abfd4dae2f1ae3674",
  measurementId: "G-02EG3SHXKC"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
