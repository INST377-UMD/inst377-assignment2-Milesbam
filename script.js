const timestamp = new Date().getTime();
const quoteURL = 'https://zenquotes.io/api/random?' + timestamp;

fetch('https://api.allorigins.win/get?url=' + encodeURIComponent(quoteURL))
  .then(response => response.json())
  .then(data => {
    const parsed = JSON.parse(data.contents);
    const quoteText = parsed[0].q;
    const quoteAuthor = parsed[0].a;
    document.getElementById('quoteText').textContent = `"${quoteText}" — ${quoteAuthor}`;
  })
  .catch(error => {
    document.getElementById('quoteText').textContent = "Could not load quote.";
    console.error("Error fetching quote:", error);
  });
