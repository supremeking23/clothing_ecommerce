import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


import { signInWithPopup,
    getAuth, 
    signInWithRedirect, 
    GoogleAuthProvider ,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
} from "firebase/auth";

import {
    getFirestore,
    doc, /** get document instance */
    getDoc,  /** access data on documents  */
    setDoc /** set data */

} from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCa8p_EX0zO_DIWNLEW7tElrkgDly54Pp8",
  authDomain: "clothing-ecommerce-db-382b8.firebaseapp.com",
  projectId: "clothing-ecommerce-db-382b8",
  storageBucket: "clothing-ecommerce-db-382b8.appspot.com",
  messagingSenderId: "495137603713",
  appId: "1:495137603713:web:25a9b71c80c2aa731a4d80"
};



// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    "prompt": "select_account"
});


export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);


export const database = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
    if(!userAuth) return;

    const userDocRef = doc(database, "users", userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists());

    /** if user data does not exists */
    if(!userSnapshot.exists()){
        // value is false
        const { displayName, email } = userAuth;
        const createAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName, email, createAt, ...additionalInformation
            });
        } catch (error) {
            console.log("error creating the user", error.message);
        }

    }

    /** if user data exists */

    return userDocRef;
    
};


export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return; // exit this function

    return await createUserWithEmailAndPassword(auth, email, password);
};


export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return; // exit this function

    return await signInWithEmailAndPassword(auth, email, password);
};


export const signOutUser = async () => signOut(auth);