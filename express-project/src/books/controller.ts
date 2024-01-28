import { z } from "zod";
import { bookSchema, type Book } from "./schema";
import { type Request, type Response } from "express";

const books: Book[] = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "Fitzgerald",
    price: 5,
  },
  {
    id: 2,
    title: "Tender is the Night",
    author: "Fitzgerald",
    price: 7.5,
  },
  {
    id: 3,
    title: "The Grapes of Wrath",
    author: "Steinbeck",
    price: 6,
  },
  {
    id: 4,
    title: "The Sun Also Rises",
    author: "Hemingway",
    price: 9,
  },
  {
    id: 5,
    title: "1984",
    author: "George Orwell",
    price: 11.99,
  },
];

function getAll(req: Request, res: Response): void {
  const query = bookSchema
    .partial()
    .pick({
      author: true,
    })
    .merge(
      z.object({
        take: z
          .number({
            coerce: true,
          })
          .int()
          .gt(0)
          .optional(),
      })
    )
    .parse(req.query);

  let filteredBooks = books;

  if (query.take !== undefined) {
    filteredBooks = filteredBooks.slice(0, query.take);
  }

  if (query.author !== undefined) {
    filteredBooks = filteredBooks.filter((book) =>
      book.author.toLowerCase().includes(query.author?.toLowerCase() ?? "")
    );
  }

  res.status(200).json({
    books: filteredBooks,
  });
}

export const booksController = {
  getAll,
};
