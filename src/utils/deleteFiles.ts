import fs from "fs";
import { CustomError } from "./customErrors";

export const deleteFiles = (filePath: string) => {
  try {
    // Check if the file exists
    fs.accessSync(filePath);

    // Delete the file
    fs.unlinkSync(filePath);

    console.log("File deleted successfully.");
  } catch (err: any) {
    console.error("Error deleting the file:", err.message);
    throw new CustomError(err.message, 500);
  }
};
