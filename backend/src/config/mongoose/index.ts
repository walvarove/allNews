import mongoose, { ConnectOptions } from "mongoose";

const initializeDB = async (callBack) => {
    mongoose
      .connect(process.env.MONGO_DB_URI ?? "", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as ConnectOptions)
      .then(() => {
        console.log("Successfully connected to DB!");
        try {
          callBack && callBack();
        } finally {}
      })
      .catch((error) => {
        console.log("database connection failed. exiting now...");
        console.error(error);
        process.exit(1);
      });
}

export { initializeDB };