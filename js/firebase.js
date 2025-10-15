// /js/firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyBH3UcpeD-a-ZEHhghi6bTkGnO9vKeu22c",
  authDomain: "muzaya-film-creation.firebaseapp.com",
  projectId: "muzaya-film-creation",
  storageBucket: "muzaya-film-creation.appspot.com", // corrected domain format
  messagingSenderId: "466440504989",
  appId: "1:466440504989:web:ee937abfd4dae2f1ae3674",
  measurementId: "G-02EG3SHXKC"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
