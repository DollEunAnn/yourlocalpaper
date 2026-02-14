import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

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

async function loadFromCountry(countryData) {
  // fetch countries list
  const countries = await getAllCountries();

  // render dropdown + events
  renderCountryDropdown(countries, countryData.countryCode);
  initCountryEvents(countries);

  // render location
  renderLocation(countryData);

  // render flag
  const flagData = await getCountryFlag(countryData.countryCode);
  renderFlag(flagData);

  // load news
  showNewsLoading(countryData.countryName);
  const articles = await getNews(countryData.countryName);
  renderNews(articles);
}

async function initApp() {
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

initApp();
