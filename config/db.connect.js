import mongoose from "mongoose";

export const dbConnect = async () => {
  const url = process.env.MONGODB_URL;

  mongoose
    .connect(url, {
      useNewUrlParser: true,
    })
    .then(() => {
      console.log("Successfully connected to database");
    })
    .catch((error) => {
      console.log("database connection failed. exiting now...");
      console.error(error);
    });
};

