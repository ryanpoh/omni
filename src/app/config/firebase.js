import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDYzUgO1z2gX0tQbTB6bqdQixTFsTU6hoU',
  authDomain: 'omni-249717.firebaseapp.com',
  databaseURL: 'https://omni-249717.firebaseio.com',
  projectId: 'omni-249717',
  storageBucket: 'omni-249717.appspot.com',
  messagingSenderId: '254733539910',
  appId: '1:254733539910:web:ff8564c3c350ff03'
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;
