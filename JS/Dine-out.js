// Import the functions you need from the SDKs you need
import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/9.6.3/firebase-app.js";

import {
    getFirestore,
    addDoc,
    collection,
    onSnapshot,
    getDoc,
    doc,
    updateDoc,
    deleteDoc,
    query,
    where,
    getDocs,
    orderBy,
    collectionGroup
} from "https://www.gstatic.com/firebasejs/9.6.3/firebase-firestore.js";

import {
    getStorage,
    ref,
    getDownloadURL,
} from "https://www.gstatic.com/firebasejs/9.6.3/firebase-storage.js";
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
    storageBucket: "gs://elmenusclone.appspot.com/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const storage = getStorage(app);
const storageRef = ref(storage);



let BranchCollection = query(collectionGroup(firestore, "Branches"))
const getBranchesDocs = await getDocs(BranchCollection);

let Address = [];
getBranchesDocs.forEach((doc) => {
    // console.log(doc.data().Address)
    Address.push(doc.data().Address);
});

// const typesArr = new Set();
// typesArr.add(5)
var saved = '';

onSnapshot(collection(firestore, 'Restaurant'), (snapshot) => {
    
    snapshot.forEach((doc) => {
        
        // console.log(doc.data().Type);

        // for(var i = 0 ; i < doc.data().Type.length ; i++)
        // {
        //     typesArr.add(doc.data().Type[i]);
        // }
        // createCardInDishes(doc);

        createCardDiscover(doc);
        createNewRes(doc);
    })

})
// console.log(typesArr.has("Pizza"));

window.filterByMood = filterByMood;
function filterByMood(e)
{
    console.log(e.target.innerHTML);
    queryfunMood(e.target.innerHTML);
}

var idDivMood = document.getElementById("cartContainMood");
async function queryfunMood(mood)
{
    if(saved != mood){
        // clicked = true;
    saved = mood;

    idDivMood.innerHTML = ""
    var queryData = query(collection(firestore, 'Restaurant'),where('Mood', 'array-contains', mood));//Rate: 4.5
    
    let queryResult=await getDocs(queryData)
    queryResult.forEach((doc)=>{
        console.log(doc.data());
        let ResData = doc.data();

        getDownloadURL(ref(
            storage, `ResImges/${ResData.ResName}/Atract_${ResData.ResName}.jpg`
        )).then((urlRes)=>{
            getDownloadURL(ref(
                storage, `ResImges/${ResData.ResName}/Logo_${ResData.ResName}.jpg`
            )).then((urlLogo)=>{


        var cartContent = 
        `
        <div class="item-1 px-2 p-2 ">
        <div class="box-newResturants mx-2" style="height:35vh ">
        <div class="slide-img  ">
            <img
            src=${urlRes} style="height:19vh"
            alt="" />
            <div class="detail-box" style="flex-direction: column; justify-content: center;">
            <a href="#" class="meal-kind">${ResData.ResName}</a>
            <p class="resturantDesc" style="color: rgb(161, 157, 157); font-size: 10px; margin:auto; position:relative;top:15px">
                ${ResData.Mood}
            </p>
            </div>
        </div>
        </div>
    </div>
            `
        idDivMood.insertAdjacentHTML("beforeend",cartContent);
        
    })
    })
    })
    }
    else{
        saved = '';
        idDivMood.innerHTML = '';
    }
}






var images = ["./../images/pizza.jpg","./../images/Burgers.jpg","./../images/FriedChicken.jpg",
             "./../images/Sandwiches.jpg", "./../images/Chiness.jpg", "./../images/Koshary.jpg"];
var types = ["Pizza", "Burger", "Fried chicken", "Sandwiches", "Chinese ", "Koshary"];


var idDivDishes = document.getElementById("cardDishes");
// var idDivDishes2 = document.getElementById("cardDishes2");

window.filterByType = filterByType;
function filterByType(e){
    // console.log(5)
    // console.log(e.target.innerHTML);
    queryfunType(e.target.innerHTML);
}

var clicked = false;


var idFilterType = document.getElementById("cartContainType")

window.queryfunType = queryfunType;
async function queryfunType(type)
{
    if(saved != type){
    // clicked = true;
    saved = type;

    idFilterType.innerHTML = ""
    var queryData = query(collection(firestore, 'Restaurant'),where('Type', 'array-contains', type));//Rate: 4.5
    
    let queryResult=await getDocs(queryData)
    queryResult.forEach((doc)=>{
        console.log(doc.data());
        
        let ResData = doc.data();

        getDownloadURL(ref(
            storage, `ResImges/${ResData.ResName}/Atract_${ResData.ResName}.jpg`
        )).then((urlRes)=>{
            getDownloadURL(ref(
                storage, `ResImges/${ResData.ResName}/Logo_${ResData.ResName}.jpg`
            )).then((urlLogo)=>{


        var cartContent = 
        `
        <div class="item-1 px-2 p-2">
        <div class="box-newResturants" style="height:35vh ">
        <div class="slide-img">
            <img
            src=${urlRes} style="height:19vh"
            alt="" />
            <div class="detail-box" style="flex-direction: column; justify-content: center;">
            <a href="#" class="meal-kind">${ResData.ResName}</a>
            <p class="resturantDesc" style="color: rgb(161, 157, 157); font-size: 10px; margin:auto; position:relative;top:15px">
                ${ResData.Type}
            </p>
            </div>
        </div>
        </div>
    </div>
            `
        idFilterType.insertAdjacentHTML("beforeend",cartContent);
        
    })
    })
    })
}
else{
    // clicked = false;
    saved = '';
    idFilterType.innerHTML = '';
}
}


function createCardInDishes(counter) {
    // var ResData = Resturant.data();
    // console.log(ResData.Type[0]);
    
            var cartContent = `
                    <div class="item-1 px-2 p-2" >
                    <div class="box-disByDishes" style="height:35vh;">
                    <div class="slide-img">
                        <img 
                        src=${images[counter]}
                        alt="" />
                        <div class="detail-box">
                        <button id="btn-ID" class="meal-kind" onclick="filterByType(event)">${types[counter]}</button>
                        </div>
                    </div>
                    </div>
                </div>
            `;
     

    idDivDishes.insertAdjacentHTML("beforeend", cartContent);
    // idDivDishes2.insertAdjacentHTML("beforeend", cartContent);

}
for(var i = 0 ; i < types.length ; i++)
{
    createCardInDishes(i)
}



var i = 0;
var idDivDiscover = document.getElementById("cardDiscovers");
var idDivHiddenGems = document.getElementById("cartContentHiddenGems");

function createCardDiscover(Resturant) {
    var ResData = Resturant.data();
    // console.log(ResData.Type[0]);

    var url = getDownloadURL( ref(
        storage,
        `ResImges/${ResData.ResName}/Atract_${ResData.ResName}.jpg`
      )).then((urlRes)=>{
            getDownloadURL(ref(
                storage, `ResImges/${ResData.ResName}/Logo_${ResData.ResName}.jpg`

            )).then((ulrLogo)=>{
            var cartContent = `
            <div class="item-1 " >
            <div class="box-disArear m-2" style="height:65vh">
            <div class="slide-img ">
                <img
                src=${urlRes} 
                alt="" style="height:40vh"/>
                <div class="detail-box ">
                <img
                    src=${ulrLogo}
                    alt="" style="width: 50px; max-width: 100%; height: auto; padding: 5px 0;">
                <div class="px-3">
                    <p class="resturantDesc m-0" style="color: rgb(161, 157, 157); font-size: 10px;">
                    ${ResData.Type}
                    </p>
                    <a href="#" class="meal-kind">${ResData.ResName}</a>
                    <div class="d-flex">
                    <p class="resturantRate text-warning">
                    <i class="fa fa-star" aria-hidden="true"></i>
                    <i class="fa fa-star" aria-hidden="true"></i>
                   
                    <i class="fa fa-star-half" aria-hidden="true"></i>
                        <span style="color: var(--second-color); font-size: 10px;"> ${ResData.Rate} Rating</span>
                    </p>
                    
                    </div>
                </div>
                    </div>
                    <div style="position:relative; bottom:20px; padding:0 20px">
                    <p style="font-size: 16px; color: rgb(161, 157, 157); ">
                        <span style="color:black">Adress</span>: ${Address[i]}
                    </p>
                    </div>
                </div>
                </div>
            </div>
            `;

    idDivDiscover.insertAdjacentHTML("beforeend",cartContent);
    idDivHiddenGems.insertAdjacentHTML("beforeend", cartContent);
    i++;
      });
    })
}

var idDivNewRes = document.getElementById("cartContentNewRes")
function createNewRes(Resturant)
{
    var ResData = Resturant.data();
    getDownloadURL(ref(
        storage, `ResImges/${ResData.ResName}/Atract_${ResData.ResName}.jpg`
    )).then((urlRes)=>{

    var cartContent = 
    `
        <div class="item-1 px-2 p-2">
        <div class="box-newResturants" style="height:35vh ">
        <div class="slide-img">
            <img
            src=${urlRes} style="height:19vh"
            alt="" />
            <div class="detail-box" style="flex-direction: column; justify-content: center;">
            <a href="#" class="meal-kind">${ResData.ResName}</a>
            <p class="resturantDesc" style="color: rgb(161, 157, 157); font-size: 10px; margin:auto; position:relative;top:15px">
                ${ResData.Type}
            </p>
            </div>
        </div>
        </div>
    </div>
    `

    idDivNewRes.insertAdjacentHTML("beforeend", cartContent);
    })
}
// 
// createNewRes();