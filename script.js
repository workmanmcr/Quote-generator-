const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');


let apiQuotes = [];

function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function complete(){
  quoteContainer.hidden = false; 
  loader.hidden = true;
}

// show new quote
function newQuote (){
  loading();
  // pick random quote form api quote array 
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  quoteText.textContent = quote.text;
  // check if auhtor feild is blank and fill with unkown
  if (!quote.author){
    authorText.textContent = 'Unknown'
}   else {
  authorText.textContent = quote.author;
  }
  // check quote length to determin styling 
  if (quote.text.length > 120) {
    quoteText.classList.add('long-qoute')
  } else {
    quoteText.classList.remove('long-qoute')
  }
  quoteText.textContent = quote.text;
  complete();
};
// Get quotes from api
async function getQuotes() {
  loading();
  const apiUrl = 'https://type.fit/api/quotes';
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
} catch (error) {
// catch error here 
  }
}
// tweet a quute 
function tweetQuote() {
  const twitterUrl= `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, '_blank');
}
// event listners 
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load 
getQuotes();

