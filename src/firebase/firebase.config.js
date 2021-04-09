import firebase from 'firebase';
var firebaseConfig = {
    apiKey: "AIzaSyDw0oUbDVpxZKlK9hJKvJVy7XH_01PNRT0",
    authDomain: "users-ff24d.firebaseapp.com",
    projectId: "users-ff24d",
    storageBucket: "users-ff24d.appspot.com",
    messagingSenderId: "487742567565",
    appId: "1:487742567565:web:d9c0c8650d266eead91ec4",
    measurementId: "G-248Z3M8K5M"
  };
  
  firebase.initializeApp(firebaseConfig);
  const firestore = firebase.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();
  var database = firebase.database();
  
  export {
      firestore,
      auth,
      storage,
      firebase,
      database
  }
  export default firebase;