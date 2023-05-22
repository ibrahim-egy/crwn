import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  signInWithRedirect,
  GoogleAuthProvider,
} from "firebase/auth";

import { getFirestore, getDoc, setDoc, doc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC-t9uYFSGL3b7YSgu9fr_9ZEeWaspVzic",
  authDomain: "crwn-clothing-db-b4b66.firebaseapp.com",
  projectId: "crwn-clothing-db-b4b66",
  storageBucket: "crwn-clothing-db-b4b66.appspot.com",
  messagingSenderId: "495296006999",
  appId: "1:495296006999:web:550b39f20d21785d000c12",
};

const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapShot = await getDoc(userDocRef);

  if (!userSnapShot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log(`Error Creating user: ${error}`);
    }
  }
  return userDocRef;
};
