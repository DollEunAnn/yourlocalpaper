export function renderLocation(data) {
  const container = document.getElementById("locationInfo");

  container.textContent = "";

  const country = document.createElement("p");
  country.textContent = `Country: ${data.countryName}`;

  container.appendChild(country);
}
