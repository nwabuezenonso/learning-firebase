import { initializeApp } from 'firebase/app';
import { getFirestore, collection, onSnapshot, addDoc, deleteDoc, doc} from 'firebase/firestore'; 
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

// real time collection data
onSnapshot(colRef, (snapshot) => {  //allow us to collect data in real time
    let books = [];
    snapshot.docs.forEach((doc) => {
        books.push({...doc.data(), id: doc.id})  // spread allow us expand an array and take a copy of an existing array
    })
    console.log(books)
})


// adding documents
const addBookForm = document.querySelector('.add');
addBookForm.addEventListener('submit', (e) => {
    e.preventDefault();

    addDoc(colRef, {
        title: addBookForm.title.value,
        author: addBookForm.author.value
    })
    .then(() => {
        addBookForm.reset();
    })
});

// deleting documents
const deleteBookForm = document.querySelector('.delete');
deleteBookForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const docRef = doc(db, 'Books', deleteBookForm.id.value);  // we make use of doc to specify the document we want to delete
    
    deleteDoc(docRef)
        .then(() => {
            deleteBookForm.reset();
        })
});