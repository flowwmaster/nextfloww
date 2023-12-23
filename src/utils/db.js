import mongoose from "mongoose";

mongoose.Promise = global.Promise;

const connect = async () => {
  if (mongoose.connections[0].readyState) return;

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Mongo Connection successfully establised");
  } catch (error) {
    throw new Error("Error connecting to Mongoose");
  }
};

export default connect;
