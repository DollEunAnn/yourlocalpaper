import { getCountryFlag } from "../services/countryService.js";
import { getNews } from "../services/newsService.js";

import { renderFlag } from "../ui/flagUI.js";
import { renderNews } from "../ui/newsUI.js";
import { renderLocation } from "../ui/locationUI.js";

import { showNewsLoading } from "../ui/loadingUI.js";

import { saveCountry } from "../utils.mjs";

export function initCountryEvents(countries) {
  const select = document.getElementById("countrySelect");
  if (!select) return;

  select.addEventListener("change", async (e) => {
    const countryCode = e.target.value;

    const selected = countries.find((c) => c.code === countryCode);
    if (!selected) return;

    const countryData = {
      countryName: selected.name,
      countryCode: selected.code,
    };

    // update UI immediately
    renderLocation(countryData);
    saveCountry(countryData);

    // update flag
    const flagData = await getCountryFlag(countryCode);
    renderFlag(flagData);

    // update news
    showNewsLoading(selected.name);
    const articles = await getNews(selected.name);
    renderNews(articles);
  });
}
