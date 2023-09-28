const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "0bdde0ec18mshc047afc8abeae02p11629ajsn04e84a24748e",
    "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
  },
};

const jobTitleUserInput = document.querySelector("#jobTitleUserInput");
const jobLocationUserInput = document.querySelector("#jobLocation");
const btn = document.querySelector("#searchJob");
const meallist = document.getElementById("jobsAvilable");
let applyLink = document.getElementById("applyLink");
const loader = document.getElementById("#loading");
const fulltime = document.getElementById("fulltime");
const parttime = document.getElementById("parttime");
const contractor = document.getElementById("contractor");
const intern = document.getElementById("intern");

let jobTitle = "";
let jobLocation = "";
let employment_types = "";



const callPrams = () => {
  // calling Loader
  showLoader();

  if (jobTitle === "") {
    jobTitle = jobTitleUserInput.value;
    jobLocation = jobLocationUserInput.value;
  }

  if (fulltime.checked) {
    employment_types = fulltime.value;
  } else if (parttime.checked) {
    employment_types = parttime.value;
  } else if (contractor.checked) {
    employment_types = contractor.value;
  } else if (intern.checked) {
    employment_types = intern.value;
  } else {
    employment_types = "";
  }

  fetch(
    `https://jsearch.p.rapidapi.com/search?query=${
      jobTitle + jobLocation
    }&employment_types=${employment_types}`,
    options
  )
    .then((response) => response.json())
    .then((data) => {
      let html = "";
      if (data.data) {
        data.data.forEach((meal) => {
          html += `
                <section class="h-auto ml-10 flex justify-between">
                    <!-- outer box -->
                    <div id="meal" style="width:900px;" class="flex-row   ">
                        <div class="h-auto m-10 bg-white rounded-2xl shadow-2xl ">
                            <!-- inner box -->
                            <div class="p-5 flex-row">
                                <div class="flex justify-between">
                                  <div class="flex-row">
                                    <h2 id="job_title" class=" text-2xl">${
                                      meal.job_title
                                    }</h2>
                                    <div class="text-gray-400">${
                                      meal.employer_name
                                    }</div>
                                  </div>
                                  <img src="${meal.employer_logo}" class="w-12">
                                </div>
                            <div class="mt-5 text-gray-400">

                        </div>
                        <div class="flex mt-5 justify-between max-h-14">
                        <div class="bg-slate-100 p-3 rounded-lg">${
                          meal.job_employment_type
                        }</div>
                        <p class="ml-11 mr-11">${
                          meal.job_description.length > 110
                            ? meal.job_description.substr(0, 110)
                            : meal.job_description
                        } 
                        </p>
                        <div class="bg-slate-100 flex p-3 rounded-lg pr-8 pl-2">
                          <img src="/icon/pin.png" width="30px" class="p-1">${
                            meal.job_city==null?" ":meal.job_city
                          }
                        </div>
                        

                        </div>
                        <!-- horizontal line -->
                        <div class="bg-slate-100 h-0.5 mt-3"></div>

                        <!-- Apply Button-->
                        <div class="flex justify-center">
                        <a id="applyLink" href="${
                          meal.job_apply_link
                        }" target="_blank"> 
                        <button class="bg-blue-500 rounded-full mt-5 p-3 text-white shadow-black shadow-md ">Apply Now</button>
                        </a>
                        </div>
                    </div>
                </div>

                </div>
            </section>


                `;
        });
      }
      hideLoader();
      meallist.innerHTML = html;
    })

    .catch((err) => console.error(err));
  // userInput.value = "";
};

// Hide and display loading
function showLoader() {
  var loader = document.getElementById("loading");
  loader.style.display = "block";
}

function hideLoader() {
  var loader = document.getElementById("loading");
  loader.style.display = "none";
}

// unchecked function for filter

function uncheckAll() {
  document
    .querySelectorAll('input[type="checkbox"]')
    .forEach((el) => (el.checked = false));
}

document.querySelector("#clearId").addEventListener("click", uncheckAll);

// checked one at a time
const checkboxes = document.querySelectorAll('input[type="checkbox"]');

checkboxes.forEach((checkbox) => {
  checkbox.addEventListener("click", () => {
    checkboxes.forEach((otherCheckbox) => {
      if (otherCheckbox !== checkbox) {
        otherCheckbox.checked = false;
      }
    });
  });
});



// on screen loading and after click search btn

btn.addEventListener("click", clickedfun);
//  window.onload = onloadfun();

function clickedfun() {
  jobTitle = "";
  jobLocation = "";
  callPrams();

}
function onloadfun() {
  jobTitle = "Developer";
  callPrams();
}