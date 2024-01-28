import express from "express";
import { userController } from "./controller";

const router = express.Router();

router.route("/").get(userController.getAll).post(userController.createOne);

router.route("/:id").get(userController.getById);

export const usersRouter = Object.assign(router, { ROOT: "/users" });
