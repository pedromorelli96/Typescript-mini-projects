import express, { type Application, type Request, type Response } from "express";

const app: Application = express();

const users: Array<{
  id: number;
  name: string;
}> = [
  {
    id: 1,
    name: "John Doe",
  },
  {
    id: 2,
    name: "Jane Doe",
  },
  {
    id: 3,
    name: "John Smith",
  },
];

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  const id = req.body.id;
  res.send(users.filter((user) => user.id === id));
});

app.listen(5000, () => console.log("Server running on port 5000"));
