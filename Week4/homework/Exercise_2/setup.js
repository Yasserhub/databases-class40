export const setupCollectionAndDocs = async (client) => {
  await client.db("databaseWeek4").collection("accounts").drop();

  const createCollectionResult = await client
    .db("databaseWeek4")
    .createCollection("accounts");
  if (createCollectionResult) {
    console.log("Accounts collection is created.");
  }

  await client.db("databaseWeek4").collection("accounts").deleteMany();
  const result = await client
    .db("databaseWeek4")
    .collection("accounts")
    .insertMany([
      {
        account_number: 100,
        balance: 2000,
        account_changes: [
          {
            change_number: 1,
            amount: 500,
            changed_date: "2022-12-29 13:00:00",
            remark: "Transaction from 102 to 100",
          },
        ],
      },
      {
        account_number: 101,
        balance: 3000,
        account_changes: [
          {
            change_number: 2,
            amount: 100,
            changed_date: "2022-12-31 09:15:00",
            remark: "Transaction from 100 to 101",
          },
        ],
      },
      {
        account_number: 102,
        balance: 7000,
        account_changes: [
          {
            change_number: 3,
            amount: 5000,
            changed_date: "2023-01-01 13:10:00",
            remark: "Transaction from 101 to 102",
          },
        ],
      },
    ]);

  console.log(
    `${result.insertedCount} new listings created with the following ids:`
  );
  console.log(result.insertedIds);
};

//module.exports = { setupCollectionAndDocs };
