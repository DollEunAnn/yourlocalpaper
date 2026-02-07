import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

import { getIpInfo, getCountryFlag } from "./services/countryService.js";
import { getNews } from "./services/newsService.js";

const data = await getIpInfo();
// display location info on the page
async function showLocation() {
  const container = document.getElementById("locationInfo");

  container.innerHTML = `
    <h5>Your Location</h5>
    <p><strong>IP:</strong> ${data.ip}</p>
    <p><strong>Country:</strong> ${data.countryName}</p>
    <p><strong>City:</strong> ${data.city}</p>
  `;
}

async function displayFlag() {
  const countryCode = data.countryCode;
  const flagData = await getCountryFlag(countryCode);
  const flagContainer = document.getElementById("countryFlag");

  flagContainer.innerHTML = ` 
    <img src="${flagData.rectangle_image_url}" alt="Country Flag" class="img-fluid">
    `;
}

async function displayNews(countryCode) {
  const newsContainer = document.getElementById("newsContainer");
  const articles = await getNews("US");

  try {
    newsContainer.innerHTML = `
      <h5>Latest News</h5>
      ${articles
        .map(
          (article) => `
        <div class="card mb-2">
          <div class="card-body">
            <h6 class="card-title">${article.title}</h6>
            <p class="card-text">${article.description}</p>
          </div>
        </div>
      `,
        )
        .join("")}
    `;
  } catch (error) {
    newsContainer.innerHTML = `<p>Error fetching news: ${error.message}</p>`;
  }
}

showLocation();
displayFlag();
displayNews();
