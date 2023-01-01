import dotenv from "dotenv";
dotenv.config();

export const transfer = async (client, sender, receiver, amount, remark) => {
  const session = client.startSession();
  const transactionOptions = {
    readPreference: "primary",
    readConcern: { level: "local" },
    writeConcern: { w: "majority" },
  };
  try {
    const transactionResults = await client.session.withTransaction(
      async () => {
        const senderUpdateResults = await client
          .db("databaseWeek4")
          .collection("account")
          .updateOne(
            { account_number: sender },
            {
              $inc: { balance: -amount },
              $push: {
                account_changes: {
                  change_number: 2,
                  amount: amount,
                  changed_date: new Date(),
                  remark: remark,
                },
              },
            },

            { session }
          );
        console.log(
          `${senderUpdateResults.modifiedCount} document was updated to cut the specified amount.`
        );

        const receiverUpdateResults = await client
          .db("databaseWeek4")
          .collection("account")
          .updateOne(
            { account_number: receiver },
            {
              $inc: { balance: +amount },
              $push: {
                account_changes: {
                  change_number: 2,
                  amount: amount,
                  changed_date: new Date(),
                  remark: remark,
                },
              },
            },

            { session }
          );
        console.log(
          `${receiverUpdateResults.modifiedCount} document was updated to add the specified amount.`
        );
      }
    );
    if (transactionResults) {
      console.log("The reservation was successfully created.");
      console.log(`${amount} euro transferred from ${sender} to ${receiver}`);
    } else {
      console.log("The transaction was intentionally aborted.");
    }
  } catch (e) {
    console.log("The transaction was aborted due to an unexpected error: " + e);
  } finally {
    await session.endSession();
  }
};
