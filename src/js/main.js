import "bootstrap/dist/css/bootstrap.min.css";
import * as bootstrap from "bootstrap";
import "../css/style.css";

import { getIpInfo, getCountryFlag } from "./services/countryService.js";
import { getNews } from "./services/newsService.js";

import { renderLocation } from "./ui/locationUI.js";
import { renderFlag } from "./ui/flagUI.js";
import { renderNews } from "./ui/newsUI.js";
import { showNewsLoading } from "./ui/loadingUI.js";

import { saveCountry, getSavedCountry } from "./utils.mjs";
import { renderCountryDropdown } from "./ui/countryDropdown.js";
import { initCountryEvents } from "./events/countryEvents.js";
import { getAllCountries } from "./services/countryService.js";

let allArticles = [];

let currentPage = 1;
const articlesPerPage = 10; // you can change this

async function loadFromCountry(countryData) {
  // reset before assigning new articles
  allArticles = [];

  // fetch countries list
  const countries = await getAllCountries();

  // render dropdown + events
  renderCountryDropdown(countries, countryData.countryCode);
  initCountryEvents(countries);

  // render location / chosen location from localStorage
  renderLocation(countryData);

  // render flag
  const flagData = await getCountryFlag(countryData.countryCode);
  renderFlag(flagData);

  // load news
  showNewsLoading(countryData.countryName);
  const articles = await getNews(countryData.countryName);

  // renderNews(articles);
  allArticles = articles;

  currentPage = 1;
  renderPagination();
}

async function init() {
  try {
    const savedCountry = getSavedCountry();

    // If localStorage exists → fast load
    if (savedCountry) {
      await loadFromCountry(savedCountry);
      return;
    }

    // Otherwise fetch from IP
    const data = await getIpInfo();

    // save for next visit
    saveCountry({
      countryName: data.countryName,
      countryCode: data.countryCode,
    });

    // normal load
    await loadFromCountry(data);
  } catch (error) {
    console.error("App failed to load:", error);
  }
}

// Pagination logic
function renderPagination() {
  const start = (currentPage - 1) * articlesPerPage;
  const end = start + articlesPerPage;

  const paginatedItems = allArticles.slice(start, end);

  renderNews(paginatedItems);
  renderPaginationButtons();
}

function renderPaginationButtons() {
  const totalPages = Math.ceil(allArticles.length / articlesPerPage);
  const paginationContainer = document.getElementById("pagination");

  paginationContainer.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");

    btn.className = `btn btn-sm mx-1 ${
      i === currentPage ? "pill-btn-active" : "pill-btn"
    }`;

    btn.textContent = i;

    btn.addEventListener("click", () => {
      currentPage = i;
      renderPagination();

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });

    paginationContainer.appendChild(btn);
  }
}

// Theme toggle logic
const themeToggleBtn = document.getElementById("themeToggle");
const htmlElement = document.documentElement; // <html>
const icon = themeToggleBtn.querySelector("i");
const logo = document.getElementById("logo");

// Load saved theme
const savedTheme = localStorage.getItem("theme");

if (savedTheme) {
  htmlElement.setAttribute("data-bs-theme", savedTheme);
  updateIcon(savedTheme);
}

// Toggle theme on click
themeToggleBtn.addEventListener("click", () => {
  const currentTheme = htmlElement.getAttribute("data-bs-theme");
  const newTheme = currentTheme === "light" ? "dark" : "light";

  htmlElement.setAttribute("data-bs-theme", newTheme);
  localStorage.setItem("theme", newTheme);

  updateIcon(newTheme);
});

function updateIcon(theme) {
  if (theme === "dark") {
    icon.classList.remove("bi-sun");
    icon.classList.add("bi-moon");
    logo.src = "../images/logo-light.svg"; // Use light logo in dark mode
  } else {
    icon.classList.remove("bi-moon");
    icon.classList.add("bi-sun");
    logo.src = "../images/logo-dark.svg"; // Use dark logo in light mode
  }
}

document.querySelectorAll(".sparkle-btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    this.classList.remove("sparkle");
    void this.offsetWidth; // restart animation
    this.classList.add("sparkle");
  });
});

// Welcome modal logic
document.addEventListener("DOMContentLoaded", () => {
  const modalElement = document.getElementById("welcomeModal");
  const dontShowCheckbox = document.getElementById("dontShowAgain");

  const welcomeModal = new bootstrap.Modal(modalElement, {
    focus: true,
  });

  // Check if user already chose not to show
  const hideModal = localStorage.getItem("hideWelcomeModal");

  if (!hideModal) {
    welcomeModal.show();
  }

  // When modal closes, check checkbox state
  modalElement.addEventListener("hidden.bs.modal", () => {
    if (dontShowCheckbox.checked) {
      localStorage.setItem("hideWelcomeModal", "true");
    }
  });
});

init();
