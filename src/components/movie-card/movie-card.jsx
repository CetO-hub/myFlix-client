import React from "react";
import PropTypes from "prop-types";
import { Card, CardImg, Icon } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

export const MovieCard = ({
  movies,
  isFavorite,
  user,
  handleRemoveFavoriteMovie,
}) => {
  let movieFavorite = user.FavoriteMovies.includes(movies.id);

  return (
    <>
      <Link
        className="text-reset"
        style={{ zIndex: "-1", textDecoration: "none" }}
        to={`/movies/${encodeURIComponent(movies.id)}`}
      >
        <Card className="h-100" variant="link">
          <CardImg variant="top" src={movies.ImagePath} height="428px" />
          <Card.Body className="">
            {movieFavorite ? (
              // Display filled heart icon when movie added to favorite list
              <AiFillHeart
                size={30}
                color="red"
                style={{
                  cursor: "pointer",
                  zIndex: "999",
                  marginBottom: "1rem",
                }}
                onClick={(e) => {
                  handleRemoveFavoriteMovie(movies.id);
                  e.preventDefault();
                  e.stopPropagation();
                }}
              />
            ) : (
              // Display heart-outline icon when movie is not in the favorite list
              <AiOutlineHeart
                onClick={(e) => {
                  isFavorite(movies.id);
                  e.preventDefault();
                  e.stopPropagation();
                }}
                size={30}
                color="red"
                style={{
                  cursor: "pointer",
                  zIndex: "999",
                  marginBottom: "1rem",
                }}
              />
            )}

            <Card.Title className="fw-bold">{movies.Title}</Card.Title>

            <Card.Text className="mt-5">{movies.Description}</Card.Text>
          </Card.Body>
        </Card>
      </Link>
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
