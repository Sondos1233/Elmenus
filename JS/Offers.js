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
} from "https://www.gstatic.com/firebasejs/9.6.2/firebase-firestore.js";
import {
  getStorage,
  ref,
  getDownloadURL
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

//Fetching data
getDocs(collection(firestore,"Restaurant")).then((restaurantCollectoin)=>{  //restaurantCollectoin is array of all documents
    restaurantCollectoin.forEach((docsInRestaurantCollectoin)=>{ 
        getDocs(collection(firestore,"Restaurant",docsInRestaurantCollectoin.id,"Offers")).then((offersCollectoin)=>{
            offersCollectoin.forEach((docsInOfferstCollectoin) => {
                console.log(docsInOfferstCollectoin.data().Description)
                if(docsInOfferstCollectoin.data().Description){
                    getDownloadURL(ref(storage, `ResImges/${docsInRestaurantCollectoin.data().ResName}/Logo_${docsInRestaurantCollectoin.data().ResName}.jpg`)).then((url1) => {
                        getDownloadURL(ref(storage, `ResImges/${docsInRestaurantCollectoin.data().ResName}/Atract_${docsInRestaurantCollectoin.data().ResName}.jpg`)).then((url2) => {
                                document.getElementById("cardsArea").innerHTML+=` <div class="col" id="wholeCard">
                                <a href="#">
                                    <div class="card h-100">
                                        <img id="bigImg" src="${url2}"
                                            class="card-img-top" alt="...">
                                        <div class="card-body">
                                            <div id="upperPart">
                                                <img src="${url1}"
                                                    alt="" srcset="">
                                                <div id="restName">
                                                    <div id="offerDisc">offerDisc</div>
                                                    <h3>${docsInRestaurantCollectoin.data().ResName}</h3>
                                                    <span>${docsInRestaurantCollectoin.data().Type}</span>
                                                </div>
                                                <div id="rating">
                                                    <span>
                                                        <i class="far fa-star"></i>
                                                        <i class="far fa-star"></i>
                                                        <i class="far fa-star"></i>
                                                        <i class="far fa-star"></i>
                                                        <i class="far fa-star"></i>
                                                        <span>(316)</span>
                                                    </span>

                                                    <span id="criditCardIcon"><i class="fa fa-credit-card"></i></span>
                                                </div>
                                            </div>
                                            <div id="midPart">
                                                <i class="fa fa-percentage"></i>
                                                <span>${docsInOfferstCollectoin.data().Description}</span>
                                            </div>
                                            <div id="lowerPart">
                                                <span><i class="fa fa-motorcycle"></i>50 mins</span>
                                                <span><i class="fa fa-circle"></i>ORDER ONLINE</span>
                                                <span><i class="fa fa-map-marked-alt"></i>Live Tracking</span>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>`
                        })    


                    })    
                }




            })
        })
    })
})


// const docRef = doc(firestore, "Restaurant");
// const docSnap = await getDoc(docRef);

// if (docSnap.exists()) {
//   console.log("Document data:", docSnap.data());
// } else {
//   // doc.data() will be undefined in this case
//   console.log("No such document!");
// }

