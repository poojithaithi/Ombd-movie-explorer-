require('dotenv').config();
const express = require("express");
const omdb = require("./services/omdbService");

const app = express();
const PORT = 4000;

// Search movies
app.get("/api/search", async (req, res) => {
  const { title } = req.query;
  if (!title) return res.status(400).send({ error: "title is required" });

  const data = await omdb.fetchMovie({ s: title });
  res.send(data);
});

// Get movie details
app.get("/api/movie/:id", async (req, res) => {
  const data = await omdb.fetchMovie({ i: req.params.id, plot: "full" });
  res.send(data);
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
