import express from "express";
import { booksController } from "./controller";

const router = express.Router();

router.route("/").get(booksController.getAll);

export const booksRouter = Object.assign(router, { ROOT: "/books" });
