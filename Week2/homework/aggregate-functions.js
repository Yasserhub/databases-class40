import { connection } from "./authors.js";

// All research papers and the number of authors that wrote that paper.
export const papers = (req, res) => {
  const sql = `SELECT research_Papers.paper_title, COUNT(authors_papers.author_id) AS NumberOfAuthors
      FROM authors_papers
      LEFT JOIN research_Papers ON authors_papers.paper_id=research_Papers.paper_id
      GROUP BY research_Papers.paper_title`;
  const query = connection.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
};

//Sum of the research papers published by all female authors.
export const papersByFemale = (req, res) => {
  const sql = `SELECT count(author_id) AS SumOfPapersByFemale
        FROM authors_papers
        WHERE author_id In (select author_id from authors where gender="W")`;
  const query = connection.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
};

//Average of the h-index of all authors per university
export const h_index = (req, res) => {
  const sql = `SELECT university, AVG(h_index) FROM authors
          GROUP BY university`;
  const query = connection.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
};

//Sum of the research papers of the authors per university.
export const papersByUniversity = (req, res) => {
  const sql = `SELECT  authors.university, COUNT(DISTINCT(authors_papers.paper_id)) AS SumOfPapersByUni FROM authors_papers 
            LEFT JOIN authors ON authors_papers.author_id=authors.author_id
            GROUP BY authors.university`;
  const query = connection.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
};
