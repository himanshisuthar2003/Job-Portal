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


const apiKey = "rzp_test_gVKmWWGcUR24wn";




function paymentHandlerFun(response){
    // Payment was successful, collect necessary data
   var paymentDetails = {
    paymentId: response.razorpay_payment_id,
    // amount: response.razorpay_order_amount,
    // orderId: response.razorpay_order_id,
    // Add more relevant data as needed
  };


  const database = firebase.database();
  const user = firebase.auth().currentUser;
  const uid = user.uid;
  // Reference to the Firebase Realtime Database location where you want to store payment data
  var paymentRef = database.ref(`users/${uid}/profile/payment`);

  // Push the payment details to the database
  paymentRef.push(paymentDetails)
    .then(function() {
      console.log('Payment data added to Firebase Realtime Database.');
    })
    .catch(function(error) {
      console.error('Error adding payment data to Firebase:', error);
    });

  // Redirect or display a success message to the user
//   window.location.href = 'thank-you.html';

};
  



function rzpPaymentFun(name, email) {
  // Define the course price in paise (e.g., 1000 paise = ₹10)
  const coursePrice = 200000;

  const options = {
    key: apiKey,
    amount: coursePrice,
    name: "Online Courses",
    description: "Course Purchase",
    handler: function (response) {
      // Handle the successful payment response here
      console.log("Payment successful");
      
      paymentHandlerFun(response);
      // You can also send the payment response to your server for verification and order completion

    //   window.location.href = 'index.html';
    },
    prefill: {
      name: name,
      email: email,
    },
  };

  const rzp = new Razorpay(options);
  rzp.open();
}




document.getElementById("webPurchaseBtn").addEventListener("click", function () {
    firebase.auth().onAuthStateChanged(function (users) {
      if (users) {
        const user = firebase.auth().currentUser;

        if (user) {
          const userId = user.uid;
          const userRef = firebase.database().ref("users/" + userId);
          userRef.once("value").then(function (snapshot) {
              const userData = snapshot.val();

              if (userData &&userData.name &&userData.email) {
                // Calling razorpay payment function
                
                rzpPaymentFun(userData.name, userData.email);
              } else {
                console.log("User data not found");
                
              }
            })
            .catch(function (error) {
              alert(error.message);
            });
        }
        
      } else {
        alert("Please create your account");
        window.location.href = "signUp.html";
      }
    });
  });



  // store all data in firebase


  

  