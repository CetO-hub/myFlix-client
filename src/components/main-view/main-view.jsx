import { React, useEffect, useState } from "react";
import { CONSTANTS } from "../../constants";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

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

    fetch(`${CONSTANTS.API_URL}/movies`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        const fetchedMovies = data.map((movie) => {
          return {
            ...movie,
            id: movie._id,
          };
        });
        setMovies(fetchedMovies);
      });
  }, [token]);

  return (
    <Row className="justify-content-md-center">
      {!user ? (
        <Col md={5}>
          <LoginView
            onLoggedIn={(user, token) => {
              setUser(user);
              setToken(token);
            }}
          />
          <SignupView />
        </Col>
      ) : movieSelected ? (
        <Col md={8}>
          <MovieView
            movieSelected={movieSelected}
            onBackClick={() => setMovieSelected(null)}
          />
        </Col>
      ) : movies.length === 0 ? (
        <div>List is empty</div>
      ) : (
        <>
          {movies.map((movie) => {
            return (
              <Col key={movie.id} className="mb-5" md={3}>
                <MovieCard
                  movies={movie}
                  onMovieClick={(newMovieSelected) => {
                    setMovieSelected(newMovieSelected);
                  }}
                />
              </Col>
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
      )}
    </Row>
  );
};
