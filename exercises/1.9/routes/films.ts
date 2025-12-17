// routes/films.ts
import { Router } from "express";
import type { NewFilm } from "../types";
import {
  createOneFilm,
  deleteOneFilm,
  filmExistsByTitleDirector,
  idExists,
  patchOneFilm,
  putOneFilm,
  readAllFilms,
  readOneFilm,
} from "../services/films";

const router = Router();


//READ ALL FILTERED : Lire toutes les ressources de la collection selon le filtre donné
router.get("/", (req, res)=> {
  let minimumDuration: number | undefined;
  let titleStart: string | undefined;
  let order: "asc" | "desc" | undefined;
  if(req.query["minimum-duration"]){
    const duration = Number(req.query["minimum-duration"]);
    if(Number.isNaN(duration) || duration<=0){
      return res.status(400).json({error : "Wrong minimum duration"});
    }
    minimumDuration = duration;
  }

  if(req.query["title-start"] !== undefined){
    titleStart = String(req.query["title-start"]);
  }
  
  if(req.query.order !== undefined){
    const o = String(req.query.order);
    if(o !== "asc" && o !== "desc"){
      return res.status(400).json({error: "Wrong order"});
    }
    order = o;
  }
  const films = readAllFilms({minimumDuration, titleStart, order});
  return res.status(200).json(films);
});

//READ ONE : Lire la ressource identifiée
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);

  const film = readOneFilm(id);
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

  const existingFilm = filmExistsByTitleDirector(title, director);

  if(existingFilm){
    return res.status(409).json({error: "A film with this title and director already exists"});
  }

  const created = createOneFilm({title, director, duration, budget, description, imageUrl});
  return res.status(200).json(created);
});

router.delete("/:id", (req, res) =>{
  const id = Number(req.params.id);
  if(Number.isNaN(id) ||id<=0){
    return res.status(400).json({error: "Wrond id"});
  }
  const deleted = deleteOneFilm(id);
  if(!deleted){
    return res.status(404);
  }
  return res.status(200).json(deleted);
});

//UPDATE ONE : Mettre à jour les propriétés de la ressource par les valeurs données dans la requête, pour une ou plusieurs propriétés
router.patch("/:id", (req, res) =>{
  const id = Number(req.params.id);
  if(Number.isNaN(id) || id<= 0){
    return res.status(400).json({error : "Wrong id"});
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

  const patch: Partial<NewFilm> = body;

  const updated = patchOneFilm(id, patch);
  if(!updated){
    return res.status(404);
  }
  return res.status(200).json(updated);
});

//UPDATE ONE or CREATE ONE : Remplacer la ressource par une ressource reprenant les valeurs données dans la requête, seulement si toutes les propriétés non optionnelles de la ressource sont données ! Si la ressource n'existe pas, créer cette ressource seulement si l'id donné n'est pas déjà existant.
router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  if(Number.isNaN(id) || id<= 0){
    return res.status(400).json({error: "Wrong id"});
  }
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

  const full = body as NewFilm;
   
  const existing = readOneFilm(id);

  if (existing) {
    const updated = putOneFilm(id, full);
    return res.status(200).json(updated);
  }

  if (idExists(id)) {
    return res.status(409).json({ error: "Id already exists" });
  }

  const created = putOneFilm(id, full);
  return res.status(200).json(created);
});

export default router;
