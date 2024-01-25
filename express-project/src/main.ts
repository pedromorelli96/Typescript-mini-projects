import express, { type NextFunction, type Application, type Request, type Response } from "express";
import { z } from "zod";

const app: Application = express();

const userSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email("Email must have a valid email format"),
  username: z
    .string({
      required_error: "Username is required",
    })
    .trim()
    .min(5)
    .max(20),
});

type User = z.infer<typeof userSchema>;

const users: User[] = [];

app.use(express.json());

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.get("/", (req: Request, res: Response) => {
  res.status(200).send(users);
});

app.post("/", (req: Request, res: Response) => {
  const newUser = userSchema.parse(req.body);
  users.push(newUser);
  res.status(201).send(newUser);
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: unknown, req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof z.ZodError) {
    res.status(400).json({
      error: err.flatten(),
    });
    return;
  } else if (err instanceof Error) {
    const error = err as Error & { statusCode?: number };
    res.status(error.statusCode ?? 400).json({
      message: err.message,
    });
    return;
  }
  res.status(500).json({
    message: "Internal server error",
  });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
