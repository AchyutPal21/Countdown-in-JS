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

const dt = new Date();

hours.textContent = dt.getHours();

btn.addEventListener("click", function (event) {
  event.preventDefault();
  container.classList.remove("hidden");
  formContainer.classList.add("hidden");
});
