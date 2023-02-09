const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/users/:id", (req, res) => {
  res.send(req.params.id);
});

app.listen(port, () => {
  console.log(`Express.js server is listening on port ${port}`);
});
