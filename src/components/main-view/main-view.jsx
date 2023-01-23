import { React, useEffect, useState } from "react";
import { CONSTANTS } from "../../constants";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Container } from "react-bootstrap";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);

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

  const isFavorite = (movieId) => {
    const data = {
      Username: user.Username,
    };

    fetch(`${CONSTANTS.API_URL}/users/${movieId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleRemoveFavoriteMovie = (movieId) => {
    fetch(`${CONSTANTS.API_URL}/users/${movieId}/${user.Username}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Context-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <BrowserRouter>
      <Row>
        <Col>
          <NavigationBar
            user={user}
            onLoggedOut={() => {
              setUser(null);
              setToken(null);
              localStorage.clear();
            }}
          />
        </Col>
      </Row>
      <Container>
        <Row className="justify-content-md-center mt-5">
          <Routes>
            <Route
              path="/signup"
              element={
                <>
                  {user ? (
                    <Navigate to="/" />
                  ) : (
                    <Col md={5}>
                      <SignupView />
                    </Col>
                  )}
                </>
              }
            />
            <Route
              path="/login"
              element={
                <>
                  {user ? (
                    <Navigate to="/" />
                  ) : (
                    <Col md={5}>
                      <LoginView
                        onLoggedIn={(user, token) => {
                          setUser(user);
                          setToken(token);
                        }}
                      />
                    </Col>
                  )}
                </>
              }
            />
            <Route
              path="/movies/:movieId"
              element={
                <>
                  {!user ? (
                    <Navigate to="/login" replace />
                  ) : movies.length === 0 ? (
                    <div>List is empty</div>
                  ) : (
                    <Col md={8}>
                      <MovieView movies={movies} />
                    </Col>
                  )}
                </>
              }
            />
            <Route
              path="/profile"
              element={
                <>
                  {!user ? (
                    <Navigate to="/login" replace />
                  ) : (
                    <Col className="me-auto">
                      <ProfileView
                        user={user}
                        token={token}
                        movies={movies}
                        onUpdate={(user) => {
                          setUser(user);
                        }}
                        onDelete={() => {
                          setUser(null);
                          setToken(null);
                          localStorage.clear();
                        }}
                        handleRemoveFavoriteMovie={handleRemoveFavoriteMovie}
                      />
                    </Col>
                  )}
                </>
              }
            />
            <Route
              path="/"
              element={
                <>
                  {!user ? (
                    <Navigate to="/login" replace />
                  ) : movies.length === 0 ? (
                    <div>List is empty</div>
                  ) : (
                    <>
                      {movies.map((movie) => {
                        return (
                          <Col key={movie.id} className="mb-5" md={3}>
                            <MovieCard
                              movies={movie}
                              user={user}
                              isFavorite={isFavorite}
                              handleRemoveFavoriteMovie={() =>
                                handleRemoveFavoriteMovie(movie.id)
                              }
                            />
                          </Col>
                        );
                      })}
                    </>
                  )}
                </>
              }
            />
          </Routes>
        </Row>
      </Container>
    </BrowserRouter>
  );
};
