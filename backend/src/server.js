const express = require('express');
const app = express();
// Middleware to parse JSON bodies
app.use(express.json());

// Route handler for a basic search endpoint
app.get('/search', (req, res) => {
  const query = req.query.q;
  const format = req.query.format;

  if (!query) {
    return res.status(400).send({ error: "Missing required parameter: q" });
  }

  // Simulate processing based on the query and format
  console.log(`Received search request for query: ${query}, format: ${format || 'N/A'}`);

  if (format === 'json') {
    res.json({
      search_term: query,
      results: [
        { title: `${query} result 1`, snippet: `Found details for ${query}.` },
        { title: `${query} result 2`, snippet: `More info on ${query}.` }
      ],
      source: "Mock Search API"
    });
  } else {
    res.send(`<h1>Search Results</h1><p>Query: ${query}</p><p>Format requested: ${format || 'text'}</p>`);
  }
});

// Start the server on port 8081 as suggested by the curl example
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  console.log("Test endpoint: http://localhost:" + PORT + "/search?q=ollama&format=json");
});
import authRouter from "./routes/userRoutes.js"
const app = express();
app.use(express.json())
app.use("/auth",createUserRoutes);
app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
const startServer = () => {};
