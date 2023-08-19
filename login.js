import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBLFv0JutDTqoaQT7xZ3JZL0qwCMQ3XR8Q",
  authDomain: "mini-hackathon-project-7caef.firebaseapp.com",
  projectId: "mini-hackathon-project-7caef",
  storageBucket: "mini-hackathon-project-7caef.appspot.com",
  messagingSenderId: "713702351542",
  appId: "1:713702351542:web:49aedfed588c7b16043c17"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const loginForm = document.querySelector("#loginForm");
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const loginEmail = document.querySelector("#loginEmail").value;
  const loginPassword = document.querySelector("#loginPassword").value;
  const auth = getAuth();
  signInWithEmailAndPassword(auth, loginEmail, loginPassword)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log("user", user);
      console.log(userCredential);
      const currentUserUID = user.uid;
      const currentUserName = user.displayName;
      sessionStorage.setItem("currentUserUID", currentUserUID);
      sessionStorage.setItem("currentUserName", currentUserName);
      console.log(currentUserName);
      console.log(currentUserUID);
      displayAlert("Login Successfully", "green");

      setTimeout(() => {
        location.assign("home/home.html");
      }, 2000);
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      displayAlert(errorMessage, "red");
      // ..
    });
});

const alertBox = document.querySelector("#alertBox");
const displayAlert = (txt, clss) => {
  alertBox.textContent = txt;
  alertBox.classList.add(clss);
  // remove alert
  setTimeout(() => {
    alertBox.textContent = "";
    alertBox.classList.remove(clss);
  }, 2000);
};
