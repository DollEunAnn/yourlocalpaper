export async function getNews(country) {
  const apiKey = "ce3fb8be-857c-43fe-8d6e-e237f804b30d";
  const url = "https://eventregistry.org/api/v1/article/getArticles";

  const data = {
    query: {
      $query: {
        locationUri: `http://en.wikipedia.org/wiki/${country}`,
        sourceLocationUri: `http://en.wikipedia.org/wiki/${country}`,
        lang: "eng",
      },
      $filter: {
        forceMaxDataTimeWindow: "31",
      },
    },
    resultType: "articles",
    articlesSortBy: "date",
    apiKey: apiKey,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    console.log(result);

    // Return articles array if you want to use it elsewhere
    return result.articles?.results || [];
  } catch (error) {
    console.error("Error fetching news:", error);
    throw error;
  }
}

