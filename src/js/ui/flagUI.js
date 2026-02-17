export function renderFlag(flagData) {
  if (!flagData) return;

  const flagContainer = document.querySelector("#countryFlag");
  flagContainer.textContent = "";

  const image = document.createElement("img");
  image.src = flagData.rectangle_image_url;
  image.alt = `${flagData.country} Flag`;
  image.classList.add("img-fluid");
  image.style.width = "100px";

  flagContainer.appendChild(image);
}
