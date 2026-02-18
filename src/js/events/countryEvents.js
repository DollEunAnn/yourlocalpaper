import { renderLocation } from "../ui/locationUI.js";
import { saveCountry } from "../utils.mjs";
import { loadFromCountry } from "../main.js";

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

    await loadFromCountry(countryData);
  });
}
