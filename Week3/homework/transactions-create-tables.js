import express, { query } from "express";
import mysql from "mysql";

import {
  insert_account_changes_data,
  insert_account_data,
} from "./transactions-insert-values.js";

import { transfer_money } from "./transaction.js";

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

// creating account table
app.get("/create_account_table", (req, res) => {
  const sql =
    "CREATE TABLE IF NOT EXISTS account (account_number int AUTO_INCREMENT, balance int, PRIMARY KEY(account_number))";
  connection.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Account table was created...");
  });
});

// creating account_changes table
app.get("/create_account_change_table", (req, res) => {
  const sql =
    "CREATE TABLE IF NOT EXISTS account_changes (transation_id int AUTO_INCREMENT, account_number int, amount int," +
    "changed_date DATE, remark VARCHAR(255), PRIMARY KEY(transation_id))";
  connection.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Account_changes table was created...");
  });
});

//Insert Data to specified tables
app.get("/insert_into_account_table", insert_account_data);

//Insert Data to specified tables
app.get("/insert_into_account_changes_table", insert_account_changes_data);

// Transfer the amount of 1000 from account number 101 to account number 102
app.get("/transfer_money", transfer_money);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

export default app;
