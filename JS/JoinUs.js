// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-app.js";
import {
    getFirestore,
    addDoc,
    collection,
    doc
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
const firestore = getFirestore(app);

//Add Restaurant
window.AddRes = AddRes;
async function AddRes(){
    event.preventDefault();
    //get values
    let ResName = document.getElementById("ResName").value;
    let phone = parseInt(document.getElementById("phone").value);
    let nBranch =parseInt(document.getElementById("nBranch").value);
    let city = document.getElementById("city").value;
    let bZone = document.getElementById("bZone").value;

    //put these data into object
    let ResData = {
        ResName: ResName,
        Phone:phone,
    }
    let anotherResData = {
        LocName:city,
        Address:bZone
    }
    const Restaurant = await addDoc(collection(firestore,"Restaurant"),ResData);
    //console.log(Restaurant.id)
    const aRes = await addDoc(collection(firestore,"Restaurant",Restaurant.id,"Branches"),anotherResData);
}
