import mongoose from "mongoose";

const connectDatabase = () => {
  console.log("Connecting to the database...");

  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("MongoDB connected successfully!");
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB:", error);
    });
};

export default connectDatabase;
