const express = require("express");
const cors = require("cors");
const { ethers } = require("ethers");

const app = express();
const PORT = 3000;

// Enable CORS for all routes
app.use(cors());
app.use(express.json());

// Ethers.js setup
const provider = new ethers.providers.JsonRpcProvider(
  "https://testnet.hashio.io/api"
);
const wallet = new ethers.Wallet(
  "0xc8fc05608667bb191420fd78a191d0bf4762717aba530ddaf34a2236c4076f2e",
  provider
);

// Contracts ABIs
const contractABI = [
  {
    inputs: [
      {
        internalType: "string",
        name: "_binID",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_capacity",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_location",
        type: "string",
      },
    ],
    name: "addBin",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "binCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    name: "bins",
    outputs: [
      {
        internalType: "uint256",
        name: "capacity",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "currentWeight",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "location",
        type: "string",
      },
      {
        internalType: "bool",
        name: "isCollected",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "materialType",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "quantity",
        type: "uint256",
      },
    ],
    name: "buyWaste",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "binID",
        type: "string",
      },
    ],
    name: "checkBinCapacity",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "binID",
        type: "string",
      },
      {
        internalType: "bool",
        name: "status",
        type: "bool",
      },
    ],
    name: "manageCollection",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    name: "materialPrices",
    outputs: [
      {
        internalType: "string",
        name: "material",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bool",
        name: "compliance",
        type: "bool",
      },
    ],
    name: "monitorRecycling",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "pointsToRedeem",
        type: "uint256",
      },
    ],
    name: "redeemPoints",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "binID",
        type: "string",
      },
    ],
    name: "reportCollection",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "points",
        type: "uint256",
      },
    ],
    name: "scanCard",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "trackPoints",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "materialType",
        type: "string",
      },
    ],
    name: "trackPrices",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "users",
    outputs: [
      {
        internalType: "uint256",
        name: "points",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "binID",
        type: "string",
      },
    ],
    name: "verifyLocation",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "binID",
        type: "string",
      },
    ],
    name: "viewWeight",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "binID",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "weight",
        type: "uint256",
      },
    ],
    name: "weighGarbage",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

// ABI for WasteManagementRegulation
const wasteContractABI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "collectionId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "recyclingVerified",
        type: "bool",
      },
    ],
    name: "RecyclingVerificationCompleted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "collectionId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "collectionDate",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "collectionLocation",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "totalWasteCollected",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "totalWasteRecycled",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "recyclingCompany",
        type: "address",
      },
    ],
    name: "WasteCollectionLogged",
    type: "event",
  },
  {
    inputs: [],
    name: "getTotalWasteCollections",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_collectionId",
        type: "uint256",
      },
    ],
    name: "getWasteCollectionDetails",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_location",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_totalWasteCollected",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_totalWasteRecycled",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_recyclingCompany",
        type: "address",
      },
    ],
    name: "manageCollection",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_collectionId",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "_recyclingVerified",
        type: "bool",
      },
    ],
    name: "verifyRecycling",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "wasteCollectionCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "wasteCollections",
    outputs: [
      {
        internalType: "uint256",
        name: "collectionDate",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "collectionLocation",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "totalWasteCollected",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "totalWasteRecycled",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "recyclingCompany",
        type: "address",
      },
      {
        internalType: "bool",
        name: "recyclingVerified",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

// ABI for RecyclingManagement
const recyclingContractABI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "materialId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "pricePerKg",
        type: "uint256",
      },
    ],
    name: "MaterialAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "materialId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "oldPrice",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newPrice",
        type: "uint256",
      },
    ],
    name: "MaterialPriceUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "materialId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "weight",
        type: "uint256",
      },
    ],
    name: "RecyclingLogged",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_pricePerKg",
        type: "uint256",
      },
    ],
    name: "addMaterial",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_materialId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_weight",
        type: "uint256",
      },
    ],
    name: "logRecycling",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "materialCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "materials",
    outputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "pricePerKg",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_materialId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_newPrice",
        type: "uint256",
      },
    ],
    name: "updateMaterialPrice",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

// ABI for Citizen-RewardsLoyalty
const rewardsLoyaltyProgramsABI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newPoints",
        type: "uint256",
      },
    ],
    name: "LoyaltyPointsUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "materialId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "name",
        type: "string",
      },
    ],
    name: "MaterialAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "materialId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "weight",
        type: "uint256",
      },
    ],
    name: "WasteThrownLogged",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
    ],
    name: "addMaterial",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "citizens",
    outputs: [
      {
        internalType: "uint256",
        name: "totalWasteThrown",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "loyaltyPoints",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "couponGenerator",
    outputs: [
      {
        internalType: "contract CouponGenerator",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_citizen",
        type: "address",
      },
    ],
    name: "getCitizenInfo",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_citizen",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_materialId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_weight",
        type: "uint256",
      },
    ],
    name: "logWasteThrown",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "materialCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "materials",
    outputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_citizen",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_points",
        type: "uint256",
      },
    ],
    name: "redeemLoyaltyPoints",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const couponGeneratorABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "code",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "expiration",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "CouponGenerated",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_user",
        type: "address",
      },
      {
        internalType: "string",
        name: "_code",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_expiration",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_value",
        type: "uint256",
      },
    ],
    name: "generateCoupon",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_user",
        type: "address",
      },
    ],
    name: "getCoupons",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "code",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "expiration",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
        ],
        internalType: "struct CouponGenerator.Coupon[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "userCoupons",
    outputs: [
      {
        internalType: "string",
        name: "code",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "expiration",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

// Contract Address (replace with the actual deployed address)
const contractAddress = "0x05EC42a524A996cD039b771aA7307967a817b4f3";
const wasteContractAddress = "0x05EC42a524A996cD039b771aA7307967a817b4f3";
const recyclingContractAddress = "0x82dd24a6Ef9D066F547823BfECdC6F80a524AfC4";
const citizenRewardsContractAddress =
  "0x89C354889fd2E0526a5C0C27d02DB2CC50B9cc26";

const contract = new ethers.Contract(contractAddress, contractABI, wallet);
const wasteContract = new ethers.Contract(
  wasteContractAddress,
  wasteContractABI,
  wallet
);
const recyclingContract = new ethers.Contract(
  recyclingContractAddress,
  recyclingContractABI,
  wallet
);

// Wrap the async code into an async function
async function initializeContracts() {
  // Deploy RewardsLoyaltyPrograms contract and get the CouponGenerator contract address
  const rewardsLoyaltyProgramsContract = new ethers.Contract(
    citizenRewardsContractAddress,
    rewardsLoyaltyProgramsABI,
    wallet
  );
  const couponGeneratorAddress =
    await rewardsLoyaltyProgramsContract.couponGenerator();
  const couponGeneratorContract = new ethers.Contract(
    couponGeneratorAddress,
    couponGeneratorABI,
    wallet
  );

  return { rewardsLoyaltyProgramsContract, couponGeneratorContract };
}

let rewardsLoyaltyProgramsContract;
let couponGeneratorContract;

async function setupContracts() {
  try {
    const contracts = await initializeContracts();
    rewardsLoyaltyProgramsContract = contracts.rewardsLoyaltyProgramsContract;
    couponGeneratorContract = contracts.couponGeneratorContract;
  } catch (error) {
    console.error("Error setting up contracts:", error);
    process.exit(1); // Exit the process if contracts cannot be initialized
  }
}

// Call the setupContracts function to initialize the contracts before starting the server
setupContracts().then(() => {
  // Add Material Endpoint
  app.post("/add-material", async (req, res) => {
  const { name } = req.body;  // Ensure all required fields are in the request body

     try {
      const tx = await rewardsLoyaltyProgramsContract.addMaterial(name); // Only passing one argument (name)

      // Wait for the transaction to be mined
      await tx.wait();

      console.log(`Material added successfully with name: ${name}`);
    } catch (error) {
      console.error("Error adding material:", error);
    }
});


  // Get Material Count Endpoint
  app.get("/material-count", async (req, res) => {
    try {
      const count = await rewardsLoyaltyProgramsContract.materialCount();
      res.status(200).json({ materialCount: count.toString() });
    } catch (error) {
      console.error("Error fetching material count:", error);
      res.status(500).json({ error: "Failed to fetch material count" });
    }
  });

  app.post("/generate-coupon", async (req, res) => {
    const { userAddress, code, expiration, value } = req.body;

    // Convert expiration date to Unix timestamp if it's a string
    const expirationTimestamp =
      typeof expiration === "string"
        ? new Date(expiration).getTime() / 1000
        : expiration;

    try {
      const tx = await couponGeneratorContract.generateCoupon(
        userAddress,
        code,
        expirationTimestamp,
        value
      );
      await tx.wait();
      res.status(200).json({
        message: "Coupon generated successfully",
        transactionHash: tx.hash,
      });
    } catch (error) {
      console.error("Error generating coupon:", error);
      res.status(500).json({ error: "Failed to generate coupon" });
    }
  });

  // Endpoint to get coupons for a user
  app.get("/coupons/:userAddress", async (req, res) => {
  const userAddress = req.params.userAddress;

  try {
    const coupons = await couponGeneratorContract.getCoupons(userAddress);

    // Convert BigNumbers to regular numbers or strings
    const couponsWithConvertedValues = coupons.map(coupon => {
      const [couponCode, discountAmount, expirationTime] = coupon;
      return [
        couponCode, 
        discountAmount.toString(),  // Convert BigNumber to string
        expirationTime.toString()  // Convert BigNumber to string
      ];
    });

    res.status(200).json({ coupons: couponsWithConvertedValues });
  } catch (error) {
    console.error("Error fetching coupons:", error);
    res.status(500).json({ error: "Failed to fetch coupons" });
  }
});

});

// Endpoint to log waste thrown by a citizen
app.post("/log-waste-thrown", async (req, res) => {
  const { citizenAddress, materialId, weight } = req.body;

  try {
    const tx = await rewardsLoyaltyProgramsContract.logWasteThrown(
      citizenAddress,
      materialId,
      weight
    );
    await tx.wait();
    res.status(200).json({
      message: "Waste thrown logged successfully",
      transactionHash: tx.hash,
    });
  } catch (error) {
    console.error("Error logging waste thrown:", error);
    res.status(500).json({ error: "Failed to log waste thrown" });
  }
});

// Endpoint to get citizen info (waste thrown and loyalty points)
app.get("/get-citizen-info/:citizenAddress", async (req, res) => {
  const citizenAddress = req.params.citizenAddress;

  try {
    const [totalWasteThrown, loyaltyPoints] =
      await rewardsLoyaltyProgramsContract.getCitizenInfo(citizenAddress);
    
    // Convert BigNumber to regular numbers
    const totalWasteThrownInNumber = totalWasteThrown.toString(); // or .toNumber() if small enough
    const loyaltyPointsInNumber = loyaltyPoints.toString(); // or .toNumber() if small enough

    res.status(200).json({ totalWasteThrown: totalWasteThrownInNumber, loyaltyPoints: loyaltyPointsInNumber });
  } catch (error) {
    console.error("Error fetching citizen info:", error);
    res.status(500).json({ error: "Failed to fetch citizen info" });
  }
});


// Endpoint to redeem loyalty points
app.post("/redeem-loyalty-points", async (req, res) => {
  const { citizenAddress, points } = req.body;

  try {
    const tx = await rewardsLoyaltyProgramsContract.redeemLoyaltyPoints(
      citizenAddress,
      points
    );
    await tx.wait();
    res.status(200).json({
      message: "Loyalty points redeemed successfully",
      transactionHash: tx.hash,
    });
  } catch (error) {
    console.error("Error redeeming loyalty points:", error);
    res.status(500).json({ error: "Failed to redeem loyalty points" });
  }
});

//Endpoints for recycling management contract
// Route to Add a New Material
app.post("/add-material", async (req, res) => {
  try {
    const { name, pricePerKg } = req.body;
    const tx = await recyclingContract.addMaterial(name, pricePerKg);
    await tx.wait();
    res
      .status(200)
      .json({ message: "Material added successfully!", txHash: tx.hash });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Route to Update Material Price
app.post("/update-material-price", async (req, res) => {
  try {
    const { materialId, newPrice } = req.body;
    const tx = await recyclingContract.updateMaterialPrice(
      materialId,
      newPrice
    );
    await tx.wait();
    res.status(200).json({
      message: "Material price updated successfully!",
      txHash: tx.hash,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Route to Log Recycling Contribution
app.post("/log-recycling", async (req, res) => {
  try {
    const { materialId, weight } = req.body;
    const tx = await recyclingContract.logRecycling(materialId, weight);
    await tx.wait();
    res
      .status(200)
      .json({ message: "Recycling logged successfully!", txHash: tx.hash });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
});

//Endpoints for waste management regulations contract
// Route to log a waste collection
app.post("/manage-collection", async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    const {
      location,
      totalWasteCollected,
      totalWasteRecycled,
      recyclingCompany,
    } = req.body;
    const tx = await wasteContract.manageCollection(
      location,
      totalWasteCollected,
      totalWasteRecycled,
      recyclingCompany
    );
    await tx.wait();
    res.status(200).json({
      message: "Waste collection logged successfully!",
      txHash: tx.hash,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Route to verify recycling
app.post("/verify-recycling", async (req, res) => {
  try {
    const { collectionId, recyclingVerified } = req.body;
    const tx = await wasteContract.verifyRecycling(
      collectionId,
      recyclingVerified
    );
    await tx.wait();
    res
      .status(200)
      .json({ message: "Recycling verification updated!", txHash: tx.hash });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Route to fetch waste collection details
app.get("/waste-collection/:id", async (req, res) => {
  try {
    const collectionId = req.params.id;
    const details = await wasteContract.getWasteCollectionDetails(collectionId);
    res.status(200).json({
      collectionDate: details[0].toString(),
      collectionLocation: details[1],
      totalWasteCollected: details[2].toString(),
      totalWasteRecycled: details[3].toString(),
      recyclingCompany: details[4],
      recyclingVerified: details[5],
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Route to get total waste collections
app.get("/total-waste-collections", async (req, res) => {
  try {
    const totalCollections = await wasteContract.getTotalWasteCollections();
    res
      .status(200)
      .json({ totalWasteCollections: totalCollections.toString() });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
});

//Endpoints for waste management  contract
// Endpoint: Add a New Bin
app.post("/api/bins/add", express.json(), async (req, res) => {
  const { binID, capacity, location } = req.body;

  try {
    // Call smart contract method
    const tx = await contract.addBin(binID, capacity, location);
    await tx.wait();

    res.json({
      message: "Bin added successfully!",
      txHash: tx.hash,
    });
  } catch (error) {
    console.error("Error adding bin:", error);
    res.status(500).json({
      error: "Error adding bin",
      message: error.message,
    });
  }
});

// Endpoint: Get Bin Capacity
app.get("/api/bins/capacity/:binID", async (req, res) => {
  const binID = req.params.binID;
  try {
    const capacity = await contract.checkBinCapacity(binID);
    // Convert BigNumber to a plain number
    res.json({ capacity: capacity.toString() });
  } catch (error) {
    res.status(500).json({ error: "Error fetching bin capacity" });
  }
});

// Endpoint: Verify Bin Location
app.get("/api/bins/location/:binID", async (req, res) => {
  const binID = req.params.binID;
  try {
    const location = await contract.verifyLocation(binID);
    res.json({ location });
  } catch (error) {
    res.status(500).json({ error: "Error verifying bin location" });
  }
});

// Endpoint: Weigh Garbage
app.post("/api/bins/weigh", express.json(), async (req, res) => {
  const { binID, weight } = req.body;
  try {
    const tx = await contract.weighGarbage(binID, weight);
    await tx.wait();
    res.json({ message: "Garbage weighed successfully", txHash: tx.hash });
  } catch (error) {
    res.status(500).json({ error: "Error weighing garbage" });
  }
});

// Health check endpoint
app.get("/", (req, res) => {
  res.send("Waste Management API is running!");
});

// Start Server
async function startServer() {
  try {
    // Initialize rewardsLoyaltyProgramsContract before calling couponGenerator
    if (!rewardsLoyaltyProgramsContract) {
      rewardsLoyaltyProgramsContract = new ethers.Contract(
        citizenRewardsContractAddress,
        rewardsLoyaltyProgramsABI,
        wallet
      );
    }

    const couponGeneratorAddress =
      await rewardsLoyaltyProgramsContract.couponGenerator();
    console.log("Coupon Generator Address:", couponGeneratorAddress);

    const couponGeneratorContract = new ethers.Contract(
      couponGeneratorAddress,
      couponGeneratorABI,
      wallet
    );

    const name = "Recyclable Material Name"; // Replace with the actual name of the material

    try {
      const tx = await rewardsLoyaltyProgramsContract.addMaterial(name); // Only passing one argument (name)

      // Wait for the transaction to be mined
      await tx.wait();

      console.log(`Material added successfully with name: ${name}`);
    } catch (error) {
      console.error("Error adding material:", error);
    }

    // Initialize endpoints and start the server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start the server:", error);
  }
}

startServer();
