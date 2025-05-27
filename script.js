import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

// Firebase config kamu
const firebaseConfig = {
  apiKey: "AIzaSyAtLPR6Vs2rVtiQqxj6xUsV1pp76YNf7R8",
  authDomain: "joki-ml-ruzx.firebaseapp.com",
  projectId: "joki-ml-ruzx",
  storageBucket: "joki-ml-ruzx.appspot.com",
  messagingSenderId: "121140673730",
  appId: "1:121140673730:web:0b9afbfe79e269fd818f5b"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Kirim data pemesanan
document.getElementById("orderForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = {
    nama: document.getElementById("nama").value,
    idml: document.getElementById("idml").value,
    server: document.getElementById("server").value,
    wa: document.getElementById("wa").value,
    tierAwal: document.getElementById("tierAwal").value,
    tier: document.getElementById("tier").value,
    catatan: document.getElementById("catatan").value,
    waktu: new Date()
  };
  try {
    await addDoc(collection(db, "pesanan"), data);
    alert("Pesanan berhasil dikirim!");
    e.target.reset();
  } catch (err) {
    alert("Gagal mengirim pesanan: " + err.message);
  }
});

// Kirim dan tampilkan ulasan
document.getElementById("reviewForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const nama = document.getElementById("reviewNama").value;
  const pesan = document.getElementById("reviewPesan").value;
  try {
    await addDoc(collection(db, "ulasan"), { nama, pesan });
    alert("Ulasan berhasil dikirim!");
    e.target.reset();
    tampilkanUlasan();
  } catch (err) {
    alert("Gagal mengirim ulasan: " + err.message);
  }
});

async function tampilkanUlasan() {
  const list = document.getElementById("reviewList");
  list.innerHTML = "";
  const snap = await getDocs(collection(db, "ulasan"));
  snap.forEach(doc => {
    const d = doc.data();
    list.innerHTML += `<p><strong>${d.nama}</strong>: ${d.pesan}</p><hr>`;
  });
}
tampilkanUlasan();
