import React from "react";
import PropTypes from "prop-types";
import { Card, CardImg } from "react-bootstrap";

export const MovieCard = ({ movies, onMovieClick }) => {
  return (
    <>
      <Card
        className="h-100"
        onClick={() => {
          onMovieClick(movies);
        }}
        variant="link"
      >
        <CardImg variant="top" src={movies.ImagePath} />
        <Card.Body>
          <Card.Title className="display-6">{movies.Title}</Card.Title>
          <Card.Text>{movies.Description}</Card.Text>
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
  onMovieClick: PropTypes.func.isRequired,
};
