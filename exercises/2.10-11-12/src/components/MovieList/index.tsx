import type { Movie } from "../../type";

interface MovieListProps {
  movieList: Movie[];
}

const MovieList = ({ movieList }: MovieListProps) => {
  return (
    <div>
      {movieList.map((m) => (
        <div key={m.title} style={{ border: "1px solid #ccc", padding: 10, marginBottom: 10 }}>
          <h3>{m.title}</h3>
          <p>Director: {m.director}</p>
          <p>Duration: {m.duration} min</p>

          {m.budget !== undefined && <p>Budget: {m.budget} M</p>}
          {m.description && <p>{m.description}</p>}
          {m.imageUrl && <img src={m.imageUrl} alt={m.title} width={180} />}
        </div>
      ))}
    </div>
  );
};

export default MovieList;
