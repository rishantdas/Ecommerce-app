import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCl5THyK_OWUbmpjgwEJk5sLWL6eowH5-I",
  authDomain: "crwn-clothing-db-7934c.firebaseapp.com",
  projectId: "crwn-clothing-db-7934c",
  storageBucket: "crwn-clothing-db-7934c.appspot.com",
  messagingSenderId: "132935363541",
  appId: "1:132935363541:web:3594cc4f5e3a8b5e096b5c",
  measurementId: "G-WMYFTBX9SR",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});
export const auth = getAuth();

export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const db =getFirestore() ;
export const createUserDocumentFromAuth=async(userAuth,additionalInformation={})=>{
  if(!userAuth)return ;
  const userDocRef=doc(db,'users',userAuth.uid);
  
  const userSnapshot=await getDoc(userDocRef);

   console.log(userSnapshot.exists());

   
   if(!userSnapshot.exists()){
    const {displayName,email}=userAuth;
    const createdAt=new Date();
      try {
        await setDoc(userDocRef,{
          displayName,
          email,
          createdAt,
          ...additionalInformation,
        });
      } catch (error) {
        console.log('error creating the user',error.message);
      }
   }
    return userDocRef;
  
};
export const createAuthUserWithEmailAndPassword=async(email,password)=>{
  if(!email || !password)return;

  return await createUserWithEmailAndPassword(auth,email,password);
}
export const signInAuthUserWithEmailAndPassword=async(email,password)=>{
  if(!email || !password)return;

  return await signInWithEmailAndPassword(auth,email,password);
}