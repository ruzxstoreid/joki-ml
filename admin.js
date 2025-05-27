
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

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
const auth = getAuth(app);

document.getElementById("loginBtn").onclick = () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  signInWithEmailAndPassword(auth, email, password).then(() => {
    document.getElementById("adminLogin").style.display = "none";
    document.getElementById("panel").style.display = "block";
    loadData();
  }).catch((e) => alert("Login gagal: " + e.message));
};

async function loadData() {
  const pesanan = await getDocs(collection(db, "pesanan"));
  const ulasan = await getDocs(collection(db, "ulasan"));
  const pList = document.getElementById("pesananList");
  const uList = document.getElementById("ulasanList");

  pesanan.forEach(doc => {
    const d = doc.data();
    pList.innerHTML += `<p><strong>${d.nama}</strong> - ID: ${d.idml} (${d.server}) - WA: ${d.wa}<br>Catatan: ${d.catatan}</p><hr>`;
  });

  ulasan.forEach(doc => {
    const d = doc.data();
    uList.innerHTML += `<p><strong>${d.nama}</strong>: ${d.pesan}</p><hr>`;
  });
}
