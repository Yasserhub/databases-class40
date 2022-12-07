import e from "express";
import express, { query } from "express";
import mysql from "mysql";
import {
  research_papers,
  authors_papers,
  insert_Paper_data,
  insert_data_authors_papers,
} from "./relationships.js";

import { mentors, publish } from "./join_query.js";

import {
  papers,
  papersByFemale,
  h_index,
  papersByUniversity,
} from "./aggregate-functions.js";

// import {
//   includingland,
//   cityPopulation,
//   countiesOnEu,
//   surfaceAreas,
//   citiesInNetherlands,
// } from "./queries.js";

// creating connection
export const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "meetup",
});

// conncet and test connection
connection.connect((err) => {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as id " + connection.threadId);
});

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

// creating Authors table
app.get("/createauthorstable", (req, res) => {
  const sql =
    "CREATE TABLE IF NOT EXISTS authors (author_id int, author_name VARCHAR(255), university VARCHAR(255)," +
    "date_of_birth DATE, h_index int, gender VARCHAR(2), PRIMARY KEY(author_id))";
  connection.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Authors table was created...");
  });
});

// adds a column called mentor to authors
app.get("/addmentorcolumn", (req, res) => {
  const sql =
    "ALTER TABLE authors ADD mentor int, ADD CONSTRAINT FOREIGN KEY (mentor) REFERENCES authors(author_id)";
  connection.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("mentor column was addred to authors table ...");
  });
});

// Delete Table
app.get("/droptable", (req, res) => {
  const sql = "DROP TABLE authors";
  connection.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("authors table was deleted ...");
  });
});

// Inserting data to authors table
app.get("/addtoauthorstable", (req, res) => {
  const sql =
    "INSERT INTO authors (author_id, author_name, university," +
    "date_of_birth, h_index, gender, mentor) VALUES ?";
  var values = [
    [100, "John", "Utrcht", "1985-01-01", 3, "M", null],
    [101, "Peter", "Amsterdam", "1970-01-01", 4, "M", 100],
    [102, "Amy", "Dilft", "1966-01-01", 3, "W", 100],
    [103, "Hannah", "Utrcht", "985-01-01", 3, "M", 101],
    [104, "Michael", "Utrcht", "1988-01-01", 8, "M", 101],
    [105, "Sandy", "Sanaa", "1990-01-01", 2, "W", 102],
    [106, "Betty", "Istanbul", "1985-01-01", 3, "M", 102],
    [107, "Richard", "Endhufen", "1988-01-01", 5, "M", 105],
    [108, "Susan", "Amesterdam", "1977-01-01", 3, "W", 105],
    [109, "Vicky", "Wagenigen", "1952-01-02", 4, "W", 100],
    [110, "Ben", "Utrcht", "1974-05-04", 3, "W", 106],
    [111, "William", "Amesterdam", "1966-01-07", 3, "M", 104],
    [112, "Chuck", "Wagenigen", "1954-02-06", 6, "M", 100],
    [113, "Yasser", "Utrcht", "1967-01-08", 3, "M", 104],
    [114, "Rob", "Wagenigen", "1983-04-08", 1, "W", 111],
  ];
  connection.query(sql, [values], (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("15 records were added to authors table...");
  });
});

// creating research_papers table
app.get("/researchtable", research_papers);

// creating authors_papers table
app.get("/authorspapers", authors_papers);

// Insert Research_papers Data
app.get("/insertpapers", insert_Paper_data);

// Insert Data of papers and authors in conjution table
app.get("/insertsutorandpaper", insert_data_authors_papers);

// prints names of all authors and their corresponding mentors.’
app.get("/mentors", mentors);

// printing authors with their papers (if there is)
app.get("/published", publish);

// // All research papers and the number of authors that wrote that paper
app.get("/papers", papers);

//Sum of the research papers published by all female authors.
app.get("/sumfemalepapers", papersByFemale);

//Average of the h-index of all authors per university
app.get("/h_index", h_index);

//Sum of the research papers of the authors per university.
app.get("/papersbyuniversity", papersByUniversity);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

export default app;
