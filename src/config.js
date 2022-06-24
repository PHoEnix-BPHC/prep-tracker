import firebase from "firebase"
import "firebase/firestore"
import "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyArN1gVVVSNjgMVD7aUvVXyUz8kG27-oZM",
    authDomain: "core-tracker-bphc.firebaseapp.com",
    projectId: "core-tracker-bphc",
    storageBucket: "core-tracker-bphc.appspot.com",
    messagingSenderId: "845307143891",
    appId: "1:845307143891:web:710764cafe6462efced626",
    measurementId: "G-PXPGGZW6TB"
};

firebase.initializeApp(firebaseConfig)
export const firestore = firebase.firestore()
export const storage = firebase.storage()

export default firebase