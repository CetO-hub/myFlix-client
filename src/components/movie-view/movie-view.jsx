import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();

  const movie = movies.find((item) => movieId === item.id);

  return (
    <>
      <div>
        <img src={movie.ImagePath} className="w-100" />
      </div>
      <div>
        <span className="fw-bold">Title: </span>
        <span>{movie.Title}</span>
      </div>
      <div>
        <span className="fw-bold">Description: </span>
        <span>{movie.Description}</span>
      </div>
      <div>
        <span className="fw-bold">Genre: </span>
        <span>{movie.Genre.Name}</span>
      </div>
      <div>
        <span className="fw-bold">Genre-Description: </span>
        <span>{movie.Genre.Description}</span>
      </div>
      <div>
        <span className="fw-bold">Directror: </span>
        <span>{movie.Director.Name}</span>
      </div>
      <div>
        <span className="fw-bold">Directror-Bio: </span>
        <span>{movie.Director.Bio}</span>
      </div>
      <div>
        <span className="fw-bold">Directror-Birth: </span>
        <span>{movie.Director.Birth}</span>
      </div>
      <div>
        <span className="fw-bold">Directror-Death: </span>
        <span>{movie.Director.Death}</span>
      </div>
      <Link to={`/`}>
        <Button variant="primary">Back</Button>
      </Link>
    </>
  );
};

MovieView.propTypes = [
  {
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
  },
];
