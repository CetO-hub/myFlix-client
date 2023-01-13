import { React, useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [movieSelected, setMovieSelected] = useState(null);

  useEffect(() => {
    if (!token) {
      return;
    }

    fetch("https://my-flix-movie.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
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
  }, [token]);

  if (!user) {
    return (
      <>
        <LoginView
          onLoggedIn={(user, token) => {
            setUser(user);
            setToken(token);
          }}
        />
        <SignupView />
      </>
    );
  }

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
      <button
        onClick={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}
      >
        Logout
      </button>
    </>
  );
};
