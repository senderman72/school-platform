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
  const assignment = await prisma.assignment.findMany();

  res.json(assignment);
});

app.get("/assignments/:userId", async (req, res) => {
  const userId = parseInt(req.params.userId);
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (user.role === "TEACHER") {
    // If the user is a teacher, return all assignments
    const assignments = await prisma.assignment.findMany();
    return res.json(assignments);
  } else {
    // If the user is a student, return assignments they have submitted
    const submissions = await prisma.submissions.findMany({
      where: { userId: userId, submitted: true },
      include: { assignment: true },
    });
    return res.json(submissions.map((submission) => submission.assignment));
  }
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

app.post("/assignments/:assignmentId/submit", async (req, res) => {
  const assignmentId = req.params.assignmentId;
  const userId = req.body.userId;

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const assignment = await prisma.assignment.findUnique({
    where: { id: assignmentId },
  });

  if (!assignment) {
    return res.status(404).json({ message: "Assignment not found" });
  }

  const submission = await prisma.submissions.create({
    data: {
      submitted: true,
      userId: user.id,
      assignmentId: assignment.id,
    },
  });

  res.json(submission);
});

app.listen(port, () => {
  console.log(`Express.js server is listening on port ${port}`);
});
