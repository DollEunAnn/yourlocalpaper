export async function getNews(country) {
  const apiKey = "148bfd1ef577464e810225135f775d3e";
  // const url = `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${apiKey}`;
  const url = `https://newsapi.org/v2/top-headlines?q=${country}&apiKey=${apiKey}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch news");
  }

  const result = await response.json();
  return result.articles; // Return the array of news articles
}
