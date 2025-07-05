import React, { useEffect, useState } from 'react';
import './App.css';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'ar', name: 'Arabic' },
  { code: 'zh', name: 'Chinese' },
  { code: 'nl', name: 'Dutch' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'el', name: 'Greek' },
  { code: 'hi', name: 'Hindi' },
  { code: 'it', name: 'Italian' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ml', name: 'Malayalam' },
  { code: 'mr', name: 'Marathi' },
  { code: 'no', name: 'Norwegian' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'ro', name: 'Romanian' },
  { code: 'ru', name: 'Russian' },
  { code: 'es', name: 'Spanish' },
  { code: 'sv', name: 'Swedish' },
  { code: 'ta', name: 'Tamil' },
  { code: 'te', name: 'Telugu' },
  { code: 'uk', name: 'Ukrainian' },
];

const countries = [
  { code: 'au', name: 'Australia' },
  { code: 'br', name: 'Brazil' },
  { code: 'ca', name: 'Canada' },
  { code: 'cn', name: 'China' },
  { code: 'eg', name: 'Egypt' },
  { code: 'fr', name: 'France' },
  { code: 'de', name: 'Germany' },
  { code: 'gr', name: 'Greece' },
  { code: 'hk', name: 'Hong Kong' },
  { code: 'in', name: 'India' },
  { code: 'ie', name: 'Ireland' },
  { code: 'it', name: 'Italy' },
  { code: 'jp', name: 'Japan' },
  { code: 'nl', name: 'Netherlands' },
  { code: 'no', name: 'Norway' },
  { code: 'pk', name: 'Pakistan' },
  { code: 'pe', name: 'Peru' },
  { code: 'ph', name: 'Philippines' },
  { code: 'pt', name: 'Portugal' },
  { code: 'ro', name: 'Romania' },
  { code: 'ru', name: 'Russian Federation' },
  { code: 'sg', name: 'Singapore' },
  { code: 'es', name: 'Spanish' },
  { code: 'se', name: 'Swedish' },
  { code: 'ch', name: 'Switzerland' },
  { code: 'tw', name: 'Taiwan' },
  { code: 'ua', name: 'Ukraine' },
  { code: 'gb', name: 'United Kingdom' },
  { code: 'us', name: 'United States' },
];

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [language, setLanguage] = useState('en');
  const [country, setCountry] = useState('in');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`/api/news?lang=${language}&country=${country}`)
      .then((res) => {
        if (!res.ok) {
          return res.text().then(text => { throw new Error(text || 'Network response was not ok') });
        }
        return res.json();
      })
      .then((data) => {
        if (data.articles && Array.isArray(data.articles)) {
          setArticles(data.articles);
        } else {
          throw new Error(data.message || 'No articles found or data in unexpected format.');
        }
        setLoading(false);
      })
      .catch((err) => {
        try {
          const errorJson = JSON.parse(err.message);
          setError(errorJson.message);
        } catch (e) {
          setError(err.message);
        }
        setLoading(false);
      });
  }, [language, country]);

  return (
    <div className="App">
      <header className="App-header">
        <div className="toggle-corner-wrapper">
          <button
            className={`dark-mode-toggle${darkMode ? ' active' : ''}`}
            onClick={() => setDarkMode((prev) => !prev)}
            aria-label="Toggle dark mode"
          >
            {darkMode ? '🌙 Dark' : '☀️ Light'}
          </button>
        </div>
        <h1>HEADLINE <span>EXPO</span></h1>
        <div className="controls">
          <div className="control-group">
            <label htmlFor="language-select">Language: </label>
            <select 
              id="language-select" 
              value={language} 
              onChange={(e) => setLanguage(e.target.value)}
            >
              {languages.map(lang => (
                <option key={lang.code} value={lang.code}>{lang.name}</option>
              ))}
            </select>
          </div>
          <div className="control-group">
            <label htmlFor="country-select">Country: </label>
            <select 
              id="country-select" 
              value={country} 
              onChange={(e) => setCountry(e.target.value)}
            >
              {countries.map(c => (
                <option key={c.code} value={c.code}>{c.name}</option>
              ))}
            </select>
          </div>
        </div>
      </header>
      <main>
        {loading && <div className="loader"></div>}
        {error && <div className="error-message">{error}</div>}
        <ul className="articles">
          {articles.map((article, index) => (
            <li key={index}>
              <article className="article">
                <div className="article-image-container">
                  <img src={article.image} alt={article.title} className="article-image" />
                </div>
                <div className="article-content">
                  <h2><a href={article.url} target="_blank" rel="noopener noreferrer">{article.title}</a></h2>
                  <p>{article.description}</p>
                  <small className="article-source">Source: {article.source.name}</small>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
