interface Film {
  id: number;
  title: string;
  director: string;
  duration: number; 
  budget?: number;
  description?: string;
  imageUrl?: string; 
}

type NewFilm = Omit<Film, "id">;

type Level = "easy" | "medium" | "hard";

interface Text {
  id: string;        // uuid
  content: string;
  level: Level;
}

type NewText = Omit<Text, "id">;

export type { Level, Text, NewText, Film, NewFilm };

