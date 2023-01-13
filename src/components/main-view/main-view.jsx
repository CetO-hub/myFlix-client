import { React, useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([]);

  const [movieSelected, setMovieSelected] = useState(null);

  useEffect(() => {
    fetch("https://my-flix-movie.herokuapp.com/movies")
      .then((response) => response.json())
      .then((data) => {
        const fetchedMovies = data.map((movie) => {
          return {
            id: movie._id,
            Title: movie.Title,
            Description: movie.Description,
            Genre: movie.Genre,
            Director: movie.Director,
            ImagePath: movie.ImagePath,
            Featured: movie.Featured,
          };
        });
        setMovies(fetchedMovies);
      });
  }, []);

  if (movieSelected) {
    return (
      <MovieView
        movieSelected={movieSelected}
        onBackClick={() => setMovieSelected(null)}
      />
    );
  }

  if (movies.length === 0) {
    return <div>List is empty</div>;
  }

  return (
    <>
      {movies.map((movie) => {
        return (
          <MovieCard
            key={movie.id}
            movies={movie}
            onMovieClick={(newMovieSelected) => {
              setMovieSelected(newMovieSelected);
            }}
          />
        );
      })}
    </>
  );
};
