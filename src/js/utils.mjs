// Limit for article descriptions to 50 words
export function limitWords(text, maxWords = 50) {
  if (!text) return "";

  const words = text.split(/\s+/);
  return words.length > maxWords
    ? words.slice(0, maxWords).join(" ") + "..."
    : text;
}

// Save the last country name to localStorage
const COUNTRY_KEY = "savedCountry";

export function saveCountry(countryData) {
  localStorage.setItem(COUNTRY_KEY, JSON.stringify(countryData));
}

export function getSavedCountry() {
  const data = localStorage.getItem(COUNTRY_KEY);
  return data ? JSON.parse(data) : null;
}
