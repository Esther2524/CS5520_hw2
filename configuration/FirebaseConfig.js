// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDA-NycZ9rcxracJc7NNecKiIKf_3CdCZI",
    authDomain: "cs5520-hw2-30129.firebaseapp.com",
    projectId: "cs5520-hw2-30129",
    storageBucket: "cs5520-hw2-30129.appspot.com",
    messagingSenderId: "1010591844281",
    appId: "1:1010591844281:web:de436d8f82105d4c0b1868"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { db };
