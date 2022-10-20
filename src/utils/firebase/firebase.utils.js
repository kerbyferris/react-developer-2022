import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  signOut,
} from "firebase/auth";
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

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();

export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  if (!userAuth) return;

  const { uid, displayName, email } = userAuth;

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

export const createProductDocument = async (product) => {
  if (!product) return;

  // const { id } = product;
  // console.log(db);

  const productDocRef = doc(db, "products", product.id);

  const productSnapshot = await getDoc(productDocRef);

  if (!productSnapshot.exists()) {
    const createdAt = new Date();

    try {
      await setDoc(productDocRef, {
        ...product,
        createdAt,
      });
    } catch (error) {
      console.log("error creating the product", error.message);
    }
  }

  return productDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (cb) => onAuthStateChanged(auth, cb);
