// Generic import ...
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
//require("dotenv").config();

// import middlewares ...

const {
  loadProjects,
  projectByName,
  projectsByDate,
} = require("./middlewares/project");

// App-Express ...

const app = express();

// Middlewares ...

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// Routes Middlewares ...

app.get("/api", (req, res) => {
  try {
    const projects = loadProjects();
    res.json(projects);
  } catch (error) {
    console.log(error);
  }
});

app.get("/api/projects-by-name", (req, res) => {
  try {
    const projectName = req.body.proyecto;
    console.log(projectName);
    const infoProject = projectByName(projectName);
    res.status(200).json(infoProject);
  } catch (error) {
    console.log(error);
  }
});

app.get("/api/project-by-name", (req, res) => {
  const requests = Object.keys(req.body);
  const allowedRequest = ["proyecto", "date"];
  const isValidOperation = requests.every((request) =>
    allowedRequest.includes(request)
  );

  if (!isValidOperation) {
    return res.status(400).json({ Error: "invalid request" });
  }

  const projectName = req.body.proyecto;
  const date = req.body.date;

  console.log(projectName);
  console.log(date);

  if (
    projectName !== "" &&
    projectName !== undefined &&
    date !== undefined &&
    date !== ""
  ) {
    const projects = projectByName(projectName);
    const response =
      projects.length == 0
        ? "Project not found"
        : projectsByDate(projects, date);

    res.json(response);
  }

  if (
    projectName == "" ||
    (projectName == undefined && date !== undefined && date !== "")
  ) {
    const projects = loadProjects();
    const { data } = projects;

    const response = projectsByDate(data, date);
    res.status(200).json(response);
  }

  if (
    date == "" ||
    (date == undefined && projectName !== "" && projectName !== undefined)
  ) {
    const response = projectByName(projectName);
    if (response.length !== 0) {
      return res.status(200).json(response);
    }
    res.status(404).json({ message: "Project not found" });
  }
});

// Port ...
// preparing to deploy

const port = process.env.PORT || 8000;

// Listen port ...

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
