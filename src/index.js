import {
  changePage,
  signInAnon,
  signOutAnon,
  createAccount,
  createItem,
  loginUser,
  getAllData,
} from "./model.js";
// import * as MODEL from "./model.js";

// function initListeners() {}

function changeRoute() {
  let hashTag = window.location.hash;
  let pageID = hashTag.replace("#", "");
  //   console.log(hashTag + ' ' + pageID);
  changePage(pageID);
}

function signInNowAnon() {
  //////////////////put sign in function here///////////////////////////////////////////////////////
  console.log("sign in (sign in page)");
  signInAnon();
}
//must type this for a function when using an onClick in an injected html page (in this instance login.html)
window.signInNowAnon = signInNowAnon;

function createAccountNow() {
  createAccount();
}
window.createAccountNow = createAccountNow;

function createItemNow() {
  createItem();
}
window.createItemNow = createItemNow;

function loginUserAct() {
  loginUser();
}
window.loginUserAct = loginUserAct;

function initURLListener() {
  // $(window).on("hashchange", MODEL.changeRoute);
  $(window).on("hashchange", changeRoute);
  changeRoute();
}

function initListeners() {}

$(document).ready(function () {
  initURLListener();
  initListeners();

  //   initListeners();
});
