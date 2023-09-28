const firebaseConfig = {
  // Your Firebase config object
  apiKey: "AIzaSyApbzbE0U8-8blkB0L5LUxZV1mHDPmWC5k",
  authDomain: "job-finder-63ccf.firebaseapp.com",
  projectId: "job-finder-63ccf",
  storageBucket: "job-finder-63ccf.appspot.com",
  messagingSenderId: "338104523235",
  appId: "1:338104523235:web:dacf515e97448ffd4da8d6",
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const database = firebase.database();




// Forgot Function'

const btn=document.getElementById("reset");
 btn.addEventListener("click", forgot);

function forgot() {
  var email = document.getElementById("email").value;
  firebase.auth().sendPasswordResetEmail(email).then(function () {
      // Password reset email sent successfully
      alert("Password reset email sent.");
      window.location.href = "signin.html";
    })
    .catch(function (error) {
      // Handle errors here
      alert(error.message);
    });
}

