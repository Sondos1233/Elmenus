// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-app.js";
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  updateDoc,
  deleteDoc,
  onSnapshot,
  addDoc,
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

async function showRes(Res) {
  var ResData = Res.data();
  // console.log(Res);
  let TableID = document.getElementById("tbody");
  if (ResData.IsAccepted == false) {
    let branch = await getDocs(
      collection(firestore, "Restaurant", Res.id, "Branches")
    );
    branch.forEach((doc) => {
      TableID.innerHTML += `
            <tr>
            <td> ${ResData.ResName} </td>
            <td> ${ResData.Phone} </td>
            <td> ${doc.data().LocName} </td>
            <td> ${doc.data().Address}</td>
            <td><button class='btn btn-success' onclick="getId('${
              Res.id
            }')"> Confirm </button>
            <button class='btn btn-danger' onclick="Delete('${
              Res.id
            }')"> Delete </button></td>
            </tr>
            `;
      //console.log(`${doc.id} => ${doc.data().LocName}`);
    });
  }
}

onSnapshot(collection(firestore, "Restaurant"), function (callSnap) {
  let TableID = document.getElementById("tbody");
  //loop on the collection
  TableID.innerHTML = "";
  callSnap.forEach((doc) => {
    showRes(doc);
  });
});

window.getId = getId;
function getId(id) {
  document.getElementById("Form").style.display = "block";
  document.getElementById("ID").innerHTML = id;
}

window.Delete = Delete;
function Delete(id) {
  var con = confirm("Do you want to delete this Restaurant?");
  if (con) {
    deleteDoc(doc(firestore, "Restaurant", id));
  }
}

window.offerch = offerch;
window.Menuch = Menuch;
window.M = M;
window.Sizech = Sizech;
window.MS = MS;
function offerch(e) {
  if (e.target.value === "yes") {
    //console.log(e.target.value)
    document.getElementById("offerDiv").style = "block";
  }
}
function Menuch(e) {
  if (e.target.value === "yes") {
    document.getElementById("MenuExtraDiv").style = "block";
  }
  document.getElementById("MenuExtraDiv").innerHTML += `
  <div class="input-group mb-3 mt-3">
  <input type="number" id="NumEx" min="1" class="form-control" placeholder="Number of Extras" aria-label="Number of Extras" aria-describedby="button-addon2">
  <button class="btn btn-warning" type="button" id="button-addon2" onclick='M(event)'>Ok</button>
</div>
  `;
}
function Sizech(e){
  if (e.target.value === "yes") {
    document.getElementById("MenuSizeDiv").style = "block";
  }
  document.getElementById("MenuSizeDiv").innerHTML += `
  <div class="input-group mb-3 mt-3">
  <input type="number" id="NumSize" min="1" class="form-control" placeholder="Number of Sizes" aria-label="Number of Sizes" aria-describedby="button-addon2">
  <button class="btn btn-warning" type="button" id="button-addon2" onclick='MS(event)'>Ok</button>
</div>
  `;
}

function M(e) {
  e.preventDefault();
  let i = 0,
  field="";
  while (i < parseInt(document.getElementById("NumEx").value)) {
    //console.log(parseInt(document.getElementById("NumEx").value))
    field += `
    <div class="input-group mb-3 mt-3">
    <span class="input-group-text"><i class="fas fa-utensils"></i></span>
    <input type="text" class="form-control" placeholder="Name" aria-label="Username" value="f" id="ExtraName${i}">
    <span class="input-group-text"><i class="fas fa-dollar-sign"></i></span>
    <input type="number" class="form-control" placeholder="Price" aria-label="Server" id="ExtraPrice${i}" min=1>
    </div>`;
    i++;
  }
  document.getElementById("MenuExtraDiv").innerHTML += field;
  document.getElementById("NumEx").value = i
}
function MS(e){
  e.preventDefault();
  let i = 0,
  field="";
  while (i < parseInt(document.getElementById("NumSize").value)) {
    //console.log(parseInt(document.getElementById("NumEx").value))
    field += `
    <div class="input-group mb-3 mt-3">
    <span class="input-group-text"><i class="fas fa-utensils"></i></span>
    <input type="text" class="form-control" placeholder="Name" aria-label="Username" id="SizeName${i}">
    <span class="input-group-text"><i class="fas fa-dollar-sign"></i></span>
    <input type="number" class="form-control" placeholder="Price" aria-label="Server" id="SizePrice${i}" min=1>
    </div>`;
    i++;
  }
  document.getElementById("MenuSizeDiv").innerHTML += field;
  document.getElementById("NumSize").value = i
}

//complete data
window.completeData = completeData;
async function completeData() {
  event.preventDefault();
  let id = document.getElementById("ID").textContent;
  let Type = document.getElementById("Type").value.split(",");
  let Mood = document.getElementById("Mood").value.split(",");
  let Description = document.getElementById("Description").value;
  let Expires = document.getElementById("Expires").value;
  let PromoCode = document.getElementById("PromoCode").value;
  let CatName = document.getElementById("CatName").value;
  let ProName = document.getElementById("ProName").value;
  let Descriptionm = document.getElementById("Descriptionm").value;
  //console.log(type)
  let compData = {
    Type: Type,
    Mood: Mood,
    IsAccepted: true,
  };
  let compData2 = {
    Description: Description,
    Expires: Expires,
    PromoCode: PromoCode,
  };
  let arr = []
  let j =0;
  let obj = {};
  while(j< document.getElementById("NumEx").value){
    obj["Name"] = document.getElementById(`ExtraName${j}`).value;
    obj["Price"] = parseInt(document.getElementById(`ExtraPrice${j}`).value);
    let objCopy = Object.assign({},obj,obj)
    arr[j]=objCopy;
    //console.log(arr,objCopy)
    //console.log(document.getElementById(`ExtraName${j}`).value);
    j++
  }

    let arrsize = []
    let jsize =0;
    let obj1 = {};
    while(jsize< document.getElementById("NumSize").value){
      obj1["Name"] = document.getElementById(`SizeName${jsize}`).value;
      obj1["Price"] = parseInt(document.getElementById(`SizePrice${jsize}`).value);
    let objCopy1 = Object.assign({},obj1,obj1)
    arrsize[jsize]=objCopy1;
      //console.log(document.getElementById(`ExtraName${j}`).value);
      jsize++
    }
      console.log(obj1,arrsize)

  let Menu = {
    Extras: arr,
    ProName:ProName,
    Description:Descriptionm,
    Size:arrsize
  };
  const compRes = await updateDoc(doc(firestore, "Restaurant", id), compData);
  if (document.getElementById("Offer").value === "yes") {
    const ResOffer = await addDoc(
      collection(firestore, "Restaurant", id, "Offers"),
      compData2
    );
  }
  const ResMenu = await addDoc(
    collection(firestore,"Restaurant",id,"Menu"),{}
  )
  if(document.getElementById("MenuExtra").value === "yes"){
    const ResMenu2 = await addDoc(
      collection(firestore,"Restaurant",id,"Menu",ResMenu.id,CatName),{}
    )
    const ResMenu3 = await updateDoc(
      doc(firestore,"Restaurant",id,"Menu",ResMenu.id,CatName,ResMenu2.id),Menu
    )
  }
  //console.log(ResOffer);
}
