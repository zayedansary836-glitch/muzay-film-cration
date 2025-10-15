// /js/watch.js
import { db } from "./firebase.js";
import { doc, getDoc, updateDoc, increment } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

export async function initWatch(videoId, containerEl) {
  containerEl.innerHTML = 'Loading video...';
  const ref = doc(db, 'videos', videoId);
  const snap = await getDoc(ref);
  if (!snap.exists()) {
    containerEl.innerHTML = '<p>Video not found.</p>';
    return;
  }
  const data = snap.data();
  // Update view simple increment
  try { await updateDoc(ref, { views: increment(1) }); } catch(e){}

  containerEl.innerHTML = `
    <div class="watch-player">
      <video controls src="${data.url}" playsinline style="width:100%;max-height:60vh;"></video>
      <h2>${escapeHtml(data.title)}</h2>
      <p>${escapeHtml(data.description || "")}</p>
    </div>
  `;
}

function escapeHtml(s=''){ return s.replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m])); }
