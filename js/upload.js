// /js/upload.js
import { storage, db } from "./firebase.js";
import {
  ref as sRef,
  uploadBytesResumable,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-storage.js";
import {
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";
import { auth } from "./firebase.js";

export function initUploadForm(fileInputEl, titleEl, descEl, categoryEl, progressEl, submitBtn, onComplete) {
  submitBtn.addEventListener("click", async () => {
    const file = fileInputEl.files[0];
    const title = titleEl.value.trim() || "Untitled";
    const desc = descEl.value.trim() || "";
    const category = categoryEl.value || "General";
    if (!file) {
      alert("Please choose a file to upload.");
      return;
    }
    submitBtn.disabled = true;

    const uid = auth.currentUser ? auth.currentUser.uid : "anon";
    const filename = `${uid}_${Date.now()}_${file.name.replace(/\s+/g,'_')}`;
    const stRef = sRef(storage, `uploads/${filename}`);

    const uploadTask = uploadBytesResumable(stRef, file);
    uploadTask.on('state_changed', snapshot => {
      const pct = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      progressEl.innerText = `Uploading: ${pct}%`;
    }, (err) => {
      console.error("Upload error", err);
      alert("Upload failed: " + err.message);
      submitBtn.disabled = false;
    }, async () => {
      const url = await getDownloadURL(uploadTask.snapshot.ref);
      // Save metadata to Firestore
      await addDoc(collection(db, 'videos'), {
        title,
        description: desc,
        category,
        url,
        filename,
        uid,
        createdAt: serverTimestamp(),
        views: 0,
      });
      progressEl.innerText = "Upload complete!";
      submitBtn.disabled = false;
      if (onComplete) onComplete();
    });
  });
}
