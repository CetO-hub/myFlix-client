import { React, useState } from "react";
import PropTypes from "prop-types";
import { CONSTANTS } from "../../constants";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Upon submit of login data, fetch the /login endpoint and store user data and user token.
  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      Username: username,
      Password: password,
    };

    fetch(`${CONSTANTS.API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Login response: ", data);
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
          onLoggedIn(data.user, data.token);
          console.log(data.user);
        } else {
          alert("No such user");
        }
      })
      .catch((e) => {
        console.log("something went wrong");
      });
  };

  return (
    <>
      <Form onSubmit={handleSubmit} className="mt-5">
        <Form.Group controlId="formUsername">
          <Form.Label>Username: </Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            minLength="5"
            required
          />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Password: </Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
          />
        </Form.Group>
        <Button className="mt-3" variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </>
  );
};

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired,
};
