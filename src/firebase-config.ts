import { getFirestore } from '@firebase/firestore';
import { initializeApp } from 'firebase/app';

// import firebase from "firebase/app";
// import "firebase/database";

// const firebaseConfig = {
//     apiKey: process.env.REACT_APP_APIKEY,
//     authDomain: process.env.REACT_APP_AUTHDOMAIN,
//     projectId: process.env.REACT_APP_PID,
//     storageBucket: process.env.REACT_APP_SB,
//     messagingSenderId: process.env.REACT_APP_SID,
//     appId: process.env.REACT_APP_APPID,
//     measurementId: process.env.REACT_APP_MID
// };

// firebase.initializeApp(firebaseConfig);
// //const databaseRef = firebase.database().ref();
// //export const todosRef = databaseRef.child("todos")
// export default firebase;

const firebaseConfig = {
    apiKey: "AIzaSyB0cHk93D20yAz2YJS_vxFOESKcR57YyeU",
    authDomain: "todo-list-1d091.firebaseapp.com",
    projectId: "todo-list-1d091",
    storageBucket: "todo-list-1d091.appspot.com",
    messagingSenderId: "517966810519",
    appId: "1:517966810519:web:0f53950d15e46ae9ab08d2",
    measurementId: "G-02HW5WCM9S"
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)