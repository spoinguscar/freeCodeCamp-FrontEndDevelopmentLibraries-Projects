// Set initial state for quote and author
let currentQuote = "";
let currentAuthor = "";

// Function to fetch a random quote from the API
const fetchQuote = () => {
  fetch(
    "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"
  )
    .then((response) => response.json())
    .then((data) => {
      const quotes = data.quotes;
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
      currentQuote = randomQuote.quote;
      currentAuthor = randomQuote.author;

      // Update the text and author on the page
      document.getElementById("text").textContent = `"${currentQuote}"`;
      document.getElementById("author").textContent = `- ${currentAuthor}`;

      // Update the Tweet link with the current quote
      document.getElementById(
        "tweet-quote"
      ).href = `https://twitter.com/intent/tweet?text="${currentQuote}" - ${currentAuthor}`;
    });
};

// Load the first random quote when the page loads
window.onload = fetchQuote;

// Event listener for the "New Quote" button
document.getElementById("new-quote").addEventListener("click", fetchQuote);
