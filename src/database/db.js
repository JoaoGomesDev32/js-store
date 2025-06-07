import mongoose from "mongoose";

const connectDatabase = () => {
  console.log("Connecting to the database...");

  mongoose
    .connect(
      "mongodb+srv://joaogomesdev32:05012022@cluster0.kxlzecc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    )
    .then(() => {
      console.log("MongoDB connected successfully!");
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB:", error);
    });
};

export default connectDatabase;
