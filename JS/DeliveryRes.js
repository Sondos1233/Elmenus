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

//Restaurants Div
//function offerQuery(){
let q = query(collectionGroup(firestore, "Restaurant"));
let l = query(collectionGroup(firestore, "Offers"));
//const querySnapshot = await getDocs(q);
const querySnapshot2 = await getDocs(l);
/*querySnapshot.forEach((doc) => {
  console.log(doc.id, " => ", doc.data());
});*/
let arr = [];
querySnapshot2.forEach((doc2) => {
  //console.log(doc2.id, "->", doc2.data().Description);
  if(doc2.data().Description){

    arr.push(doc2.data().Description);
  }
});
//console.log(arr);
let counter = 0;
function hello(rate){
    let count = 0 ;
    let span="";
    for(let i =0 ; i<Math.floor(rate); i++){
         span+=`<i style="color: gold; font-size: 12px;"
        class="fas fa-star flex-fill"></i>`
        count++;
    }
    for(let i =count; i<5 ; i++){
        span+=`<i style="color: gray; font-size: 12px;"
        class="fas fa-star flex-fill"></i>`
    }
    return span
}

getDocs(collection(firestore, "Restaurant")).then((snapshot) => {
  snapshot.forEach((doc2) => {
    if (doc2.data().IsAccepted == undefined || doc2.data().IsAccepted == true) {
      getDownloadURL(
        ref(
          storage,
          `ResImges/${doc2.data().ResName}/Logo_${doc2.data().ResName}.jpg`
        )
      ).then((url1) => {
        getDownloadURL(
          ref(
            storage,
            `ResImges/${doc2.data().ResName}/Atract_${doc2.data().ResName}.jpg`
          )
        ).then((url2) => {
          document.getElementById(
            "aResDivrow"
          ).innerHTML += `<div class="col-lg-4 col-md-12 mb-3 h-100">
                  <div class="aContentCard h-100">
                      <a href="#" class="aLinkCard h-100">
                          <div class="card aD h-100">
                              <figure class="aFigRes position-relative">
                                  <img src=${url2}
                                      class="aImg card-img-top" alt="...">
                                  <div class="aSliderImgCrd d-flex justify-content-end "><i
                                          class="align-self-center fas fa-chevron-right "
                                          style="margin-bottom: 40px;"></i></div>
                                  <figcaption class="aImgCaption">
                                      <h4 class="aImgTitle">Broasted Fried Chicken with Syrian Flavor</h4>
                                  </figcaption>
                              </figure>
                              <div class="card-body aCardBody">
                                  <div>
                                      <div class=" d-flex bd-highlight flex-row align-items-start">
                                          <img id="aImgRes"
                                              src=${url1}
                                              alt="" class="rounded-3 me-3 ">
                                          <h3 id="aResName">${
                                            doc2.data().ResName
                                          }
                                          <br>
                                          ${hello(doc2.data().Rate)}
                                          

                                              <span id="aResType">${
                                                doc2.data().Type
                                              }</span>
                                          </h3>
                                      </div>
                                  </div>
                                  <div class="mt-1 ">
                                  <div class="alert-success aDisAlert" role="alert">
                                  ${arr[counter]}
                                    </div>
                                      
                                  </div>
                                  <hr>
                                  <div style="margin-top: -10px; width:100%;" class="d-flex flex-wrap ">
                                      <div>
                                          <i style="color: gray; flex-basis: 10px;"
                                              class="fas fa-motorcycle">60 mins&nbsp; </i>

                                      </div>
                                      <div>
                                          <i style="font-size: smaller; flex-basis: 1000%; color: #4caf50;"
                                              class="fas fa-circle">Order online&nbsp;</i>
                                      </div>

                                      <div>
                                          <i style="color: #f7b500; flex-basis: 20%;"
                                              class="fas fa-street-view"> on tracking</i>
                                      </div>

                                  </div>
                              </div>
                          </div>
                      </a>
                  </div>
              </div>`;
          counter++;
        });
      });
      //console.log(doc2.data().IsAccepted)
    }
  });
  return snapshot;
}); 

