const showUpdateBtn = document.querySelectorAll("#updateCheckBox");
const editBtn = document.querySelector("#updateEdit");
const deleteBtn = document.querySelector("#updateDelete");

showUpdateBtn.forEach().addEventListener("change", () => {
  this.checked ? console.log("Check!") : console.log("blah");
});

showUpdateBtn.addEventListener("change", () => {
  this.checked ? console.log("Check!") : console.log("blah");

  //   if (showUpdateBtn.checked) {
  //     console.log("chjekc");
  //   } else {
  //     console.log("aosdghj;asldg");
  //   }
});
