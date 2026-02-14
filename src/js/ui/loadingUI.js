export function showNewsLoading(countryName) {
  const newsContainer = document.getElementById("newsContainer");

  newsContainer.innerHTML = `
    <div class="d-flex flex-column align-items-center my-4">
      <div class="spinner-border text-primary mb-2" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <p class="text-muted mb-0">
        Fetching the latest news from <strong>${countryName}</strong>...
      </p>
    </div>
  `;
}

export function hideNewsLoading() {
  const newsContainer = document.getElementById("newsContainer");
  newsContainer.innerHTML = "";
}
