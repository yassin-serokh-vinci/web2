import express from "express";

import usersRouter from "./routes/users";
import pizzaRouter from "./routes/pizzas";
import filmRouter from "./routes/films";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let getCounter = 0;
let postCounter = 0;
let deleteCounter = 0;
let putPatchCounter = 0

app.use((req, _res, next) => {
    if(req.method === "GET"){
        getCounter++;
    }
    if(req.method === "POST"){
        postCounter++;
    }
    if(req.method === "PUT" || req.method === "PATCH"){
        putPatchCounter++;
    }
    if(req.method === "DELETE"){
        deleteCounter++;
    }
    console.log("GET counter: " + getCounter+ "\nPOST counter "+postCounter+"\nPUT/PATCH counter "+putPatchCounter+"\nDELETE counter "+ deleteCounter);
    next();
});

app.use("/users", usersRouter);
app.use("/pizzas", pizzaRouter);
app.use("/films", filmRouter);



export default app;
