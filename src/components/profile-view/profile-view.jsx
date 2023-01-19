import { React, useState, useRef } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { MovieCard } from "../movie-card/movie-card";
import { BsFillPencilFill } from "react-icons/bs";
import Button from "react-bootstrap/Button";
import { CONSTANTS } from "../../constants";

export const ProfileView = ({ user, token, onUpdate }) => {
  const [newUsername, setNewUsername] = useState(user.Username);
  const [newPassword, setNewPassword] = useState("");
  const [newEmail, setNewEmail] = useState(user.Email);
  const [newBirthday, setNewBirthday] = useState(
    new Date(user.Birthday).toLocaleString("en-CA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
  );

  // Global variables

  const favoriteMovies = user.FavoriteMovies;

  const username = useRef();
  const password = useRef();
  const email = useRef();
  const birthday = useRef();
  const submit = useRef();

  const removeReadOnly = (ref) => {
    switch (ref) {
      case "username":
        username.current.disabled = false;
        username.current.focus();
        password.current.disabled = false;
        submit.current.disabled = false;
        break;
      case "email":
        email.current.disabled = false;
        email.current.focus();
        password.current.disabled = false;
        submit.current.disabled = false;
        break;
      case "birthday":
        birthday.current.disabled = false;
        birthday.current.focus();
        password.current.disabled = false;
        submit.current.disabled = false;
        break;
    }
  };

  // Update data in data bank

  const updateUser = (updatedUser) => {
    setNewUsername(updatedUser.Username);
    setNewEmail(updatedUser.Email);
    setNewBirthday(
      new Date(updatedUser.Birthday).toLocaleString("en-CA", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      Username: newUsername,
      Password: newPassword,
      Email: newEmail,
      Birthday: newBirthday,
    };

    fetch(`${CONSTANTS.API_URL}/users/${user._id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((updatedUser) => {
        console.log(updatedUser);

        localStorage.setItem("user", JSON.stringify(updatedUser));
        onUpdate(updatedUser);
        updateUser(updatedUser);
        alert("Account information updated");
        window.location.reload();
      })

      .catch((e) => {
        console.log(`Somenthing went wrong: ${e}`);
      });
  };

  return (
    <>
      <h1 className="my-5">Account Information</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} className="mb-3">
          <Form.Label className="fw-bold" column sm="2">
            Username:
          </Form.Label>
          <Col md={4}>
            <Form.Control
              type="text"
              ref={username}
              minLength="5"
              disabled={true}
              value={newUsername}
              onInput={(e) => {
                setNewUsername(e.target.value);
              }}
            />
          </Col>
          <Col md={2}>
            <Button
              variant="Light"
              style={{
                cursor: "pointer",
              }}
              onClick={() => {
                removeReadOnly("username");
              }}
            >
              <BsFillPencilFill size={20} />
            </Button>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label className="fw-bold" column sm="2">
            Email:
          </Form.Label>
          <Col md={4}>
            <Form.Control
              ref={email}
              type="email"
              disabled={true}
              value={newEmail}
              onInput={(e) => {
                setNewEmail(e.target.value);
              }}
            />
          </Col>
          <Col md={2}>
            <Button
              variant="Light"
              style={{
                cursor: "pointer",
              }}
              onClick={(e) => {
                removeReadOnly("email");
              }}
            >
              <BsFillPencilFill size={20} />
            </Button>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-5">
          <Form.Label className="fw-bold" column sm="2">
            Birthday:
          </Form.Label>
          <Col md={4}>
            <Form.Control
              ref={birthday}
              type="date"
              disabled={true}
              value={newBirthday}
              onInput={(e) => {
                setNewBirthday(e.target.value);
              }}
            />
          </Col>
          <Col md={2}>
            <Button
              variant="Light"
              style={{
                cursor: "pointer",
              }}
              onClick={(e) => {
                removeReadOnly("birthday");
              }}
            >
              <BsFillPencilFill size={20} />
            </Button>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label className="fw-bold" column sm="2">
            Password:
          </Form.Label>
          <Col md={4}>
            <Form.Control
              ref={password}
              type="password"
              disabled
              required
              value={newPassword}
              onInput={(e) => {
                setNewPassword(e.target.value);
              }}
            />
          </Col>
        </Form.Group>
        <Row className="text-center">
          <Col md={6}>
            <Button ref={submit} type="submit" disabled={true}>
              Save
            </Button>
          </Col>
        </Row>
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
