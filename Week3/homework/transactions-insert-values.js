import { connection } from "./transactions-create-tables.js";

//Insert Data to specified tables
export const insert_account_data = (req, res) => {
  const sql = "INSERT INTO account (balance) VALUES ?";
  const values = [
    [50000],
    [10000],
    [70000],
    [55000],
    [110000],
    [30000],
    [80000],
    [9000],
    [330000],
    [40000],
    [17000],
  ];
  connection.query(sql, [values], (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("records were added to account table...");
  });
};

//Insert Data to specified tables
export const insert_account_changes_data = (req, res) => {
  const sql =
    "INSERT INTO account_changes (account_number, amount, changed_date, remark) VALUES ?";
  const values = [
    [1, 500, "2001-01-01", "transction is succssfully done"],
    [3, 1000, "2022-01-01", "transction is succssfully done"],
    [5, 2500, "2022-04-04", "succssfully done"],
    [6, 3000, "2010-10-10", ""],
    [1, 2000, "2020-02-02", ""],
    [7, 2000, "2012-01-01", "transction is succssfully done"],
    [8, 3000, "2013-05-04", "succssfully done"],
    [6, 1000, "2010-10-10", ""],
  ];

  connection.query(sql, [values], (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("records were added to account_changes table...");
  });
};
