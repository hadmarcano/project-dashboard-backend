const fs = require("fs");

const projectByName = (nameProject) => {
  const dataProjects = loadProjects();
  const { data } = dataProjects;
  // search proyect by Name ...
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

const projectsByDate = (data, date) => {
  const infoProjects = data.filter((el) => {
    const dateProject = el.timestamp.split(" ")[0];
    return dateProject === date;
  });

  if (infoProjects.length === 0) {
    return "there are no records for this date";
  }
  return infoProjects;
};

module.exports = {
  projectByName,
  loadProjects,
  projectsByDate,
};
