import mongoose from "mongoose";

const connectDatabase = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error("MONGODB_URI não definida nas variáveis de ambiente.");
    }
    await mongoose.connect(uri); // Removido useNewUrlParser e useUnifiedTopology
    console.log("Conectado ao MongoDB!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

export default connectDatabase;
