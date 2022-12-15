import { connection } from "./transactions-create-tables.js";

// Transfer the amount of 1000 from account number 101 to account number 102
export const transfer_money = (req, res) => {
  connection.beginTransaction((err) => {
    if (err) {
      throw err;
    }
    const sql =
      "UPDATE account SET balance = balance - 1000 WHERE account_number = 1";
    connection.query(sql, (err, result) => {
      if (err) {
        return connection.rollback(() => {
          throw err;
        });
      }

      const sql =
        "UPDATE account SET balance = balance + 1000 WHERE account_number = 2";
      connection.query(sql, (err, result) => {
        if (err) {
          return connection.rollback(() => {
            throw err;
          });
        }

        const sql =
          "INSERT INTO account_changes (account_number, amount, changed_date, remark) VALUES ?";
        const values = [
          [
            1,
            1000,
            "2022-12-15",
            "Transfer the amount of 1000 from account number 101 to account number 102",
          ],
          [
            2,
            1000,
            "2001-12-15",
            "Receiving the amount of 1000 from account number 101 ",
          ],
        ];

        connection.query(sql, [values], (err, result) => {
          if (err) {
            return connection.rollback(() => {
              throw err;
            });
          }
        });

        connection.commit(function (err) {
          if (err) {
            return connection.rollback(function () {
              throw err;
            });
          }
          console.log("success!");
          res.send("success...");
        });
      });
    });
  });
};
