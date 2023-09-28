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

// user name fetching from firebase

function profileName() {
  const username = document.getElementById("username");
  const profileDropdown = document.getElementById("profile-dropdown");
  const signinSignupVisibility = document.getElementById("signIn-signup-visibility");

  const user = firebase.auth().currentUser;

  if (user) {
    const userId = user.uid;
    const userRef = firebase.database().ref("users/" + userId);
    userRef
      .once("value")
      .then(function (snapshot) {
        const userData = snapshot.val();
        
        if (userData && userData.name&&userData.email&&userData.password) {
          // Display the user's name
          username.textContent = userData.name;
        }
        else{

          profileDropdown.style.display = "none";
          signinSignupVisibility.style.display = "block";
          console.log("User not found");
          // window.location.href = "signIn.html";
        }
      })
      .catch(function (error) {
        alert(error.message);
      });
  }
  
}

document.addEventListener("DOMContentLoaded", function () {
  // Find elements with the class "my-class"
  window.onload = userAuthFun();
});

function userAuthFun() {
  const profileDropdown = document.getElementById("profile-dropdown");
  const signinSignupVisibility = document.getElementById("signIn-signup-visibility");

  firebase.auth().onAuthStateChanged(function (users) {
    if (users) {
      // User is signed in, so display the "Profile" option
      profileName();
      profileDropdown.style.display = "block";
      signinSignupVisibility.style.display = "none";
    } else {
      // User is not signed in, so hide the "Profile" option
      profileDropdown.style.display = "none";
      signinSignupVisibility.style.display = "block";
    }
  });
}

// signout function

const signOutButton = document.getElementById("sign-out-btn");

// Add a click event listener to the sign-out button
signOutButton.addEventListener("click", () => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      // Sign-out successful.
      alert("User signed out");
    })
    .catch((error) => {
      // An error happened.
      alert(error);
    });
});

const passwordChangebtn = document.getElementById("changePassword");

passwordChangebtn.addEventListener("click", () => {
  // Get the currently authenticated user
  const user = firebase.auth().currentUser;

  // Use a prompt dialog to collect the new password from the user
  const newPassword = prompt("Enter your new password:");

  // Check if the user entered a password and it's not null or empty
  if (newPassword) {
    // Update the user's password in Firebase Authentication
    user
      .updatePassword(newPassword)
      .then(() => {
        // Password successfully updated
        console.log("Password updated successfully.");

        // Update the user's password in Firebase Realtime Database
        const database = firebase.database();
        const uid = user.uid;

        // Assuming you have a 'users' node in your database
        database.ref(`users/${uid}`).update({
          password: newPassword,
        });

        console.log("Password updated in the database.");
      })
      .catch((error) => {
        // Handle any errors that occurred during the password update
        console.error("Error updating password:", error);
      });
  } else {
    // Handle the case where the user did not enter a new password
    console.log("No new password entered.");
  }
});

const accountDelete = document.getElementById("deleteAccount");

accountDelete.addEventListener("click", () => {
  // Get the currently authenticated user
  const user = firebase.auth().currentUser;

  // Check if there is a user signed in
  if (user) {
    // Prompt the user for confirmation (optional)
    const confirmation = confirm(
      "Are you sure you want to delete your account? This action is irreversible."
    );

    if (confirmation) {
      // If u want to Delete the user's account only. It will not delete user data from database 
      user
        .delete()
        .then(() => {
          // User account deleted successfully
          console.log("User account deleted.");
        })
        .catch((error) => {
          // Handle any errors that occurred during the account deletion
         alert(error);
        });




      // If u want to remove the user's data from the database then uncomment this code 
      const database = firebase.database();
      const uid = user.uid;
      const userRef = database.ref(`/users/${uid}`);
      return userRef.remove()
       .then(() => {
      console.log("User account deleted from the database.");
       })
      .catch((error) => {
      alert(error);
      });



    } else {
      // The user chose not to delete their account
      console.log("User chose not to delete their account.");
    }
  } else {
    // Handle the case where no user is signed in
    alert("user is not Signed In");
  }
});
