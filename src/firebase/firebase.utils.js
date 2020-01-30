import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAIOk-mYJcBuG19xN8QpLggseIutJORwt0",
    authDomain: "crown-clothing-db-c61a7.firebaseapp.com",
    databaseURL: "https://crown-clothing-db-c61a7.firebaseio.com",
    projectId: "crown-clothing-db-c61a7",
    storageBucket: "crown-clothing-db-c61a7.appspot.com",
    messagingSenderId: "775002114927",
    appId: "1:775002114927:web:b767f0251f6e34d055369a",
    measurementId: "G-32RF10D75D"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();
    if(!snapShot.exists) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();
        
        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch(err) {
            console.log(`error creating user ${err.message}`)
        }
    }
    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;