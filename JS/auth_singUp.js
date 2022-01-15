window.Done = Done;
function Done(ev) {
  ev.preventDefault();
  var name = document.getElementById("FullName").value;
  var email = document.getElementById("Email").value;
  var password = document.getElementById("Password").value;
  //   console.log(name);
  //   console.log(email);
  //   console.log(password);
  try {
    register(email, password, name);
  } catch (e) {
    alert(e);
  }
}

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.6.2/firebase-auth.js";
import {
  getFirestore,
  collection,
  addDoc,
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
// var name = document.getElementById("FullName").value;
// var email = document.getElementById("Email").value;
// var password = document.getElementById("Password").value;

//

//...................................................

function register(email, passward, name) {
  createUserWithEmailAndPassword(auth, email, passward, name)
    .then((userCreate) => {
      //console.log(userCreate.user.uid);
      const data = {
        Name: name,
        Email: email,
      };

      addDoc(collection(firestore, "User"), data);

    })
    .catch((error) => {
      alert(error.message);
    });
}



onAuthStateChanged(auth, (user) => {
  if (user) {
  
      var user_email=user.email
      console.log(user_email);
      document.getElementById("sign_auth").style.display = "none";
    document.getElementById("auth").style.display = "block";
    document.getElementById("dropdownMenuReference").style.display = "inline-block";
    document.getElementById(
      "image"
    ).innerHTML = `<img src="../images/profile_no_pic.svg" width="30" height="30">`;
    document.getElementById(
      "Account_inf"
    ).innerHTML = `<img src="../images/profile_no_pic.svg" width="50" height="50"> <span >Your Profile</span>`;
   
  }
  testQuery(user.email)
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
    user_info.innerHTML =`Hello  <b >${userFilter.Name}</b>`
       console.log(userFilter.Name);
       document.getElementById("Account_inf").innerHTML += `<br><b class="ms-5">${userFilter.Name}</b>`
       console.log(userFilter.Name)
       profile_name.innerHTML +=`${userFilter.Name}`
  });
}
