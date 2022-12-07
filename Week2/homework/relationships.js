import { connection } from "./authors.js";

//Create research_Papers
export const research_papers = (req, res) => {
  const sql =
    "CREATE TABLE research_Papers (paper_id int AUTO_INCREMENT, paper_title VARCHAR(255), conference VARCHAR(255)," +
    "publish_date DATE, PRIMARY KEY(paper_id))";
  const query = connection.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("research_papers table was created...");
  });
};

//Create data of papers witten by authors
export const authors_papers = (req, res) => {
  const sql =
    "CREATE TABLE authors_papers (author_id int, paper_id int, id int AUTO_INCREMENT," +
    "FOREIGN KEY (author_id) REFERENCES authors(author_id)," +
    "FOREIGN KEY (paper_id) REFERENCES research_Papers(paper_id)), PRIMARY KEY(id)";
  const query = connection.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("authors_papers table was created...");
  });
};

//Insert Data of research_Papers
export const insert_Paper_data = (req, res) => {
  const sql =
    "INSERT INTO research_Papers (paper_title, conference," +
    "publish_date) VALUES ?";
  var values = [
    [
      "What makes smartphones so resistant to bugs",
      "International Conference",
      "2001-01-01",
    ],
    [
      "Why didnt vector graphics become mainstream instead of pixels",
      "International Conference",
      "2002-01-01",
    ],
    ["What are Molten Salt Nuclear Reactors", "No Conference", "2002-04-01"],
    [
      "How are old recordings converted to new formats?",
      "No Conference",
      "2003-01-01",
    ],
    [
      "Why do smart our electronic devices get slower over time?",
      "International Conference",
      "2004-01-01",
    ],
    [
      "The effects of the printing press on the world",
      "International Conference",
      "2005-01-01",
    ],
    [
      "The fracturing of Christianity: causes and effects",
      "International Conference",
      "2006-01-01",
    ],
    [
      "Liberalism in national politics: emergence and evolution",
      "No Conference",
      "2007-01-01",
    ],
    [
      "Were the Crusades motivated purely by religious devotion?",
      "International Conference",
      "2008-01-01",
    ],
    [
      "Centers of scientific activity throughout history.",
      "International Conference",
      "2009-01-02",
    ],
    [
      "How did Chinas geography influence its history?",
      "International Conference",
      "2010-05-04",
    ],
    ["Palestine and the Golan Heights", "No Conference", "2011-01-07"],
    [
      "The most remarkable revolutions in history",
      "International Conference",
      "2012-02-06",
    ],
    [
      "Has Slavery transformed the development of the western world?",
      "International Conference",
      "2013-01-08",
    ],
    [
      "Could damage from the bubonic plague have been diminished?",
      "International Conference",
      "2014-04-08",
    ],
    [
      "What makes smartphones so resistant to bugs",
      "International Conference",
      "2001-01-01",
    ],
    [
      "Why didnt vector graphics become mainstream instead of pixels",
      "International Conference",
      "2002-01-01",
    ],
    ["What are Molten Salt Nuclear Reactors", "No Conference", "2002-04-01"],
    [
      "How are old recordings converted to new formats?",
      "No Conference",
      "2003-01-01",
    ],
    [
      "Why do smart our electronic devices get slower over time?",
      "International Conference",
      "2004-01-01",
    ],
    [
      "The effects of the printing press on the world",
      "International Conference",
      "2005-01-01",
    ],
    [
      "The fracturing of Christianity: causes and effects",
      "International Conference",
      "2006-01-01",
    ],
    [
      "Liberalism in national politics: emergence and evolution",
      "No Conference",
      "2007-01-01",
    ],
    [
      "Were the Crusades motivated purely by religious devotion?",
      "International Conference",
      "2008-01-01",
    ],
    [
      "Centers of scientific activity throughout history.",
      "International Conference",
      "2009-01-02",
    ],
    [
      "How did Chinas geography influence its history?",
      "International Conference",
      "2010-05-04",
    ],
    ["Palestine and the Golan Heights", "No Conference", "2011-01-07"],
    [
      "The most remarkable revolutions in history",
      "International Conference",
      "2012-02-06",
    ],
    [
      "Has Slavery transformed the development of the western world?",
      "International Conference",
      "2013-01-08",
    ],
    [
      "Could damage from the bubonic plague have been diminished?",
      "International Conference",
      "2014-04-08",
    ],
  ];
  connection.query(sql, [values], (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("30 records were added to research_Papers table...");
  });
};

//Insert Data of papers written by authors
export const insert_data_authors_papers = (req, res) => {
  const sql = "INSERT INTO authors_papers ( author_id, paper_id) VALUES ?";
  var values = [
    [100, 2],
    [101, 2],
    [103, 6],
    [100, 7],
    [110, 9],
    [111, 20],
    [105, 29],
    [105, 27],
    [101, 27],
    [109, 19],
    [102, 30],
    [112, 25],
    [104, 18],
    [104, 9],
    [102, 24],
    [107, 15],
    [107, 14],
    [108, 23],
    [108, 21],
    [113, 21],
    [113, 16],
    [103, 1],
    [102, 1],
    [114, 3],
    [112, 4],
    [112, 8],
    [100, 17],
    [111, 11],
    [114, 9],
    [106, 29],
  ];
  connection.query(sql, [values], (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("30 records were added to authors_papers table...");
  });
};
