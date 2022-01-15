// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-app.js";
import {
  getFirestore,
  getDocs,
  getDoc,
  collection,
  doc,
  limit,
  query,
  collectionGroup,where
} from "https://www.gstatic.com/firebasejs/9.6.2/firebase-firestore.js";
import {
  getStorage,
  ref,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/9.6.2/firebase-storage.js";
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
  storageBucket: "gs://elmenusclone.appspot.com/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const storage = getStorage(app);
const storageRef = ref(storage);

let q = query(collectionGroup(firestore, "Restaurant"));
const querySnapshot = await getDocs(q);
let setTypes = new Set();
querySnapshot.forEach((doc) => {
  //console.log(doc.id, " => ", doc.data().Type);
  for (let len = 0; len < doc.data().Type.length; len++) {
    setTypes.add(doc.data().Type[len]);
    //console.log(setTypes)
  }
});
setTypes.forEach((el) => {
  document.getElementById("afilterRowButtons").innerHTML += `<div class="col-2">
  <label class="aRadio">
          <input type="radio" name="type" class="TypeInput" id=${el}">
                <span class="adot"></span> <i class="fas fa-dot-circle aCheckdot"> </i>
  </label>
            </div>
          <div class="col-10 aSortType">${el}</div>
  `;
});
for(let c =0 ; c<document.getElementsByClassName("TypeInput").length ; c++){
  document.getElementsByClassName("TypeInput")[c].addEventListener("click",(el)=>{
    TestQuery(el);
  })
}

window.TestQuery=TestQuery
async function TestQuery(el){
  let qmm = query(collection(firestore,'Restaurant'),where('Type','array-contains',el));
  var queryResult=await getDocs(qmm)
  queryResult.forEach((doc)=>{
                console.log(doc.data());
    })
  }