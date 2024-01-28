import { type User, userSchema } from "./schema";
import { type Request, type Response } from "express";
import cuid2 from "@paralleldrive/cuid2";

const users: User[] = [];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getAll(req: Request, res: Response): void {
  res.status(200).send(users);
}

function getById(req: Request, res: Response): void {
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
}

function createOne(req: Request, res: Response): void {
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
}

export const userController = {
  getAll,
  getById,
  createOne,
};
