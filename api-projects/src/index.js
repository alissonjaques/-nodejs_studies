const express = require("express");
const app = express();
app.use(express.json());

const { v4: uuidv4 } = require("uuid");

const projects = [
  { id: uuidv4(), description: "Project 1" },
  { id: uuidv4(), description: "Project 2" },
  { id: uuidv4(), description: "Project 3" },
];

function logRoutes(req, res, next) {
  const { method, url } = req;
  const route = `[${method.toUpperCase()}] ${url}`;
  console.log(route);
  return next();
}

app.use(logRoutes);

app.get("/projects", (req, res) => {
  // const query = req.query;
  // console.log(query);
  return res.json(projects);
});

app.get("/projects/:id", (req, res) => {
  const index = getProject(req.params.id);
  if (index == -1) {
    res.status(404).send({ error: "project not found!" });
  } else {
    res.json(projects[index]);
  }
});

app.post("/projects", (req, res) => {
  const project = { id: uuidv4(), description: req.body.description };
  projects.push(project);
  res.status(201).json(project);
});

app.put("/projects/:id", (req, res) => {
  const index = getProject(req.params.id);
  if (index < 0) {
    res.status(404).send({ error: "project not found!" });
  } else {
    projects[index].description = req.body.description;
    res.json(projects[index]);
  }
});

app.delete("/projects/:id", (req, res) => {
  const { id } = req.params;
  const index = getProject(id);
  if (index == -1) {
    res.status(404).json({ error: "project not found!" });
  } else {
    projects.splice(index, 1);
    res.status(204).send();
  }
});

function getProject(id) {
  return projects.findIndex((project) => project.id == id);
}

app.listen(3000, () => {
  console.log("Server started on port 3000!");
});
