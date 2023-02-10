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

app.listen(port, () => {
  console.log(`Express.js server is listening on port ${port}`);
});
