const API_BASE = "http://localhost:4000/api";

async function searchMovies() {
  const title = document.getElementById("searchInput").value;

  const res = await fetch(`${API_BASE}/search?title=${title}`);
  const data = await res.json();

  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "";

  if (!data.Search) return;

  data.Search.forEach(movie => {
    resultsDiv.innerHTML += `
      <div class="movie-card" onclick="showDetail('${movie.imdbID}')">
        <img src="${movie.Poster}" />
        <h4>${movie.Title} (${movie.Year})</h4>
      </div>
    `;
  });
}

async function showDetail(id) {
  const res = await fetch(`${API_BASE}/movie/${id}`);
  const data = await res.json();

  document.getElementById("movieDetail").innerHTML = `
    <h2>${data.Title}</h2>
    <p><b>Plot:</b> ${data.Plot}</p>
    <p><b>Director:</b> ${data.Director}</p>
    <p><b>Actors:</b> ${data.Actors}</p>
    <p><b>Ratings:</b> ${data.imdbRating}</p>
  `;
}
