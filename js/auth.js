// /js/auth.js
import { auth } from "./firebase.js";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  setPersistence,
  browserLocalPersistence,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";

await setPersistence(auth, browserLocalPersistence);

const provider = new GoogleAuthProvider();

export async function googleSignIn() {
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (err) {
    throw err;
  }
}

export async function emailLogin(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export async function registerEmail(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export async function forgotPassword(email) {
  return sendPasswordResetEmail(auth, email);
}

export async function logout() {
  await signOut(auth);
}

export function onAuth(cb) {
  return onAuthStateChanged(auth, cb);
}
