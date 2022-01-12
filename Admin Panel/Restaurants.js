// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-app.js";
import {
    getFirestore,
    collection,
    doc,getDocs,updateDoc,deleteDoc,
    onSnapshot
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

//show restaurants to confirm

async function showRes(Res){
    var ResData = Res.data()
   // console.log(Res);
    let TableID = document.getElementById("tbody");
    if(ResData.IsAccepted== false){
        
        let branch = await getDocs(collection(firestore,"Restaurant",Res.id,"Branches"));
        branch.forEach((doc) => {
            TableID.innerHTML += `
            <tr>
            <td> ${ResData.ResName} </td>
            <td> ${ResData.Phone} </td>
            <td> ${doc.data().LocName} </td>
            <td> ${doc.data().Address}</td>
            <td><button class='btn btn-success' onclick="getId('${Res.id}')"> Confirm </button>
            <button class='btn btn-danger' onclick="Delete('${Res.id}')"> Delete </button></td>
            </tr>
            `
            //console.log(`${doc.id} => ${doc.data().LocName}`);
          });

    }
}

onSnapshot(collection(firestore,"Restaurant"),function(callSnap){
    let TableID = document.getElementById("tbody");
  //loop on the collection
  TableID.innerHTML = "";
  callSnap.forEach((doc) => {
    showRes(doc);
  });
})

window.getId = getId;
function getId(id){
    document.getElementById("Form").style.display="block";
    document.getElementById("ID").innerHTML = id;
}

window.Delete = Delete;
function Delete(id){
    var con = confirm("Do you want to delete this Course?");
    if(con){
        deleteDoc(doc(firestore,"Restaurant",id));
    }
}

//complete data
window.completeData = completeData;
async function completeData(){
    let id = document.getElementById("ID").textContent;
    let type = document.getElementById("Type").value.split(",");
    let Mood = document.getElementById("Mood").value.split(",");
    //console.log(type)
    let compData = {
        Type: type,
        Mood: Mood,
        IsAccepted:true
    }
    const compRes = await updateDoc(doc(firestore,"Restaurant",id),compData);
}