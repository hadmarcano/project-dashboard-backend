// Generic import ...
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
//require("dotenv").config();

// import middlewares ...

const {
  loadProjects,
  projectByName,
  projectsByDate,
  dateProjects,
} = require("./middlewares/project");

// App-Express ...

const app = express();

// Middlewares ...

app.use(express.json());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// Routes Middlewares ...

app.get("/api/actives-date", async (req, res) => {
  try {
    const response = dateProjects();
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
});

app.get("/api/allprojects", (req, res) => {
  try {
    const projects = loadProjects();
    res.json(projects);
  } catch (error) {
    console.log(error);
  }
});

// get - /api/projects?proyecto=name
app.get("/api/projects", (req, res) => {
  try {
    const projectName = req.query.proyecto;
    const infoProject = projectByName(projectName);
    res.status(200).json(infoProject);
  } catch (error) {
    console.log(error);
  }
});

// get - //api/projects-by-date?proyecto=name&date=2020-01-01
app.get("/api/projects-by-date", (req, res) => {
  const requests = Object.keys(req.query);

  const allowedRequest = ["proyecto", "date"];
  const isValidOperation = requests.every((request) =>
    allowedRequest.includes(request)
  );

  if (!isValidOperation) {
    return res.status(400).json({ Error: "invalid request" });
  }

  const projectName = req.query.proyecto;
  const date = req.query.date;

  // console.log(projectName);
  // console.log(date);

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

    return res.status(200).json(response);
  }

  if (
    projectName == "" ||
    (projectName == undefined && date !== undefined && date !== "")
  ) {
    const projects = loadProjects();

    const response = projectsByDate(projects, date);
    return res.status(200).json(response);
  }

  if (
    date == "" ||
    (date == undefined && projectName !== "" && projectName !== undefined)
  ) {
    const response = projectByName(projectName);
    if (response.length !== 0) {
      return res.status(200).json(response);
    }
    return res.status(404).json({ message: "Project not found" });
  }
});

// Port ...
// preparing to deploy

const port = process.env.PORT || 8000;

// Listen port ...

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
