import { limitWords } from "../utils.mjs";

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
    quickViewBtn.innerHTML = `
      <i class="bi bi-eye"></i>
      Quick View
    `;

    quickViewBtn.addEventListener("click", () => {
      alert(`${article.title}\n\n${article.body}`);
    });

    cardText.addEventListener("click", () => {
      window.open(article.url, "_blank");
    });

    cardBody.append(cardTitle, cardSubtitle, cardText, quickViewBtn);
    card.append(cardBody);
    newsContainer.append(card);
  });
}
