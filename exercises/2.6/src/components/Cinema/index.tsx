import type { Movie } from "../../type";
import MovieItem from "../MovieItem";

interface CinemaProps {
  name: string;
  movies: Movie[];
}

const Cinema = (props: CinemaProps) => {
  return (
    <div>
      <h2>{props.name}</h2>
      <ul>
        {props.movies.map((movie)=> (
            <li key={'${movie.title}-${movie.director}'}>
              <MovieItem movie={movie}></MovieItem>
            </li>
        ))}
      </ul>
    </div>
  );
};

export default Cinema;

