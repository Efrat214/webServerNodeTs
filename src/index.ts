import express, { Express, request, Request, Response } from 'express';
import { Book } from './book';

const app = express()
const books: Book[] = []

app.use(express.json());

app.post('/book', (req: Request, res: Response) => {
    books.push(req.body);
    res.status(200).json(books);
});

app.get('/book/:searchByVal', (req: Request, res: Response) => {
    const searchByVal = req.params.searchByVal;

    const book = typeof searchByVal === 'string'
        ? books.find((b: Book) => b.name === searchByVal)
        : typeof searchByVal === 'number'
            ? books.find((b: Book) => b.id === searchByVal)
            : undefined;

    if (book) {
        res.status(200).json(book);
    } else {
        res.status(404).send('Book not found');
    }
});

app.get('/books', (req: Request, res: Response) => {
    const booksWithoutId = books.map(({ id, ...rest }) => rest);
    if (booksWithoutId)
        res.status(200).json(booksWithoutId)
    else
        res.status(404).send('Books not found');

})

app.listen(3000, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:3000`);
});
