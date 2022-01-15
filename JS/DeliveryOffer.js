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


//offer div

getDocs(collection(firestore, "Restaurant")).then((snapshot) => {
  snapshot.forEach((doc2) => {
    if (doc2.data().IsAccepted == undefined || doc2.data().IsAccepted == true) {
      //console.log(doc2.data().IsAccepted)
      getDocs(collection(firestore, "Restaurant", doc2.id, "Offers")).then(
        (bla) => {
          bla.forEach((doc) => {
            //console.log(doc.data().Description)
            if (doc.data().Description) {
                getDownloadURL(ref(storage, `ResImges/${doc2.data().ResName}/Logo_${doc2.data().ResName}.jpg`)).then((url1) => {
                    getDownloadURL(ref(storage, `ResImges/${doc2.data().ResName}/Atract_${doc2.data().ResName}.jpg`)).then((url2) => {

                        /*const img = document.getElementById("myimg");
                        img.setAttribute("src", url);*/
                        document.getElementById(
                          "aOfferCardsrow"
                        ).innerHTML += `<div class="col-lg-3 col-md-4 position-relative aproductDiv">
                                       <a class="aLinkCard" href="./Restaurant.html">
                                       <figure class="aFigRes">
                                       <img id="myimg" src=${url2}
                                       class="card-img-top aImgCard" alt="...">
                                       <figcaption class="aImgCaption">
                                       <h4 class="aImgTitle">Broasted Fried Chicken with Syrian Flavor</h4>
                                       </figcaption>
                                       </figure>
                                       
                                          <div class=" position-relative card-body aCardBody">
                   
                                               <img id="aImgRes"
                                                   src=${url1}
                                                   alt="" class="rounded-3 me-3 float-start">
                   
                                               <h3 class="card-title " id="aResName">${
                                                 doc2.data().ResName
                                               }</h3>
                                               <div class="mt-3">
                                                   <div class="alert-success aDisAlert aDisAlertof" role="alert">
                                                       ${doc.data().Description}
                                                   </div>
                                               </div>
                                           </div>
                                       </a>
                                   </div>`;
                    });
                  });
              //document.getElementsByClassName("aDisAlertof")[counter].innerHTML= `${doc.data().Description}`
            }
            //console.log(`${doc.id} => ${doc.data().Description}`);
          });
        }
      );
    }
  });
});

/*let p = document.getElementsByClassName("aproductDiv");
let R_scrollingLength = 0;
	let R_movePer = 25.00;
	let R_maxMove = 100.00;

    // console.log(product)
    window.right_mover=right_mover;
	function right_mover (){
        console.log("Right")
		R_scrollingLength = R_scrollingLength + R_movePer;
		// if (product == 1){R_scrollingLength = 0;}
		 
		for(const i of p)
		{
		
			if (R_scrollingLength > R_maxMove){R_scrollingLength = R_scrollingLength - R_movePer;}
			i.style.left = '-' + R_scrollingLength + '%';
			
		}
		// console.log(R_scrollingLength);
	}
    window.left_mover=left_mover;
	function left_mover(){
        console.log("left")
		R_scrollingLength = R_scrollingLength - R_movePer;
		if (R_scrollingLength<=0){R_scrollingLength = 0;}
		for(const i of p){
			// if (product_page>1){
				i.style.left = '-' + R_scrollingLength + '%';
			// }
		}
		// console.log(R_scrollingLength);
	}
*/
/*getDocs(collection(firestore, "Restaurant")).then((snapshot) => {
  snapshot.forEach((doc2) => {
    getDocs(collection(firestore, "Restaurant", doc2.id, "Offers")).then(
      (bla) => {
        bla.forEach((doc) => {
          if (doc.data().Description) {
            //document.getElementsByClassName("aDisAlertof")[counter].innerHTML= `${doc.data().Description}`
          }
          console.log(`${doc.id} => ${doc.data().Description}`);
        });
      }
    );
  });
});*/
