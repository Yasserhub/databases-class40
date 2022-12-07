import { connection } from "./authors.js";

// prints names of all authors and their corresponding mentors
export const mentors = (req, res) => {
  const sql = `SELECT A.author_name, B.author_name As Mentor 
  FROM authors A
  JOIN authors B
  ON A.author_id=B.mentor`;
  const query = connection.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
};

export const publish = (req, res) => {
  const sql = `SELECT DISTINCT author_name, paper_title
    FROM authors
    LEFT JOIN authors_papers ON authors.author_id=authors_papers.author_id
    LEFT JOIN research_Papers ON authors_papers.paper_id=research_Papers.paper_id
    ORDER BY authors.author_name`;
  const query = connection.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
};
