// scripts/deploy.js
const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    // Deploy WasteManagement contract
    const WasteManagement = await ethers.getContractFactory("WasteManagement");
    const wasteManagement = await WasteManagement.deploy();
    console.log("WasteManagement contract deployed to:", wasteManagement.address);

    // Deploy WasteManagementRegulation contract
    const WasteManagementRegulation = await ethers.getContractFactory("WasteManagementRegulation");
    const wasteManagementRegulation = await WasteManagementRegulation.deploy();
    console.log("WasteManagementRegulation contract deployed to:", wasteManagementRegulation.address);

    // Deploy RecyclingManagement contract
    const RecyclingManagement = await ethers.getContractFactory("RecyclingManagement");
    const recyclingManagement = await RecyclingManagement.deploy();
    console.log("RecyclingManagement contract deployed to:", recyclingManagement.address);

    // Deploy Rewards_LoyaltyPrograms contract
    const Rewards_LoyaltyPrograms = await ethers.getContractFactory("Rewards_LoyaltyPrograms");
    const rewards_LoyaltyPrograms = await Rewards_LoyaltyPrograms.deploy();
    console.log("Rewards_LoyaltyPrograms contract deployed to:", rewards_LoyaltyPrograms.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
