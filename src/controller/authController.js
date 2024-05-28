import { auth } from "../config/firebaseConfig";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";

const doSignInWithEmailAndPassword = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

const doSignOut = () => {
  return signOut(auth);
};

export { doSignInWithEmailAndPassword, doSignOut };
