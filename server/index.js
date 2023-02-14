import { PrismaClient } from "@prisma/client";
import express from "express";
const app = express();
const port = process.env.PORT || 3001;

const prisma = new PrismaClient();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/users/:id", async (req, res) => {
  let id = parseInt(req.params.id);
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });
  res.json(user);
});

app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.post("/users", async (req, res) => {
  const { name, email, password } = req.body;
  const user = await prisma.user.create({
    data: {
      name: name,
      email: email,
      password: password,
    },
  });
  res.json(user);
});

app.get("/assignments", async (req, res) => {
  const { id } = req.body;
  const assignments = await prisma.assignment.findMany();
  res.json(assignments);
});

app.post("/assignments", async (req, res) => {
  const { title, description, dueDate, creatorId } = req.body;
  const assignment = await prisma.assignment.create({
    data: {
      title: title,
      description: description,
      dueDate: dueDate
        ? new Date(dueDate.year, dueDate.month - 1, dueDate.day)
        : new Date(),
      creatorId: creatorId,
    },
  });
  res.json(assignment);
});

app.listen(port, () => {
  console.log(`Express.js server is listening on port ${port}`);
});
