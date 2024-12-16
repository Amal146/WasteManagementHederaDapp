const { ethers } = require("ethers");

// Connect to Hedera Testnet
const provider = new ethers.providers.JsonRpcProvider("https://testnet.hashio.io/api");

// Generate a New Wallet
const wallet = ethers.Wallet.createRandom();

console.log("Wallet Address:", wallet.address);
console.log("Private Key:", wallet.privateKey);

// Connect Wallet to Provider
const connectedWallet = wallet.connect(provider);

(async () => {
  const balance = await connectedWallet.getBalance();
  console.log("Wallet Balance:", ethers.utils.formatEther(balance));
})();
