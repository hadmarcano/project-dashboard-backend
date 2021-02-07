const fs = require("fs");

const projectByName = (nameProject) => {
  const dataProjects = loadProjects();
  const { data } = dataProjects;

  const searchProject = data.filter((el) => el.proyecto === nameProject);
  return searchProject;
};

const loadProjects = () => {
  try {
    const dataBuffer = fs.readFileSync("../bbdd.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (error) {
    return [];
  }
};

module.exports = {
  projectByName,
  loadProjects,
};
