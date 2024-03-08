import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";
import Loader from "./components/Loader";

let again;
function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const fetchMoviesHandler = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const dataJson = await fetch("https://swapi.dev/api/films");

      if (!dataJson.ok) {
        throw new Error("Something went wrong! ..... Retrying");
      }
      const data = await dataJson.json();
      const transformedMovies = data.results.map((movie) => {
        return {
          id: movie.episode_id,
          title: movie.title,
          openingText: movie.opening_crawl,
          releaseDate: movie.release_date,
        };
      });

      clearTimeout(again);
      setMovies(transformedMovies);
    } catch (error) {
      setError(error.message);
      again = setTimeout(() => fetchMoviesHandler(), 5000);
    }
    setIsLoading(false);
  };

  let content = <p>Found no movies.</p>;
  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }
  if (error) {
    content = <p>{error}</p>;
  }
  if (isLoading) {
    content = <Loader />;
  }
  const onStopClickHandler = () => {
    clearTimeout(again);
  };
  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
        <button onClick={onStopClickHandler}>Stop Retrying</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
