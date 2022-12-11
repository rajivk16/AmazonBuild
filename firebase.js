import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDSEaLgfHsp_TyCekY64T3WaZjMtJs0c6Q",
  authDomain: "build-8e087.firebaseapp.com",
  projectId: "build-8e087",
  storageBucket: "build-8e087.appspot.com",
  messagingSenderId: "569828658452",
  appId: "1:569828658452:web:62f260f336b30e17d88601",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();

export default db;
