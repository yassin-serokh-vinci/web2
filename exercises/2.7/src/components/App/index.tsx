import { useState } from "react";
import type { Movie } from "../../type";
import AddMovie from "../AddMovie";


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

const App = () => {
  
  const [movies, setMovies] = useState(defaultMovies);

  const addMovie = (newMovie: Movie)=>{
    console.log("Movie to add:", newMovie)
    setMovies([...movies, newMovie])
  }

  return (
    <div>
      <header className="header">
        <h1>Tous les films</h1>
      </header>
      <main className="main">
        {movies.map((movie)=> <p>{movie.title} <br/> {movie.director} <br/> {movie.duration} <br/> {movie.imageUrl} <br/> {movie.description} <br/> {movie.budget}</p>)}

        <AddMovie addMovie={addMovie}/>
      </main>
    </div>
  )
}

export default App;