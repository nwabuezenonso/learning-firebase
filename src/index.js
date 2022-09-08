import { initializeApp } from 'firebase/app';
import { getFirestore, collection, onSnapshot, query, where, addDoc, deleteDoc, doc, orderBy, serverTimestamp, getDoc, updateDoc} from 'firebase/firestore'; 
import { getAuth, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, onAuthStateChanged} from 'firebase/auth';
// import dotenv from 'dotenv';

// dotenv.config();

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
const auth = getAuth();

// collection ref ( get a reference to a specific collection)
const colRef = collection(db, 'Books');

// queries
const q = query(colRef, orderBy('createdAt') ); //to get specific element, we use where and query

// real time collection data
const unSubCol = onSnapshot(q, (snapshot) => {  //allow us to collect data in real time
    let books = [];
    snapshot.docs.forEach((doc) => {
        books.push({...doc.data(), id: doc.id})  // spread allow us expand an array and take a copy of an existing array
    });
    console.log(books);
})


// adding documents
const addBookForm = document.querySelector('.add');
addBookForm.addEventListener('submit', (e) => {
    e.preventDefault();

    addDoc(colRef, {
        title: addBookForm.title.value,
        author: addBookForm.author.value,
        createdAt: serverTimestamp()
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

// get a single document
const docRef = doc(db, 'Books', "NbZhrc6cvUWQ8Myejz0M");

const unSubDoc = onSnapshot(docRef, (doc) =>{  // get a single documenton realtime
    console.log(doc.data(), doc.id)
})

// updating a document
const updateForm = document.querySelector('.update');
updateForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const docRef = doc(db, 'Books', updateForm.id.value);
    
    updateDoc(docRef, {
        title: 'updated title',
    })
    .then(() => {
        updateForm.reset();
    })
})



// signing users up
const signupForm = document.querySelector('.signup');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = signupForm.email.value;
    const password = signupForm.password.value;

    // working with authentication
    createUserWithEmailAndPassword(auth, email, password)  // initialize the auth password
        .then((cred) => {
            console.log('user created', cred.user);
            signupForm.reset();
        })
        .catch((err) => {
            console.log(err.message);
        })

})


// logging in and out
const logoutButton = document.querySelector('.logout');
logoutButton.addEventListener('click', (e)=>{
    signOut(auth)
        .then(() =>{
            console.log("the user signed out")
        })
        .catch((err) => {
            console.log(err.message);
        });
})

const loginForm = document.querySelector('.login');
loginForm.addEventListener('submit', (e)=>{
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
        .then((cred) =>{
            console.log('user logged in', cred.user);
        })
        .catch((err)=> {
            console.log(err.message)
        });

})


// subscribing to auth changes (its a good way to track the current authenticaton status)
const unSubAuth = onAuthStateChanged(auth, (user) =>{  //when you login or logout, it fires a function
    console.log('user status changed:', user)
})


// unsubscribe from subscrition (to unsubscribe from a lot of subscription)
const unsubbutton = document.querySelector('.unsub');
unsubbutton.addEventListener('click', ()=>{
    console.log('unsubcribing');
    unSubCol();   // return the function(an unsubscribing function)
    unSubAuth();
    unSubDoc();
})