// Import the functions you need from the SDKs you need

import {signOut,getAuth} from "https://www.gstatic.com/firebasejs/9.6.2/firebase-auth.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC0-XXmwY_ScpXq_VJxPvwTjXQ_r0jcF18",
  authDomain: "elmenusclone.firebaseapp.com",
  projectId: "elmenusclone",
  storageBucket: "elmenusclone.appspot.com",
  messagingSenderId: "57271621220",
  appId: "1:57271621220:web:ba8d19b9fddb0988db7171",
};

// Initialize Firebase
const auth = getAuth();
window.Logout = Logout;
function Logout() {
  signOut(auth);
  document.getElementById("auth").style.display="none";
  document.getElementById("dropdownMenuReference").style.display="none";
  document.getElementById("sign_auth").style.display ="block";
}