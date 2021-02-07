const express = require("express");
const router = express.Router();

const { loadProjects, projectByName } = require("../middlewares/project");

// Routes ...

router.get("/projects", async (req, res) => {
  try {
    const projects = await loadProjects();
    res.json(projects);
  } catch (error) {
    console.log(error);
  }
});

router.get("/projects/project", async (req, res) => {
  try {
    const projectName = req.body.proyecto;
    const infoProject = await projectByName(projectName);
    res.status(200).json(infoProject);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
