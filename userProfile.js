const firebaseConfig = {
  apiKey: "AIzaSyApbzbE0U8-8blkB0L5LUxZV1mHDPmWC5k",
  authDomain: "job-finder-63ccf.firebaseapp.com",
  databaseURL: "https://job-finder-63ccf-default-rtdb.firebaseio.com",
  projectId: "job-finder-63ccf",
  storageBucket: "job-finder-63ccf.appspot.com",
  messagingSenderId: "338104523235",
  appId: "1:338104523235:web:dacf515e97448ffd4da8d6",
};

firebase.initializeApp(firebaseConfig);

document.addEventListener("DOMContentLoaded", function () {
  window.onload = function () {
    projectOnloadFun();
    skillsOnloadFun();
    educationOnloadFun();
    experienceOnLoadFun();
    updateProfile1();
    checkResumeAndDisplayButton();
    checkProfilePictureAndDisplay();
  };
});

function checkProfilePictureAndDisplay() {
  firebase.auth().onAuthStateChanged(function (users) {
    const user = firebase.auth().currentUser;
    const profilePicFileName = localStorage.getItem("profilePicFileName");

    if (user) {
      const uid = user.uid;
      const storageRef = firebase.storage().ref();
      const profilePicRef = storageRef.child(
        `users/${uid}/profile-pics/${profilePicFileName}`
      ); // Adjust the path as needed

      profilePicRef
        .getDownloadURL()
        .then((url) => {
          // Profile picture found, update the profile picture
          updateProfilePicture(url);
        })
        .catch((error) => {
          // Profile picture not found or error occurred
          console.error("Error getting profile picture URL:", error);
          // You can choose to show a default profile picture or handle the error in another way
        });
    }
  });
}

function checkResumeAndDisplayButton() {
  firebase.auth().onAuthStateChanged(function (users) {
    const user = firebase.auth().currentUser;
    if (user) {
      const uid = user.uid;
      const storageRef = firebase.storage().ref();
      const resumeFileName = localStorage.getItem("resumeFileName");

      if (resumeFileName) {
        const resumeRef = storageRef.child(
          `users/${uid}/resume/${resumeFileName}`
        );

        resumeRef
          .getDownloadURL()
          .then((url) => {
            // Resume found, display the download button
            const downloadLink = document.getElementById(
              "download-resume-button"
            );
            downloadLink.href = url;
            downloadLink.style.display = "block";
          })
          .catch((error) => {
            // Resume not found, or error occurred
            console.error("Error getting download URL:", error);
            // You can choose to hide or do something else with the button in case of an error
          });
      }
    } else {
      // User is not authenticated, you can choose to hide or do something else with the button
      const downloadLink = document.getElementById("download-resume-button");
      downloadLink.style.display = "none";
    }
  });
}

function updateProfile1() {
  firebase.auth().onAuthStateChanged(function (users) {
    if (users) {
      const username = document.getElementById("username");
      const email = document.getElementById("email");
      const user = firebase.auth().currentUser;

      if (user) {
        const userId = user.uid;
        const userRef = firebase.database().ref("users/" + userId);

        userRef
          .once("value")
          .then(function (snapshot) {
            const userData = snapshot.val();

            if (userData && userData.name) {
              // Display the user's name
              username.textContent = userData.name;
              email.textContent = userData.email;
            }
          })
          .catch(function (error) {
            alert(error.message);
          });
      }
    }
  });
}

function experienceOnLoadFun() {
  firebase.auth().onAuthStateChanged(function (users) {
    if (users) {
      const user = firebase.auth().currentUser;
      const uid = user.uid;
      const db = firebase.database();
      const projectRef = db.ref(`users/${uid}/profile/experience`);
      const experienceList = document.getElementById("experience-list");

      projectRef
        .once("value")
        .then((snapshot) => {
          experienceList.innerHTML = ""; // Clear existing projects
          const projectsData = snapshot.val();

          if (projectsData) {
            for (const projectId in projectsData) {
              if (projectsData.hasOwnProperty(projectId)) {
                const project = projectsData[projectId];

                // Create HTML elements to display the project data
                const newItem = document.createElement("li");
                newItem.innerHTML = `
              
              <h3>${project.role}</h3>
              <p>Company Name: ${project.company}</p>
              <p>Duration-Date: ${project.durationDate}</p>
            
            `;

                experienceList.appendChild(newItem);
              }
            }
          } else {
            // Handle the case where there are no projects to display
          }
        })
        .catch((error) => {
          console.error("Error fetching experience:", error);
        });
    }
  });
}

function educationOnloadFun() {
  firebase.auth().onAuthStateChanged(function (users) {
    if (users) {
      const user = firebase.auth().currentUser;
      const uid = user.uid;
      const db = firebase.database();
      const projectRef = db.ref(`users/${uid}/profile/education`);
      const educationList = document.getElementById("education-list");

      projectRef
        .once("value")
        .then((snapshot) => {
          educationList.innerHTML = ""; // Clear existing projects
          const projectsData = snapshot.val();

          if (projectsData) {
            for (const projectId in projectsData) {
              if (projectsData.hasOwnProperty(projectId)) {
                const project = projectsData[projectId];

                // Create HTML elements to display the project data
                const newItem = document.createElement("li");
                newItem.innerHTML = `
              
              <h3>${project.levelOrStandard}</h3>
              <p>University/School: ${project.university}</p>
              <p>Completed: ${project.completionDate}</p>
            
            `;

                educationList.appendChild(newItem);
              }
            }
          }
        })
        .catch((error) => {
          console.error("Error fetching education:", error);
        });
    }
  });
}

function projectOnloadFun() {
  firebase.auth().onAuthStateChanged(function (users) {
    if (users) {
      const user = firebase.auth().currentUser;
      const uid = user.uid;
      const db = firebase.database();
      const projectRef = db.ref(`users/${uid}/profile/project`);
      const academicsList = document.getElementById("academics-list");

      projectRef
        .once("value")
        .then((snapshot) => {
          academicsList.innerHTML = ""; // Clear existing projects
          const projectsData = snapshot.val();

          if (projectsData) {
            for (const projectId in projectsData) {
              if (projectsData.hasOwnProperty(projectId)) {
                const project = projectsData[projectId];

                // Create HTML elements to display the project data
                const newItem = document.createElement("li");
                newItem.innerHTML = `
              <h3>${project.title}</h3>
              <p>${project.institution}</p>
              <p>Completed: ${project.completionDate}</p>
              <p>Description: ${project.description}</p>
            `;

                academicsList.appendChild(newItem);
              }
            }
          } else {
            // Handle the case where there are no projects to display
          }
        })
        .catch((error) => {
          console.error("Error fetching projects:", error);
        });
    }
  });
}

function skillsOnloadFun() {
  firebase.auth().onAuthStateChanged(function (users) {
    if (users) {
      const user = firebase.auth().currentUser;
      const uid = user.uid;
      const db = firebase.database();
      const projectRef = db.ref(`users/${uid}/profile/skills`);
      const skillsList = document.getElementById("skills-list");

      projectRef
        .once("value")
        .then((snapshot) => {
          skillsList.innerHTML = ""; // Clear existing projects
          const projectsData = snapshot.val();

          if (projectsData) {
            for (const projectId in projectsData) {
              if (projectsData.hasOwnProperty(projectId)) {
                const project = projectsData[projectId];

                // Create HTML elements to display the project data
                const newItem = document.createElement("li");
                newItem.innerHTML = `
               <p>${project.skills}</p>
            `;

                skillsList.appendChild(newItem);
              }
            }
          } else {
            // Handle the case where there are no projects to display
          }
        })
        .catch((error) => {
          console.error("Error fetching projects:", error);
        });
    }
  });
}

// function resumeOnload(){
//   firebase.auth().onAuthStateChanged(function (users) {
//     if (users) {
//       const user = firebase.auth().currentUser;
//       const uid = user.uid;
//       const storageRef = firebase.storage().ref();
//       const resumeRef = storageRef.child(`users/${uid}/resume/`); // Replace with the actual filename of the resume

//       resumeRef
//         .getDownloadURL()
//         .then((url) => {
//           // Resume found, display the download button
//           const downloadLink = document.getElementById("download-resume-button");
//           downloadLink.href = url;
//           downloadLink.style.display = "block";
//         })
//         .catch((error) => {
//           // Resume not found, or error occurred
//           console.error("Error getting download URL:", error);
//           // You can choose to hide or do something else with the button in case of an error
//         });
//     } else {
//       // User is not authenticated, you can choose to hide or do something else with the button
//       console.log("user not authenticated");
//     }
//   });
// }

const closeAcademicModalbtn = document.getElementById("projectCloseBtn");
const academicformResetBtn = document.getElementById("academic-form");
closeAcademicModalbtn.addEventListener("click", closeAcademicModal);
const academicForm = document.getElementById("formSubmitBtn");
const academicModal = document.getElementById("add-academic-modal");
const openAcademicModal = document.getElementById("add-academic-button");
openAcademicModal.addEventListener("click", openAcademicModalFun);

function openAcademicModalFun() {
  academicModal.style.display = "block";
}

function closeAcademicModal() {
  academicModal.style.display = "none";
  academicformResetBtn.reset();
}

academicForm.addEventListener("click", function (event) {
  addAcademicEntry(event);
  displayUserProjects();
  closeAcademicModal();
});

function addAcademicEntry(event) {
  event.preventDefault();

  const title = document.getElementById("title").value;
  const institution = document.getElementById("institution").value;
  const completionDate = document.getElementById("completionDate").value;
  const description = document.getElementById("description").value;

  if (title && institution && completionDate && description) {
    const user = firebase.auth().currentUser;
    const uid = user.uid;
    const db = firebase.database();
    const projectRef = db.ref(`users/${uid}/profile/project`);

    const newProject = {
      title: title,
      institution: institution,
      completionDate: completionDate,
      description: description,
      // Add other project-related data as needed
    };

    // Push the new project to the user's project list
    const newProjectRef = projectRef.push();

    newProjectRef
      .set(newProject)
      .then(() => {
        console.log("Project added successfully");
      })
      .catch((error) => {
        console.error("Error adding project:", error);
      });
  } else {
    alert("please give all input data");
  }
}

// Fetch and display the user's projects after adding a project
function displayUserProjects() {
  const user = firebase.auth().currentUser;
  const uid = user.uid;
  const db = firebase.database();
  const projectRef = db.ref(`users/${uid}/profile/project`);
  const academicsList = document.getElementById("academics-list");

  projectRef
    .once("value")
    .then((snapshot) => {
      academicsList.innerHTML = ""; // Clear existing projects
      const projectsData = snapshot.val();

      if (projectsData) {
        for (const projectId in projectsData) {
          if (projectsData.hasOwnProperty(projectId)) {
            const project = projectsData[projectId];

            // Create HTML elements to display the project data
            const newItem = document.createElement("li");
            newItem.innerHTML = `
              <h3>${project.title}</h3>
              <p>${project.institution}</p>
              <p>Completed: ${project.completionDate}</p>
              <p>Description: ${project.description}</p>
            `;

            academicsList.appendChild(newItem);
          }
        }
      }
    })
    .catch((error) => {
      console.error("Error fetching projects:", error);
    });
}

//Add more skills code

const skillsAddBtn = document.getElementById("skillsAddBtn");
const skillsModalCloseBtn = document.getElementById("skillsCloseBtn");
const skillsFormReset = document.getElementById("skills-form");
const addSkillsModal = document.getElementById("add-skills-modal");
const skillsFormSubmitBtn = document.getElementById("skillsFormSubmitBtn");

skillsAddBtn.addEventListener("click", function (event) {
  event.preventDefault();
  addSkillsModal.style.display = "block";
});

skillsModalCloseBtn.addEventListener("click", function () {
  closeSkillsModal();
});

function closeSkillsModal() {
  addSkillsModal.style.display = "none";
  skillsFormReset.reset();
}

skillsFormSubmitBtn.addEventListener("click", function (event) {
  event.preventDefault();

  addSkillsEntry(event);
  displaySkills();
  closeSkillsModal();
});

function addSkillsEntry(event) {
  event.preventDefault();
  const skills = document.getElementById("skills1").value;

  if (skills) {
    event.preventDefault();
    const user = firebase.auth().currentUser;
    const uid = user.uid;
    const db = firebase.database();
    const projectRef = db.ref(`users/${uid}/profile/skills`);

    const newProject = {
      skills: skills,
    };

    // Push the new project to the user's project list
    const newProjectRef = projectRef.push();

    newProjectRef
      .set(newProject)
      .then(() => {
        console.log("Skills added successfully");
      })
      .catch((error) => {
        console.error("Error adding skills:", error);
      });
  } else {
    alert("Please give all input data");
  }
}

function displaySkills() {
  const user = firebase.auth().currentUser;
  const uid = user.uid;
  const db = firebase.database();
  const projectRef = db.ref(`users/${uid}/profile/skills`);
  const skillsList = document.getElementById("skills-list");

  projectRef
    .once("value")
    .then((snapshot) => {
      skillsList.innerHTML = ""; // Clear existing projects
      const projectsData = snapshot.val();

      if (projectsData) {
        for (const projectId in projectsData) {
          if (projectsData.hasOwnProperty(projectId)) {
            const project = projectsData[projectId];

            // Create HTML elements to display the project data
            const newItem = document.createElement("li");
            newItem.innerHTML = `
            <p>${project.skills}</p>
            `;

            skillsList.appendChild(newItem);
          }
        }
      } else {
        // Handle the case where there are no projects to display
        skillsList.innerHTML = "<p>No skills found.</p>";
      }
    })
    .catch((error) => {
      console.error("Error fetching skills:", error);
    });
}

//Add more education code

const educationAddBtn = document.getElementById("educationAddBtn");
const educationModalCloseBtn = document.getElementById("educationCloseBtn");
const educationFormReset = document.getElementById("education-form");
const addEducationModal = document.getElementById("add-education-modal");
const educationFormSubmitBtn = document.getElementById(
  "educationFormSubmitBtn"
);

educationAddBtn.addEventListener("click", function (event) {
  event.preventDefault();
  addEducationModal.style.display = "block";
});

educationModalCloseBtn.addEventListener("click", function () {
  closeEducationModal();
});

function closeEducationModal() {
  addEducationModal.style.display = "none";
  educationFormReset.reset();
}

educationFormSubmitBtn.addEventListener("click", function (event) {
  event.preventDefault();

  addEducationEntry(event);
  displayEducation();
  closeEducationModal();
});

function addEducationEntry(event) {
  event.preventDefault();

  // Retrieve values from the form
  const levelOrStandard = document.getElementById("levelOrStandard").value;
  const university = document.getElementById("university").value;
  const completionDate = document.getElementById("completion-date").value;

  if (levelOrStandard && university && completionDate) {
    const user = firebase.auth().currentUser;
    const uid = user.uid;
    const db = firebase.database();
    const projectRef = db.ref(`users/${uid}/profile/education`);

    const newProject = {
      levelOrStandard: levelOrStandard,
      university: university,
      completionDate: completionDate,
    };

    // Push the new project to the user's project list
    const newProjectRef = projectRef.push();

    newProjectRef
      .set(newProject)
      .then(() => {
        console.log("Skills added successfully");
      })
      .catch((error) => {
        console.error("Error adding skills:", error);
      });
  } else {
    alert("Please give all input data");
  }
}

function displayEducation() {
  const user = firebase.auth().currentUser;
  const uid = user.uid;
  const db = firebase.database();
  const projectRef = db.ref(`users/${uid}/profile/education`);
  const skillsList = document.getElementById("education-list");

  projectRef
    .once("value")
    .then((snapshot) => {
      skillsList.innerHTML = ""; // Clear existing projects
      const projectsData = snapshot.val();

      if (projectsData) {
        for (const projectId in projectsData) {
          if (projectsData.hasOwnProperty(projectId)) {
            const project = projectsData[projectId];

            // Create HTML elements to display the project data
            const newItem = document.createElement("li");
            newItem.innerHTML = `
              
              <h3>${project.levelOrStandard}</h3>
              <p>University/School: ${project.university}</p>
              <p>Completed: ${project.completionDate}</p>
            
            `;

            skillsList.appendChild(newItem);
          }
        }
      } else {
        // Handle the case where there are no projects to display
        skillsList.innerHTML = "<p>No education found.</p>";
      }
    })
    .catch((error) => {
      console.error("Error fetching education:", error);
    });
}

//Add more experience code

const experienceAddBtn = document.getElementById("experienceAddBtn");
const experienceCloseBtn = document.getElementById("experienceCloseBtn");
const experienceFormReset = document.getElementById("experience-form");
const addExperienceModal = document.getElementById("add-experience-modal");
const experienceFormSubmitBtn = document.getElementById(
  "experienceFormSubmitBtn"
);

experienceAddBtn.addEventListener("click", function (event) {
  event.preventDefault();
  addExperienceModal.style.display = "block";
});

experienceCloseBtn.addEventListener("click", function () {
  closeExperienceModal();
});

function closeExperienceModal() {
  addExperienceModal.style.display = "none";
  experienceFormReset.reset();
}

experienceFormSubmitBtn.addEventListener("click", function (event) {
  event.preventDefault();
  addExperienceEntry(event);
  displayExperience();
  closeExperienceModal();
});

function addExperienceEntry(event) {
  event.preventDefault();
  const role = document.getElementById("role").value;
  const company = document.getElementById("company").value;
  const durationDate = document.getElementById("duration-date").value;

  if (role && company && durationDate) {
    const user = firebase.auth().currentUser;
    const uid = user.uid;
    const db = firebase.database();
    const projectRef = db.ref(`users/${uid}/profile/experience`);

    const newProject = {
      role: role,
      company: company,
      durationDate: durationDate,
    };

    // Push the new project to the user's project list
    const newProjectRef = projectRef.push();

    newProjectRef
      .set(newProject)
      .then(() => {
        console.log("Experience added successfully");
      })
      .catch((error) => {
        console.error("Error adding experience:", error);
      });
  } else {
    alert("Please give all input data");
  }
}

function displayExperience() {
  const user = firebase.auth().currentUser;
  const uid = user.uid;
  const db = firebase.database();
  const projectRef = db.ref(`users/${uid}/profile/experience`);
  const experienceList = document.getElementById("experience-list");

  projectRef
    .once("value")
    .then((snapshot) => {
      experienceList.innerHTML = ""; // Clear existing projects
      const projectsData = snapshot.val();

      if (projectsData) {
        for (const projectId in projectsData) {
          if (projectsData.hasOwnProperty(projectId)) {
            const project = projectsData[projectId];

            // Create HTML elements to display the project data
            const newItem = document.createElement("li");
            newItem.innerHTML = `
              
              <h3>${project.role}</h3>
              <p>Company Name: ${project.company}</p>
              <p>Duration-Date: ${project.durationDate}</p>
            
            `;

            experienceList.appendChild(newItem);
          }
        }
      } else {
        // Handle the case where there are no projects to display
      }
    })
    .catch((error) => {
      console.error("Error fetching experience:", error);
    });
}

// for resume upload
document
  .getElementById("resume-upload-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const fileInput = document.getElementById("resume-file");
    const resumeFile = fileInput.files[0];

    if (!resumeFile) {
      alert("Please select a resume file.");
      return;
    }

    const user = firebase.auth().currentUser;

    if (!user) {
      alert("User not signed in.");
      return;
    }

    localStorage.setItem("resumeFileName", resumeFile.name);
    const uid = user.uid;

    const storageRef = firebase.storage().ref();
    const resumeRef = storageRef.child(
      `users/${uid}/resume/${resumeFile.name}`
    );

    // Upload the resume
    const uploadTask = resumeRef.put(resumeFile);

    // Handle the upload task
    uploadTask
      .then((snapshot) => {
        console.log("Resume uploaded successfully");
        return resumeRef.getDownloadURL(); // Get the download URL
      })
      .then((url) => {
        // Set the download URL as the href of the download link
        const downloadLink = document.getElementById("download-resume-button");
        downloadLink.href = url;
        downloadLink.style.display = "block";
      })
      .catch((error) => {
        console.error("Error uploading or getting download URL:", error);
        alert("An error occurred while uploading the resume.");
      });
  });

// Function to handle the profile picture upload
function uploadProfilePicture() {
  const fileInput = document.getElementById("profile-pic-file");
  const profilePicFile = fileInput.files[0];

  if (!profilePicFile) {
    alert("Please select a profile picture.");
    return;
  }

  const user = firebase.auth().currentUser;

  if (!user) {
    alert("User not signed in.");
    return;
  }

  const uid = user.uid;
  localStorage.setItem("profilePicFileName", profilePicFile.name);

  const storageRef = firebase.storage().ref();
  const profilePicRef = storageRef.child(
    `users/${uid}/profile-pics/${profilePicFile.name}`
  );

  // Upload the profile picture
  const uploadTask = profilePicRef.put(profilePicFile);

  uploadTask
    .then((snapshot) => {
      console.log("Profile picture uploaded successfully");
      // Reload the page to reflect the updated profile picture

      return snapshot.ref.getDownloadURL();
    })
    .then((downloadURL) => {
      updateProfilePicture(downloadURL);
    })
    .catch((error) => {
      console.error("Error uploading profile picture:", error);
      alert("An error occurred while uploading the profile picture.");
    });
}




// Add an event listener to the profile picture upload form
const saveProfilePic = document.getElementById("profilePicSaveBtn");
saveProfilePic.addEventListener("click", function (e) {
  e.preventDefault();
  closeEditPopup();
  uploadProfilePicture();
  const profilePicFile = document.getElementById("profile-pic-file");
  profilePicFile.value = "";
});

// Function to open the edit popup
function openEditPopup() {
  const editPopup = document.getElementById("edit-popup");
  editPopup.style.display = "block";
}

// Function to close the edit popup
function closeEditPopup() {
  const editPopup = document.getElementById("edit-popup");
  editPopup.style.display = "none";
}

// Add an event listener to the Edit Profile button
const editButton = document.getElementById("editiconProfile");
editButton.addEventListener("click", openEditPopup);

function updateProfilePicture(newImageUrl) {
  const profilePicture = document.getElementById("profilePic");
  profilePicture.src = newImageUrl;
}

