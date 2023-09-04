// Import the functions you need from the SDKs you need
import firebase, { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// kolade gmail
const firebaseConfig = {
    apiKey: "AIzaSyA1nmn1a4l8e2B6CgkU0GLzcVwWxuBqYyA",
    authDomain: "cpe-vote-backend.firebaseapp.com",
    databaseURL: "https://cpe-vote-backend-default-rtdb.firebaseio.com",
    projectId: "cpe-vote-backend",
    storageBucket: "cpe-vote-backend.appspot.com",
    messagingSenderId: "213385346828",
    appId: "1:213385346828:web:f9fb8a5df1a9de3e4a1329",
    measurementId: "G-1YF3E8FPFQ"
};
//nacomes sept gmail 2023
// Your web app's Firebase configuration
const firebaseConfig2023 = {
    apiKey: "AIzaSyCi6dnAAYLXq12pohDiwWiq_VVZ_pOtiQ4",
    authDomain: "nacomes-election.firebaseapp.com",
    projectId: "nacomes-election",
    storageBucket: "nacomes-election.appspot.com",
    messagingSenderId: "100124918225",
    appId: "1:100124918225:web:409f1c103f3efaba01e0f0"
};


//nacomes february gmail 2023
const firebaseConfigNacomes = {
    apiKey: "AIzaSyC_VSG2uI4RQvB_U35EanTnIBBqT2Ie8IA",
    authDomain: "election-votes-server.firebaseapp.com",
    projectId: "election-votes-server",
    storageBucket: "election-votes-server.appspot.com",
    messagingSenderId: "1000137432211",
    appId: "1:1000137432211:web:b99e86bb315df7e6304166",
    measurementId: "G-PGVBSTX0PM"
};



const firebaseConfigNew = {
    apiKey: "AIzaSyDdRbortGYfvpiYjJoeq_x-U59WKHRaA9Q",
    authDomain: "vote-fuoyecpe-portal.firebaseapp.com",
    projectId: "vote-fuoyecpe-portal",
    storageBucket: "vote-fuoyecpe-portal.appspot.com",
    messagingSenderId: "658124233551",
    appId: "1:658124233551:web:fb5900762103da4125033a"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig2023);
// const app = initializeApp(firebaseConfig);
// const app = initializeApp(firebaseConfigNacomes);


const analytics = getAnalytics(app);
// const storage = getStorage()



export const db = getFirestore(app)




export const storage = getStorage(app);