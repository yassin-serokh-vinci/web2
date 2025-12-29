import { useOutletContext } from "react-router-dom";
import type { MovieContext } from "../../type";
import PageTitle from "../PageTitle";
import MovieTitleList from "../MovieTitleList";

const HomePage = () => {
  const { movies }: MovieContext = useOutletContext();

  return (
    <div>
      <PageTitle title="myMovies" />
      <p>Welcome to myMovies, a site where you can find info about cinemas movies...</p>
      <h4>Favorite movies</h4>
      <MovieTitleList movies={movies}/>
    </div>
  );
};
export default HomePage;