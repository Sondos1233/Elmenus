
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-app.js";
  import{getFirestore,addDoc,collection} from "https://www.gstatic.com/firebasejs/9.6.2/firebase-firestore.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyC0-XXmwY_ScpXq_VJxPvwTjXQ_r0jcF18",
    authDomain: "elmenusclone.firebaseapp.com",
    projectId: "elmenusclone",
    storageBucket: "elmenusclone.appspot.com",
    messagingSenderId: "57271621220",
    appId: "1:57271621220:web:ba8d19b9fddb0988db7171"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const firestore = getFirestore(app);
  window.SaveRes = SaveRes;
  var Type=[];
  var Mood=[];
  async function SaveRes() {
  var ID = document.getElementById("ID").value;
  var Name = document.getElementById("ResName").value;
  var Phone = parseInt(document.getElementById("Phone").value);
  var Rate =parseInt(document.getElementById("Rate").value) ;
  //Type as Array
  var input = document.getElementsByName('array[]');
  for (var i = 0; i < input.length; i++) {
      var a = input[i];
      Type.push(a.value)
  }
  //Moodas Array
  var input2 = document.getElementsByName('array1[]');
  for (var j = 0; j < input2.length; j++) {
      var x = input2[j];
      Mood.push(x.value)
  }
  var data = {
    NameRes: Name,
    Phone:Phone,
    Rate: Rate,
    Type: Type,
    Mood:Mood
  };
  //console.log(data);
  
     await addDoc(collection(firestore, "Restaurant"), data);
  
}