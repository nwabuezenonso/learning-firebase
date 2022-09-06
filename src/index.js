import { initializeApp } from 'firebase/app';
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