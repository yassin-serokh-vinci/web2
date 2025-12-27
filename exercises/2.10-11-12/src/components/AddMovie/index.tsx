import { useState } from "react";
import type { SyntheticEvent } from "react";
import type { Movie } from "../../type";
import "./AddMovie.css";

interface AddMovieProps {
    onAddMovie: (movie: Movie ) => void;
}

const AddMovie = ({onAddMovie}: AddMovieProps) => {
    const [title, setTitle] = useState("");
    const [director, setDirector]= useState("");
    const [duration, setDuration]= useState(0);
    
    const [imageUrl, setImageUrl] = useState("");
    const [description, setDescription] = useState("");
    const [budget, setBudget]= useState(0);

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        onAddMovie({title, director, duration, imageUrl, description, budget});
        setTitle("");
        setDirector("");
        setDuration(0);
        setImageUrl("");
        setDescription("");
        setBudget(0);
    }

    return(
        <div className="movie">
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Titre</label>
                <input 
                    value={title}
                    type="text"
                    onChange={(e)=> setTitle(e.target.value)} 
                    required
                />
                <label htmlFor="director">Directeur</label>
                <input 
                    value={director}
                    type="text"
                    onChange={(e)=> setDirector(e.target.value)} 
                    required
                />
                <label htmlFor="duration">Duration</label>
                <input 
                    value={duration}
                    type="number"
                    onChange={(e)=> setDuration(parseInt(e.target.value))} 
                    required
                />
                <label htmlFor="imageUrl">Image</label>
                <input 
                    value={imageUrl}
                    type="text"
                    onChange={(e)=> setImageUrl(e.target.value)} 
                />
                <label htmlFor="description">Description</label>
                <input 
                    value={description}
                    type="text"
                    onChange={(e)=> setDescription(e.target.value)} 
                />
                <label htmlFor="budget">Budget</label>
                <input 
                    value={budget}
                    type="number"
                    onChange={(e)=> setBudget(parseInt(e.target.value))} 
                />
                <button type="submit">Ajouter</button>
            </form>
        
        </div>
    );
};

export default AddMovie;