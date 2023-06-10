import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyB1a3SRV-2ftEeFZIbdsxYVVOj9IHio64Q",
    authDomain: "eventplan-58eb2.firebaseapp.com",
    projectId: "eventplan-58eb2",
    storageBucket: "eventplan-58eb2.appspot.com",
    messagingSenderId: "980688839704",
    appId: "1:980688839704:web:c430abe4749c7321c6cf6d"
};

const app = initializeApp(firebaseConfig);



  export {firebaseConfig,app};