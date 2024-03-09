import React, { useRef } from "react";
import classes from "./AddMovie.module.css";
const AddMovie = (props) => {
  const title = useRef("");
  const openingText = useRef("");
  const release_date = useRef("");

  const handleForm = (e) => {
    e.preventDefault();
    const data = {
      title: title.current.value,
      openingText: openingText.current.value,
      release_date: release_date.current.value,
    };
    props.handleFormSubmit(data);
  };

  return (
    <div>
      <form className={classes.form} onSubmit={handleForm}>
        <div>
          <label htmlFor="title">Title</label>

          <input type="text" id="title" ref={title}></input>
        </div>
        <div>
          <label htmlFor="opening">Opening Text</label>

          <input
            type="text"
            id="opening"
            className={classes.textArea}
            ref={openingText}
          ></input>
        </div>
        <div>
          <label htmlFor="release_date">Release Date</label>
          <input type="text" id="release_date" ref={release_date}></input>
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default AddMovie;
