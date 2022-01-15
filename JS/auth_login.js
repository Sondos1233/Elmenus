window.LoginForm = LoginForm;
function LoginForm(ev) {
  ev.preventDefault();
  var email = document.getElementById("login_Email").value;
  var password = document.getElementById("login_Password").value;
  try {
    Login(email, password);
  } catch (e) {
    alert(e);
  }
}
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/9.6.2/firebase-auth.js";
import {
  getFirestore,
  collection,
  query,
  where,getDocs
} from "https://www.gstatic.com/firebasejs/9.6.2/firebase-firestore.js";
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
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const app2 = initializeApp(firebaseConfig);
const firestore = getFirestore(app2);


function Login(email, password) {
    signInWithEmailAndPassword(auth, email, password).then((userCredition) => {
        console.log(userCredition.user.uid);
      }).catch((error) => {
       alert("user not found");
      });
  }

  onAuthStateChanged(auth,(user) => {
    if (user) {
      var user_email=user.email
      console.log(user_email);
    document.getElementById("sign_auth").style.display = "none";
    document.getElementById("auth").style.display = "block";
    document.getElementById(
      "image"
    ).innerHTML = `<img src="../images/profile_no_pic.svg" width="30" height="30">`;
    document.getElementById(
      "Account_inf"
    ).innerHTML = `<img src="../images/profile_no_pic.svg" width="50" height="50"> <span >Your Profile</span>`;
  }
    testQuery(user.email)

      
             document.getElementById("sign_auth").style.display ="none";
             document.getElementById("auth").style.display="block";
             document.getElementById("dropdownMenuReference").style.display="inline-block";
             document.getElementById("image").innerHTML=`<img src="../images/profile_no_pic.svg" width="30" height="30">`
             document.getElementById("Account_inf").innerHTML=`<img src="../images/profile_no_pic.svg" width="50" height="50"> <span >Your Profile</span>`
    
  });
  window.testQuery = testQuery;
  
async function testQuery(u) {
  //console.log(user_email);
  const q = query(
    collection(firestore, "User"),
    where("Email", "==", `${u}`)
  );
   var user_info = document.getElementById("text");
   var profile_name =document.getElementById("profile_name");

  var queryResult = await getDocs(q);
  queryResult.forEach((doc) => {
    var userFilter = doc.data();
    user_info.innerHTML =`Hello <b >${userFilter.Name}</b>`
       console.log(userFilter.Name);
      //  document.getElementById(
      //   "Account_inf"
      // ).innerHTML+= `<br><b class="ms-5">${userFilter.Name}</b>`
     // profile_name.innerHTML +=`${userFilter.Name}`
   
  });
}