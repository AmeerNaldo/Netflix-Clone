import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyA9_0JN9uTKW8N0eBtpltqh8Hp4WGwuJiM",
  authDomain: "netflix-clone-8df79.firebaseapp.com",
  projectId: "netflix-clone-8df79",
  storageBucket: "netflix-clone-8df79.appspot.com",
  messagingSenderId: "347018300436",
  appId: "1:347018300436:web:60482e9528a6e87592ab01",
  measurementId: "G-KDK64YP1QM",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
  try {
    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = response.user;
    await addDoc(collection(db, "user"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }
};

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }
};

const logout = () => {
    signOut(auth);
}

export {auth, db, login, signup, logout};