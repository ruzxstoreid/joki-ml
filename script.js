
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCBhrErn74FZfjKZettcfL7uPTTo_1LZZLU",
  authDomain: "ulasan-joki.firebaseapp.com",
  projectId: "ulasan-joki",
  storageBucket: "ulasan-joki.appspot.com",
  messagingSenderId: "275710139741",
  appId: "1:275710139741:web:477907526df9e0d64c5cb4"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Pemesanan
document.getElementById("orderForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = {
    nama: document.getElementById("nama").value,
    idml: document.getElementById("idml").value,
    server: document.getElementById("server").value,
    wa: document.getElementById("wa").value,
    tier: document.getElementById("tier").value,
    catatan: document.getElementById("catatan").value
  };
  await addDoc(collection(db, "pesanan"), data);
  alert("Pesanan berhasil dikirim!");
  e.target.reset();
});

// Ulasan
document.getElementById("reviewForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const nama = document.getElementById("reviewNama").value;
  const pesan = document.getElementById("reviewPesan").value;
  await addDoc(collection(db, "ulasan"), { nama, pesan });
  alert("Ulasan berhasil dikirim!");
  tampilkanUlasan();
  e.target.reset();
});

async function tampilkanUlasan() {
  const list = document.getElementById("reviewList");
  const snap = await getDocs(collection(db, "ulasan"));
  list.innerHTML = "";
  snap.forEach(doc => {
    const d = doc.data();
    list.innerHTML += `<p><strong>${d.nama}</strong>: ${d.pesan}</p><hr>`;
  });
}
tampilkanUlasan();
