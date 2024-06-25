import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js"
import { addDoc, collection, deleteDoc, doc, getFirestore, onSnapshot, getDoc, updateDoc, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-firestore.js"
// DOCUMENTACIÓN
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
    apiKey: "AIzaSyBti-_7-wANyNufw3MEhP4UQKgxJ06J6qY",
    authDomain: "bomberos-eb886.firebaseapp.com",
    projectId: "bomberos-eb886",
    storageBucket: "bomberos-eb886.appspot.com",
    messagingSenderId: "822444597584",
    appId: "1:822444597584:web:e9e2bc05757c5a171b8c55",
    measurementId: "G-E8947Y7LVX"
  };
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const save = (bombero) => {
    addDoc(collection(db, 'Bomberos'), bombero)
}

export const getAll = (data) => {

    onSnapshot(collection(db, 'Bomberos'), data)
}
export const remove = (id) => {
    deleteDoc(doc(db, 'Bomberos', id))
}
export const selectOne = (id) => getDoc(doc(db, 'Bomberos', id))

export const existeRun = async (run) => {
    const bomberosRef = collection(db, 'Bomberos');
    const q = query(bomberosRef, where("run", "==", run));
    const querySnapshot = await getDocs(q);

    return !querySnapshot.empty;
};
export const edit = (id, bombero) => {
    updateDoc(doc(db, 'Bomberos', id), bombero)
}





