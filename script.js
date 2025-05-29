import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyATLpR6vs2rVtiQqxj6xUsV1pp76YNf7R8",
  authDomain: "joki-ml-ruzx.firebaseapp.com",
  projectId: "joki-ml-ruzx",
  storageBucket: "joki-ml-ruzx.firebasestorage.app",
  messagingSenderId: "121140673730",
  appId: "1:121140673730:web:0b9afbfe79e269fd818f5b"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.getElementById("orderForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const nama = document.getElementById("nama").value;
  const id = document.getElementById("id").value;
  const server = document.getElementById("server").value;
  const wa = document.getElementById("wa").value;
  const tierAwal = document.getElementById("tierAwal").value;
  const tierTujuan = document.getElementById("tierTujuan").value;
  const catatan = document.getElementById("catatan").value;

  try {
    await addDoc(collection(db, "pesanan"), {
      nama, id, server, wa, tierAwal, tierTujuan, catatan, waktu: new Date()
    });

    const pesan = `Halo kak, saya ingin memesan joki Mobile Legends:\n\n` +
      `Nama: ${nama}\n` +
      `ID: ${id} (${server})\n` +
      `No WhatsApp: ${wa}\n` +
      `Tier Awal: ${tierAwal}\n` +
      `Tier Tujuan: ${tierTujuan}\n` +
      `Catatan: ${catatan || '-'}`;

    const url = `https://wa.me/6282324101206?text=${encodeURIComponent(pesan)}`;
    window.open(url, '_blank');
  } catch (error) {
    alert("Gagal menyimpan data: " + error.message);
  }
});
