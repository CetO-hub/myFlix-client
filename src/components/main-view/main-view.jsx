import { React, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: "1",
      Title: "Looper",
      Description:
        "In 2074, when the mob wants to get rid of someone, the target is sent into the past, where a hired gun awaits - someone like Joe - who one day learns the mob wants to 'close the loop' by sending back Joe's future self for assassination.",
      Genre: {
        Name: "Action",
        Description:
          "Also called `action-adventure,` action is a genre of film, TV, literature, etc., in which the primary feature is the constant slam-bang of fights, chases, explosions, and clever one-liners. Action stories typically do not explore complex relationships between human beings or the subtleties of psychology and philosophy. Instead, they are high-octane thrillers that simply aim to give the reader an exciting ride. ",
      },
      Director: {
        Name: "Rian Johnson",
        Bio: "Rian Johnson was born in Maryland and at a young age his family moved to San Clemente, California, where he was raised. After graduating from high school, he went on to attend the University of Southern California School of Cinematic Arts. His first feature film, Brick (2005), was released in 2005 and was the metaphorical building block that launched his career. He is a director, writer, and musician, among other areas of expertise.",
        Birth: "1973",
        Death: "n/A",
      },
      ImagePath:
        "http://4.bp.blogspot.com/-NXE_nmQPNMw/VPYhK8r27fI/AAAAAAAABZ4/CJB_lI--xiU/s1600/Looper.jpg",
      Featured: true,
    },
    {
      id: "2",
      Title: "Silence of the Lambs",
      Description:
        "A young FBI cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer.",
      Genre: {
        Name: "Thriller",
        Description:
          "Thriller film, also known as suspense film or suspense thriller, is a broad film genre that involves excitement and suspense in the audience.",
      },
      Director: {
        Name: "Jonathan Demme",
        Bio: "Robert Jonathan Demme was an American director, producer, and screenwriter.",
        Birth: "1944",
        Death: "2017",
      },
      ImagePath:
        "http://posterwire.com/wp-content/uploads/silence_of_the_lambs.jpg",
      Featured: true,
    },
    {
      id: "3",
      Title: "Avatar",
      Description:
        "A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.",
      Genre: {
        Name: "Action",
        Description:
          "Also called `action-adventure,` action is a genre of film, TV, literature, etc., in which the primary feature is the constant slam-bang of fights, chases, explosions, and clever one-liners. Action stories typically do not explore complex relationships between human beings or the subtleties of psychology and philosophy. Instead, they are high-octane thrillers that simply aim to give the reader an exciting ride. ",
      },
      Director: {
        Name: "James Cameron",
        Bio: "James Francis Cameron was born on August 16, 1954 in Kapuskasing, Ontario, Canada. He moved to the United States in 1971.",
        Birth: "1954",
        Death: "n/A",
      },
      ImagePath:
        "https://www.suzimcalpine.com/wp-content/uploads/2014/03/stephen_lang_avatar_wallpaper-wide.jpg",
      Featured: true,
    },
  ]);

  const [movieSelected, setMovieSelected] = useState(null);

  if (movieSelected) {
    return (
      <MovieView
        movieSelected={movieSelected}
        onBackClick={() => setMovieSelected(null)}
      />
    );
  }

  if (movies.length === 0) {
    return <div>List is empty</div>;
  }

  return (
    <>
      {movies.map((movie) => {
        return (
          <MovieCard
            key={movie.id}
            movies={movie}
            onMovieClick={(newMovieSelected) => {
              setMovieSelected(newMovieSelected);
            }}
          />
        );
      })}
    </>
  );
};
