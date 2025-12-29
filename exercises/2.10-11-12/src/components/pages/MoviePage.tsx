import { useMatch, useOutletContext } from "react-router-dom";
import type { MovieContext } from "../../type";
import MovieCard from "../MovieCard";

const MoviePage = () => {
    const {movies} :MovieContext = useOutletContext();

    const moviePath = useMatch("/movie/:id");
    const movieId = Number(moviePath?.params.id);
    if(isNaN(movieId)) return <p>Movie not found</p>

    const movieFound= movies.find((movie) => movie.id === movieId);

    if(!movieFound) return <p>Movie Not Found</p>
    return (
        <MovieCard movie={movieFound} />
    );
};

export default MoviePage;