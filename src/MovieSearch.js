import React, { useState } from "react";

const API_KEY = "99eb9fd1";

function MovieSearch() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!query.trim()) return;

    try {
      const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`);
      const data = await res.json();

      if (data.Response === "True") {
        setMovies(data.Search);
        setError("");
      } else {
        setError("Invalid movie name. Please try again.");
        setMovies([]);
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again later.");
      setMovies([]);
    }
  };

  return (
    <div>
      {/* ✅ Wrap input/button in form tag */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch();
        }}
      >
        <input
          type="text"
          placeholder="Enter movie name"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {/* ✅ Error message */}
      {error && <p className="error">{error}</p>}

      {/* ✅ Render results inside <ul> with <li> elements */}
      <ul className="movie-list">
        {movies.map((movie) => (
          <li key={movie.imdbID} className="movie-card">
            <img
              src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/150"}
              alt={movie.Title}
            />
            <h3>{movie.Title}</h3>
            <p>{movie.Year}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MovieSearch;
