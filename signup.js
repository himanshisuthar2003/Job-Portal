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
  

  const btn=document.getElementById("signupbtn");
  btn.addEventListener("click", signUp);


function signUp() {
     var name = document.getElementById("name").value;
     var email = document.getElementById("email").value;
     var password = document.getElementById("password").value;
  
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed up successfully, now store additional data in the database
      // alert("Account Created")
      
      const user = userCredential.user;
      assignUserRole(user.uid, "user");
      
      // Define the data to be stored in the database
      const userData = {
        name: name,
        email: email,
        password: password
      };

      // Store user data under a 'users' node using the user's unique UID
      database.ref('users/' + user.uid).set(userData)
        .then(() => {
          
          // alert("User data stored in the database.");
          // You can redirect to a different page or perform other actions here.
          alert("Account Created Succesfully! ")
          window.location.href = "index.html";
        })
        .catch((error) => {
          
          alert(error);
        });
    }
    )
    .catch((error) => {
      
      alert(error);
    });
  
  }




// Function to assign roles
function assignUserRole(uid, role) {
  var customClaims = { role: role };

  return firebase
    .auth()
    .setCustomUserClaims(uid, customClaims)
    .then(() => {
      console.log(`Role '${role}' assigned to user with UID '${uid}'`);
    })
    .catch((error) => {
      console.error("Error assigning role:", error);
    });
}