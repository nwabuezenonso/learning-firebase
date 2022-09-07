import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs} from 'firebase/firestore'; 
import dotenv from 'dotenv';

dotenv.config();


const firebaseConfig = {
    apiKey: process.env.APIKEY,
    authDomain: "learn-firebase-5e508.firebaseapp.com",
    projectId: "learn-firebase-5e508",
    storageBucket: "learn-firebase-5e508.appspot.com",
    messagingSenderId: "493433309881",
    appId: "1:493433309881:web:083760a44213a0b3a16968"
};

initializeApp(firebaseConfig);


// init service by invoking the function
const db = getFirestore();


// collection ref ( get a reference to a specific collection)
const colRef = collection(db, 'Books');

// get collection data

getDocs(colRef)   //the data returns a promise(performs a function once data is complete or not)
    .then((snapshot) => {    // function that contain a snapshot of our documents
        let books = [];
        snapshot.docs.forEach((doc) => {
            books.push({...doc.data(), id: doc.id})  // spread allow us expand an array and take a copy of an existing array
        })

        console.log(books)
    })
    .catch(err => {
        console.log(err.message)
    })