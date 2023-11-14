
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore, collection} from "firebase/firestore";
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
 };

const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const database = getFirestore(app);

const usersCollection = collection(database, "users");
const blogsCollection = collection(database, "blogs");
const commentsCollection = collection(database, "comments");
const contactsCollection = collection(database, "contacts");
export { auth, usersCollection, blogsCollection, commentsCollection, contactsCollection,};