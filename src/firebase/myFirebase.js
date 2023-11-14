
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore, collection} from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyARuvod6-dlZ5Wuk0yTM1jEqjFkqlS4NXk",
    authDomain: "project-e8592.firebaseapp.com",
    projectId: "project-e8592",
    storageBucket: "project-e8592.appspot.com",
    messagingSenderId: "629812397605",
    appId: "1:629812397605:web:95338a4691bffd0e09a1cc"
  };

const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const database = getFirestore(app);

const usersCollection = collection(database, "users");
const blogsCollection = collection(database, "blogs");
const commentsCollection = collection(database, "comments");
const contactsCollection = collection(database, "contacts");
export { auth, usersCollection, blogsCollection, commentsCollection, contactsCollection,};