import mongoose from "mongoose";
import { userSchema } from "../models/userModel";
import { blogSchema } from "../models/blogModel";
import { commentSchema } from "../models/commentModel";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DATABASE_URI as string);
    //register models manually after initializing Db connection
    mongoose.model("User", userSchema);
    mongoose.model("Blog", blogSchema);
    mongoose.model("Comment", commentSchema);
    console.log(`${conn.connection.db.namespace} DB connected successfully! `);
    console.log(mongoose.modelNames());
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
