// routes/films.ts
import { Router } from "express";
import path from "node:path";
import type { Film, NewFilm } from "../types";
import { parse, serialize } from "../utils/json";

const jsonDbPath = path.join(__dirname, "/../data/films.json");

const router = Router();

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


//READ ALL FILTERED : Lire toutes les ressources de la collection selon le filtre donné
router.get("/", (req, res)=> {
  let films = parse(jsonDbPath, defaultFilms);
  if(req.query["minimum-duration"]){
    const duration = Number(req.query["minimum-duration"]);
    if(Number.isNaN(duration) || duration<=0){
      return res.status(400).json({error : "Wrong minimum duration"});
    }
    films = films.filter((film) => film.duration >=duration);
  }

  if(req.query["title-start"]){
    const start = String(req.query["title-start"]).toLowerCase();
    films = films.filter(film =>
      film.title.toLowerCase().startsWith(start)
    );
  }
  
  if(req.query.order){
    const order = String(req.query.order);

    if(order==="asc"){
      films = [...films].sort((a,b) => a.title.localeCompare(b.title));
    }
    if(order==="desc"){
      films = [...films].sort((a,b)=> b.title.localeCompare(a.title));
    }
  }
  return res.status(200).json(films);
});

//READ ONE : Lire la ressource identifiée
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const films = parse(jsonDbPath, defaultFilms);

  const film = films.find((film)=> film.id === id);
  if(!film){
    return res.status(404);
  }
  return res.json(film).status(200);
});

//CREATE ONE : Créer une ressource basée sur les données de la requête
router.post("/", (req, res) =>{
  const body:unknown = req.body;

  if (
    !body ||
    typeof body !== "object" ||
    !("title" in body) ||
    !("director" in body) ||
    !("duration" in body) ||
    typeof body.title !== "string" ||
    typeof body.director !== "string" ||
    typeof body.duration !== "number" ||
    !body.title.trim() ||
    !body.director.trim() ||
    body.duration <= 0 ||
    ("budget" in body &&
      (typeof body.budget !== "number" || body.budget <= 0)) ||
    ("description" in body &&
      (typeof body.description !== "string" || !body.description.trim())) ||
    ("imageUrl" in body &&
      (typeof body.imageUrl !== "string" || !body.imageUrl.trim()))
  ) {
    return res.status(400).json({ error: "Invalid film data" });
  }

  const {title, director, duration, budget, description, imageUrl} = body as NewFilm;

  const existingFilm = parse(jsonDbPath, defaultFilms).find(
    film =>
      film.title.toLowerCase().trim() === title.toLowerCase().trim() &&
      film.director.toLowerCase().trim() === director.toLowerCase().trim()
  );

  if(existingFilm){
    return res.status(409).json({error: "A film with this title and director already exists"});
  }

  const films = parse(jsonDbPath, defaultFilms);

  const nextId = parse(jsonDbPath, defaultFilms).reduce((maxId, film) => (film.id > maxId ? film.id : maxId), 0)+1;

  const newFilm: Film = {
    id: nextId,
    title,
    director,
    duration,
    budget,
    description,
    imageUrl,
  };

  films.push(newFilm);
  serialize(jsonDbPath, films);
  return res.status(200).json(newFilm);
});

router.delete("/:id", (req, res) =>{
  const id = Number(req.params.id);
  const films = parse(jsonDbPath, defaultFilms);

  const index = films.findIndex(film => film.id === id);
  if(index===-1){
    return res.status(404).json({error: "film not found"});
  }
  const deletedElements = films.splice(index, 1);
  serialize(jsonDbPath, films);
  return res.status(200).json(deletedElements[0]);
});

//UPDATE ONE : Mettre à jour les propriétés de la ressource par les valeurs données dans la requête, pour une ou plusieurs propriétés
router.patch("/:id", (req, res) =>{
  const id = Number(req.params.id);
  const films = parse(jsonDbPath, defaultFilms);
  const film = films.find((film) => film.id === id);
  if(!film){
    return res.status(404);
  }

  const body: unknown = req.body;
  if(
    !body ||
    typeof body !== "object" ||
    ("title" in body &&
      (typeof body.title !== "string" || !body.title.trim())) ||
    ("director" in body &&
      (typeof body.director !== "string" || !body.director.trim())) ||
    ("duration" in body &&
      (typeof body.duration !== "number" || body.duration <= 0)) ||
    ("budget" in body &&
      (typeof body.budget !== "number" || body.budget <= 0)) ||
    ("description" in body && typeof body.description !== "string") ||
    ("imageUrl" in body && typeof body.imageUrl !== "string")
  ){
    return res.status(400);
  }

  const {title, director, duration, budget, description, imageUrl}: Partial<NewFilm> = body;
  if(title !== undefined){
    film.title = title;
  }
  if(director !== undefined){
    film.director = director;
  }
  if(duration !== undefined){
    film.duration = duration;
  }
  if(budget !== undefined){
    film.budget = budget;
  }
  if(description !== undefined){
    film.description = description;
  }
  if(imageUrl !== undefined){
    film.imageUrl = imageUrl;
  }

  serialize(jsonDbPath, films);

  return res.status(200).json(film);
});

//UPDATE ONE or CREATE ONE : Remplacer la ressource par une ressource reprenant les valeurs données dans la requête, seulement si toutes les propriétés non optionnelles de la ressource sont données ! Si la ressource n'existe pas, créer cette ressource seulement si l'id donné n'est pas déjà existant.
router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const body: unknown = req.body;

  if(
    !body ||
    typeof body !== "object" ||
    !("title" in body) ||
    !("director" in body) ||
    !("duration" in body) ||
    typeof body.title !== "string" ||
    typeof body.director !== "string" ||
    typeof body.duration !== "number" ||
    !body.title.trim() ||
    !body.director.trim() ||
    body.duration <= 0 ||
    ("budget" in body && (typeof body.budget !== "number" || body.budget <= 0)) ||
    ("description" in body && (typeof body.description !== "string" || !body.description.trim())) ||
    ("imageUrl" in body &&(typeof body.imageUrl !== "string" || !body.imageUrl.trim()))
  ){
    return res.status(400).json({error: "Invalid film data for put"});
  }

  const {title, director, duration, budget, description, imageUrl} = body as NewFilm;

  const films = parse(jsonDbPath, defaultFilms);

  const index = films.findIndex((f)=> f.id === id);

  if(index !== -1){
    const updatedFilm: Film = {
      id,
      title,
      director,
      duration,
      budget,
      description,
      imageUrl,
    };

    films[index] = updatedFilm;
    serialize(jsonDbPath, films);
    return res.status(200).json(updatedFilm);
  }

  const newFilm: Film = {
    id,
    title,
    director,
    duration,
    budget,
    description,
    imageUrl,
  };
  films.push(newFilm);
  serialize(jsonDbPath, films);

  return res.status(200).json(newFilm);
});

export default router;
