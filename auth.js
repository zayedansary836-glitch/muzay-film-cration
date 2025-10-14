// auth.js
import { auth } from "./firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";

const formTitle = document.getElementById("formTitle");
const authBtn = document.getElementById("authBtn");
const toggleForm = document.getElementById("toggleForm");
const toggleText = document.getElementById("toggleText");
const errorMsg = document.getElementById("errorMsg");
const loading = document.getElementById("loading");

let isLogin = true;

toggleForm.addEventListener("click", () => {
  isLogin = !isLogin;
  formTitle.innerText = isLogin ? "Login to MFC" : "Create Your MFC Account";
  authBtn.innerText = isLogin ? "Login" : "Register";
  toggleText.innerHTML = isLogin
    ? `Don’t have an account? <a id="toggleForm">Register</a>`
    : `Already have an account? <a id="toggleForm">Login</a>`;
});

authBtn.addEventListener("click", async () => {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  errorMsg.textContent = "";
  loading.style.display = "block";

  try {
    if (isLogin) {
      await signInWithEmailAndPassword(auth, email, password);
    } else {
      await createUserWithEmailAndPassword(auth, email, password);
    }
  } catch (error) {
    loading.style.display = "none";
    errorMsg.textContent = error.message.includes("auth/invalid-email")
      ? "Invalid email format."
      : error.message.includes("auth/wrong-password")
      ? "Wrong password."
      : error.message.includes("auth/user-not-found")
      ? "No user found with this email."
      : error.message.includes("auth/email-already-in-use")
      ? "Email already registered."
      : error.message;
  }
});

onAuthStateChanged(auth, (user) => {
  if (user) {
    window.location.href = "dashboard.html";
  }
});
