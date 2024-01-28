import express, { type Application, type Request, type Response } from "express";
import { type User, userSchema } from "./schemas/user";
import { errorHandler } from "./middlewares/error-handler";
import { type Book, bookSchema } from "./schemas/book";
import { z } from "zod";
import cuid2 from "@paralleldrive/cuid2";

const app: Application = express();

const users: User[] = [];

app.use(express.json());

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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.get("/books", (req: Request, res: Response) => {
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
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.get("/users", (req: Request, res: Response) => {
  res.status(200).send(users);
});

app.get("/users/:id", (req: Request, res: Response) => {
  const params = userSchema
    .pick({
      id: true,
    })
    .parse(req.params);

  const user = users.find((u) => u.id === params.id);
  if (user === undefined) {
    res.status(404).send({
      message: "User not found",
    });
    return;
  }
  res.status(200).send(user);
});

app.post("/users", (req: Request, res: Response) => {
  const data = userSchema
    .omit({
      id: true,
    })
    .parse(req.body);
  const createdUser = {
    ...data,
    id: cuid2.createId(),
  } satisfies User;
  users.push(createdUser);
  res.status(201).send(createdUser);
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use(errorHandler);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
