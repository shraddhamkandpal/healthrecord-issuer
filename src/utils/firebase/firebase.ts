import firebase from 'firebase';

interface IFirebaseConfig {
    apiKey: string,
    authDomain: string,
    projectId: string,
    storageBucket: string,
    messagingSenderId: string,
    appId: string
}

const firebaseConfig: IFirebaseConfig = {
    apiKey: "AIzaSyATOMZfVcKWOsRN3pug5s4eo8X5CUwuFZs",
    authDomain: "mong-drivinglicense-demo-1.firebaseapp.com",
    projectId: "mong-drivinglicense-demo-1",
    storageBucket: "mong-drivinglicense-demo-1.appspot.com",
    messagingSenderId: "934151540540",
    appId: "1:934151540540:web:9a6d29cb3f68549532d839"
};

firebase.initializeApp(firebaseConfig);

export default firebase;