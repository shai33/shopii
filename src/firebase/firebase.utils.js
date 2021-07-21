import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCsjBIeiQquIh93B6Yzv9I4IWvNjKZODKI",
    authDomain: "crwn-db-c545d.firebaseapp.com",
    projectId: "crwn-db-c545d",
    storageBucket: "crwn-db-c545d.appspot.com",
    messagingSenderId: "91739856279",
    appId: "1:91739856279:web:9eb361945c6ca4dd7cf8d2",
    measurementId: "G-4X1E1G2CVV"
  };

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;