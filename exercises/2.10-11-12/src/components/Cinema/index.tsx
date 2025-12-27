import type { Movie } from "../../type";
import MovieItem from "../MovieItem/index";

interface CinemaProps {
  name: string;
  moviesCinema: Movie[];
}

const Cinema = ({name, moviesCinema}: CinemaProps) => {
  return (
    <div>
      <h2>{name}</h2>
      <ul>
        {moviesCinema.map((movie)=> (
            <li key={'${movie.title}-${movie.director}'}>
              <MovieItem movie={movie}></MovieItem>
            </li>
        ))}
      </ul>
    </div>
  );
};

export default Cinema;

