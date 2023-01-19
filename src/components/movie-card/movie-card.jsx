import React from "react";
import PropTypes from "prop-types";
import { Card, CardImg, Icon } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { AiOutlineHeart } from "react-icons/ai";

export const MovieCard = ({ movies }) => {
  return (
    <>
      <Card className="h-100" variant="link">
        <CardImg variant="top" src={movies.ImagePath} height="428px" />
        <Card.ImgOverlay>
          <AiOutlineHeart size={60} color="red" style={{ cursor: "pointer" }} />
        </Card.ImgOverlay>
        <Card.Body className="d-flex flex-column justify-content-between">
          <Card.Title className="display-6">{movies.Title}</Card.Title>
          <Card.Text>{movies.Description}</Card.Text>
          <Link
            style={{ "z-index": "999" }}
            to={`/movies/${encodeURIComponent(movies.id)}`}
          >
            <Button variant="link">Open</Button>
          </Link>
        </Card.Body>
      </Card>
    </>
  );
};

MovieCard.propTypes = {
  movies: PropTypes.shape({
    id: PropTypes.string,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string,
    Genre: PropTypes.shape({
      Name: PropTypes.string,
      Description: PropTypes.string,
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string,
      Bio: PropTypes.string,
    }),
    ImagePath: PropTypes.string,
    Featured: PropTypes.bool,
  }).isRequired,
};
