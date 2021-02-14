const fs = require("fs");

const projectByName = (nameProject) => {
  const dataProjects = loadProjects();
  // search proyect by Name ...
  const searchProject = dataProjects.filter(
    (el) => el.proyecto === nameProject
  );
  return searchProject;
};

const loadProjects = () => {
  try {
    const dataBuffer = fs.readFileSync("../bbdd.json");
    const dataJSON = dataBuffer.toString();
    const { data } = JSON.parse(dataJSON);
    return data;
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

const dateProjects = () => {
  let activeDates = [];
  const dataProjects = loadProjects();

  dataProjects.forEach((element) => {
    const date = element.timestamp.split(" ")[0];
    const exists = activeDates.includes(date);
    if (!exists) {
      activeDates.push(date);
    }
  });

  return activeDates.sort();
};

module.exports = {
  projectByName,
  loadProjects,
  projectsByDate,
  dateProjects,
};
