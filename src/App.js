import React, { useState, useEffect } from 'react';
import {auth, firebase, database, firestore} from './firebase/firebase.config'
import './App.css'
function App() {

  const [state, setState] = useState ({
    user: null,

  })
  const [blogs, setBlogs] = useState([]);

  var googleProvider = new firebase.auth.GoogleAuthProvider();


  useEffect(() => {
    getBlogs();
  }, [])

  const addBlog = async () => {
    const blog = document.getElementById("add_blog").value;
    const name = state.user.displayName;
    await firestore.collection("blogs").add({
      name: name,
      post: blog
    }).then(() => {
      document.getElementById("add_blog").value = "";
      getBlogs()
    })
  }

  const getBlogs = async () => {
    const data = await firestore.collection("blogs").get();
    setBlogs(data.docs.map(doc => ({
      ...doc.data(),
      id: doc.id
    })))
  }

  const googleAuth = () => {
    firebase.auth()
    .signInWithPopup(googleProvider)
    .then((result) => {
      /** @type {firebase.auth.OAuthCredential} */
      var credential = result.credential;
      var token = credential.accessToken;
      var user = result.user;
    }).catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
      
    });
  }

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if(user){
        console.log(user);
        setState({
          user: user
        })
        console.log(state.user.displayName)
      }
      else{
        console.log("no user")
      }
    })
  }, [])

  const signOut = () => {
    firebase.auth().signOut().then(() => {
      setState({
        user: null
      })
    })
  }

  return (
    <div>
      {state.user ? (
        <div class="box2">
          <h2>hello {state.user.displayName}</h2>
          <button class="signout" onClick={() => signOut()}>sign out</button>
          <br></br>
          <textarea id="add_blog"/>
          <br />
          <button onClick={() => addBlog()}>post</button>
          {
          blogs.map((blog, index) => {
            return(
              <div class="post">
                <h3>{blog.name}</h3>
                <p>{blog.post}</p>
              </div>
            )
          })
          }
        </div>
      ) : 
      <div class="box">
        <button class="signin" onClick={()=>googleAuth()}>google sign up</button>
      </div>
      }
    </div>
  )
}

export default App
