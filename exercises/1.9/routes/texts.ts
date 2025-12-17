import { Router } from "express";
import type { Level, NewText } from "../types";
import {
  createOneText,
  readAllTexts,
  readOneText,
  deleteOneText,
  updateOneText
} from "../services/texts";

const router= Router();

function isLevel(value: unknown): value is Level {
    return value === "easy" || value === "medium" || value === "hard";
}

//READ ALL : Lire toutes les ressources de la collection
router.get("/", (req, res) => {
    const levelParam = req.query.level;

    if(levelParam !== undefined && typeof levelParam !== "string") {
        return res.status(400);
    }
    if(levelParam !== undefined && !isLevel(levelParam)){
        return res.status(400);
    }

    const texts = readAllTexts(levelParam);
    return res.status(200).json(texts);
});

//READ ONE : Lire la ressource identifiée
router.get("/:id", (req, res)=> {
    const { id } = req.params;
    const text = readOneText(id);
    if(!text) return res.status(404);
    return res.status(200).json(text);
});

//CREATE ONE : Créer une ressource basée sur les données de la requête
router.post("/", (req, res)=> {
    const body: unknown = req.body;

    if (
    !body ||
    typeof body !== "object" ||
    !("content" in body) ||
    !("level" in body) ||
    typeof body.content !== "string" ||
    !body.content.trim() ||
    typeof body.level !== "string" ||
    !isLevel(body.level)
  ) {
    return res.sendStatus(400);
  }

  const {content, level } = body as NewText;
  const created = createOneText({content, level});
  return res.status(200).json(created);
});

//DELETE ONE : Effacer la ressource identifiée
router.delete("/:id", (req, res) => {
    const { id } = req.params;
    const deleted = deleteOneText(id);
    if(!deleted){
        return res.status(404);
    }
    return res.status(200).json(deleted);
});

//UPDATE ONE : Remplacer l'entièreté de la ressource par les données de la requête
router.put("/:id", (req, res)=> {
    const { id } = req.params;
    const body: unknown = req.body;

    if (
    !body ||
    typeof body !== "object" ||
    !("content" in body) ||
    !("level" in body) ||
    typeof body.content !== "string" ||
    !body.content.trim() ||
    typeof body.level !== "string" ||
    !isLevel(body.level)
  ) {
    return res.sendStatus(400);
  }

  const {content, level} = body as NewText;
  const updated = updateOneText(id, {content, level});
  if(!updated) return res.status(404);
  return res.status(200).json(updated);
});


export default router;