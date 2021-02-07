// Generic import ...
const express = require("express");
const morgan = require("morgan");
require("dotenv").config();
const db = require("./db/mongoose");

// import Routes ...

const projectRoutes = require("./routes/project");

// App-Express ...

const app = express();

// Excute DB connection ...

//db();

// Middlewares ...

app.use(express.json());
app.use(morgan("dev"));

// Routes Middlewares ...

app.use("/api", projectRoutes);

// Port ...

const port = process.env.PORT || 8000;

// Listen port ...

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
