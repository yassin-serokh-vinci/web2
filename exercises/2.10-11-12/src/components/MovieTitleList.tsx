import type { Movie } from "../type";
import { Link } from "react-router-dom";
//import { useNavigate } from "react-router-dom";

interface MovieTitleListProps {
    movies: Movie[];
}

const MovieTitleList = ({movies}: MovieTitleListProps) => {
    return (
        <ul>
            {movies.map((movie)=> (
                <li key={movie.id}>
                    <Link to={`/movie/${movie.id}`}>{movie.title}</Link>
                </li>
            ))}
        </ul>
    );
};

export default MovieTitleList;
