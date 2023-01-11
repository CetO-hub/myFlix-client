import React from "react";

export const MovieView = ({ movieSelected, onBackClick }) => {
  return (
    <>
      <div>
        <img src={movieSelected.ImagePath} height="500px" />
      </div>
      <div>
        <span>Title: </span>
        <span>{movieSelected.Title}</span>
      </div>
      <div>
        <span>Description: </span>
        <span>{movieSelected.Description}</span>
      </div>
      <div>
        <span>Genre: </span>
        <span>{movieSelected.Genre.Name}</span>
      </div>
      <div>
        <span>Genre-Description: </span>
        <span>{movieSelected.Genre.Description}</span>
      </div>
      <div>
        <span>Directror: </span>
        <span>{movieSelected.Director.Name}</span>
      </div>
      <div>
        <span>Directror-Bio: </span>
        <span>{movieSelected.Director.Bio}</span>
      </div>
      <div>
        <span>Directror-Birth: </span>
        <span>{movieSelected.Director.Birth}</span>
      </div>
      <div>
        <span>Directror-Death: </span>
        <span>{movieSelected.Director.Death}</span>
      </div>
      <button onClick={onBackClick}>Back</button>
    </>
  );
};
