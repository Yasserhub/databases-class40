import { postModel } from "./models/population_model.js";

export const TotalPopulationPerYear = async (country) => {
  const pipeline = [
    {
      $match: {
        Country: country,
      },
    },

    {
      $group: {
        _id: "$Year",
        countPopulation: {
          $sum: { $add: { $toInt: "$M", $toInt: "$F" } },
        },
      },
    },
    {
      $sort: {
        _id: 1,
      },
    },
  ];

  const aggregation = postModel.aggregate(pipeline);

  await aggregation.forEach((result) => {
    console.log(result);
  });
};

export const filterByContinent = async (age, year) => {
  const pipeline = [
    {
      $match: {
        Country: {
          $in: [
            "AFRICA",
            "ASIA",
            "EUROPE",
            "LATIN AMERICA AND THE CARIBBEAN",
            "NORTHERN AMERICA",
            "OCEANIA",
          ],
        },
        Age: age,
        Year: year,
      },
    },
    {
      $addFields: {
        TotalPopulation: {
          $add: [{ $toInt: "$M" }, { $toInt: "$F" }],
        },
      },
    },
  ];

  const filtered = postModel.aggregate(pipeline);
  await filtered.forEach((result) => {
    console.log(result);
  });
};
