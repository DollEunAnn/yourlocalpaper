import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

import { getIpInfo, getCountryFlag } from "./services/countryService.js";
import { getNews } from "./services/newsService.js";
import { limitWords } from "./utils.mjs";

const data = await getIpInfo();
// display location info on the page
async function showLocation() {
  const container = document.getElementById("locationInfo");

  const country = document.createElement("p");
  country.textContent = `Country: ${data.countryName}`;

  container.appendChild(country);
}

async function displayFlag() {
  const countryCode = data.countryCode;
  const flagData = await getCountryFlag(countryCode);
  const flagContainer = document.getElementById("countryFlag");

  const image = document.createElement("img");
  image.src = flagData.rectangle_image_url;
  image.alt = `${flagData.country} Flag`;
  image.classList.add("img-fluid");

  flagContainer.appendChild(image);
}

async function displayNews(country) {
  const newsContainer = document.getElementById("newsContainer");
  const countryName = data.countryName;


  try {
    const articles = await getNews(countryName);

    // Clear previous content
    newsContainer.textContent = "";

    // Create title
    const title = document.createElement("h5");
    title.textContent = "Latest News";
    newsContainer.append(title);

    // Create article cards
    articles.forEach((article) => {
      const card = document.createElement("div");
      card.className = "card mb-2";

      const cardBody = document.createElement("div");
      cardBody.className = "card-body";

      const cardTitle = document.createElement("h6");
      cardTitle.className = "card-title";
      cardTitle.textContent = article.title;

      const cardText = document.createElement("p");
      cardText.className = "card-text";
      cardText.textContent = limitWords(article.body);
    

      cardText.addEventListener("click", () => {
        window.open(article.url, "_blank");
      });

      cardBody.append(cardTitle, cardText);
      card.append(cardBody);
      newsContainer.append(card);
    });
  } catch (error) {
    newsContainer.textContent = `Error fetching news: ${error.message}`;
  }
}

showLocation();
displayFlag();
displayNews();
