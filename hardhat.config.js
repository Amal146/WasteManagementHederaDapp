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
};
