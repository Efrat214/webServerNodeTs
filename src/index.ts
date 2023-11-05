import express, { Express, request, Request, Response } from "express";
import { Book, Genre } from "./book";
import env from "env-var";
import * as dotenv from "dotenv";
dotenv.config({ path: "../.env" });

const app = express();
const books: Book[] = [];

app.use(express.json());

app.post("/book", (req: Request, res: Response) => {
  const book = req.body;
  if (
    "name" in book &&
    "author" in book &&
    "id" in book &&
    "genre" in book &&
    typeof book.name === "string" &&
    typeof book.author == "string" &&
    typeof book.id === "number" &&
    Object.values(Genre).includes(book.genre)
  ) {
    books.push(req.body);
    res.status(200).json(books);
  } else {
    res.status(400).json({ error: "Invalid request body" });
  }
});

app.get("/book/:searchByVal", (req: Request, res: Response) => {
  const { searchByVal } = req.params;

  const book =
    typeof searchByVal === "string"
      ? books.find((b: Book) => b.name === searchByVal)
      : typeof searchByVal === "number"
      ? books.find((b: Book) => b.id === searchByVal)
      : undefined;

  if (book) {
    res.status(200).json(book);
  } else {
    res.status(404).send("Book not found");
  }
});

app.get("/books", (req: Request, res: Response) => {
  const booksWithoutId = books.map(({ id, ...rest }) => rest);
  res.status(200).json(booksWithoutId);
});

const port = env.get("PORT").default("5432").asPortNumber();

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
