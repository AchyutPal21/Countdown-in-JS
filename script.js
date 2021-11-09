"use strict";

// form element
const formContainer = document.querySelector(".get__data");
const titleInput = document.querySelector("#occasion_title");
const dateInput = document.querySelector("#for_date");
const btn = document.querySelector(".btn__submit__input");

// Container
const container = document.querySelector(".container");
const eventTitle = document.querySelector(".countdown__title");
const days = document.querySelector(".times__days");
const hours = document.querySelector(".times__hours");
const minutes = document.querySelector(".times__minutes");
const seconds = document.querySelector(".times__seconds");

function renderInput(inputs) {
  const toTitle = inputs.title;
  const toDate = inputs.dt.split("-"); // yy-mm-dd
  const to_dd = +toDate[2];
  const to_mm = +toDate[1] - 1;
  const to_yy = +toDate[0];

  console.log(inputs.dt);
  console.log(to_dd);

  const now = new Date();
  const tomorrow = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1
  );

  const then = new Date(to_yy, to_mm, to_dd);

  let total_days = (then.getTime() - tomorrow.getTime()) / (1000 * 3600 * 24);

  //////////////////
  let restH = 24 - now.getHours();
  let restM = 59 - now.getMinutes();
  let restS = 59 - now.getSeconds();

  eventTitle.textContent = toTitle;
  const updateTime = function () {
    days.textContent = total_days;
    hours.textContent = restH;
    minutes.textContent = restM;
    seconds.textContent = restS;
  };

  updateTime();
  const timeOver = setInterval(function () {
    if (!total_days && !restH && !restM && !restS) {
      clearInterval(timeOver);
    }

    if (restS < 0) {
      restM--;
      restS = 59;
      if (restM < 0) {
        restH--;
        restM = 59;
        if (restH < 0) {
          total_days--;
          restH = 23;
        }
      }
    }

    updateTime();
    restS--;
  }, 1000);
}

function validateInput() {
  if (!titleInput.value || !dateInput.value) {
    alert("Check your Inputs");
    return;
  }

  const title = titleInput.value;
  const dt = dateInput.value;

  console.log("Done");
  renderInput({ title, dt });
}

btn.addEventListener("click", function (event) {
  event.preventDefault();
  container.classList.remove("hidden");
  formContainer.classList.add("hidden");
  validateInput();
});
