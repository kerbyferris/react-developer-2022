import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDfj1qagMaVfNXjQyvrHsT_1IP8WPDaEVY",
  authDomain: "crwn-clothing-db-da842.firebaseapp.com",
  projectId: "crwn-clothing-db-da842",
  storageBucket: "crwn-clothing-db-da842.appspot.com",
  messagingSenderId: "747061574362",
  appId: "1:747061574362:web:11e947de645d8118cc03e3",
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async ({
  uid,
  displayName,
  email,
}) => {
  const userDocRef = doc(db, "users", uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  return userDocRef;
};
