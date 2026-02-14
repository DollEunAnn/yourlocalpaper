import { limitWords } from "../utils.mjs";

export function renderNews(articles) {
  const newsContainer = document.getElementById("newsContainer");
  newsContainer.textContent = "";

  const title = document.createElement("h5");
  title.textContent = "Latest News";
  newsContainer.append(title);

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
}
