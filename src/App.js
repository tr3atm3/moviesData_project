import React, { useState, useEffect, useCallback } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";
import Loader from "./components/Loader";
import AddMovie from "./components/AddMovie";
import { findByPlaceholderText } from "@testing-library/react";

let again;
function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const dataJson = await fetch(
        "https://movierating-65c20-default-rtdb.asia-southeast1.firebasedatabase.app/movies.json"
      );
      if (!dataJson.ok) {
        throw new Error("Something went wrong! ..... Retrying");
      }
      const data = await dataJson.json();
      console.log(data);
      const loadedMovies = [];
      for (const key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate,
        });
      }

      setMovies(loadedMovies);
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, []);
  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  const handleFormSubmit = (data) => {
    console.log(data);
    addMovieHandler(data);
  };
  async function addMovieHandler(movie) {
    const res = await fetch(
      "https://movierating-65c20-default-rtdb.asia-southeast1.firebasedatabase.app/movies.json",
      {
        method: "POST",
        body: JSON.stringify(movie),
        header: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    console.log(data);
  }
  let content = <p>Found no movies.</p>;
  if (movies.length > 0) {
    content = (
      <MoviesList movies={movies} fetchMoviesHandler={fetchMoviesHandler} />
    );
  }
  if (error) {
    content = <p>{error}</p>;
  }
  if (isLoading) {
    content = <Loader />;
  }
  const onStopClickHandler = () => {
    fetchMoviesHandler();
  };
  return (
    <React.Fragment>
      <AddMovie handleFormSubmit={handleFormSubmit} />
      <section>
        <button onClick={onStopClickHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
