import {Router } from "express";
import { Film } from "../types";

const router = Router();

const films: Film[] = [
    {
        id:1,
        title: "La vie",
        director: "Serokh Yassin",
        duration: 110,
    },
    {
        id: 2,
        title: "La mort",
        director: "El Director",
        duration: 120
    },
    {
        id:3,
        title: "Manger",
        director: "Fruit Laurent",
        duration: 155,
        budget:2650850,
        description: "Cela parle de très bonne nourriture !!!",
    },
];


router.get("/", (_req, res) => {
    return res.json(films);
});

export default router;