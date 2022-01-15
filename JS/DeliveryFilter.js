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
  collectionGroup,
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
  }
 /* document.getElementById("afilterRowButtons").innerHTML = `
  <div class="col-2">
                                  <label class="aRadio">
                                      <input type="radio" name="type" id="">
                                      <span class="adot"></span> <i class="fas fa-dot-circle aCheckdot"> </i>
                                  </label>
                              </div>
                              <div class="col-10 aSortType">${setTypes[0]}</div>
  `;*/
});
