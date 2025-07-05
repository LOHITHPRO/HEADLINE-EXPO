require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());

// Serve static files from the React app build directory
app.use(express.static(path.join(__dirname, '../client/build')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

app.get('/api/news', async (req, res) => {
  try {
    const lang = req.query.lang || 'en';
    const country = req.query.country || 'in';

    const response = await axios.get(
      `https://gnews.io/api/v4/top-headlines?country=${country}&lang=${lang}&apikey=${process.env.NEWS_API_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    console.error('Error in /api/news:', error.message);
    res.status(500).json({ message: error.message || 'Error fetching news' });
  }
});

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 