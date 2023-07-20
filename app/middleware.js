import mongoose from "mongoose";

const connectDb = async () => {
  try {
    if (mongoose.connections[0].readyState) {
      return;
    }
    await mongoose.connect(process.env.MONGO_URI);
    return;
  } catch (error) {
    console.error(error);
  }
};

export default connectDb;
