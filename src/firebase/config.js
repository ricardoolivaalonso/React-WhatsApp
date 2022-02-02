import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyD8g78juCH5eCBMddwpXEGsOh1DIqt5LTI",
    authDomain: "roa-02.firebaseapp.com",
    projectId: "roa-02",
    storageBucket: "roa-02.appspot.com",
    messagingSenderId: "24118435566",
    appId: "1:24118435566:web:ebe1f6a875b3064241ddff"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const storage = getStorage(app)

export { db, storage }


