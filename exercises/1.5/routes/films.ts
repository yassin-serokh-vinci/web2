// routes/films.ts
import { Router } from "express";
import type { Film, NewFilm } from "../types";
const router = Router();
const films: Film[] = [
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
  let result = films;
  if(req.query["minimum-duration"]){
    const duration = Number(req.query["minimum-duration"]);
    if(Number.isNaN(duration) || duration<=0){
      return res.status(400).json({error : "Wrong minimum duration"});
    }
    result = result.filter((film) => film.duration >=duration);
  }

  if(req.query["title-start"]){
    const start = String(req.query["title-start"]).toLowerCase();
    result = result.filter(film =>
      film.title.toLowerCase().startsWith(start)
    );
  }
  
  if(req.query.order){
    const order = String(req.query.order);

    if(order==="asc"){
      result = [...result].sort((a,b) => a.title.localeCompare(b.title));
    }
    if(order==="desc"){
      result = [...result].sort((a,b)=> b.title.localeCompare(a.title));
    }
  }
  return res.status(200).json(result);
});




//READ ONE : Lire la ressource identifiée
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
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

  const existingFilm = films.find(
    film =>
      film.title.toLowerCase().trim() === title.toLowerCase().trim() &&
      film.director.toLowerCase().trim() === director.toLowerCase().trim()
  );

  if(existingFilm){
    return res.status(409).json({error: "A film with this title and director already exists"});
  }

  const nextId = films.reduce((maxId, film) => (film.id > maxId ? film.id : maxId), 0)+1;

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
  return res.status(200).json(newFilm);
});


export default router;
