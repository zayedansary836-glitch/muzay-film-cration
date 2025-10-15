// /js/feed.js
import { db } from "./firebase.js";
import { collection, query, orderBy, getDocs, limit } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

export async function loadFeed(containerEl, limitCount = 20) {
  containerEl.innerHTML = "Loading...";
  const q = query(collection(db, 'videos'), orderBy('createdAt', 'desc'), limit(limitCount));
  const snap = await getDocs(q);
  containerEl.innerHTML = '';
  if (snap.empty) {
    containerEl.innerHTML = '<p>No videos yet — be the first to upload!</p>';
    return;
  }
  snap.forEach(doc => {
    const data = doc.data();
    const card = document.createElement('div');
    card.className = 'video-card';
    card.innerHTML = `
      <a href="watch.html?id=${doc.id}">
        <div class="thumb">
          <video src="${data.url}#t=3" muted preload="metadata"></video>
        </div>
        <div class="meta">
          <h3>${escapeHtml(data.title)}</h3>
          <p>${escapeHtml(data.description || '')}</p>
        </div>
      </a>
    `;
    containerEl.appendChild(card);
  });
}

function escapeHtml(s='') {
  return s.replace(/[&<>"']/g, function (m) {
    return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m];
  });
}
