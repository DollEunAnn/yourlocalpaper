// Limit for article descriptions to 50 words
export function limitWords(text, maxWords = 50) {
  if (!text) return "";

  const words = text.split(/\s+/);
  return words.length > maxWords
    ? words.slice(0, maxWords).join(" ") + "..."
    : text;
}