import React, { createContext, useContext, useEffect, useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import jwt_decode from "jwt-decode";
import firebaseConfig from '../../firebase.config';

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// Create DataContext
const DataContext = createContext()
export const useData = () => useContext(DataContext)

// Create Provider For AuthContext
export const DataContextProvider = (props) => {
   const contexts = Contexts()
   return <DataContext.Provider value={contexts}>{props.children}</DataContext.Provider>
}


// Create All Context Function
const Contexts = () => {
   const [formLoader, setFormLoader] = useState(false)
   const [user, setUser] = useState(null)
   const [message, setMessage] = useState(null)
   setTimeout( () => {
      setMessage(null)
   }, 4000)

   // Sign In With Gmail
   const signInWithGmail = (redirect) => {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider)
      .then(result => {
         userToken(redirect)
         toast.success('Sign In Successful With Gmail')
      })
      .catch(error => {
         console.log(error)
         return error.message
      })
   }

   // Sign In With Facebook
   const signInWithFacebook = (redirect) => {
      const fbProvider = new firebase.auth.FacebookAuthProvider();
      firebase.auth().signInWithPopup(fbProvider)
      .then(function(result) {
         userToken(redirect)
         toast.success('Sign In Successful With Facebook')
       })
       .catch(function(error) {
         const errorCode = error.code;
         const errorMessage = error.message;
         console.log(errorMessage)
         toast.error(errorMessage)
         const email = error.email;
         const credential = error.credential;
       });
   }

   // Sign Up With Email and Password
   const signUpWithEmailAndPassword = (name, email, password, history) => {
      firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((user) => {
         if (user) {
            setFormLoader(false)
         }
         toast.success('Sign Up Successful.')
         addUerName(name)
         history.push('/signin')
         localStorage.removeItem('userForSignUp')
      })
      .catch((error) => {
         var errorCode = error.code;
         var errorMessage = error.message;
         console.log(errorMessage)
         toast.error(errorMessage)
         if (errorMessage) {
            setFormLoader(false)
         }
      });
   }
   const addUerName = (name) => {
      var user = firebase.auth().currentUser;
      user.updateProfile({
      displayName: name,
      }).then(function() {
         console.log('Profile is successfully updated')
      }).catch(function(error) {
         console.log(error)
      });
   }

   // Sign In With Email and Password
   const signWithEmailAndPassword = (email, password, redirect) => {
      return firebase.auth().signInWithEmailAndPassword(email, password)
      .then((result) => {
         if (result) {
            setFormLoader(false)
         }
         userToken(redirect)
         setMessage({success:'Sign In Successful.'})
         toast.success('Sign In Successful.')
      })
      .catch((error) => {
         var errorCode = error.code;
         var errorMessage = error.message;
         console.log(errorMessage)
         toast.error(errorMessage)
         if (errorMessage) {
            setFormLoader(false)
         }
      });
   }

   // Sign Out
   const signOut = (history) => {
      return firebase.auth().signOut()
      .then(() => {
         setUser(null)
         sessionStorage.removeItem('userToken')
         toast.success('Sign Out Successful.')
         history.push('/')
      })
      .catch((error) => {
         console.log(error.message)
      });
   }

   // Password Reset Email
   const resetPassword = (email, history) => {
      var auth = firebase.auth();
      auth.sendPasswordResetEmail(email)
      .then(function() {
         toast.success('We Are Sent A Password Reset Email. Please Check Your Email.')
         setFormLoader(false)
         history.push('/signin')
      }).catch(function(error) {
         
      });
   }

   // Save Logged in use token
   const userToken = (redirect) => {
      firebase.auth().currentUser.getIdToken(true)
      .then(function(idToken) {
         sessionStorage.setItem('userToken', idToken)
         setUser(jwt_decode(idToken))
         redirect()
      }).catch(function(error) {
      // Handle error
      });
   }

   // Manage Signed User 
   useEffect(() => {
      const loggedInUser = sessionStorage.getItem('userToken') && jwt_decode(sessionStorage.getItem('userToken'))
      setUser(loggedInUser)
   }, [])

   // Show Toast Message in Our Component
   const toastMessage = () => {
      return <ToastContainer 
         position="top-center"
         autoClose={5000}
         hideProgressBar={false}
         newestOnTop={false}
         closeOnClick
         rtl={false}
         pauseOnFocusLoss
         draggable
         pauseOnHover
      />
   }

   const [place, setPlace] = useState()
   const [headerColor, setHeaderColor] = useState(true)



   return {
      place, 
      setPlace,
      headerColor, 
      setHeaderColor,
      user,
      message,
      formLoader, 
      setFormLoader,
      signInWithGmail,
      signInWithFacebook,
      signUpWithEmailAndPassword,
      signWithEmailAndPassword,
      signOut,
      toastMessage,
      resetPassword
   }
}

export default Contexts;