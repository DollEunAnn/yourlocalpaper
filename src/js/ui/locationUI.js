export function renderLocation(data) {
  // country
  const countryContainer = document.getElementById("locationInfo");

  countryContainer.textContent = "";

  const country = document.createElement("p");
  country.classList.add("mt-2");
  country.textContent = `${data.countryName} Edition`;

  countryContainer.appendChild(country);
}
