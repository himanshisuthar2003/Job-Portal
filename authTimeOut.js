
const user = firebase.auth().currentUser;

// Set the timeout period in milliseconds (e.g., 15 minutes)
const timeoutPeriod =15* 60 * 1000; // 15 minutes

let signoutTimeout; // Declare a variable to store the timeout ID

// Function to sign the user out after the timeout period
function startSignoutTimer() {
  signoutTimeout = setTimeout(() => {
    // Sign the user out when the timeout expires
    firebase.auth().signOut()
      .then(() => {
        // Redirect to the sign-in page or perform any other necessary actions
        console.log("User signed out due to inactivity.");
        window.location.href = "signin.html";
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  }, timeoutPeriod);
}

// Call this function whenever there is user activity or interaction
function resetSignoutTimer() {
  clearTimeout(signoutTimeout);
  startSignoutTimer();
}

// Start the initial timeout when the user signs in
startSignoutTimer();

// You should also call resetSignoutTimer() whenever there is user activity or interaction
// For example, if you're listening for user interactions on the page:
document.addEventListener('mousemove', resetSignoutTimer);
document.addEventListener('keydown', resetSignoutTimer);
