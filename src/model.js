import { firebaseConfig } from "./firebaseConfig";
import { initializeApp } from "firebase/app";
import {
  signInAnonymously,
  signOut,
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import {
  getFirestore,
  getDoc,
  collection,
  addDoc,
  getDocs,
  updateDoc,
  where,
  query,
  doc,
} from "firebase/firestore";

import {
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
var gUser = null;

//gets data from database to display on the page
export async function getAllData() {
  const querySnapshot = await getDocs(collection(db, "Items"));

  querySnapshot.forEach((doc) => {
    $("#item-holder").append(`
    <a href="#item" class="item-box">
    <img src="${doc.data.image}" alt="">
    <div class="desc">
        <h2>${doc.data().name}</h2>
        <p>${doc.data().price}</p>
        <p>Add to Favorites</p>
    </div>
</a>
`);
  });
}

export function signInAnon() {
  signInAnonymously(auth)
    .then(() => {
      console.log("signed in");
    })
    .catch((error) => {
      console.log("error ", error.message);
    });
}

function signOutAnon() {
  signOut(auth)
    .then(() => {
      console.log("signed out");
    })
    .catch((error) => {
      console.log("error ", error.message);
    });
}

export function createAccount() {
  let em = $("#emailC").val();
  let pw = $("#passC").val();
  let us = $("#userC").val();
  createUserWithEmailAndPassword(auth, em, pw)
    .then((userCredentials) => {
      console.log("created ", userCredentials.user);
    })
    .catch((error) => {
      console.log("error ", error.message);
    });

  let person = {
    id: +new Date(),
    username: us,
    email: em,
    password: pw,
  };

  addData(person);
}

async function addData(person) {
  try {
    const docRef = await addDoc(collection(db, "Shop"), person);

    console.log("Doc id: ", docRef.id);
  } catch (e) {
    console.log(e);
  }
}

export function createItem() {
  let file = $("#myImage").get(0).files[0];
  let fileName = +new Date() + "-" + file.name;

  let pathRef = ref(storage, "images/" + fileName);
  const storageRef = ref(storage, pathRef);
  const uploadTask = uploadBytesResumable(storageRef, file);
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
      $(".bar").css("width", progress + "%");
      switch (snapshot.state) {
        case "paused":
          console.log("Upload is paused");
          break;
        case "running":
          console.log("Upload is running");
          break;
      }
    },
    (error) => {}
  );

  let path = "images/" + fileName;

  let nm = $("#itemName").val();
  let pr = $("#itemPrice").val();
  let ds = $("#itemDesc").val();
  let qt = $("#itemQuantity").val();

  let item = {
    image: path,
    name: nm,
    price: pr,
    description: ds,
    quantity: qt,
  };

  addItem(item);

  document.getElementById("myImage").value = "";
  document.getElementById("itemName").value = "";
  document.getElementById("itemPrice").value = "";
  document.getElementById("itemDesc").value = "";
  document.getElementById("itemQuantity").value = "";
}

async function addItem(item) {
  try {
    const docRef = await addDoc(collection(db, "Items"), item);

    console.log("Doc id: ", docRef.id);
  } catch (e) {
    console.log(e);
  }
}

export function loginUser() {
  let em = $("#email").val();
  let pw = $("#pass").val();
  signInWithEmailAndPassword(auth, em, pw)
    .then((userCredentials) => {})
    .catch((error) => {
      console.log("error ", error.message);
    });
}

//when a user becomes signed in or signed out, this will happen. Redirect to a page when signing in or out
onAuthStateChanged(auth, (user) => {
  if (user != null) {
    console.log("logged In ", user);
    changePage("home");
    gUser = user;
    console.log(gUser.uid);
  } else {
    changePage("login");
    console.log("No User");
  }
});

function changeToHome() {
  $.get(`pages/home/home.html`, function (data) {
    $("#app").html(data);
    getAllData();
  });
}

export function changePage(pageID) {
  switch (pageID) {
    case "":
      changeToHome();
      break;
    case "home":
      changeToHome();
      break;
    case "getData":
      $.get(`pages/${pageID}/${pageID}.html`, function (data) {
        $("#app").html(data);
        // getAllData();
      });
      break;
    case "signin":
      break;
    case "signout":
      signOutAnon();

      break;
    case "account":
      $.get(`pages/${pageID}/${pageID}.html`, function (data) {
        $("#app").html(data);
      });
      break;

    default:
      $.get(`pages/${pageID}/${pageID}.html`, function (data) {
        $("#app").html(data);
      });
      break;
  }
}
