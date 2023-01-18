import React from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { MovieCard } from "../movie-card/movie-card";
import { BsFillPencilFill } from "react-icons/bs";
import Button from "react-bootstrap/Button";

export const ProfileView = ({ user }) => {
  const favoriteMovies = user.FavoriteMovies;
  console.log(user);
  let birthday;

  if (user.Birthday) {
    date = new Date(user.Birthday);
    birthday = date.toLocaleString([], { dateStyle: "short" });
  } else {
    birthday = "No birthday entered";
  }

  const handleClick = (e) => {
    e.stopPropagation();
    console.log(e.target.id);
  };

  return (
    <>
      <h1 className="my-5">Account Information</h1>
      <Form>
        <Form.Group as={Row} className="mb-3">
          <Form.Label className="fw-bold" column sm="2">
            Username:
          </Form.Label>
          <Col style={{ "max-width": "max-content" }}>
            <Form.Control plaintext readOnly defaultValue={user.Username} />
          </Col>
          <Col md={2}>
            <Button
              id="Username"
              variant="Light"
              style={{
                cursor: "pointer",
              }}
              onClick={(e) => {
                handleClick(e);
              }}
            >
              <BsFillPencilFill
                size={20}
                style={{
                  "pointer-events": "none",
                }}
              />
            </Button>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label className="fw-bold" column sm="2">
            Password:
          </Form.Label>
          <Col style={{ "max-width": "max-content" }}>
            <Form.Control
              type="password"
              plaintext
              readOnly
              defaultValue="******"
            />
          </Col>
          <Col md={2}>
            <Button
              id="Password"
              variant="Light"
              style={{
                cursor: "pointer",
              }}
              onClick={(e) => {
                handleClick(e);
              }}
            >
              <BsFillPencilFill
                size={20}
                style={{
                  "pointer-events": "none",
                }}
              />
            </Button>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label className="fw-bold" column sm="2">
            Email:
          </Form.Label>
          <Col style={{ "max-width": "max-content" }}>
            <Form.Control
              type="email"
              plaintext
              readOnly
              defaultValue={user.Email}
            />
          </Col>
          <Col md={2}>
            <Button
              id="Email"
              variant="Light"
              style={{
                cursor: "pointer",
              }}
              onClick={(e) => {
                handleClick(e);
              }}
            >
              <BsFillPencilFill
                size={20}
                style={{
                  "pointer-events": "none",
                }}
              />
            </Button>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label className="fw-bold" column sm="2">
            Birthday:
          </Form.Label>
          <Col style={{ "max-width": "max-content" }}>
            <Form.Control plaintext readOnly defaultValue={birthday} />
          </Col>
          <Col md={2}>
            <Button
              id="Birthday"
              variant="Light"
              style={{
                cursor: "pointer",
              }}
              onClick={(e) => {
                handleClick(e);
              }}
            >
              <BsFillPencilFill
                size={20}
                style={{
                  "pointer-events": "none",
                }}
              />
            </Button>
          </Col>
        </Form.Group>
      </Form>

      <h1 className="my-5">Favorite Movies</h1>
      {favoriteMovies.length === 0 ? (
        <div>List is empty</div>
      ) : (
        <>
          {favoriteMovies.map((movie) => {
            return (
              <Col key={movie.id} className="mb-5" md={3}>
                <MovieCard movies={movie} />
              </Col>
            );
          })}
        </>
      )}
    </>
  );
};
