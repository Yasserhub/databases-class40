import mongoose from "mongoose";

import { seedDatabase } from "./connectToCSV.js";
import { TotalPopulationPerYear, filterByContinent } from "./exercise_1.js";

async function main() {
  const db = mongoose.connect("mongodb://127.0.0.1:27017/databaseWeek4", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  try {
    mongoose.connection.on("connected", () => {
      console.log("Connected to MongoDB");
    });

    mongoose.connection.on("error", (error) => {
      console.log(error);
    });

    await seedDatabase();
    await TotalPopulationPerYear("Netherlands");

    await filterByContinent("100+", "2020");
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.disconnect();
  }
}

main().catch(console.error);
