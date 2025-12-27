import type { Movie } from "../../type";
import { useState } from "react";

interface MovieItemProps {
    movie:Movie;
}

const MovieItem = ({movie}: MovieItemProps) => {
    const [description, setDescription] = useState(false)

    return (
        <div onClick= {() => setDescription(!description)}>
            <strong>{movie.title}</strong> - Réalisateur : {movie.director}
            {description ? <p>{movie.description}</p> : " "}   
        </div>
    );
};

export default MovieItem;