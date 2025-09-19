import { default as mongoose } from "mongoose";

const starDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DB connected");
    // await mongoose.connection.dropDatabase()
  } catch (error) {
    console.log(error);
  }
};

export default starDB;
