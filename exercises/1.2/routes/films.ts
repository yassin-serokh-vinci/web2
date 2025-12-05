// routes/films.ts
import { Router } from "express";
import type { Film } from "../types";

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

const router = Router();

// READ ALL : GET /films
router.get("/", (_req, res) => {
  return res.json(films);
});

export default router;
