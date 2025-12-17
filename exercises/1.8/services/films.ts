import path from "node:path";
import type { Film, NewFilm } from "../types";
import { parse, serialize } from "../utils/json";

const jsonDbPath = path.join(__dirname, "/../data/films.json");

const defaultFilms: Film[] = [
  {
    id: 1,
    title: "Inception",
    director: "Christopher Nolan",
    duration: 148,
    budget: 160,
    description: "Un voleur infiltre les rêves pour voler des secrets.",
    imageUrl: "https://example.com/inception.jpg",
  },
  {
    id: 2,
    title: "The Dark Knight",
    director: "Christopher Nolan",
    duration: 152,
    budget: 185,
    description: "Batman affronte le Joker à Gotham.",
    imageUrl: "https://example.com/dark-knight.jpg",
  },
  {
    id: 3,
    title: "Interstellar",
    director: "Christopher Nolan",
    duration: 169,
    budget: 165,
    description: "Des explorateurs voyagent à travers un trou de ver.",
    imageUrl: "https://example.com/interstellar.jpg",
  },
];

function readAllFilms(options: {
    minimumDuration?: number;
    titleStart?: string;
    order?: "asc" | "desc";
}): Film[] {
    let films = parse(jsonDbPath, defaultFilms);

    if(options.minimumDuration !== undefined){
        films = films.filter((film) => film.duration >=options.minimumDuration!);
    }
    if(options.titleStart){
        const start = options.titleStart.toLowerCase();
        films = films.filter((f)=> f.title.toLowerCase().startsWith(start));
    }
    if(options.order === "asc"){
        films = [...films].sort((a, b) => a.title.localeCompare(b.title));
    }
    if(options.order === "desc"){
        films = [...films].sort((a, b)=> b.title.localeCompare(a.title));
    }

    return films;
}

function readOneFilm(id: number): Film | undefined {
    const films = parse(jsonDbPath, defaultFilms);
    return films.find((f)=> f.id === id);
}

function createOneFilm(newFilm: NewFilm): Film {
    const films = parse(jsonDbPath, defaultFilms);
    
    const nextId = films.reduce((maxId, film)=> (film.id >maxId ? film.id : maxId), 0) +1;

    const created: Film = { id: nextId, ...newFilm};
    films.push(created);

    serialize(jsonDbPath, films);
    return created;
}

function deleteOneFilm(id: number):Film | undefined {
    const films = parse(jsonDbPath, defaultFilms);
    const index = films.findIndex((f)=> f.id === id);
    if(index === -1) return undefined;

    const deleted = films.splice(index, 1)[0];
    serialize(jsonDbPath, films);
    return deleted;
}

function patchOneFilm(id: number, patch: Partial<NewFilm>): Film | undefined {
    const films = parse(jsonDbPath, defaultFilms);
    const film = films.find((f)=> f.id === id);
    if(!film) return undefined;

    if(patch.title !== undefined) film.title = patch.title;
    if(patch.director !== undefined) film.director = patch.director;
    if(patch.duration !== undefined) film.duration = patch.duration;
    if(patch.budget !== undefined) film.budget = patch.budget;
    if(patch.description !== undefined) film.description = patch.description;
    if(patch.imageUrl !== undefined) film.imageUrl = patch.imageUrl;

    serialize(jsonDbPath, films);
    return film;
}

function putOneFilm(id: number, full: NewFilm): Film {
    const films = parse(jsonDbPath, defaultFilms);
    const index = films.findIndex((f)=> f.id === id);

    const replaced: Film = {id, ...full};

    if(index !== -1){
        films[index] = replaced;
    }else{
        films.push(replaced);
    }

    serialize(jsonDbPath, films);
    return replaced;
}

function filmExistsByTitleDirector(title: string, director: string): boolean {
    const films = parse(jsonDbPath, defaultFilms);
    return films.some(
        (f) =>
            f.title.trim().toLowerCase() === title.trim().toLowerCase() &&
            f.director.trim().toLowerCase() === director.trim().toLowerCase()
    );
}

function idExists(id: number): boolean {
    const films = parse(jsonDbPath, defaultFilms);
    return films.some((f)=> f.id === id);
}

export {
  readAllFilms,
  readOneFilm,
  createOneFilm,
  deleteOneFilm,
  patchOneFilm,
  putOneFilm,
  filmExistsByTitleDirector,
  idExists,
};