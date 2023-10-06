import React from "react";
import "./index.css";

export default function App() {
  const [quote, setQuote] = React.useState({ quote: "", author: "" });
  const [newQuote, setNewQuote] = React.useState(false);
  const [newColor, setColor] = React.useState("#13134");
  React.useEffect(() => {
    const fetchQuote = async () => {
      const url = "http://api.quotable.io/random";
      try {
        const response = await fetch(url);
        const result = await response.json();
        setQuote({
          quote: result.content,
          author: result.author,
        });
        const randomColor = Math.floor(Math.random() * 16777215).toString(16);
        setColor(`#${randomColor}`);
        console.log(newColor);
      } catch (error) {
        console.error(error);
      }
    };
    console.log(quote);
    fetchQuote();
  }, [newQuote]);
  function nouvelleQuote() {
    setNewQuote((prevQuote) => !prevQuote);
  }
  const styleButton = {
    backgroundColor: newColor,
  };
  const styleText = {
    color: newColor,
    animation: {
      from: {
        opacity: 0,
      },
      to: {
        opacity: 1,
      },
    },
  };
  return (
    <main style={styleButton}>
      <div id="quote-box">
        <div className="contenu-box">
          <p id="text" style={styleText}>
            <i className="fa-solid fa-quote-left"></i> {quote.quote}
          </p>
          <p id="author" style={styleText}>
            - {quote.author}
          </p>
          <div className="footer">
            <div className="socials">
              <a
                className="twitter-share-button"
                id="tweet-quote"
                target="_blank"
                rel="noopener noreferrer"
                href={`https://twitter.com/intent/tweet?text=${quote.quote}`}
                style={styleButton}
              >
                <i className="fa-brands fa-x-twitter"></i>
              </a>
              <a
                href="tumblr.com"
                target="_blank"
                id="tumblr-site"
                style={styleButton}
              >
                <i className="fa-brands fa-tumblr"></i>
              </a>
            </div>
            <button id="new-quote" onClick={nouvelleQuote} style={styleButton}>
              New Quote
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
