import path from "node:path";
import {v4 as uuidv4 } from "uuid";
import { Level, NewText, Text } from "../types";
import { parse, serialize } from "../utils/json";

const jsonDbPath = path.join(__dirname, "/../data/texts.json");

const defaultTexts: Text[] = [];

function readAllTexts(level?: Level): Text[] {
    const texts = parse(jsonDbPath, defaultTexts);
    if(!level) return texts;
    return texts.filter((t)=> t.level === level);
}

function readOneText(id: string): Text | undefined {
    const texts = parse(jsonDbPath, defaultTexts);
    return texts.find((t)=> t.id === id);
}

function createOneText(newText: NewText): Text {
    const texts = parse(jsonDbPath,defaultTexts);
    const created: Text = { id: uuidv4(), ...newText};
    texts.push(created);
    serialize(jsonDbPath, texts);
    return created;
}

function deleteOneText(id: string): Text | undefined {
    const texts = parse(jsonDbPath, defaultTexts);
    const index = texts.findIndex((t)=> t.id === id);
    if(index === -1) return undefined;
    const deleted = texts.splice(index, 1)[0];
    serialize(jsonDbPath, texts);
    return deleted;
}

function updateOneText(id: string, newText: NewText): Text | undefined {
    const texts = parse(jsonDbPath, defaultTexts);
    const index = texts.findIndex((t)=> t.id === id);
    if(index===-1) return undefined;

    const updated: Text = {id,...newText};
    texts[index] = updated;

    serialize(jsonDbPath, texts);
    return updated;
}

export { readAllTexts, readOneText, createOneText, deleteOneText, updateOneText};