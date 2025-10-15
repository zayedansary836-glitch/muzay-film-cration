// js/firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-storage.js";

// YOUR Firebase config (you provided these earlier)
const firebaseConfig = {
  apiKey: "AIzaSyBH3UcpeD-a-ZEHhghi6bTkGnO9vKeu22c",
  authDomain: "muzaya-film-creation.firebaseapp.com",
  databaseURL: "https://muzaya-film-creation-default-rtdb.firebaseio.com",
  projectId: "muzaya-film-creation",
  storageBucket: "muzaya-film-creation.firebasestorage.app",
  messagingSenderId: "466440504989",
  appId: "1:466440504989:web:ee937abfd4dae2f1ae3674",
  measurementId: "G-02EG3SHXKC"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

// listen dashboard node (realtime)
const dashboardRef = ref(db, 'dashboard/');
onValue(dashboardRef, (snap) => {
  const data = snap.val();
  if (!data) return;
  const setText = (id, v) => {
    const el = document.getElementById(id);
    if (el) el.innerText = v ?? 0;
  };
  setText('projectCount', data.projects);
  setText('creatorCount', data.creators);
  setText('photoCount', data.photos);
  setText('videoCount', data.videos);
});
