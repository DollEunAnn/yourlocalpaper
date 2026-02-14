export function renderFlag(flagData) {
  if (!flagData) return;

  const flagContainer = document.getElementById("countryFlag");
  flagContainer.textContent = "";

  const image = document.createElement("img");
  image.src = flagData.rectangle_image_url;
  image.alt = `${flagData.country} Flag`;
  image.classList.add("img-fluid");

  flagContainer.appendChild(image);
}
