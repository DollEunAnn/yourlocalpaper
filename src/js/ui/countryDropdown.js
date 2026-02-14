export function renderCountryDropdown(countries, selectedCode) {
  const container = document.getElementById("countrySelectContainer");

  const select = document.createElement("select");
  select.id = "countrySelect";
  select.className = "form-select mb-3";

  countries.forEach((c) => {
    const option = document.createElement("option");
    option.value = c.code;
    option.textContent = `${c.name}`;
    if (c.code === selectedCode) option.selected = true;

    select.appendChild(option);
  });

  container.textContent = "";
  container.appendChild(select);
}
