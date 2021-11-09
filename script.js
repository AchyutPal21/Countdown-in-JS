"use strict";

// form element
const formContainer = document.querySelector(".get__data");
const titleInput = document.querySelector("#occasion_title");

const dateLabel = document.querySelector(".for__days_label");
const dateInput = document.querySelector("#for_date");

const hoursLabel = document.querySelector(".for__hours_label");
const hoursInput = document.querySelector("#for_hours");

const btn = document.querySelector(".btn__submit__input");
const selectType = document.querySelector("#time__type");

// Container
const container = document.querySelector(".container");
const eventTitle = document.querySelector(".countdown__title");
const timers = document.querySelector(".timers");
const days = document.querySelector(".times__days");
const hours = document.querySelector(".times__hours");
const minutes = document.querySelector(".times__minutes");
const seconds = document.querySelector(".times__seconds");

const daysShow = document.querySelector(".times__days");
const daysText = document.querySelector(".times__day__text");

(function init() {
  hoursLabel.classList.add("hidden");
  hoursInput.classList.add("hidden");
  titleInput.value = dateInput.value = hoursInput.value = "";
})();

// Rendering Variables
let toDate, to_dd, to_mm, to_yy, now, tomorrow, then, total_days;

function renderInput(inputs) {
  const toTitle = inputs.title;

  if (inputs.choice === "hours") {
    daysShow.classList.add("hidden");
    daysText.classList.add("hidden");
    timers.style.gridTemplateColumns = "repeat(3, 1fr)";
  }

  const now = new Date();
  if (inputs.choice === "days") {
    toDate = inputs.dt.split("-"); // yy-mm-dd
    to_dd = +toDate[2];
    to_mm = +toDate[1] - 1;
    to_yy = +toDate[0];

    tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);

    then = new Date(to_yy, to_mm, to_dd);
    total_days = (then.getTime() - tomorrow.getTime()) / (1000 * 3600 * 24);
  }

  //////////////////

  let restH =
    inputs.choice === "hours" ? +hoursInput.value : 24 - now.getHours();
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
    const stopInterval = function () {
      let flag = 0;
      if (inputs.choice === "days" && !total_days) {
        flag++;
      }
      if (!restH && !restM && !restS) {
        flag++;
      }
      return flag;
    };

    if (stopInterval()) {
      timers.classList.add("hidden");
      eventTitle.textContent += " 🥳";
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
  if (!titleInput.value && (!dateInput.value || !hoursInput)) {
    alert("Check your Inputs");
    return 0;
  }

  const formFields = {
    title: titleInput.value,
    choice: selectType.value,
    dt: dateInput.value,
    hr: hoursInput.value,
  };

  renderInput(formFields);
}

btn.addEventListener("click", function (event) {
  event.preventDefault();
  if (!validateInput()) return;
  container.classList.remove("hidden");
  formContainer.classList.add("hidden");
});

///////////////////////

// Changing the selection field
selectType.addEventListener("change", function (event) {
  if (event.target.value === "hours") {
    hoursLabel.classList.remove("hidden");
    hoursInput.classList.remove("hidden");
    dateInput.classList.add("hidden");
    dateLabel.classList.add("hidden");
    dateInput.value = "";
  }

  if (event.target.value === "days") {
    dateInput.classList.remove("hidden");
    dateLabel.classList.remove("hidden");
    hoursLabel.classList.add("hidden");
    hoursInput.classList.add("hidden");
    hoursInput.value = "";
  }
});
