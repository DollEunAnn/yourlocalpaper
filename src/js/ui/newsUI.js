import { limitWords } from "../utils.mjs";
import * as bootstrap from "bootstrap";

export function renderNews(articles) {
  const newsContainer = document.getElementById("newsContainer");
  newsContainer.textContent = "";

  if (articles.length === 0) {
    const noNewsMsg = document.createElement("p");
    noNewsMsg.textContent = "No news articles found for this location.";
    newsContainer.append(noNewsMsg);
    return;
  }

  articles.forEach((article) => {
    const card = document.createElement("div");
    card.className = "card mb-2 newsCard";

    const cardBody = document.createElement("div");
    cardBody.className = "card-body";

    const cardTitle = document.createElement("h4");
    cardTitle.className = "card-title";
    cardTitle.textContent = article.title;

    const cardText = document.createElement("p");
    cardText.className = "card-text";
    cardText.textContent = limitWords(article.body);

    const cardSubtitle = document.createElement("h6");
    cardSubtitle.className = "card-subtitle my-2";
    const date = new Date(article.date);
    cardSubtitle.textContent = `Source: ${article.source.uri} | ${article.date} | ${article.time}`;

    const quickViewBtn = document.createElement("button");
    quickViewBtn.className = "pill-btn mt-2";
    quickViewBtn.dataset.id = article.uri;
    quickViewBtn.innerHTML = `
      <i class="bi bi-eye"></i>
      Quick View
    `;

    quickViewBtn.addEventListener("click", () => {
      openArticleModal(article);
    });

    cardText.addEventListener("click", () => {
      window.open(article.url, "_blank");
    });

    cardBody.append(cardTitle, cardSubtitle, cardText, quickViewBtn);
    card.append(cardBody);
    newsContainer.append(card);
  });
}

function openArticleModal(article) {
  const modal = new bootstrap.Modal(document.getElementById("articleModal"));

  const title = document.getElementById("modalTitle");
  const image = document.getElementById("modalImage");
  const description = document.getElementById("modalDescription");
  const link = document.getElementById("modalLink");

  title.textContent = article.title;
  description.textContent =
    limitWords(article.body, 150) ||
    article.description ||
    "No preview available.";

  if (article.image) {
    image.src = article.image;
    image.classList.remove("d-none");
  } else {
    image.classList.add("d-none");
  }

  link.href = article.url;

  modal.show();
}
