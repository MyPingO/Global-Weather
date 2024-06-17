import { auth, db } from "./firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
// authService.ts
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup, UserCredential } from "firebase/auth";

// Email and Password Sign-Up
export const signUp = async (email: string, password: string): Promise<UserCredential> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await addUserToFirestore(userCredential.user);
    return userCredential;
  } catch (error) {
    throw error;
  }
};

// Email and Password Log-In
export const logIn = async (email: string, password: string): Promise<UserCredential> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential;
  } catch (error) {
    throw error;
  }
};

// Log-Out
export const logOut = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
};

// Sign in with Google
export const signInWithGoogle = async (): Promise<UserCredential> => {
  const provider = new GoogleAuthProvider();
  try {
    const userCredential = await signInWithPopup(auth, provider);
    await addUserToFirestore(userCredential.user);
    return userCredential;
  } catch (error) {
    throw error;
  }
};

// Add User to Firestore
const addUserToFirestore = async (user: UserCredential["user"]): Promise<void> => {
  if (!user) return;
  const userRef = doc(db, "users", user.uid);
  await setDoc(userRef, {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
  });
};
