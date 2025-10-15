// firebase-config.js  (save in repo root)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyBH3UcpeD-a-ZEHhghi6bTkGnO9vKeu22c",
  authDomain: "muzaya-film-creation.firebaseapp.com",
  projectId: "muzaya-film-creation",
  storageBucket: "muzaya-film-creation.appspot.com",
  messagingSenderId: "466440504989",
  appId: "1:466440504989:web:ee937abfd4dae2f1ae3674",
  measurementId: "G-02EG3SHXKC"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, provider, db, storage };
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log("User already logged in:", user.email);
    // Agar user logged in hai, use dashboard pe bhejo
    if (window.location.pathname.includes("index.html")) {
      window.location.href = "dashboard.html";
    }
  } else {
    console.log("No user logged in");
  }
});
