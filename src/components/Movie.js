import React from "react";

import classes from "./Movie.module.css";

const Movie = (props) => {
  console.log(props.id);
  const handleDeleteBtn = async () => {
    await fetch(
      `https://movierating-65c20-default-rtdb.asia-southeast1.firebasedatabase.app/movies/${props.id}.json`,
      {
        method: "DELETE",
      }
    );
    props.fetchMoviesHandler();
  };
  return (
    <li className={classes.movie}>
      <h2>{props.title}</h2>
      <h3>{props.releaseDate}</h3>
      <p>{props.openingText}</p>
      <button onClick={handleDeleteBtn}>Delete</button>
    </li>
  );
};

export default Movie;
