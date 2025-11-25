require('dotenv').config();
const axios = require("axios");
const cache = require("../cache/simpleCache");

const BASE_URL = "https://www.omdbapi.com/";

async function fetchMovie(params) {
  const key = JSON.stringify(params);
  const cached = cache.get(key);
  if (cached) return cached;

  const response = await axios.get(BASE_URL, {
    params: { ...params, apikey: process.env.OMDB_API_KEY }
  });

  cache.set(key, response.data);
  return response.data;
}

module.exports = { fetchMovie };
