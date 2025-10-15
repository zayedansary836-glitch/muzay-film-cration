import { app } from './firebase.js';
import {
  getAuth,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-storage.js";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

const form = document.getElementById("profileForm");
const logoutBtn = document.getElementById("logoutBtn");

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  logoutBtn.onclick = () => signOut(auth).then(() => window.location.href = "index.html");

  const docRef = doc(db, "users", user.uid);
  const snap = await getDoc(docRef);

  if (snap.exists()) {
    const data = snap.data();
    document.getElementById("name").value = data.name || "";
    document.getElementById("bio").value = data.bio || "";
    document.getElementById("skills").value = data.skills || "";
    document.getElementById("displayName").textContent = data.name;
    document.getElementById("displayBio").textContent = data.bio;
    document.getElementById("displaySkills").textContent = data.skills;
    if (data.photoURL) {
      document.getElementById("displayPic").src = data.photoURL;
    }
  }
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const user = auth.currentUser;
  if (!user) return alert("Login first!");

  const file = document.getElementById("profilePic").files[0];
  let photoURL = "";

  if (file) {
    const fileRef = ref(storage, `profilePics/${user.uid}`);
    await uploadBytes(fileRef, file);
    photoURL = await getDownloadURL(fileRef);
  }

  const data = {
    name: document.getElementById("name").value,
    bio: document.getElementById("bio").value,
    skills: document.getElementById("skills").value,
    photoURL: photoURL
  };

  await setDoc(doc(db, "users", user.uid), data, { merge: true });
  alert("Profile saved!");
  window.location.reload();
});
