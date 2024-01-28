import express, { type Application } from "express";
import { usersRouter } from "./users/router";
import { booksRouter } from "./books/router";
import { globalMiddlewares } from "./middlewares";

const app: Application = express();

app.use(express.json());

app.use(usersRouter.ROOT, usersRouter);
app.use(booksRouter.ROOT, booksRouter);

app.use(globalMiddlewares.errorHandler);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
