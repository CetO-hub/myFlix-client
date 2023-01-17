import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";

export const MovieView = ({ movieSelected, onBackClick }) => {
  return (
    <>
      <div>
        <img src={movieSelected.ImagePath} className="w-100" />
      </div>
      <div>
        <span className="fw-bold">Title: </span>
        <span>{movieSelected.Title}</span>
      </div>
      <div>
        <span className="fw-bold">Description: </span>
        <span>{movieSelected.Description}</span>
      </div>
      <div>
        <span className="fw-bold">Genre: </span>
        <span>{movieSelected.Genre.Name}</span>
      </div>
      <div>
        <span className="fw-bold">Genre-Description: </span>
        <span>{movieSelected.Genre.Description}</span>
      </div>
      <div>
        <span className="fw-bold">Directror: </span>
        <span>{movieSelected.Director.Name}</span>
      </div>
      <div>
        <span className="fw-bold">Directror-Bio: </span>
        <span>{movieSelected.Director.Bio}</span>
      </div>
      <div>
        <span className="fw-bold">Directror-Birth: </span>
        <span>{movieSelected.Director.Birth}</span>
      </div>
      <div>
        <span className="fw-bold">Directror-Death: </span>
        <span>{movieSelected.Director.Death}</span>
      </div>
      <Button variant="primary" onClick={onBackClick}>
        Back
      </Button>
    </>
  );
};

MovieView.propTypes = {
  movieSelected: PropTypes.shape({
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
  onBackClick: PropTypes.func.isRequired,
};
