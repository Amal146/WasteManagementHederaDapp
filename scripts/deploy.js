const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  // Deploy WasteManagement contract
  const WasteManagement = await ethers.getContractFactory("WasteManagement");
  const wasteManagement = await WasteManagement.deploy();
  console.log("WasteManagement contract deployed to:", wasteManagement.address);

  // Deploy WasteManagementRegulation contract
  const WasteManagementRegulation = await ethers.getContractFactory(
    "WasteManagementRegulation"
  );
  const wasteManagementRegulation = await WasteManagementRegulation.deploy();
  console.log(
    "WasteManagementRegulation contract deployed to:",
    wasteManagementRegulation.address
  );

  // Deploy RecyclingManagement contract
  const RecyclingManagement = await ethers.getContractFactory(
    "RecyclingManagement"
  );
  const recyclingManagement = await RecyclingManagement.deploy();
  console.log(
    "RecyclingManagement contract deployed to:",
    recyclingManagement.address
  );

  // Deploy the RewardsLoyaltyPrograms contract
  const RewardsLoyaltyPrograms = await ethers.getContractFactory("RewardsLoyaltyPrograms");
  const rewardsLoyaltyPrograms = await RewardsLoyaltyPrograms.deploy();
  await rewardsLoyaltyPrograms.deployed();

  console.log("RewardsLoyaltyPrograms deployed to:", rewardsLoyaltyPrograms.address);

  // Get the deployed CouponGenerator address
  const couponGeneratorAddress = await rewardsLoyaltyPrograms.couponGenerator();
  console.log("CouponGenerator deployed to:", couponGeneratorAddress);

  
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
