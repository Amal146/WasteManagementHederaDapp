require("@nomiclabs/hardhat-ethers");
require("dotenv").config();

module.exports = {
  solidity: "0.8.0",
  networks: {
    hedera: {
      url: "https://testnet.hashio.io/api", // Hedera JSON-RPC Relay
      accounts: ["0xc8fc05608667bb191420fd78a191d0bf4762717aba530ddaf34a2236c4076f2e"], // Replace with Hedera private key
    },
  },
  gasReporter: {
    enabled: true, // Enable gas reporting
    currency: "USD", // Set the currency for gas usage cost
    token: "ETH", // Specify token type (you can also use other tokens like "HBAR" if supported)
    showTimeSpent: true, // Optionally, show how much time was spent on each transaction
  },
};
