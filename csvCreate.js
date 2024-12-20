const fs = require("fs");

const header = "Hash,From,To,Value,GasLimit,MaxFeePerGas,MaxPriorityFeePerGas,Nonce,ChainId,Type\n";

fs.writeFile("transactions.csv", header, (err) => {
  if (err) {
    console.error("Error creating file:", err);
  } else {
    console.log("File created: transactions.csv");
  }
});
