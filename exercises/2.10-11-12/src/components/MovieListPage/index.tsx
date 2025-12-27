import MovieList from "../MovieList";
import AddMovie from "../AddMovie";
import type { Movie } from "../../type";
import { useState } from "react";

const defaultMovies : Movie[]= [
  {
    title: "Avengers 1",
    director: "Moi",
    duration: 159,
    imageUrl: "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?w=200",
    description: "HAHAHAHA TROP COOLL",
    budget: 5550,
  },
  {
    title: "Avengers 2",
    director: "Zakaria",
    duration: 160,
  },
  {
    title: "Avengers 3",
    director: "Amine",
    duration: 167,
  },
  {
    title: "Avengers 4",
    director: "Walid",
    duration: 121,
  },
  {
    title: "Avengers 5",
    director: "Toi",
    duration: 115,
  }
]

const MovieListPage = () => {
    const [movies, setMovies] = useState(defaultMovies);

    const addMovie = (newMovie: Movie)=>{
        console.log("Movie to add:", newMovie)
        setMovies([...movies, newMovie])
    }
    return (
        <>
            <h1>Mes films</h1>
            <br /> <br />
            <AddMovie onAddMovie={addMovie}/>
            <br /> <br />
            <MovieList movieList={movies}/>
        </>
    );
};

export default MovieListPage;