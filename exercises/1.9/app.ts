import express from "express";
import filmsRouter from "./routes/films";
import textsRouter from "./routes/texts";

const app = express();

let getCounter = 0;

app.use((req, _res, next) => {
    if(req.method === "GET"){
        getCounter += 1;
        console.log('GET counter = '+getCounter);
    }
    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/films", filmsRouter);
app.use("/texts", textsRouter);

export default app;
