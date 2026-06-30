import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  type User,
} from "firebase/auth";
import { app } from "./firebase";

export const auth = getAuth(app);

export async function adminLogin(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}

export async function adminLogout() {
  return signOut(auth);
}

export function onAuthChange(cb: (user: User | null) => void) {
  return onAuthStateChanged(auth, cb);
}
