import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
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
const signupForm = document.querySelector("#signupForm");
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const signupPassword = document.querySelector("#signupPassword").value;
  const signupConfirmPassword = document.querySelector(
    "#signupConfirmPassword"
  ).value;
  if (signupPassword === signupConfirmPassword) {
    const firstName = document.querySelector("#firstname").value;
    const lastName = document.querySelector("#lastname").value;
    const userName = firstName + lastName;
    console.log(userName);
    const signupEmail = document.querySelector("#signupEmail").value;
    const signupPassword = document.querySelector("#signupPassword").value;
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, signupEmail, signupPassword)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("user", user);
        console.log(userCredential);
        updateProfile(auth.currentUser, {
          displayName: userName,
        })
          .then(() => {
            // Profile updated!
            // ...

            const currentUserName = user.displayName;
            sessionStorage.setItem("currentUserName", currentUserName);
            displayAlert("SignUp Successfully", "green");
          })
          .catch((error) => {
            // An error occurred
            // ...
          });
        const currentUserUID = user.uid;
        console.log(currentUserUID);
        sessionStorage.setItem("currentUserUID", currentUserUID);
        setTimeout(() => {
          location.assign("../home/home.html");
        }, 2000);

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("error", error);
        // ..
      });
  } else {
    displayAlert("password must be same", "black");
  }
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
