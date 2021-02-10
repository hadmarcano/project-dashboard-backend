// Generic import ...
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();

// import Routes ...

const projectRoutes = require("./routes/project");

// App-Express ...

const app = express();

// Middlewares ...

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// Routes Middlewares ...

app.use("/api", projectRoutes);

// Port ...

const port = process.env.PORT || 8000;

// Listen port ...

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
