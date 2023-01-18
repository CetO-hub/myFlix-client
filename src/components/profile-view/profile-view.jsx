import React from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export const ProfileView = ({ user }) => {
  let birthday;

  if (user.Birthday) {
    date = new Date(user.Birthday);
    birthday = date.toLocaleString([], { dateStyle: "short" });
  } else {
    birthday = "No birthday entered";
  }

  return (
    <>
      <h1 className="my-5">Account Information</h1>
      <Form>
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextUsername">
          <Form.Label className="fw-bold" column sm="2">
            Username:
          </Form.Label>
          <Col sm="10">
            <Form.Control plaintext readOnly defaultValue={user.Username} />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
          <Form.Label className="fw-bold" column sm="2">
            Password:
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="password"
              plaintext
              readOnly
              defaultValue="******"
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
          <Form.Label className="fw-bold" column sm="2">
            Email:
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="email"
              plaintext
              readOnly
              defaultValue={user.Email}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formPlaintextBirthday">
          <Form.Label className="fw-bold" column sm="2">
            Birthday:
          </Form.Label>
          <Col sm="10">
            <Form.Control plaintext readOnly defaultValue={birthday} />
          </Col>
        </Form.Group>
      </Form>
      <h1 className="my-5">Favorite Movies</h1>
    </>
  );
};
