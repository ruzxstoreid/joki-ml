import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

// Konfigurasi Firebase
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
const auth = getAuth(app);

// Login Admin
document.getElementById("loginBtn").onclick = async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  try {
    await signInWithEmailAndPassword(auth, email, password);
    document.getElementById("adminLogin").style.display = "none";
    document.getElementById("panel").style.display = "block";
    loadData();
  } catch (e) {
    alert("Login gagal: " + e.message);
  }
};

// Ambil data dari Firestore
async function loadData() {
  const pesananSnap = await getDocs(collection(db, "pesanan"));
  const ulasanSnap = await getDocs(collection(db, "ulasan"));
  const pList = document.getElementById("pesananList");
  const uList = document.getElementById("ulasanList");

  pList.innerHTML = "";
  pesananSnap.forEach(doc => {
    const d = doc.data();
    pList.innerHTML += `
      <div>
        <strong>${d.nama}</strong> (ID: ${d.idml}, Server: ${d.server})<br/>
        WA: ${d.wa}<br/>
        Tier: ${d.tierAwal} → ${d.tier}<br/>
        Catatan: ${d.catatan || "-"}
        <hr/>
      </div>
    `;
  });

  uList.innerHTML = "";
  ulasanSnap.forEach(doc => {
    const d = doc.data();
    uList.innerHTML += `<p><strong>${d.nama}</strong>: ${d.pesan}</p><hr/>`;
  });
}
