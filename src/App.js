import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";
import Loader from "./components/Loader";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const fetchMoviesHandler = async () => {
    setIsLoading(true);
    try {
      const dataJson = await fetch("https://swapi.dev/api/films");
      const data = await dataJson.json();

      const transformedMovies = data.results.map((movie) => {
        return {
          id: movie.episode_id,
          title: movie.title,
          openingText: movie.opening_crawl,
          releaseDate: movie.release_date,
        };
      });
      setIsLoading(false);
      setMovies(transformedMovies);
    } catch {
      setIsLoading(false);
    }
  };

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {isLoading && <Loader />}

        {!isLoading && movies.length === 0 && <p>No Movies Found</p>}
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
      </section>
    </React.Fragment>
  );
}

export default App;
