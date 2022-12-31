import mongoose from "mongoose";

const populationSchema = new mongoose.Schema({
  Country: {
    type: String,
  },
  Year: {
    type: Number,
  },
  Age: {
    type: String,
  },
  M: {
    type: Number,
  },
  F: {
    type: Number,
  },
});

export const postModel = mongoose.model("population_pyramid", populationSchema);
