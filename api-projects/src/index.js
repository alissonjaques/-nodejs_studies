const express = require("express");
const app = express();
app.use(express.json());

const projects = [
  { id: 1, description: "Project 1" },
  { id: 2, description: "Project 2" },
  { id: 3, description: "Project 3" },
];

app.get("/projects", (req, res) => {
  return res.status(200).json(projects);
});

app.get("/projects/:id", (req, res) => {
  const index = getProject(req.params.id);
  if (index == -1) {
    res.status(404).send(`Projeto de id = ${req.params.id} não encontrado!`);
  } else {
    res.status(200).json(projects[index]);
  }
});

app.post("/projects", (req, res) => {
  projects.push(req.body);
  res.status(201).json(req.body);
});

app.put("/projects/:id", (req, res) => {
  const index = getProject(req.params.id);
  if (index == -1) {
    res.status(404).send(`Projeto de id = ${req.params.id} não encontrado!`);
  } else {
    projects[index].description = req.body.description;
    res.status(204).json(projects[index]);
  }
});

app.delete("/projects/:id", (req, res) => {
  const { id } = req.params;
  const index = getProject(id);
  if (index == -1) {
    res.status(404).send(`Projeto de id = ${req.params.id} não encontrado!`);
  } else {
    const project = projects[index];
    projects.splice(index, 1);
    res.status(200).json(project);
  }
});

function getProject(id) {
  return projects.findIndex((project) => project.id == id);
}

app.listen(3000, () => {
  console.log("Server started on port 3000!");
});
