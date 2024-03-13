import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DATABASE_URI as string);
    console.log(`${conn.connection.db.namespace} DB connected successfully! `);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
