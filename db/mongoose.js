const mongoose = require("mongoose");

const db = async () => {
  try {
    const success = await mongoose.connect(process.env.DATABASE, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log("DB connected");
  } catch (error) {
    console.log("DB connection error", error);
  }
};

module.exports = db;
