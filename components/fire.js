import { initializeApp, getApps } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyBDV3CQsUPkRQEoPLdyVfxwhFmQ-o5YLJc",
    authDomain: "wordswolf-72648.firebaseapp.com",
    projectId: "wordswolf-72648",
    storageBucket: "wordswolf-72648.appspot.com",
    messagingSenderId: "1061296992918",
    appId: "1:1061296992918:web:d973c1d91d2305ee02c8b7"
}
let firebaseApp = ""
const apps = getApps()
if (!apps.length) {
    firebaseApp = initializeApp(firebaseConfig)
} else {
    firebaseApp = apps[0]
}

const db = getFirestore(firebaseApp, {})
export { db }

