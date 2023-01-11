import React from "react";

export const MovieCard = ({ movies, onMovieClick }) => {
  return <div onClick={() => onMovieClick(movies)}>{movies.Title}</div>;
};
