import csvtojson from "csvtojson";

import { postModel } from "./models/population_model.js";

export const seedDatabase = async () => {
  await postModel.deleteMany();
  await csvtojson()
    .fromFile("./ex1-aggregation/population_pyramid_1950-2022.csv")
    .then((csvData) => {
      postModel
        .insertMany(csvData)
        .then(() => {
          console.log("Data inserted");
        })
        .catch((error) => {
          console.log(`There is Error ${error}`);
        });
    })
    .catch((error) => {
      console.log(error);
    });
};
